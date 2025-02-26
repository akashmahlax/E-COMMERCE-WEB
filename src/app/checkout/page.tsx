// app/checkout/page.tsx
"use client"; // Mark this as a Client Component

import { useEffect } from "react";
import Script from "next/script";
import Image from "next/image";
import { useProductStore } from "@/app/store/productStore"; // Zustand store for state management
import { Button } from "@/components/ui/button"; // shadcn/ui Button
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"; // shadcn/ui Carousel

export default function Checkout() {
  const { selectedProduct } = useProductStore(); // Retrieve the selected product from Zustand store

  const handlePayment = async () => {
    const baseurl = process.env.NEXT_PUBLIC_API_URL;
    if (!selectedProduct) return;

    const res = await fetch(`${baseurl}/api/rozarpay/order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: selectedProduct.price * 100, // Amount in paise
        currency: "INR",
      }),
    });

    const order = await res.json();

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: selectedProduct.name,
      description: selectedProduct.description || "Product Purchase",
      order_id: order.id,
      handler: async function (response: any) {
        const baseurl = process.env.NEXT_PUBLIC_API_URL;
        const result = await fetch(`${baseurl}/api/rozarpay/verify`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(response),
        });

        const data = await result.json();
        if (data.success) {
          alert("Payment successful!");
          window.location.href = "/success"; // Redirect to success page
        } else {
          alert("Payment failed!");
        }
      },
      prefill: {
        name: "Customer Name",
        email: "customer@example.com",
        contact: "9999999999",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp = new (window as any).Razorpay(options);
    rzp.open();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
      <main className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden">
        <h1 className="text-3xl font-bold text-center py-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Checkout
        </h1>

        {selectedProduct && (
          <div className="p-8">
            {/* Product Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Image Carousel */}
              <div className="relative">
                <Carousel className="w-full">
                  <CarouselContent>
                    {selectedProduct.imageUrls?.map((image, index) => (
                      <CarouselItem key={index}>
                        <div className="relative aspect-square overflow-hidden rounded-xl">
                          <Image
                            src={image}
                            alt={`${selectedProduct.name} - Image ${index + 1}`}
                            fill
                            className="object-cover"
                            priority={index === 0}
                          />
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md hover:bg-white transition" />
                  <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md hover:bg-white transition" />
                </Carousel>
              </div>

              {/* Product Info */}
              <div className="flex flex-col justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {selectedProduct.name}
                  </h2>
                  <p className="text-gray-600 mt-2">
                    {selectedProduct.description}
                  </p>
                  <p className="text-3xl font-bold text-green-600 mt-4">
                    ${selectedProduct.price.toFixed(2)}
                  </p>
                </div>

                {/* Payment Button */}
                <Button
                  onClick={handlePayment}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 rounded-lg transition-all transform hover:scale-105"
                >
                  Pay Now
                </Button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Razorpay Script */}
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
    </div>
  );
}