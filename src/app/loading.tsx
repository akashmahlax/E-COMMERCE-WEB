// app/loading.tsx
"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useUser } from "@clerk/nextjs";
import { ShoppingCart } from "lucide-react";

export default function Loading() {
  // Get the current user's info from Clerk
  const { user } = useUser();
  const username = user ? user.firstName || user.username || "Shopper" : "Shopper";

  // Create a progress state to simulate loading progress (numbering)
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      // Increment progress until 100, then reset
      setProgress((prev) => (prev >= 100 ? 0 : prev + 1));
    }, 50); // Update every 50ms
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gray-50 overflow-hidden">
      {/* Pulsating Shopping Cart Icon (Background) */}
      <motion.div
        className="absolute text-gray-300"
        style={{ fontSize: 200 }}
        animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <ShoppingCart />
      </motion.div>

      {/* Rotating Spinner */}
      <motion.div
        className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full z-10"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
      />

      {/* Personalized Loading Message */}
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="mt-4 text-2xl font-bold text-gray-800 z-10"
      >
        {`Hi ${username}, preparing your shopping experience...`}
      </motion.h2>

      {/* Animated Tagline */}
      <motion.p
        className="mt-2 text-lg text-gray-600 z-10"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
      >
        Finding the best products just for you!
      </motion.p>

      {/* Numbering / Progress Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="mt-4 text-xl font-semibold text-gray-700 z-10"
      >
        {progress}% Complete
      </motion.div>
    </div>
  );
}
