"use client";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { useClerk, useUser } from "@clerk/nextjs";

export default function Navbar() {
  const { isSignedIn } = useUser();
  const { signOut } = useClerk();

  return (
    <header className="bg-white shadow">
      <div className="container px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <ShoppingBag size={32} className="text-blue-600" />
          <h1 className="text-2xl font-bold text-blue-600">E-Shop</h1>
        </div>
        <nav className="space-x-4">
          <Link href="/">
            <span className="text-gray-700 hover:text-blue-600 transition">
              Home
            </span>
          </Link>
          <Link href="/products">
            <span className="text-gray-700 hover:text-blue-600 transition">
              Products
            </span>
          </Link>
          <Link href="/contact">
            <span className="text-gray-700 hover:text-blue-600 transition">
              Contact
            </span>
          </Link>
          {isSignedIn ? (
            <button
              onClick={() => signOut()}
              className="text-gray-700 hover:text-blue-600 transition"
            >
              Sign Out
            </button>
          ) : (
            <Link href="/sign-in">
              <span className="text-gray-700 hover:text-blue-600 transition">
                Sign In
              </span>
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
