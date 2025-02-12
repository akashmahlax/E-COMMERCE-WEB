import { Button } from "@/components/ui/button";
import Link from "next/link";
import ProductCard from "@/components/ui/ProductCard";
import AdminBtn from "@/components/adminbtn";
import { ShoppingBag } from "lucide-react";
import Navbar from "@/components/Navbar";

// Force dynamic rendering since we're using a no-store fetch
export const dynamic = "force-dynamic";

async function getProducts() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/products`,
      { cache: "no-store" }
    );
    if (!res.ok) {
      throw new Error(
        `Failed to fetch products: ${res.status} ${res.statusText}`
      );
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
    <div className="min-h-screen bg-gray-300 flex flex-col">
      {/* Header */}
      <Navbar/>

      {/* Main Content */}
      <main className="container mx-auto flex-1 px-6 py-12">
        <div className="flex flex-col items-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Welcome to our store
          </h1>
          <AdminBtn />
        </div>
        <h2 className="text-3xl font-bold text-gray-800 my-8 text-center">
          Our Products
        </h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {!products && !error && (
          <p className="text-gray-600 text-center">Loading products...</p>
        )}
        {products && products.length === 0 && (
          <p className="text-gray-600 text-center">No products available.</p>
        )}
        {products && products.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white shadow">
        <div className="container mx-auto px-6 py-4 text-center text-gray-600">
          &copy; {new Date().getFullYear()} E-Shop. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
