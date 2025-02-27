import Razorpay from "razorpay";
import { NextResponse } from "next/server";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export async function POST(req: Request) {
  // Define allowed origins
  const allowedOrigins = [
    "https://admin-akash7.vercel.app",
    "http://localhost:3000",
    "https://admin-six-khaki.vercel.app",
  ];

  // Get the origin of the request
  const origin = req.headers.get("origin");

  // Set CORS headers dynamically
  const headers = {
    "Access-Control-Allow-Origin": allowedOrigins.includes(origin) ? origin : "", // Allow only whitelisted origins
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };

  // Handle OPTIONS request for CORS preflight
  if (req.method === "OPTIONS") {
    return new NextResponse(null, { headers });
  }

  // Handle POST request
  try {
    const { amount, currency } = await req.json();

    const options = {
      amount: amount,
      currency: currency,
    };

    const order = await razorpay.orders.create(options);
    return new NextResponse(JSON.stringify(order), { status: 200, headers });
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: "Failed to create order" }), { status: 500, headers });
  }
}
