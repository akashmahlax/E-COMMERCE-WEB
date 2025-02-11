import type { ObjectId } from "mongodb"
import { Schema, model } from "mongoose";

 export interface Product {
  _id?: ObjectId
  name: string
  price: number
  stock: number
  category: string
  images: string[]
  video?: string
  description: string
}

//  interface ProductWithId extends Product {
//   _id: ObjectId
// }
const productSchema = new Schema<Product>({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  category: { type: String, required: true },
  images: { type: [String], required: true },
  video: { type: String },
  description: { type: String, required: true },
});

export const ProductModel = model<Product>("Product", productSchema);

