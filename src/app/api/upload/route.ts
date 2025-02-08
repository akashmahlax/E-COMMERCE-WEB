import { type NextRequest, NextResponse } from "next/server"
import { GridFSBucket } from "mongodb"
import clientPromise from "@/lib/mongodb"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File

    if (!file) {
      return NextResponse.json({ error: "No file received" }, { status: 400 })
    }

    const allowedTypes = ["image/jpeg", "image/png", "image/gif", "video/mp4", "video/quicktime", "video/x-msvideo"]
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: "File type not supported" }, { status: 400 })
    }

    const maxSize = 100 * 1024 * 1024 // 100 MB
    if (file.size > maxSize) {
      return NextResponse.json({ error: "File size exceeds 100 MB limit" }, { status: 400 })
    }

    const buffer = Buffer.from(await file.arrayBuffer())
    const client = await clientPromise
    const db = client.db()
    const bucket = new GridFSBucket(db, {
      chunkSizeBytes: 1024 * 1024, // 1 MB chunks
    })

    const uploadStream = bucket.openUploadStream(file.name, {
      contentType: file.type,
    })

    const uploadPromise = new Promise((resolve, reject) => {
      uploadStream.on("finish", resolve)
      uploadStream.on("error", reject)
    })

    uploadStream.end(buffer)
    await uploadPromise

    return NextResponse.json({
      message: "File uploaded successfully",
      fileId: uploadStream.id.toString(),
    })
  } catch (error) {
    console.error("Upload error:", error)
    return NextResponse.json({ error: "Error uploading file" }, { status: 500 })
  }
}

