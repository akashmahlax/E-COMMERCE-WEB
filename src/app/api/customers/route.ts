import { type NextRequest, NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"
import type { Customer } from "@/models/Customer"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const segment = searchParams.get("segment") || ""
    const search = searchParams.get("search") || ""

    const client = await clientPromise
    const db = client.db("ecommerce")

    const query: any = {}
    if (segment) {
      query.segment = segment
    }
    if (search) {
      query.$or = [{ name: { $regex: search, $options: "i" } }, { email: { $regex: search, $options: "i" } }]
    }

    const customers = await db.collection("customers").find(query).toArray()

    return NextResponse.json(customers)
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const client = await clientPromise
    const db = client.db("ecommerce")
    const body: Customer = await request.json()

    const result = await db.collection("customers").insertOne(body)
    const newCustomer = await db.collection("customers").findOne({ _id: result.insertedId })

    return NextResponse.json(newCustomer, { status: 201 })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

