import { NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"
import cloudinary from "@/lib/cloudinary"
async function uploadToCloudinary(file: Buffer, resourceType: "image" | "video") {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({ resource_type: resourceType }, (error, result) => {
        if (error) reject(error)
        else resolve(result)
      })
      .end(file)
  })
}

export async function POST(request: Request) {
  try {
    const client = await clientPromise
    const db = client.db("ecommerce")

    const formData = await request.formData()
    const name = formData.get("name") as string
    const description = formData.get("description") as string
    const price = Number.parseFloat(formData.get("price") as string)

    if (!name || !description || isNaN(price)) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 })
    }

    const imageUrls = []
    let videoUrl = null

    // Upload images
    for (let i = 0; ; i++) {
      const image = formData.get(`image${i}`) as File | null
      if (!image) break
      const arrayBuffer = await image.arrayBuffer()
      const buffer = Buffer.from(arrayBuffer)
      const uploadResponse = (await uploadToCloudinary(buffer, "image")) as any
      imageUrls.push(uploadResponse.secure_url)
    }

    // Upload video if present
    const video = formData.get("video") as File | null
    if (video) {
      const arrayBuffer = await video.arrayBuffer()
      const buffer = Buffer.from(arrayBuffer)
      const uploadResponse = (await uploadToCloudinary(buffer, "video")) as any
      videoUrl = uploadResponse.secure_url
    }

    const product = {
      name,
      description,
      price,
      imageUrls,
      videoUrl,
    }

    const result = await db.collection("products").insertOne(product)
    console.log("Product created:", result)

    return NextResponse.json({ message: "Product created successfully", product: result })
  } catch (e) {
    console.error("Error creating product:", e)
    return NextResponse.json({ message: "Error creating product", error: e.message }, { status: 500 })
  }
}

export async function GET() {
  try {
    const client = await clientPromise
    const db = client.db("ecommerce")

    const products = await db.collection("products").find({}).toArray()
    console.log("Products fetched:", products)

    return NextResponse.json(products)
  } catch (e) {
    console.error("Error fetching products:", e)
    return NextResponse.json({ message: "Error fetching products", error: e.message }, { status: 500 })
  }
}

