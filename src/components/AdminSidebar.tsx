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

const AdminSidebar = () => {
  return (
    <div className="bg-gray-800 text-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform -translate-x-full md:relative md:translate-x-0 transition duration-200 ease-in-out">
      <nav>
        <Link
          href="/admin"
          className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white"
        >
          <Home className="inline-block mr-2" size={20} />
          Dashboard
        </Link>
        <Link
          href="/admin/products"
          className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white"
        >
          <Package className="inline-block mr-2" size={20} />
          Products
        </Link>
        <Link
          href="/admin/orders"
          className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white"
        >
          <ShoppingCart className="inline-block mr-2" size={20} />
          Orders
        </Link>
        <Link
          href="/admin/customers"
          className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white"
        >
          <Users className="inline-block mr-2" size={20} />
          Customers
        </Link>
        <Link
          href="/admin/analytics"
          className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white"
        >
          <BarChart className="inline-block mr-2" size={20} />
          Analytics
        </Link>
        <Link
          href="/admin/categories"
          className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white"
        >
          <Tag className="inline-block mr-2" size={20} />
          Categories
        </Link>
        <Link
          href="/admin/reviews"
          className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white"
        >
          <MessageSquare className="inline-block mr-2" size={20} />
          Reviews
        </Link>
        <Link
          href="/admin/inventory"
          className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white"
        >
          <Clipboard className="inline-block mr-2" size={20} />
          Inventory
        </Link>
        <Link
          href="/admin/coupons"
          className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white"
        >
          <Gift className="inline-block mr-2" size={20} />
          Coupons
        </Link>
        <Link
          href="/admin/settings"
          className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white"
        >
          <Settings className="inline-block mr-2" size={20} />
          Settings
        </Link>
      </nav>
    </div>
  )
}

export default AdminSidebar

