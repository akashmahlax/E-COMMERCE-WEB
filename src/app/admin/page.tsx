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
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-6xl font-bold"><span className="text-blue-600">Admin Dashboard </span></h1>
      <h1 className="text-6xl font-bold mb-8"> Manage your products and more..! </h1>
        <p className="mt-3 text-2xl mb-8"><span className="bg-black rounded-lg text-white p-1"> Add </span>,<span className="bg-red-600 rounded-md text-white p-1"> Delete </span> and <span className="bg-green-600 rounded-md text-white p-1"> Update </span> products, manage orders, and view customer information.</p>
        <div className="flex mr-4 mb-8">
        
          <Link href="/products">
            <Button>View All Product</Button>
          </Link>
          <Link href="/dashboard" className="ml-4 border-green-500">
            <Button variant="outline" className="border-2 border-green-500 text-green-500 font-semibold hover:bg-green-500 hover:text-white">Open Dashboard</Button>
          </Link>    
        </div>
      <h1 className="text-3xl font-bold mb-6">Recently Added</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {!products && !error && <p>Loading products...</p>}
      {products && products.length === 0 && <p>No products available.</p>}
      {products && products.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product: any) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </main>
    </div>
  );
}
