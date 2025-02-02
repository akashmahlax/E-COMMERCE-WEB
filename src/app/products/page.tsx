import ProductCard from "@/components/ProductCard"

// This would typically come from a database
const products = [
  { id: 1, name: "Product 1", price: 19.99, image: "/placeholder.svg" },
  { id: 2, name: "Product 2", price: 29.99, image: "/placeholder.svg" },
  { id: 3, name: "Product 3", price: 39.99, image: "/placeholder.svg" },
]

export default function ProductsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Our Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}

