import ProductCard from "@/components/ProductCard"
import clientPromise from "@/lib/mongodb"
import { Product } from "@/models/Product"




async function getLatestProducts () {
  const client = await clientPromise
  const db = client.db("ecommerce")
  const products = await db.collection("products").find().sort({ _id: -1 }).limit(6).toArray()
  return JSON.parse(JSON.stringify(products))
}



export default async function ProductsPage() {

  const latestProducts: Product[] = await getLatestProducts();

  return (
    <div className="container  mx-5 px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Our Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {latestProducts.map((product) => (
          <ProductCard key={product._id.toString()} product={{ ...product, _id: product._id.toString() }} />
        ))}
      </div>
    </div>
  )
}

