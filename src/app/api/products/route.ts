import { type NextRequest, NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"
import type { Product } from "@/models/Product"
import { ObjectId } from "mongodb"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")
    const search = searchParams.get("search") || ""
    const category = searchParams.get("category") || ""

    const client = await clientPromise
    const db = client.db("ecommerce")

    const query: any = {}
    if (search) {
      query.name = { $regex: search, $options: "i" }
    }
    if (category) {
      query.category = category
    }

    const totalProducts = await db.collection("products").countDocuments(query)
    const totalPages = Math.ceil(totalProducts / limit)

    const products = await db
      .collection("products")
      .find(query)
      .skip((page - 1) * limit)
      .limit(limit)
      .toArray()

    return NextResponse.json({
      products,
      totalPages,
      currentPage: page,
    })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const client = await clientPromise
    const db = client.db("ecommerce")
    const body: Product = await request.json()

    const result = await db.collection("products").insertOne(body)
    const newProduct = await db.collection("products").findOne({ _id: result.insertedId })

    return NextResponse.json(newProduct, { status: 201 })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const client = await clientPromise
    const db = client.db("ecommerce")
    const body: Product = await request.json()

    const { _id, ...updateData } = body
    if (!_id) {
      return NextResponse.json({ error: "Product ID is required" }, { status: 400 })
    }

    const result = await db.collection("products").updateOne({ _id: new ObjectId(_id) }, { $set: updateData })

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    const updatedProduct = await db.collection("products").findOne({ _id: new ObjectId(_id) })
    return NextResponse.json(updatedProduct)
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json({ error: "Product ID is required" }, { status: 400 })
    }

    const client = await clientPromise
    const db = client.db("ecommerce")

    const result = await db.collection("products").deleteOne({ _id: new ObjectId(id) })

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Product deleted successfully" })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

