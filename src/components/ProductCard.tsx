import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"

interface Product {
  _id: string
  name: string
  price: number
  images: string[]
  video?: string
}

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Card >
      <CardHeader>
        <CardTitle>{product.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <Carousel>
          <CarouselContent>
            {product.images?.map((image, index) => (
              <CarouselItem key={index}>
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`${product.name} - Image ${index + 1}`}
                  width={300}
                  height={200}
                  className="w-full h-60 object-cotain"
                />
              </CarouselItem>
            ))}
            {product.video && (
              <CarouselItem>
                <video src={product.video} controls className="w-full h-60 object-cover" />
              </CarouselItem>
            )}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
        <p className="mt-2 text-2xl font-bold">${product.price.toFixed(2)}</p>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Add to Cart</Button>
      </CardFooter>
    </Card>
  )
}

