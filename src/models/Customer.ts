import type { ObjectId } from "mongodb"

export interface Customer {
  _id?: ObjectId
  name: string
  email: string
  orders: number
  totalSpent: number
  segment: "New" | "Regular" | "VIP"
}

