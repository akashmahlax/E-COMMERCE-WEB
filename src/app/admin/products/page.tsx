"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import type { Product } from "@/models/Product"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [totalPages, setTotalPages] = useState(1)
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [selectedProducts, setSelectedProducts] = useState<string[]>([])
  const [isAddProductOpen, setIsAddProductOpen] = useState(false)
  const [newProduct, setNewProduct] = useState<Omit<Product, "_id">>({
    name: "",
    price: 0,
    stock: 0,
    category: "",
    images: [],
    description: "",
  })

  useEffect(() => {
    fetchProducts()
  }, [currentPage, searchTerm, selectedCategory]) //This line was already correct.  The error message was misleading.

  const fetchProducts = async () => {
    const response = await fetch(`/api/products?page=${currentPage}&search=${searchTerm}&category=${selectedCategory}`)
    const data = await response.json()
    setProducts(data.products)
    setTotalPages(data.totalPages)
    setCurrentPage(data.currentPage)
  }

  const handleSelectProduct = (productId: string) => {
    setSelectedProducts((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId],
    )
  }

  const handleSelectAll = () => {
    setSelectedProducts(
      selectedProducts.length === products.length ? [] : products.map((product) => product._id!.toString()),
    )
  }

  const handleBulkDelete = async () => {
    for (const id of selectedProducts) {
      await fetch(`/api/products?id=${id}`, { method: "DELETE" })
    }
    setSelectedProducts([])
    fetchProducts()
  }

  const handleAddProduct = async () => {
    await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProduct),
    })
    setIsAddProductOpen(false)
    setNewProduct({ name: "", price: 0, stock: 0, category: "", images: [], description: "" })
    fetchProducts()
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    const imageUrls = files.map((file) => URL.createObjectURL(file))
    setNewProduct((prev) => ({ ...prev, images: [...prev.images, ...imageUrls] }))
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Product Management</h1>
        <Dialog open={isAddProductOpen} onOpenChange={setIsAddProductOpen}>
          <DialogTrigger asChild>
            <Button>Add New Product</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Product</DialogTitle>
            </DialogHeader>
            <form
              onSubmit={(e) => {
                e.preventDefault()
                handleAddProduct()
              }}
              className=" w-full h-screen"
            >
              <div  >
                <Label htmlFor="product-name">Product Name</Label>
                <Input
                  id="product-name"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="product-price">Price</Label>
                <Input
                  id="product-price"
                  type="number"
                  step="0.01"
                  value={newProduct.price}
                  onChange={(e) => setNewProduct({ ...newProduct, price: Number.parseFloat(e.target.value) })}
                />
              </div>
              <div>
                <Label htmlFor="product-stock">Stock</Label>
                <Input
                  id="product-stock"
                  type="number"
                  value={newProduct.stock}
                  onChange={(e) => setNewProduct({ ...newProduct, stock: Number.parseInt(e.target.value) })}
                />
              </div>
              <div>
                <Label htmlFor="product-category">Category</Label>
                <Select onValueChange={(value) => setNewProduct({ ...newProduct, category: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Electronics">Electronics</SelectItem>
                    <SelectItem value="Clothing">Clothing</SelectItem>
                    <SelectItem value="Books">Books</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="product-images">Images</Label>
                <Input id="product-images" type="file" multiple onChange={handleImageUpload} />
                <div className="flex flex-wrap gap-2 mt-2">
                  {newProduct.images.map((image, index) => (
                    <img
                      key={index}
                      src={image || "/placeholder.svg"}
                      alt={`Product image ${index + 1}`}
                      className="w-10 h-10 object-cover"
                    />
                  ))}
                </div>
              </div>
              <div>
                <Label htmlFor="product-video">Video URL</Label>
                <Input
                  id="product-video"
                  type="url"
                  value={newProduct.video || ""}
                  onChange={(e) => setNewProduct({ ...newProduct, video: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="product-description">Description</Label>
                <Textarea
                  id="product-description"
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                />
              </div>
              <Button type="submit">Add Product</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <div className="flex space-x-4 mb-4">
        <Input
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Categories</SelectItem>
            <SelectItem value="Electronics">Electronics</SelectItem>
            <SelectItem value="Clothing">Clothing</SelectItem>
            <SelectItem value="Books">Books</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {selectedProducts.length > 0 && (
        <div className="mb-4">
          <Button variant="destructive" onClick={handleBulkDelete}>
            Delete Selected ({selectedProducts.length})
          </Button>
        </div>
      )}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">
              <Checkbox checked={selectedProducts.length === products.length} onCheckedChange={handleSelectAll} />
            </TableHead>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Images</TableHead>
            <TableHead>Video</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product._id?.toString()}>
              <TableCell>
                <Checkbox
                  checked={selectedProducts.includes(product._id!.toString())}
                  onCheckedChange={() => handleSelectProduct(product._id!.toString())}
                />
              </TableCell>
              <TableCell>{product._id?.toString()}</TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell>${product.price.toFixed(2)}</TableCell>
              <TableCell>{product.stock}</TableCell>
              <TableCell>{product.category}</TableCell>
              <TableCell>
                {product.images.length > 0 ? (
                  <img
                    src={product.images[0] || "/placeholder.svg"}
                    alt={product.name}
                    className="w-10 h-10 object-cover"
                  />
                ) : (
                  "No images"
                )}
              </TableCell>
              <TableCell>{product.video ? "Yes" : "No"}</TableCell>
              <TableCell>
                <Button variant="outline" size="sm" className="mr-2">
                  Edit
                </Button>
                <Button variant="destructive" size="sm">
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Pagination className="mt-4">
        <PaginationContent>
          <PaginationItem>
            {currentPage > 1 && (
              <PaginationPrevious
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              />
            )}
          </PaginationItem>
          {Array.from({ length: totalPages }, (_, i) => (
            <PaginationItem key={i}>
              <PaginationLink onClick={() => setCurrentPage(i + 1)} isActive={currentPage === i + 1}>
                {i + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext
              onClick={() => {
                if (currentPage < totalPages) {
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}

