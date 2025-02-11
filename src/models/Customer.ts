import type { ObjectId } from "mongodb"

export interface Customer {
  _id?: ObjectId
  name: string
  email: string
  orders: number
  totalSpent: number
  segment: "New" | "Regular" | "VIP"
}

export interface CustomerWithId extends Customer {
  _id: ObjectId
}


import { Schema, model, Document } from 'mongoose';

interface ICustomer extends Document {
  name: string;
  email: string;
  orders: number;
  totalSpent: number;
  segment: "New" | "Regular" | "VIP";
}

const customerSchema = new Schema<ICustomer>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  orders: { type: Number, required: true },
  totalSpent: { type: Number, required: true },
  segment: { type: String, enum: ["New", "Regular", "VIP"], required: true }
});

const CustomerModel = model<ICustomer>('Customer', customerSchema);

export { CustomerModel }
export type { ICustomer }
