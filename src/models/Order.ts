import type { ObjectId } from "mongodb"
import { Schema, model } from "mongoose";

export interface Order {
  _id?: ObjectId
  customer: string
  date: Date
  total: number
  status: "Completed" | "Processing" | "Shipped"
}

const orderSchema = new Schema<Order>({
  customer: { type: String, required: true },
  date: { type: Date, required: true },
  total: { type: Number, required: true },
  status: { type: String, enum: ["Completed", "Processing", "Shipped"], required: true }
});

const OrderModel = model<Order>("Order", orderSchema);

export { OrderModel };