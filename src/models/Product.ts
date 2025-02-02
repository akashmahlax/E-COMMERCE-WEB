import type { ObjectId } from "mongodb"

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

