import Link from "next/link"
import {
  Home,
  Package,
  ShoppingCart,
  BarChart,
  Users,
  Settings,
  Tag,
  MessageSquare,
  Clipboard,
  Gift,
} from "lucide-react"

const dashboardSidebar = () => {
  return (
    <div className="bg-gray-800 text-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform -translate-x-full md:relative md:translate-x-0 transition duration-200 ease-in-out">
      <nav>
        <Link
          href="/dashboard"
          className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white"
        >
          <Home className="inline-block mr-2" size={20} />
          Dashboard
        </Link>
        <Link
          href="/dashboard/products"
          className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white"
        >
          <Package className="inline-block mr-2" size={20} />
          Products
        </Link>
        <Link
          href="/dashboard/orders"
          className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white"
        >
          <ShoppingCart className="inline-block mr-2" size={20} />
          Orders
        </Link>
        <Link
          href="/dashboard/customers"
          className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white"
        >
          <Users className="inline-block mr-2" size={20} />
          Customers
        </Link>
        <Link
          href="/dashboard/analytics"
          className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white"
        >
          <BarChart className="inline-block mr-2" size={20} />
          Analytics
        </Link>
        <Link
          href="/dashboard/categories"
          className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white"
        >
          <Tag className="inline-block mr-2" size={20} />
          Categories
        </Link>
        <Link
          href="/dashboard/reviews"
          className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white"
        >
          <MessageSquare className="inline-block mr-2" size={20} />
          Reviews
        </Link>
        <Link
          href="/dashboard/inventory"
          className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white"
        >
          <Clipboard className="inline-block mr-2" size={20} />
          Inventory
        </Link>
        <Link
          href="/dashboard/coupons"
          className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white"
        >
          <Gift className="inline-block mr-2" size={20} />
          Coupons
        </Link>
        <Link
          href="/dashboard/settings"
          className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white"
        >
          <Settings className="inline-block mr-2" size={20} />
          Settings
        </Link>
      </nav>
    </div>
  )
}

export default dashboardSidebar

