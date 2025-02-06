import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-600 rounded-md text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h2 className="text-2xl m-2 p-2 font-bold">Akashdeep E-commerce</h2>
            <p className="text-sm m-2 p-2 text-gray-400">Your trusted online store</p>
          </div>
          <div className="flex space-x-8">
            <Link href="/terms-and-conditions">
              <button className="text-gray-300 hover:text-white transition">Terms and Conditions</button>
            </Link>
            <Link href="/privacy-policy">
              <button className="text-gray-300 hover:text-white transition">Privacy Policy</button>
            </Link>
            <Link href="/shipping-policy">
              <button className="text-gray-300 hover:text-white transition">Shipping Policy</button>
            </Link>
            <Link href="/cancellation-and-refunds">
              <button className="text-gray-300 hover:text-white transition">Cancellation and Refunds</button>
            </Link>
            <Link href="/contact-us">
              <button className="text-gray-300 hover:text-white transition">Contact Us</button>
            </Link>
          </div>
        </div>
        <div className="mt-8 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} Akashdeep Singh. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}