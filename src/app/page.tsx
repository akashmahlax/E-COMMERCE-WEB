// app/page.tsx
import Link from "next/link";
import AdminBtn from "@/components/adminbtn";
import ProductCard2 from "@/components/card/card";

// Force dynamic rendering since we're using a no-store fetch
export const dynamic = "force-dynamic";

async function getProducts() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;
    const res = await fetch(`${baseUrl}/api/products`, { cache: "no-store" });
    if (!res.ok) throw new Error('Failed to fetch products');
    return await res.json();
  } catch (error) {
    console.error("Error in getProducts:", error);
    throw error;
  }
}

export default async function Home() {
  let products;
  let error: string | null = null;

  try {
    products = await getProducts();
  } catch (e) {
    error = "Failed to load products. Please try again later.";
  }

  return (
    
    <div className="min-h-screen pt-16 flex flex-col bg-gray-50">
      
      

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative  bg-gradient-to-r from-blue-600 to-pink-600 py-24 px-4">
          <div className="max-w-6xl m-2 mx-auto text-center relative z-10">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white drop-shadow-md">
              New Season Arrivals
            </h1>
            <p className="text-lg md:text-xl text-gray-100 mb-8 opacity-95">
              Discover our curated collection of premium products
            </p>
            <Link
              href="/products"
              className="inline-block bg-white text-blue-600 px-10 py-4 rounded-xl hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 font-semibold shadow-lg"
            >
              Shop Now
            </Link>
          </div>
          <div className="absolute inset-0 bg-noise opacity-10" />
        </section>

        {/* Welcome Section */}
        <div className="flex flex-col items-center py-16 bg-white">
          <div className="max-w-4xl text-center space-y-4">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Welcome to <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">E-Shop</span>
            </h2>
            <p className="text-gray-600 text-lg mb-6">
              Discover premium quality products curated just for you
            </p>
            <AdminBtn />
          </div>
        </div>

        {/* Featured Products */}
        <section className="max-w-7xl mx-auto py-20 px-4 bg-white">
          <div className="text-center mb-16">
            <span className="text-blue-600 font-semibold text-sm uppercase tracking-wide">
              Featured Collection
            </span>
            <h2 className="text-4xl font-bold text-gray-900 mt-4">
              Editor&apos;s Picks
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {products && products.length > 0 ? (
              products.slice(0, 3).map((product: any) => (
                <ProductCard2 
                  key={product._id} 
                  product={product}
                  
                />
              ))
            ) : (
              // Skeleton Loading States
              [1, 2, 3].map((item) => (
                <div 
                  key={item}
                  className="bg-gray-100 rounded-xl overflow-hidden animate-pulse"
                >
                  <div className="h-64 bg-gray-200 w-full" />
                  <div className="p-6 space-y-3">
                    <div className="h-4 bg-gray-200 rounded w-3/4" />
                    <div className="h-4 bg-gray-200 rounded w-1/2" />
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        {/* All Products Section */}
        <section className="max-w-7xl mx-auto px-4 py-20">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">
                Our Products
              </h2>
              <p className="text-gray-600 mt-2">
                Explore our complete collection
              </p>
            </div>
            <div className="mt-4 md:mt-0 flex gap-4">
              <button className="px-6 py-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition">
                Filters
              </button>
              <button className="px-6 py-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition">
                Sort By
              </button>
            </div>
          </div>

          {error && (
            <div className="text-center py-12">
              <p className="text-red-500 text-lg">⚠️ {error}</p>
            </div>
          )}

          {!products && !error && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div key={item} className="bg-gray-100 rounded-xl animate-pulse">
                  <div className="h-72 bg-gray-200 rounded-t-xl" />
                  <div className="p-4 space-y-3">
                    <div className="h-4 bg-gray-200 rounded w-3/4" />
                    <div className="h-4 bg-gray-200 rounded w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {products && products.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((product: any) => (
                <ProductCard2
                  key={product._id}
                  product={product}
                  
                />
              ))}
            </div>
          )}
        </section>

        {/* Promotional Banner */}
        <section className="relative bg-gray-900 text-white py-24 px-4 overflow-hidden">
          <div className="max-w-6xl mx-auto text-center relative z-10">
            <div className="mb-8">
              <span className="text-purple-400 font-semibold tracking-wide">
                Limited Time Offer
              </span>
            </div>
            <h3 className="text-4xl md:text-5xl font-bold mb-6">
              Summer Sale Spectacular
            </h3>
            <p className="text-xl md:text-2xl text-gray-200 mb-8">
              Up to 50% off selected items + free shipping
            </p>
            <Link
              href="/sale"
              className="inline-block bg-white text-gray-900 px-12 py-4 rounded-full hover:bg-gray-100 transition-all duration-300 font-semibold shadow-lg transform hover:scale-105"
            >
              Explore Offers
            </Link>
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/30 to-blue-600/30" />
        </section>
      </main>

      <Footer />
    </div>
  );
}

// Enhanced Footer Component
function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-12">
          <div className="lg:col-span-2">
            <h4 className="text-white text-xl font-bold mb-6">E-Shop</h4>
            <p className="text-gray-400 leading-relaxed">
              Premium e-commerce experience with curated collections and 
              exceptional customer service.
            </p>
            <div className="mt-6 flex gap-4">
              <button className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition">
                <span className="sr-only">Twitter</span>
                {/* Add social icons */}
              </button>
              <button className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition">
                <span className="sr-only">Facebook</span>
              </button>
              <button className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition">
                <span className="sr-only">Instagram</span>
              </button>
            </div>
          </div>

          <div>
            <h5 className="text-white font-semibold mb-6">Company</h5>
            <ul className="space-y-3">
              {['About', 'Careers', 'Press', 'Affiliates'].map((item) => (
                <li key={item}>
                  <Link
                    href={`/${item.toLowerCase()}`}
                    className="hover:text-white transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h5 className="text-white font-semibold mb-6">Support</h5>
            <ul className="space-y-3">
              {['Contact', 'Returns', 'Shipping', 'FAQs'].map((item) => (
                <li key={item}>
                  <Link
                    href={`/${item.toLowerCase()}`}
                    className="hover:text-white transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h5 className="text-white font-semibold mb-6">Legal</h5>
            <ul className="space-y-3">
              {['Privacy', 'Terms', 'Security', 'Accessibility'].map((item) => (
                <li key={item}>
                  <Link
                    href={`/${item.toLowerCase()}`}
                    className="hover:text-white transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center md:text-left">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500">
              © 2024 E-Shop. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0 flex gap-6">
              <Link href="/privacy" className="text-gray-400 hover:text-white">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-white">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}