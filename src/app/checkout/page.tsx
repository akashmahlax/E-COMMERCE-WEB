// app/checkout/page.tsx
"use client"; // Mark this as a Client Component

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Script from "next/script";

export default function Checkout() {
  const searchParams = useSearchParams();
  const [product, setProduct] = useState<any>(null);

  useEffect(() => {
    const productParam = searchParams.get("product");
    if (productParam) {
      setProduct(JSON.parse(decodeURIComponent(productParam)));
    }
  }, [searchParams]);

  const handlePayment = async () => {
    const baseurl=process.env.NEXT_PUBLIC_API_URL;
    if (!product) return;

    const res = await fetch(`${baseurl}/api/rozarpay/order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: product.price * 100, // Amount in paise
        currency: "INR",
      }),
    });

    const order = await res.json();

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: product.name,
      description: product.description,
      order_id: order.id,
      handler: async function (response: any) {
        const baseurl=process.env.NEXT_PUBLIC_API_URL;
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
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-3xl font-bold mb-6">Checkout</h1>
        {product && (
          <div className="border p-4 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold">{product.name}</h2>
            <p className="text-gray-600">{product.description}</p>
            <p className="text-green-600 font-bold">${product.price}</p>
            <button
              onClick={handlePayment}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Pay Now
            </button>
          </div>
        )}
      </main>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
    </div>
  );
}