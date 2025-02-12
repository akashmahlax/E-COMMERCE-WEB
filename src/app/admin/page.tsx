import { Button } from "@/components/ui/button";
import Link from "next/link";
import ProductCard from "@/components/ui/ProductCard";

// Force dynamic rendering since we're using a no-store fetch
export const dynamic = "force-dynamic";

async function getProducts() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/products`,
      { cache: "no-store" }
    );
    if (!res.ok) {
      throw new Error(`Failed to fetch products: ${res.status} ${res.statusText}`);
    }
    const data = await res.json();
    console.log("Fetched products:", data); // Log the fetched data
    return data;
  } catch (error) {
    console.error("Error in getProducts:", error);
    throw error;
  }
}

export default async function Home() {
  let products;
  let error;

  try {
    products = await getProducts();
  } catch (e) {
    console.error("Error fetching products:", e);
    error = "Failed to load products";
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="container mx-auto px-6 py-4">
          <h1 className="text-3xl font-bold text-blue-600">Admin Dashboard</h1>
          <p className="mt-2 text-gray-600">
            Manage your products, orders, and customers efficiently.
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8 flex-1">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-semibold mb-4">Manage Your Products</h2>
          <p className="text-lg text-gray-700">
            Add, delete, and update products seamlessly from your admin panel.
          </p>
          <div className="mt-6 flex justify-center space-x-4">
            <Link href="/products">
              <Button className="px-6 py-2">View All Products</Button>
            </Link>
            <Link href="/dashboard">
              <Button
                variant="outline"
                className="px-6 py-2 border-2 border-green-500 text-green-500 font-semibold hover:bg-green-500 hover:text-white transition"
              >
                Open Dashboard
              </Button>
            </Link>
          </div>
        </div>

        <section>
          <h3 className="text-2xl font-bold mb-6">Recently Added Products</h3>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          {!products && !error && <p className="text-gray-600">Loading products...</p>}
          {products && products.length === 0 && <p className="text-gray-600">No products available.</p>}
          {products && products.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product: any) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white shadow mt-8">
        <div className="container mx-auto px-6 py-4 text-center text-gray-600">
          &copy; {new Date().getFullYear()} Akash Mahla. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
