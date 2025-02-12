"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
// ProductUpload component (from your first code) with full product upload functionality.
export default function ProductUpload  () {
    const router = useRouter();
    const [productData, setProductData] = useState({
      title: '',
      description: '',
      price: '',
      stock: '',
      brand: '',
      material: '',
      sku: '',
      weight: '',
      dimensions: '',
      discount: '',
      sizes: [], // each item: { size: string, quantity: string }
      colors: [],
      images: [],
      featured: false,
      categories: [],
      tags: [],
    });
  
    // Basic input handler.
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setProductData((prev) => ({ ...prev, [name]: value }));
    };
  
    // File upload handler for images.
    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files) {
        const files = Array.from(event.target.files);
        setProductData((prev) => ({
          ...prev,
          images: [...prev.images, ...files],
        }));
      }
    };
  
    // Remove image preview.
    const handleRemoveImage = (index: number) => {
      setProductData((prev) => ({
        ...prev,
        images: prev.images.filter((_, i) => i !== index),
      }));
    };
  
    // Handlers for dynamic fields:
    // Categories
    const handleAddCategory = () => {
      setProductData((prev) => ({ ...prev, categories: [...prev.categories, ''] }));
    };
    const handleCategoryChange = (index: number, value: string) => {
      const newCategories = [...productData.categories];
      newCategories[index] = value;
      setProductData((prev) => ({ ...prev, categories: newCategories }));
    };
    const handleRemoveCategory = (index: number) => {
      setProductData((prev) => ({
        ...prev,
        categories: prev.categories.filter((_, i) => i !== index),
      }));
    };
  
    // Sizes with quantity
    const handleAddSize = () => {
      setProductData((prev) => ({
        ...prev,
        sizes: [...prev.sizes, { size: '', quantity: '' }],
      }));
    };
    const handleSizeChange = (index: number, field: string, value: string) => {
      const newSizes = [...productData.sizes];
      newSizes[index] = { ...newSizes[index], [field]: value };
      setProductData((prev) => ({ ...prev, sizes: newSizes }));
    };
    const handleRemoveSize = (index: number) => {
      setProductData((prev) => ({
        ...prev,
        sizes: prev.sizes.filter((_, i) => i !== index),
      }));
    };
  
    // Tags
    const handleAddTag = () => {
      setProductData((prev) => ({ ...prev, tags: [...prev.tags, ''] }));
    };
    const handleTagChange = (index: number, value: string) => {
      const newTags = [...productData.tags];
      newTags[index] = value;
      setProductData((prev) => ({ ...prev, tags: newTags }));
    };
    const handleRemoveTag = (index: number) => {
      setProductData((prev) => ({
        ...prev,
        tags: prev.tags.filter((_, i) => i !== index),
      }));
    };
  
    // Colors
    const handleAddColor = () => {
      setProductData((prev) => ({ ...prev, colors: [...prev.colors, ''] }));
    };
    const handleColorChange = (index: number, value: string) => {
      const newColors = [...productData.colors];
      newColors[index] = value;
      setProductData((prev) => ({ ...prev, colors: newColors }));
    };
    const handleRemoveColor = (index: number) => {
      setProductData((prev) => ({
        ...prev,
        colors: prev.colors.filter((_, i) => i !== index),
      }));
    };
  
    // Submit form data to the API.
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      const formData = new FormData();
      formData.append("name", productData.title);
      formData.append("description", productData.description);
      formData.append("price", productData.price);
      formData.append("stock", productData.stock);
      formData.append("brand", productData.brand);
      formData.append("material", productData.material);
      formData.append("sku", productData.sku);
      formData.append("weight", productData.weight);
      formData.append("dimensions", productData.dimensions);
      formData.append("discount", productData.discount);
      formData.append("featured", productData.featured.toString());
      formData.append("sizes", JSON.stringify(productData.sizes));
      formData.append("colors", JSON.stringify(productData.colors));
      formData.append("categories", JSON.stringify(productData.categories));
      formData.append("tags", JSON.stringify(productData.tags));
  
      // Append all selected images.
      productData.images.forEach((file) => formData.append("image", file));
  
      try {
        const response = await fetch('/api/products', {
          method: 'POST',
          body: formData,
        });
        const result = await response.json();
        if (response.ok) {
          alert('Product created successfully');
          // Reset the form if needed.
          setProductData({
            title: '',
            description: '',
            price: '',
            stock: '',
            brand: '',
            material: '',
            sku: '',
            weight: '',
            dimensions: '',
            discount: '',
            sizes: [],
            colors: [],
            images: [],
            featured: false,
            categories: [],
            tags: [],
          });
        } else {
          alert(result.message || 'Error creating product');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Error creating product');
      }
    };
  
    return (
      <div className="p-6 max-w-4xl mx-auto border border-gray-200 rounded-lg shadow-md">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold mb-8 text-center"
        >
          Upload New Product
        </motion.h1>
        <div>
          <Button variant="secondary" onClick={() => router.push("/dashboard/orders")}>
            View Orders
          </Button>
          <Button variant="secondary" onClick={() => router.push("/dashboard/customers")}>
            View Customers
          </Button>
          <Button variant="secondary" onClick={() => router.push("/dashboard/products")}>
          Manage Products
          </Button>
        </div>
        <Card>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic product info */}
              <Input
                name="title"
                value={productData.title}
                onChange={handleInputChange}
                placeholder="Product Title"
                required
                className="w-full"
              />
              <Textarea
                name="description"
                value={productData.description}
                onChange={handleInputChange}
                placeholder="Product Description"
                required
                className="w-full"
              />
              <div className="flex gap-4">
                <Input
                  name="price"
                  type="number"
                  value={productData.price}
                  onChange={handleInputChange}
                  placeholder="Price (INR)"
                  required
                />
                <Input
                  name="stock"
                  type="number"
                  value={productData.stock}
                  onChange={handleInputChange}
                  placeholder="Stock Quantity"
                  required
                />
              </div>
              <Input
                name="brand"
                value={productData.brand}
                onChange={handleInputChange}
                placeholder="Brand Name"
                className="w-full"
              />
              <Input
                name="material"
                value={productData.material}
                onChange={handleInputChange}
                placeholder="Material"
                className="w-full"
              />
              <Input
                name="sku"
                value={productData.sku}
                onChange={handleInputChange}
                placeholder="SKU (Stock Keeping Unit)"
                className="w-full"
              />
              <div className="flex gap-4">
                <Input
                  name="weight"
                  value={productData.weight}
                  onChange={handleInputChange}
                  placeholder="Weight (e.g., 500g)"
                />
                <Input
                  name="dimensions"
                  value={productData.dimensions}
                  onChange={handleInputChange}
                  placeholder="Dimensions (e.g., 10x20x15 cm)"
                />
                <Input
                  name="discount"
                  type="number"
                  value={productData.discount}
                  onChange={handleInputChange}
                  placeholder="Discount (%)"
                />
              </div>
  
              {/* Image Upload */}
              <div>
                <label className="block font-medium mb-2">Product Images</label>
                <Input type="file" multiple onChange={handleFileUpload} />
                <div className="mt-4 flex gap-2 flex-wrap">
                  {productData.images.map((file, index) => (
                    <div key={index} className="relative">
                      <img
                        src={URL.createObjectURL(file)}
                        alt="Product Preview"
                        className="h-32 w-32 object-cover rounded-lg shadow-md"
                      />
                      <button
                        type="button"
                        className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full"
                        onClick={() => handleRemoveImage(index)}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
  
              {/* Featured Switch */}
              <div className="flex justify-between items-center">
                <label className="flex items-center space-x-2">
                  <Switch
                    checked={productData.featured}
                    onCheckedChange={(checked) =>
                      setProductData((prev) => ({ ...prev, featured: checked }))
                    }
                  />
                  <span>Featured Product</span>
                </label>
              </div>
  
              {/* Sizes and Quantity */}
              <div>
                <label className="block font-medium mb-2">Sizes and Quantity</label>
                {productData.sizes.map((sizeObj, index) => (
                  <div key={index} className="flex items-center gap-2 mb-2">
                    <Input
                      value={sizeObj.size}
                      onChange={(e) => handleSizeChange(index, 'size', e.target.value)}
                      placeholder="Size (e.g., S, M, L, XL)"
                    />
                    <Input
                      type="number"
                      value={sizeObj.quantity}
                      onChange={(e) => handleSizeChange(index, 'quantity', e.target.value)}
                      placeholder="Quantity Available"
                    />
                    <Button
                      type="button"
                      className="bg-red-500 text-white hover:bg-red-600"
                      onClick={() => handleRemoveSize(index)}
                    >
                      Remove
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  className="bg-blue-500 text-white hover:bg-blue-600 mt-2"
                  onClick={handleAddSize}
                >
                  <Plus size={16} /> Add Size
                </Button>
              </div>
  
              {/* Colors */}
              <div>
                <label className="block font-medium mb-2">Colors</label>
                {productData.colors.map((color, index) => (
                  <div key={index} className="flex items-center gap-2 mb-2">
                    <Input
                      value={color}
                      onChange={(e) => handleColorChange(index, e.target.value)}
                      placeholder="Color (e.g., Red, Blue)"
                    />
                    <Button
                      type="button"
                      className="bg-red-500 text-white hover:bg-red-600"
                      onClick={() => handleRemoveColor(index)}
                    >
                      Remove
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  className="bg-blue-500 text-white hover:bg-blue-600 mt-2"
                  onClick={handleAddColor}
                >
                  <Plus size={16} /> Add Color
                </Button>
              </div>
  
              {/* Categories */}
              <div>
                <label className="block font-medium mb-2">Categories</label>
                {productData.categories.map((category, index) => (
                  <div key={index} className="flex items-center gap-2 mb-2">
                    <Input
                      value={category}
                      onChange={(e) => handleCategoryChange(index, e.target.value)}
                      placeholder="Category Name"
                    />
                    <Button
                      type="button"
                      className="bg-red-500 text-white hover:bg-red-600"
                      onClick={() => handleRemoveCategory(index)}
                    >
                      Remove
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  className="bg-blue-500 text-white hover:bg-blue-600 mt-2"
                  onClick={handleAddCategory}
                >
                  <Plus size={16} /> Add Category
                </Button>
              </div>
  
              {/* Tags */}
              <div>
                <label className="block font-medium mb-2">Tags</label>
                {productData.tags.map((tag, index) => (
                  <div key={index} className="flex items-center gap-2 mb-2">
                    <Input
                      value={tag}
                      onChange={(e) => handleTagChange(index, e.target.value)}
                      placeholder="Tag (e.g., Trending, New Arrival)"
                    />
                    <Button
                      type="button"
                      className="bg-red-500 text-white hover:bg-red-600"
                      onClick={() => handleRemoveTag(index)}
                    >
                      Remove
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  className="bg-blue-500 text-white hover:bg-blue-600 mt-2"
                  onClick={handleAddTag}
                >
                  <Plus size={16} /> Add Tag
                </Button>
              </div>
  
              <Button type="submit" className="w-full bg-green-500 text-white hover:bg-green-600">
                Submit Product
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  };