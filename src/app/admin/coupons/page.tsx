"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Coupon {
  id: string
  code: string
  discountType: "Percentage" | "Fixed"
  discountValue: number
  expiryDate: string
}

export default function AdminCoupons() {
  const [coupons, setCoupons] = useState<Coupon[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddCouponOpen, setIsAddCouponOpen] = useState(false)
  const [newCoupon, setNewCoupon] = useState<Omit<Coupon, "id">>({
    code: "",
    discountType: "Percentage",
    discountValue: 0,
    expiryDate: "",
  })

  useEffect(() => {
    fetchCoupons()
  }, [])

  const fetchCoupons = async () => {
    try {
      const response = await fetch("/api/coupons")
      if (!response.ok) throw new Error("Failed to fetch coupons")
      const data = await response.json()
      setCoupons(data)
    } catch (error) {
      console.error("Error fetching coupons:", error)
    }
  }

  const filteredCoupons = coupons.filter((coupon) => coupon.code.toLowerCase().includes(searchTerm.toLowerCase()))

  const handleAddCoupon = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch("/api/coupons", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCoupon),
      })
      if (!response.ok) throw new Error("Failed to add coupon")
      setIsAddCouponOpen(false)
      setNewCoupon({ code: "", discountType: "Percentage", discountValue: 0, expiryDate: "" })
      fetchCoupons()
    } catch (error) {
      console.error("Error adding coupon:", error)
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Coupon Management</h1>
        <Dialog open={isAddCouponOpen} onOpenChange={setIsAddCouponOpen}>
          <DialogTrigger asChild>
            <Button>Add New Coupon</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Coupon</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAddCoupon} className="space-y-4">
              <div>
                <Label htmlFor="coupon-code">Coupon Code</Label>
                <Input
                  id="coupon-code"
                  value={newCoupon.code}
                  onChange={(e) => setNewCoupon({ ...newCoupon, code: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="discount-type">Discount Type</Label>
                <Select
                  value={newCoupon.discountType}
                  onValueChange={(value: "Percentage" | "Fixed") => setNewCoupon({ ...newCoupon, discountType: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select discount type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Percentage">Percentage</SelectItem>
                    <SelectItem value="Fixed">Fixed Amount</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="discount-value">Discount Value</Label>
                <Input
                  id="discount-value"
                  type="number"
                  value={newCoupon.discountValue}
                  onChange={(e) => setNewCoupon({ ...newCoupon, discountValue: Number(e.target.value) })}
                />
              </div>
              <div>
                <Label htmlFor="expiry-date">Expiry Date</Label>
                <Input
                  id="expiry-date"
                  type="date"
                  value={newCoupon.expiryDate}
                  onChange={(e) => setNewCoupon({ ...newCoupon, expiryDate: e.target.value })}
                />
              </div>
              <Button type="submit">Add Coupon</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <Input
        placeholder="Search coupons..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="max-w-sm mb-4"
      />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Code</TableHead>
            <TableHead>Discount Type</TableHead>
            <TableHead>Discount Value</TableHead>
            <TableHead>Expiry Date</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredCoupons.map((coupon) => (
            <TableRow key={coupon.id}>
              <TableCell>{coupon.id}</TableCell>
              <TableCell>{coupon.code}</TableCell>
              <TableCell>{coupon.discountType}</TableCell>
              <TableCell>
                {coupon.discountType === "Percentage" ? `${coupon.discountValue}%` : `$${coupon.discountValue}`}
              </TableCell>
              <TableCell>{coupon.expiryDate}</TableCell>
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
    </div>
  )
}

