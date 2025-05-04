import Razorpay from "razorpay";
import { NextResponse } from "next/server";

if (!process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID|| !process.env.NEXT_PUBLIC_RAZORPAY_KEY_SECRET) {
  throw new Error("Razorpay environment variables are missing");
}

const razorpay = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
  key_secret: process.env.NEXT_PUBLIC_RAZORPAY_KEY_SECRET,
});

export async function POST(req: Request) {
  const allowedOrigins = [
    "https://admin-akash7.vercel.app",
    "http://localhost:3000",
    "https://admin-six-khaki.vercel.app",
  ];

  const origin = req.headers.get("origin");

  const headers = {
    "Access-Control-Allow-Origin": allowedOrigins.includes(origin ?? "") ? origin! : "",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };

  if (req.method === "OPTIONS") {
    return new NextResponse(null, { headers });
  }

  try {
    const { amount, currency } = await req.json();

    if (!amount || !currency) {
      return new NextResponse(
        JSON.stringify({ error: "Amount and currency are required" }),
        { status: 400, headers }
      );
    }

    const order = await razorpay.orders.create({ amount, currency });
    return new NextResponse(JSON.stringify(order), { status: 200, headers });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: "Failed to create order" }),
      { status: 500, headers }
    );
  }
}
