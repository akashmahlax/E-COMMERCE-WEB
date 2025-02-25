"use client";
import Link from "next/link";
import { ShoppingBag, Menu, User } from "lucide-react";
import { useClerk, useUser } from "@clerk/nextjs";
import { useState } from "react";

export default function Navbar() {
  const { isSignedIn } = useUser();
  const { signOut } = useClerk();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="shadow-lg  fixed bg-gradient-to-r from-blue-600 to-pink-600 w-full top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-3">
          <ShoppingBag size={36} className="text-gold-500" />
          <h1 className="text-2xl font-extrabold text-gold-500">E-Shop</h1>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden  md:flex items-center space-x-6">
          <NavItem href="/" label="Home" />
          <NavItem href="/products" label="Products" />
          <NavItem href="/orders" label="Orders" />
          <NavItem href="/cart" label="Cart" />


          {isSignedIn ? (
            <div className="relative group">
              <button className="flex items-center space-x-2 text-gray-300 hover:text-gold-500 transition">
                <User size={20} />
                <span>Account</span>
              </button>
              {/* Dropdown Menu */}
              <div className="absolute top-10 right-0 hidden group-hover:block bg-black shadow-lg rounded-lg p-3 w-40">
                <Link href="/profile" className="block text-gray-300 hover:text-gold-500 transition">
                  Profile
                </Link>
                <button
                  onClick={() => signOut()}
                  className="block text-red-500 hover:text-red-700 transition mt-2"
                >
                  Sign Out
                </button>
              </div>
            </div>
          ) : (
            <Link href="/sign-in">
              <button className="bg-gold-500 hover:bg-gold-600 text-black px-4 py-2 rounded-lg transition">
                Sign In 
              </button>
            </Link>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-gray-300">
          <Menu size={28} />
        </button>
      </div>

      {/* Mobile Navigation */}
      {menuOpen && (
        <div className="md:hidden bg-black shadow-lg py-3 px-6">
          <NavItem href="/" label="Home" />
          <NavItem href="/products" label="Products" />
          <NavItem href="/contact" label="Contact" />
          {isSignedIn ? (
            <>
              <NavItem href="/profile" label="Profile" />
              <button
                onClick={() => signOut()}
                className="block w-full text-red-500 hover:text-red-700 transition mt-2 text-left"
              >
                Sign Out
              </button>
            </>
          ) : (
            <Link href="/sign-in">
              <button className="w-full bg-gold-500 hover:bg-gold-600 text-black px-4 py-2 rounded-lg transition mt-2">
                Sign In
              </button>
            </Link>
          )}
        </div>
      )}
    </header>
  );
}

// Reusable Nav Item Component
function NavItem({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href} className="text-gray-300 hover:text-gold-500 transition block py-2">
      {label}
    </Link>
  );
}
