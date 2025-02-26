// components/ui/ProductCard.tsx
"use client"; // Mark this as a Client Component

import { useRouter } from "next/navigation";
import Image from "next/image";

interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  images: string[];
  video?: string;
}

export default function ProductCard3({ product }: { product: Product }) {
  const router = useRouter();

  const handleBuyNow = () => {
    // Navigate to the checkout page with product data as a query parameter
    router.push(`/checkout?product=${encodeURIComponent(JSON.stringify(product))}`);
  };

  return (
    <div className="border p-4 rounded-lg shadow-lg">
      {/* Render product images */}
      {product.images?.map((image, index) => (
        <div key={index}> {/* Add a key prop here */}
          <Image
            src={image || "/placeholder.svg"} // Fallback for missing images
            alt={`${product.name} - Image ${index + 1}`}
            width={400}
            height={300}
            className="w-full h-60 object-contain rounded-t-xl"
            priority={index === 0} // Prioritize loading the first image
          />
        </div>
      ))}

      {/* Product Name */}
      <h2 className="text-xl font-bold">{product.name}</h2>

      {/* Product Description */}
      <p className="text-gray-600">{product.description}</p>

      {/* Product Price */}
      <p className="text-green-600 font-bold">${product.price}</p>

      {/* Buy Now Button */}
      <button
        onClick={handleBuyNow}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Buy Now
      </button>
    </div>
  );
}