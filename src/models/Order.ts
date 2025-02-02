import type { ObjectId } from "mongodb"

export interface Order {
  _id?: ObjectId
  customer: string
  date: Date
  total: number
  status: "Completed" | "Processing" | "Shipped"
}

