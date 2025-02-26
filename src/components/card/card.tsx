"use client"; // Mark as a Client Component

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Heart, ShoppingCart } from "lucide-react";
import { useProductStore } from "@/app/store/productStore";// Zustand store for state management
import { useRouter } from "next/navigation"; // For navigation

interface Product {
  _id: string;
  name: string;
  price: number;
  images: string[];
  video?: string;
}

export default function ProductCard2({ product }: { product: Product }) {
  const router = useRouter();
  const setSelectedProduct = useProductStore((state) => state.setSelectedProduct);

  const handleBuyNow = () => {
    // Navigate to the checkout page with product data as a query parameter
    router.push(`/checkout?product=${encodeURIComponent(JSON.stringify(product))}`);
  };

  // Handle Add to Wishlist button click
  const handleAddToWishlist = () => {
    // Add your wishlist logic here
    console.log("Added to wishlist:", product.name);
  };

  return (
    <>
    <Card className="bg-white rounded-xl shadow-xl overflow-hidden transform hover:scale-105 transition duration-300 border border-gray-100">
      {/* Header */}
      <CardHeader className="px-4 py-3 bg-gray-50">
        <CardTitle className="text-xl font-extrabold text-gray-900">
          {product.name}
        </CardTitle>
      </CardHeader>

      {/* Image Carousel with Wishlist Overlay */}
      <div className="relative">
        <Carousel className="relative">
          <CarouselContent>
            {product.images?.map((image, index) => (
              <CarouselItem key={index} className="overflow-hidden">
                <Image
                  src={image || "/placeholder.svg"} // Fallback for missing images
                  alt={`${product.name} - Image ${index + 1}`}
                  width={400}
                  height={300}
                  className="w-full h-60 object-contain rounded-t-xl"
                  priority={index === 0} // Prioritize loading the first image
                />
              </CarouselItem>
            ))}
            {product.video && (
              <CarouselItem className="overflow-hidden">
                <video
                  src={product.video}
                  controls
                  className="w-full h-60 object-cover rounded-t-xl"
                />
              </CarouselItem>
            )}
          </CarouselContent>
          <CarouselPrevious className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white transition" />
          <CarouselNext className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white transition" />
        </Carousel>

        {/* Wishlist Icon */}
        <div className="absolute top-3 right-3">
          <button
            aria-label="Add to Wishlist"
            onClick={handleAddToWishlist}
            className="bg-white p-2 rounded-full shadow-md hover:bg-red-100 transition"
          >
            <Heart className="w-5 h-5 text-red-500" />
          </button>
        </div>
      </div>

      {/* Product Price */}
      <CardContent className="px-4 py-3">
        <div className="flex items-center justify-between">
          <p className="text-2xl font-bold text-gray-900">
            ${product.price.toFixed(2)}
          </p>
        </div>
      </CardContent>

      {/* Buttons */}
      <CardFooter className="px-4 py-3 bg-gray-50 flex flex-col gap-2">
        {/* Add to Cart Button */}
        <Button className="w-full bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-bold flex items-center justify-center space-x-2">
          <ShoppingCart className="w-5 h-5" />
          <span>Cart</span>
        </Button>
        <Button
          onClick={handleBuyNow}
          className="w-full bg-gradient-to-r from-purple-400 to-pink-500 hover:from-purple-500 hover:to-pink-600 text-white font-bold flex items-center justify-center space-x-2"
        >
          <span>Buy Now</span>
        </Button>
      </CardFooter>
     
    </Card>
   
    </>
  );
}