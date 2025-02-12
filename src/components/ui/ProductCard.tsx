"use client"

import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"

interface ProductCardProps {
  product: {
    name: string
    description: string
    price: number
    imageUrls: string[]
    videoUrl?: string
  }
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="w-full ">
      <CardContent className="p-0 ">
        <Carousel className="w-full ">
          <CarouselContent>
            {product.imageUrls?.map((url, index) => (
              <CarouselItem key={index}>
                <div className="relative aspect-square">
                  <Image
                    src={url || "/placeholder.svg"}
                    alt={`${product.name} - Image ${index + 1}`}
                    fill
                    className="object-cover rounded-t-lg"
                  />
                </div>
              </CarouselItem>
            ))}
            {product.videoUrl && (
              <CarouselItem>
                <div className="relative aspect-square">
                  <video src={product.videoUrl} controls className="w-full h-full object-cover rounded-t-lg" />
                </div>
              </CarouselItem>
            )}
          </CarouselContent>
          <CarouselPrevious className="absolute left-0" />
          <CarouselNext className="absolute right-0" />
        </Carousel>
      </CardContent>
      <CardFooter className="flex flex-col items-start p-4">
        <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
        <p className="text-sm text-gray-600 mb-4">{product.description}</p>
        <div className="flex justify-between items-center w-full">
          <span className="text-2xl font-bold">${product.price.toFixed(2)}</span>
          <Button>Add to Cart</Button>
        </div>
      </CardFooter>
    </Card>
  )
}

