"use client";

import { useState, useEffect, useRef, ChangeEvent } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { X } from "lucide-react";

export default function AdminProducts() {
  const router = useRouter();
  // --- Listing states ---
  const [products, setProducts] = useState<any[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);

  // --- "Add Product" form states ---
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState("");
  const [images, setImages] = useState<File[]>([]); // Array of File objects
  const [imagePreviews, setImagePreviews] = useState<string[]>([]); // Array of preview URLs
  const [video, setVideo] = useState<File | null>(null); // A File or null
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // --- Refs for hidden file inputs ---
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  // --- Fetch Products for the Dashboard ---
  useEffect(() => {
    fetchProducts();
  }, [currentPage, searchTerm, selectedCategory]);

  const fetchProducts = async () => {
    try {
      const response = await fetch(
        `/api/products?page=${currentPage}&search=${searchTerm}&category=${selectedCategory}`
      );
      const data = await response.json();
      // Adjust the response as needed. Here we assume data has products, totalPages, currentPage.
      setProducts(data.products || data);
      setTotalPages(data.totalPages || 1);
      setCurrentPage(data.currentPage || 1);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  // --- Delete Handlers ---
  // Delete a single product
  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/products/n?id=${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        throw new Error("Failed to delete product");
      }
      // Remove deleted product from state.
      setProducts((prev) => prev.filter((product) => product._id !== id));
    } catch (err) {
      console.error("Error deleting product:", err);
      setError("Error deleting product");
    }
  };

  // Bulk deletion handler
  const handleBulkDelete = async () => {
    try {
      for (const id of selectedProducts) {
        await fetch(`/api/products/n?id=${id}`, { method: "DELETE" });
      }
      setSelectedProducts([]);
      fetchProducts();
    } catch (err) {
      console.error("Bulk delete error:", err);
      setError("Error deleting selected products");
    }
  };

  // --- Update Handler ---
  // For update, we simply navigate to an update page.
  const handleEdit = (id: string) => {
    router.push(`/dashboard/products/update/${id}`);
  };

  // --- Handlers for file uploads in the form ---
  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newImages = Array.from(e.target.files) as File[];
      setImages((prevImages) => [...prevImages, ...newImages]);

      const newPreviews = newImages.map((file) => URL.createObjectURL(file));
      setImagePreviews((prevPreviews) => [...prevPreviews, ...newPreviews]);
    }
  };
  const handleVideoUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setVideo(file);
      setVideoPreview(URL.createObjectURL(file));
    }
  };

  const removeImage = (index: number) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    setImagePreviews((prevPreviews) =>
      prevPreviews.filter((_, i) => i !== index)
    );
  };

  const removeVideo = () => {
    setVideo(null);
    setVideoPreview(null);
  };

  // --- Submit Handler for the "Add Product" Form ---
  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    // Validate required fields
    if (!name || !description || !price || images.length === 0) {
      setError("Name, description, price, and at least one image are required");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("stock", stock);
    formData.append("category", category);

    // Append images with dynamic keys (image0, image1, etc.)
    images.forEach((image, index) => {
      formData.append(`image${index}`, image);
    });
    if (video) {
      formData.append("video", video);
    }

    try {
      // Adjust the endpoint as needed (this example uses /api/products/new)
      const res = await fetch("/api/products/n", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Failed to create product");
      }

      setSuccess(true);
      // Reset form fields
      setName("");
      setDescription("");
      setPrice("");
      setStock("");
      setCategory("");
      setImages([]);
      setImagePreviews([]);
      setVideo(null);
      setVideoPreview(null);
      setIsAddProductOpen(false);
      fetchProducts();
    } catch (err) {
      console.error(err);
      setError("An error occurred while creating the product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      {/* --- Dashboard Header & "Add Product" Button --- */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Product Management</h1>
        <div className="flex gap-2">
          <Button variant="secondary" onClick={() => router.push("/dashboard/orders")}>
            View Orders
          </Button>
          <Button variant="secondary" onClick={() => router.push("/dashboard/customers")}>
            View Customers
          </Button>
          <Button variant="secondary" onClick={() => router.push("/admin/update/new")}>
            Add Product From Page
          </Button>
        </div>
        {/* --- Add Product Dialog --- */}
        <Dialog open={isAddProductOpen} onOpenChange={setIsAddProductOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setIsAddProductOpen(true)}>Add New Product</Button>
          </DialogTrigger>
          <DialogContent className="w-full max-w-lg mx-auto overflow-y-auto max-h-[90vh]">
            <DialogHeader>
              <DialogTitle>Add New Product</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAddProduct} className="space-y-4">
              {error && <p className="text-red-500">{error}</p>}
              {success && <p className="text-green-500">Product created successfully!</p>}
              <div>
                <Label htmlFor="product-name">Product Name</Label>
                <Input
                  id="product-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="product-description">Description</Label>
                <Textarea
                  id="product-description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="product-price">Price</Label>
                <Input
                  id="product-price"
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="product-stock">Stock</Label>
                <Input
                  id="product-stock"
                  type="number"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="product-category">Category</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger className="w-[180px]">
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
                <Input
                  type="file"
                  id="product-images"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  ref={fileInputRef}
                  className="hidden"
                />
                <Button type="button" onClick={() => fileInputRef.current?.click()}>
                  Select Images
                </Button>
                <div className="mt-2 flex flex-wrap gap-2">
                  {imagePreviews.map((preview, index) => (
                    <div key={index} className="relative">
                      <Image
                        src={preview || "/placeholder.svg"}
                        alt={`Preview ${index + 1}`}
                        width={100}
                        height={100}
                        className="object-cover rounded"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <Label htmlFor="product-video">Video</Label>
                <Input
                  type="file"
                  id="product-video"
                  accept="video/*"
                  onChange={handleVideoUpload}
                  ref={videoInputRef}
                />
                {videoPreview && (
                  <div className="mt-2 relative">
                    <video src={videoPreview} controls className="w-full max-w-xs" />
                    <button
                      type="button"
                      onClick={removeVideo}
                      className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                    >
                      <X size={16} />
                    </button>
                  </div>
                )}
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Adding Product..." : "Add Product"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* --- Search and Filter Controls --- */}
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

      {/* --- Bulk Delete Button --- */}
      {selectedProducts.length > 0 && (
        <div className="mb-4">
          <Button variant="destructive" onClick={handleBulkDelete}>
            Delete Selected ({selectedProducts.length})
          </Button>
        </div>
      )}

      {/* --- Products Table --- */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">
              <Checkbox
                checked={selectedProducts.length === products.length}
                onCheckedChange={handleSelectAll}
              />
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
            <TableRow key={product._id.toString()}>
              <TableCell>
                <Checkbox
                  checked={selectedProducts.includes(product._id.toString())}
                  onCheckedChange={() => handleSelectProduct(product._id.toString())}
                />
              </TableCell>
              <TableCell>{product._id.toString()}</TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell>${parseFloat(product.price).toFixed(2)}</TableCell>
              <TableCell>{product.stock}</TableCell>
              <TableCell>{product.category}</TableCell>
              <TableCell>
                {product.imageUrls && product.imageUrls.length > 0 ? (
                  <img
                    src={product.imageUrls[0] || "/placeholder.svg"}
                    alt={product.name}
                    className="w-10 h-10 object-cover"
                  />
                ) : (
                  "No images"
                )}
              </TableCell>
              <TableCell>{product.videoUrl ? "Yes" : "No"}</TableCell>
              <TableCell>
                <Button
                  variant="outline"
                  size="sm"
                  className="mr-2"
                  onClick={() => handleEdit(product._id.toString())}
                >
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(product._id.toString())}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* --- Pagination --- */}
      <Pagination className="mt-4">
        <PaginationContent>
          <PaginationItem>
            {currentPage > 1 && (
              <PaginationPrevious
                onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
              />
            )}
          </PaginationItem>
          {Array.from({ length: totalPages }, (_, i) => (
            <PaginationItem key={i}>
              <PaginationLink
                onClick={() => setCurrentPage(i + 1)}
                isActive={currentPage === i + 1}
              >
                {i + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext
              onClick={() => {
                if (currentPage < totalPages) {
                  setCurrentPage(Math.min(currentPage + 1, totalPages));
                }
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
  
  // --- Helper Handlers for Selection ---
  function handleSelectProduct(productId: string) {
    setSelectedProducts((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  }
  function handleSelectAll() {
    setSelectedProducts(
      selectedProducts.length === products.length
        ? []
        : products.map((product) => product._id.toString())
    );
  }
}
