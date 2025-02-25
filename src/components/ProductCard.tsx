import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Heart, ShoppingCart } from "lucide-react"

interface Product {
  _id: string
  name: string
  price: number
  images: string[]
  video?: string
}

export default function ProductCard({ product }: { product: Product }) {
  return (
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
                  src={image || "/placeholder.svg"}
                  alt={`${product.name} - Image ${index + 1}`}
                  width={400}
                  height={300}
                  className="w-full h-60 object-contain rounded-t-xl"
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
          {/* You could add a rating component or extra info here */}
        </div>
      </CardContent>

      {/* Add to Cart Button */}
      <CardFooter className="px-4 py-3 bg-gray-50">
        <Button className="w-full bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-bold flex items-center justify-center space-x-2">
          <ShoppingCart className="w-5 h-5" />
          <span>Add to Cart</span>
        </Button>
        <div className="absolute top-3 right-3">
          <button
            aria-label="Add to Wishlist"
            className="bg-white p-2 rounded-full shadow-md hover:bg-red-100 transition"
          >
            <Heart className="w-5 h-5 text-red-500" />
          </button>
        </div>
      </CardFooter>
      
    </Card>
  )
}
