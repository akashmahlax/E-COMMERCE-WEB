import { type NextRequest, NextResponse } from "next/server"
import { GridFSBucket, ObjectId } from "mongodb"
import clientPromise from "@/lib/mongodb"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const client = await clientPromise
    const db = client.db()
    const bucket = new GridFSBucket(db)

    const file = await db.collection("fs.files").findOne({ _id: new ObjectId(params.id) })

    if (!file) {
      return NextResponse.json({ error: "File not found" }, { status: 404 })
    }

    const stream = bucket.openDownloadStream(new ObjectId(params.id))

    // Set appropriate headers
    const headers = new Headers()
    headers.set("Content-Type", file.contentType)
    headers.set("Content-Length", file.length.toString())

    const searchParams = request.nextUrl.searchParams
    const download = searchParams.get("download")

    if (download === "true") {
      headers.set("Content-Disposition", `attachment; filename="${file.filename}"`)
    } else {
      headers.set("Content-Disposition", `inline; filename="${file.filename}"`)
    }

    return new NextResponse(stream as any, { headers })
  } catch (error) {
    console.error("Error serving file:", error)
    return NextResponse.json({ error: "Error serving file" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const client = await clientPromise
    const db = client.db()
    const bucket = new GridFSBucket(db)

    await bucket.delete(new ObjectId(params.id))

    return NextResponse.json({ message: "File deleted successfully" })
  } catch (error) {
    console.error("Error deleting file:", error)
    return NextResponse.json({ error: "Error deleting file" }, { status: 500 })
  }
}

