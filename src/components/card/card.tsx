"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Heart, ShoppingCart, Star, Share2 } from "lucide-react";
import { useProductStore } from "@/app/store/productStore";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useState } from "react";

// Define Product interface
interface Product {
  _id: string;
  name: string;
  price: number;
  originalPrice?: number; // Original price for discount display
  stock: number;
  imageUrls: string[];
  videoUrl?: string;
  description?: string;
  rating?: number; // Rating out of 5
}

export default function ProductCard2({ product }: { product: Product }) {
  const router = useRouter();
  const { setSelectedProduct } = useProductStore();
  const [wishlist, setWishlist] = useState(false);

  // Discount calculation
  const discount = product.originalPrice ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;

  const handleBuyNow = () => {
    setSelectedProduct(product);
    router.push("/checkout");
  };

  const handleAddToWishlist = () => {
    setWishlist(!wishlist);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      viewport={{ once: true }}
      className="w-full max-w-sm mx-auto"
    >
      <Card className="bg-white rounded-2xl shadow-lg overflow-hidden transform hover:scale-[1.02] transition-all duration-300 border border-gray-100 hover:shadow-xl">
        {/* Header */}
        <CardHeader className="px-6 py-4 bg-gradient-to-r from-blue-50 to-purple-50">
          <CardTitle className="text-2xl font-bold text-gray-900">
            {product.name}
          </CardTitle>
        </CardHeader>

        {/* Image Carousel */}
        <div className="relative">
          <Carousel className="relative">
            <CarouselContent>
              {product.imageUrls?.map((image, index) => (
                <CarouselItem key={index} className="overflow-hidden">
                  <div className="relative aspect-square">
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`${product.name} - Image ${index + 1}`}
                      fill
                      className="object-cover rounded-xl"
                      priority={index === 0}
                    />
                  </div>
                </CarouselItem>
              ))}
              {product.videoUrl && (
                <CarouselItem className="overflow-hidden">
                  <video
                    src={product.videoUrl}
                    controls
                    className="w-full h-60 object-cover rounded-t-xl"
                  />
                </CarouselItem>
              )}
            </CarouselContent>
            <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md hover:bg-white transition" />
            <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md hover:bg-white transition" />
          </Carousel>

          {/* Wishlist & Share Icons */}
          <div className="absolute top-4 right-4 flex space-x-2">
            <button
              aria-label="Add to Wishlist"
              onClick={handleAddToWishlist}
              className={`p-2 rounded-full shadow-md transition-all transform hover:scale-110 ${wishlist ? "bg-red-500 text-white" : "bg-white hover:bg-red-100"}`}
            >
              <Heart className="w-6 h-6" />
            </button>
            <button
              aria-label="Share"
              className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-all transform hover:scale-110"
            >
              <Share2 className="w-6 h-6 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Product Info */}
        <CardContent className="px-6 py-4 space-y-2">
          {/* Price & Discount */}
          <div className="flex items-center justify-between">
            <p className="text-3xl font-bold text-gray-900">
              ${product.price.toFixed(2)}
            </p>
            {product.originalPrice && (
              <p className="text-sm text-gray-500 line-through">
                ${product.originalPrice.toFixed(2)}
              </p>
            )}
            {discount > 0 && (
              <span className="bg-red-500 text-white px-2 py-1 text-xs font-bold rounded-full">
                -{discount}%
              </span>
            )}
          </div>

          {/* Stock & Rating */}
          <div className="flex items-center justify-between">
            <p className={`text-sm font-semibold ${product.stock > 5 ? "text-green-600" : "text-red-600"}`}>
              {product.stock > 0 ? (product.stock < 5 ? `Only ${product.stock} Left!` : "In Stock") : "Out of Stock"}
            </p>
            <div className="flex space-x-1">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star key={index} className={`w-5 h-5 ${index < (product.rating || 0) ? "text-yellow-400" : "text-gray-300"}`} />
              ))}
            </div>
          </div>
        </CardContent>

        {/* Buttons */}
        <CardFooter className="px-6 py-4 bg-gradient-to-r from-blue-50 to-purple-50 flex flex-col gap-3">
          {/* Add to Cart */}
          <Button
            className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-bold flex items-center justify-center space-x-2 py-3 rounded-lg transition-all transform hover:scale-105"
          >
            <ShoppingCart className="w-6 h-6" />
            <span>Add to Cart</span>
          </Button>
          {/* Buy Now */}
          <Button
            onClick={handleBuyNow}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold flex items-center justify-center space-x-2 py-3 rounded-lg transition-all transform hover:scale-105"
          >
            <span>Buy Now</span>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
