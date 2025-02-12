import Link from "next/link";
import ProductCard from "@/components/ui/ProductCard";

// Force dynamic rendering since we're using a no-store fetch
export const dynamic = "force-dynamic";

async function getProducts() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/products/new`,
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
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Our Products</h1>
      <Link
        href="/admin"
        className="bg-green-500 text-white px-4 py-2 rounded mb-8 inline-block hover:bg-green-600 transition"
      >
        Admin Panel
      </Link>
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
    </div>
  );
}
