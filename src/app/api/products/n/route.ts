import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import cloudinary from "@/lib/cloudinary";
import { ObjectId } from "mongodb";

// Helper function to upload files to Cloudinary
async function uploadToCloudinary(file: Buffer, resourceType: "image" | "video") {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({ resource_type: resourceType }, (error, result) => {
        if (error) reject(error);
        else resolve(result);
      })
      .end(file);
  });
}

// POST: Create a new product
export async function POST(request: Request) {
  try {
    const client = await clientPromise;
    const db = client.db("ecommerce");

    const formData = await request.formData();
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const price = Number.parseFloat(formData.get("price") as string);

    if (!name || !description || isNaN(price)) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    const imageUrls: string[] = [];
    let videoUrl: string | null = null;

    // Upload images (using dynamic keys: image0, image1, …)
    for (let i = 0; ; i++) {
      const image = formData.get(`image${i}`) as File | null;
      if (!image) break;
      const arrayBuffer = await image.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const uploadResponse = (await uploadToCloudinary(buffer, "image")) as any;
      imageUrls.push(uploadResponse.secure_url);
    }

    // Upload video if provided
    const video = formData.get("video") as File | null;
    if (video) {
      const arrayBuffer = await video.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const uploadResponse = (await uploadToCloudinary(buffer, "video")) as any;
      videoUrl = uploadResponse.secure_url;
    }

    const product = {
      name,
      description,
      price,
      imageUrls,
      videoUrl,
    };

    const result = await db.collection("products").insertOne(product);
    console.log("Product created:", result);

    return NextResponse.json({ message: "Product created successfully", product: result });
  } catch (e: any) {
    console.error("Error creating product:", e);
    return NextResponse.json(
      { message: "Error creating product", error: e.message },
      { status: 500 }
    );
  }
}

// GET: Fetch all products
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("ecommerce");

    const products = await db.collection("products").find({}).toArray();
    console.log("Products fetched:", products);

    return NextResponse.json(products);
  } catch (e: any) {
    console.error("Error fetching products:", e);
    return NextResponse.json(
      { message: "Error fetching products", error: e.message },
      { status: 500 }
    );
  }
}

// DELETE: Remove a product by ID (pass the product ID as a query parameter)
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ message: "Product ID not provided" }, { status: 400 });
    }
    const client = await clientPromise;
    const db = client.db("ecommerce");
    const result = await db.collection("products").deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) {
      return NextResponse.json({ message: "No product found with the given ID" }, { status: 404 });
    }
    return NextResponse.json({ message: "Product deleted successfully" });
  } catch (e: any) {
    console.error("Error deleting product:", e);
    return NextResponse.json(
      { message: "Error deleting product", error: e.message },
      { status: 500 }
    );
  }
}

// PUT: Update a product by ID (pass the product ID as a query parameter)
export async function PUT(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ message: "Product ID not provided" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("ecommerce");
    const formData = await request.formData();

    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const price = Number.parseFloat(formData.get("price") as string);

    if (!name || !description || isNaN(price)) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    const imageUrls: string[] = [];
    let videoUrl: string | null = null;

    // If new images are provided, upload them.
    for (let i = 0; ; i++) {
      const image = formData.get(`image${i}`) as File | null;
      if (!image) break;
      const arrayBuffer = await image.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const uploadResponse = (await uploadToCloudinary(buffer, "image")) as any;
      imageUrls.push(uploadResponse.secure_url);
    }

    // Upload video if provided
    const video = formData.get("video") as File | null;
    if (video) {
      const arrayBuffer = await video.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const uploadResponse = (await uploadToCloudinary(buffer, "video")) as any;
      videoUrl = uploadResponse.secure_url;
    }

    // Build the update object. Only update image/video URLs if new ones are provided.
    const updateData: any = {
      name,
      description,
      price,
    };
    if (imageUrls.length > 0) {
      updateData.imageUrls = imageUrls;
    }
    if (videoUrl) {
      updateData.videoUrl = videoUrl;
    }

    const result = await db.collection("products").updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    );

    if (result.modifiedCount === 0) {
      return NextResponse.json({ message: "No product updated" }, { status: 404 });
    }

    return NextResponse.json({ message: "Product updated successfully" });
  } catch (e: any) {
    console.error("Error updating product:", e);
    return NextResponse.json(
      { message: "Error updating product", error: e.message },
      { status: 500 }
    );
  }
}