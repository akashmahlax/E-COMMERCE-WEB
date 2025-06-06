import { Button } from "@/components/ui/button";
import Link from "next/link";
import ProductCard from "@/components/ui/ProductCard";
import ProductCard3 from "@/components/card/p";
import ProductCard2 from "@/components/card/card";



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
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
    
      <h1 className="text-3xl font-bold mb-6">Our Products</h1>
    
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {!products && !error && <p>Loading products...</p>}
      {products && products.length === 0 && <p>No products available.</p>}
      {products && products.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product: any) => (
            <ProductCard2 key={product._id} product={product} />
          ))}
        </div>
      )}
    </main>
    </div>
  );
}
