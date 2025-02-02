import { NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"

export async function GET() {
  try {
    const client = await clientPromise
    const db = client.db("ecommerce")

    const totalRevenue = await db
      .collection("orders")
      .aggregate([{ $group: { _id: null, total: { $sum: "$total" } } }])
      .toArray()

    const orders = await db.collection("orders").countDocuments()
    const customers = await db.collection("customers").countDocuments()

    const salesData = await db
      .collection("orders")
      .aggregate([
        { $group: { _id: { $month: "$date" }, sales: { $sum: "$total" } } },
        { $sort: { _id: 1 } },
        { $project: { _id: 0, name: "$_id", sales: 1 } },
      ])
      .toArray()

    const visitorData = [
      { name: "Mon", visitors: 1000 },
      { name: "Tue", visitors: 1200 },
      { name: "Wed", visitors: 1500 },
      { name: "Thu", visitors: 1300 },
      { name: "Fri", visitors: 1400 },
      { name: "Sat", visitors: 1800 },
      { name: "Sun", visitors: 1600 },
    ] // This would typically come from an analytics service

    const dashboardData = {
      totalRevenue: totalRevenue[0]?.total || 0,
      orders,
      customers,
      conversionRate: ((orders / customers) * 100).toFixed(2),
      salesData,
      visitorData,
    }

    return NextResponse.json(dashboardData)
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

