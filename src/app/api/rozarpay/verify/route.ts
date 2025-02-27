// app/api/verify-payment/route.js
import Razorpay from "razorpay";
import crypto from "crypto";
import { NextResponse } from "next/server";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// List of allowed origins
const allowedOrigins = [
  "http://localhost:3000", // Local development
  "https://admin-akash7.vercel.app", // Frontend domain
  "https://admin-six-khaki.vercel.app", // Another frontend domain
];

export async function POST(req: Request) {
  // Get the origin from the request headers
  const origin = req.headers.get("origin");

  // Set CORS headers dynamically
  const headers = {
    "Access-Control-Allow-Origin": allowedOrigins.includes(origin) ? origin : "", // Allow requests from allowed origins
    "Access-Control-Allow-Methods": "POST, OPTIONS", // Allow POST and OPTIONS requests
    "Access-Control-Allow-Headers": "Content-Type", // Allow Content-Type header
  };

  // Handle OPTIONS request for CORS preflight
  if (req.method === "OPTIONS") {
    return new NextResponse(null, { headers });
  }

  // Handle POST request
  const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = await req.json();

  // Generate the expected signature
  const generated_signature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(razorpay_order_id + "|" + razorpay_payment_id)
    .digest("hex");

  // Verify the signature
  if (generated_signature === razorpay_signature) {
    return new NextResponse(JSON.stringify({ success: true }), { status: 200, headers });
  } else {
    return new NextResponse(JSON.stringify({ success: false }), { status: 400, headers });
  }
}