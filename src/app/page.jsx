import Link from "next/link"
import { Button } from "@/components/ui/button"
import ProductCard from "@/components/ProductCard"
import clientPromise from "@/lib/mongodb"



async function getLatestProducts() {
  const client = await clientPromise
  const db = client.db("ecommerce")
  const products = await db.collection("products").find().sort({ _id: -1 }).limit(6).toArray()
  return JSON.parse(JSON.stringify(products))
}

export default async function Home() {
  const latestProducts = await getLatestProducts()

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-6xl font-bold mb-8">
          Welcome to our <span className="text-blue-600">E-commerce Store</span>
        </h1>
        <p className="mt-3 text-2xl mb-8">Shop the latest products with ease</p>
        <div className="flex mb-8">
          <Link href="/products">
            <Button>Shop Now !</Button>
          </Link>
          <Link href="/admin" className="ml-4 border-green-500">
            <Button variant="outline" className="border-2 border-green-500 text-green-500 font-semibold hover:bg-green-500 hover:text-white">Admin Panel</Button>
          </Link>
        </div>
        <h2 className="text-3xl font-bold mb-4">Latest Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {latestProducts.map((product ) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </main>
    </div>
  )
}

