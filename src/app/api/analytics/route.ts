import { type NextRequest, NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"

export async function GET(request: NextRequest) {
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
        {
          $project: {
            _id: 0,
            name: {
              $switch: {
                branches: [
                  { case: { $eq: ["$_id", 1] }, then: "Jan" },
                  { case: { $eq: ["$_id", 2] }, then: "Feb" },
                  { case: { $eq: ["$_id", 3] }, then: "Mar" },
                  { case: { $eq: ["$_id", 4] }, then: "Apr" },
                  { case: { $eq: ["$_id", 5] }, then: "May" },
                  { case: { $eq: ["$_id", 6] }, then: "Jun" },
                  { case: { $eq: ["$_id", 7] }, then: "Jul" },
                  { case: { $eq: ["$_id", 8] }, then: "Aug" },
                  { case: { $eq: ["$_id", 9] }, then: "Sep" },
                  { case: { $eq: ["$_id", 10] }, then: "Oct" },
                  { case: { $eq: ["$_id", 11] }, then: "Nov" },
                  { case: { $eq: ["$_id", 12] }, then: "Dec" },
                ],
                default: "Unknown",
              },
            },
            sales: 1,
          },
        },
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

    const categoryData = await db
      .collection("products")
      .aggregate([
        { $group: { _id: "$category", value: { $sum: 1 } } },
        { $project: { _id: 0, name: "$_id", value: 1 } },
      ])
      .toArray()

    const analyticsData = {
      totalRevenue: totalRevenue[0]?.total || 0,
      orders,
      customers,
      conversionRate: ((orders / customers) * 100).toFixed(2),
      salesData,
      visitorData,
      categoryData,
    }

    return NextResponse.json(analyticsData)
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

