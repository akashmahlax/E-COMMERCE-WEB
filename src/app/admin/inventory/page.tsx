"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

interface InventoryItem {
  id: string
  product: string
  sku: string
  quantity: number
  lowStockThreshold: number
}

export default function AdminInventory() {
  const [inventory, setInventory] = useState<InventoryItem[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [isUpdateStockOpen, setIsUpdateStockOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null)
  const [quantityToUpdate, setQuantityToUpdate] = useState(0)

  useEffect(() => {
    fetchInventory()
  }, [])

  const fetchInventory = async () => {
    try {
      const response = await fetch("/api/inventory")
      if (!response.ok) throw new Error("Failed to fetch inventory")
      const data = await response.json()
      setInventory(data)
    } catch (error) {
      console.error("Error fetching inventory:", error)
    }
  }

  const filteredInventory = inventory.filter(
    (item) =>
      item.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleUpdateStock = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedItem) return

    try {
      const response = await fetch(`/api/inventory/${selectedItem.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity: selectedItem.quantity + quantityToUpdate }),
      })
      if (!response.ok) throw new Error("Failed to update stock")
      setIsUpdateStockOpen(false)
      setSelectedItem(null)
      setQuantityToUpdate(0)
      fetchInventory()
    } catch (error) {
      console.error("Error updating stock:", error)
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Inventory Management</h1>
        <Dialog open={isUpdateStockOpen} onOpenChange={setIsUpdateStockOpen}>
          <DialogTrigger asChild>
            <Button>Update Stock</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Update Stock</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleUpdateStock} className="space-y-4">
              <div>
                <Label htmlFor="product-sku">Product SKU</Label>
                <Input id="product-sku" value={selectedItem?.sku || ""} disabled />
              </div>
              <div>
                <Label htmlFor="quantity">Quantity to Add/Remove</Label>
                <Input
                  id="quantity"
                  type="number"
                  value={quantityToUpdate}
                  onChange={(e) => setQuantityToUpdate(Number(e.target.value))}
                />
              </div>
              <Button type="submit">Update Stock</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <Input
        placeholder="Search by product name or SKU..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="max-w-sm mb-4"
      />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Product</TableHead>
            <TableHead>SKU</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Low Stock Threshold</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredInventory.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.id}</TableCell>
              <TableCell>{item.product}</TableCell>
              <TableCell>{item.sku}</TableCell>
              <TableCell>{item.quantity}</TableCell>
              <TableCell>{item.lowStockThreshold}</TableCell>
              <TableCell>
                {item.quantity <= item.lowStockThreshold ? (
                  <span className="text-red-500 font-semibold">Low Stock</span>
                ) : (
                  <span className="text-green-500 font-semibold">In Stock</span>
                )}
              </TableCell>
              <TableCell>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSelectedItem(item)
                    setIsUpdateStockOpen(true)
                  }}
                >
                  Update Stock
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

