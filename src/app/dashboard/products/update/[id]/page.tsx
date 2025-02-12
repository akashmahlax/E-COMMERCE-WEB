"use client";

import { useState, useEffect, useRef, ChangeEvent, FormEvent } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { X } from "lucide-react";

export default function EditProduct() {
  const router = useRouter();
  const params = useParams();
  // Get the product ID from the URL parameters; fallback to an empty string if undefined.
  const productId = (params?.id as string) || "";

  // Initialize all fields with default values (ensuring controlled inputs).
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [stock, setStock] = useState<string>("");
  const [category, setCategory] = useState<string>("");

  // For existing media (already saved on the server)
  const [existingImages, setExistingImages] = useState<string[]>([]);
  const [existingVideo, setExistingVideo] = useState<string | null>(null);

  // For new media (to be uploaded)
  const [newImages, setNewImages] = useState<File[]>([]);
  const [newImagePreviews, setNewImagePreviews] = useState<string[]>([]);
  const [newVideo, setNewVideo] = useState<File | null>(null);
  const [newVideoPreview, setNewVideoPreview] = useState<string | null>(null);

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  // Refs for hidden file inputs.
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  // When the component mounts, fetch the product data and update state.
  useEffect(() => {
    async function fetchProduct() {
      try {
        if (!productId) return;
        // Fetch product data by passing the product ID in the query string.
        const res = await fetch(`/api/products?id=${productId}`);
        if (!res.ok) {
          throw new Error("Failed to fetch product");
        }
        const product = await res.json();

        // Populate state with fetched product data.
        setName(product.name );
        setDescription(product.description || "");
        setPrice(product.price !== undefined ? product.price.toString() : "");
        setStock(product.stock !== undefined ? product.stock.toString() : "");
        setCategory(product.category || "");
        setExistingImages(product.imageUrls || []);
        setExistingVideo(product.videoUrl || null);
      } catch (err: any) {
        setError(err.message || "Error fetching product");
      }
    }
    fetchProduct();
  }, [productId]);

  // Handle new image uploads.
  const handleNewImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files) as File[];
      setNewImages((prev) => [...prev, ...files]);
      const previews = files.map((file) => URL.createObjectURL(file));
      setNewImagePreviews((prev) => [...prev, ...previews]);
    }
  };

  const removeNewImage = (index: number) => {
    setNewImages((prev) => prev.filter((_, i) => i !== index));
    setNewImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  // Handle new video upload.
  const handleNewVideoUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setNewVideo(file);
      setNewVideoPreview(URL.createObjectURL(file));
    }
  };

  const removeNewVideo = () => {
    setNewVideo(null);
    setNewVideoPreview(null);
  };

  // Submit the update.
  const handleUpdateProduct = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    // Build the form data.
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("stock", stock);
    formData.append("category", category);

    // Append any new images (if selected) using dynamic keys.
    newImages.forEach((file, index) => {
      formData.append(`image${index}`, file);
    });

    // Append new video if provided.
    if (newVideo) {
      formData.append("video", newVideo);
    }

    try {
      // Send a PUT request to update the product (ID is passed via query parameter).
      const res = await fetch(`/api/products?id=${productId}`, {
        method: "PUT",
        body: formData,
      });
      if (!res.ok) {
        throw new Error("Failed to update product");
      }
      setSuccess("Product updated successfully!");
      // Optionally, navigate back to the admin dashboard after a short delay.
      setTimeout(() => router.push("/admin"), 1500);
    } catch (err: any) {
      setError(err.message || "Error updating product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Edit Product</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-500 mb-4">{success}</p>}
      <form onSubmit={handleUpdateProduct} className="space-y-4">
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
          <Input
            id="product-category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>

        {/* Existing Images */}
        <div>
          <Label>Existing Images</Label>
          <div className="flex flex-wrap gap-2 mt-2">
            {existingImages.length > 0 ? (
              existingImages.map((url, index) => (
                <div key={index} className="relative">
                  <Image
                    src={url}
                    alt={`Image ${index + 1}`}
                    width={100}
                    height={100}
                    className="object-cover rounded"
                  />
                </div>
              ))
            ) : (
              <p>No existing images</p>
            )}
          </div>
        </div>

        {/* New Images Upload */}
        <div>
          <Label>New Images (if updating)</Label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleNewImageUpload}
            ref={fileInputRef}
            className="hidden"
          />
          <Button type="button" onClick={() => fileInputRef.current?.click()}>
            Select New Images
          </Button>
          <div className="mt-2 flex flex-wrap gap-2">
            {newImagePreviews.map((preview, index) => (
              <div key={index} className="relative">
                <Image
                  src={preview}
                  alt={`New Preview ${index + 1}`}
                  width={100}
                  height={100}
                  className="object-cover rounded"
                />
                <button
                  type="button"
                  onClick={() => removeNewImage(index)}
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Existing Video */}
        <div>
          <Label>Existing Video</Label>
          {existingVideo ? (
            <div className="mt-2">
              <video src={existingVideo} controls className="w-full max-w-xs" />
            </div>
          ) : (
            <p>No existing video</p>
          )}
        </div>

        {/* New Video Upload */}
        <div>
          <Label>New Video (if updating)</Label>
          <input
            type="file"
            accept="video/*"
            onChange={handleNewVideoUpload}
            ref={videoInputRef}
            className="hidden"
          />
          <Button type="button" onClick={() => videoInputRef.current?.click()}>
            Select New Video
          </Button>
          {newVideoPreview && (
            <div className="relative mt-2">
              <video src={newVideoPreview} controls className="w-full max-w-xs" />
              <button
                type="button"
                onClick={removeNewVideo}
                className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
              >
                <X size={16} />
              </button>
            </div>
          )}
        </div>

        <Button type="submit" disabled={loading} className="w-full">
          {loading ? "Updating Product..." : "Update Product"}
        </Button>
      </form>
    </div>
  );
}
