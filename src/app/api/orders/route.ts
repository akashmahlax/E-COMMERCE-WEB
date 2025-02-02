import { type NextRequest, NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"
import type { Order } from "@/models/Order"
import { ObjectId } from "mongodb"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status") || ""
    const search = searchParams.get("search") || ""

    const client = await clientPromise
    const db = client.db("ecommerce")

    const query: any = {}
    if (status) {
      query.status = status
    }
    if (search) {
      query.$or = [{ customer: { $regex: search, $options: "i" } }, { _id: { $regex: search, $options: "i" } }]
    }

    const orders = await db.collection("orders").find(query).toArray()

    return NextResponse.json(orders)
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const client = await clientPromise
    const db = client.db("ecommerce")
    const body: Order = await request.json()

    const { _id, ...updateData } = body
    if (!_id) {
      return NextResponse.json({ error: "Order ID is required" }, { status: 400 })
    }

    const result = await db.collection("orders").updateOne({ _id: new ObjectId(_id) }, { $set: updateData })

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 })
    }

    const updatedOrder = await db.collection("orders").findOne({ _id: new ObjectId(_id) })
    return NextResponse.json(updatedOrder)
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

