// components/ui/BuyNowButton.tsx
"use client";

import { useState } from "react";
import Script from "next/script";

interface BuyNowButtonProps {
  product: {
    _id: string;
    name: string;
    price: number; // price in rupees
    // Add other product fields as needed
  };
}

export default function BuyNowButton({ product }: BuyNowButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleBuyNow = async () => {
    setLoading(true);
    const amount = product.price; // product price in rupees
    const currency = "INR";

    try {
      // Call the API route to create a Razorpay order for this product
      const res = await fetch("/api/razorpay/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount, currency }),
      });
      const orderData = await res.json();
      console.log("Order created:", orderData);

      // Prepare Razorpay checkout options
      const options = {
        key: "rzp_test_EygtBZ9dLug1Ms", // Test key
        amount: orderData.amount,
        currency: orderData.currency,
        order_id: orderData.id,
        name: "E-Shop",
        description: `Purchase: ${product.name}`,
        image: "/logo.png", // Optional: path to your logo image
        handler: function (response: any) {
          // Handle successful payment here
          alert(
            "Payment successful!\nPayment ID: " +
              response.razorpay_payment_id
          );
        },
        prefill: {
          name: "Customer Name",
          email: "customer@example.com",
          contact: "9999999999",
        },
        notes: {
          product_id: product._id,
        },
        theme: {
          color: "#F37254",
        },
      };

      // Open the Razorpay checkout modal
      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Error during checkout:", error);
      alert("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Load the Razorpay checkout script */}
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="beforeInteractive"
      />
      <button
        onClick={handleBuyNow}
        disabled={loading}
        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition mt-2"
      >
        {loading ? "Processing..." : "Buy Now"}
      </button>
    </>
  );
}
