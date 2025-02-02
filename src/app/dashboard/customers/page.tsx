"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"

interface Customer {
  id: number
  name: string
  email: string
  orders: number
  totalSpent: number
  segment: string
}

export default function AdminCustomers() {
  const [customers, setCustomers] = useState<Customer[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSegment, setSelectedSegment] = useState("")
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null)

  useEffect(() => {
    fetchCustomers()
  }, [selectedSegment, searchTerm])

  const fetchCustomers = async () => {
    const response = await fetch(`/api/customers?segment=${selectedSegment}&search=${searchTerm}`)
    const data = await response.json()
    setCustomers(data)
  }

  const handleExportCustomers = () => {
    // Implement export logic here
    console.log("Exporting customers...")
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Customer Management</h1>
        <Button onClick={handleExportCustomers}>Export Customers</Button>
      </div>
      <div className="flex space-x-4 mb-4">
        <Input
          placeholder="Search customers..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <Select value={selectedSegment} onValueChange={setSelectedSegment}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="All Segments" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Segments</SelectItem>
            <SelectItem value="New">New</SelectItem>
            <SelectItem value="Regular">Regular</SelectItem>
            <SelectItem value="VIP">VIP</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Orders</TableHead>
            <TableHead>Total Spent</TableHead>
            <TableHead>Segment</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {customers.map((customer) => (
            <TableRow key={customer.id}>
              <TableCell>{customer.id}</TableCell>
              <TableCell>{customer.name}</TableCell>
              <TableCell>{customer.email}</TableCell>
              <TableCell>{customer.orders}</TableCell>
              <TableCell>${customer.totalSpent.toFixed(2)}</TableCell>
              <TableCell>{customer.segment}</TableCell>
              <TableCell>
                <Button variant="outline" size="sm" onClick={() => setSelectedCustomer(customer)}>
                  View Details
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Dialog open={!!selectedCustomer} onOpenChange={() => setSelectedCustomer(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Customer Details</DialogTitle>
          </DialogHeader>
          {selectedCustomer && (
            <div>
              <p>
                <strong>ID:</strong> {selectedCustomer.id}
              </p>
              <p>
                <strong>Name:</strong> {selectedCustomer.name}
              </p>
              <p>
                <strong>Email:</strong> {selectedCustomer.email}
              </p>
              <p>
                <strong>Orders:</strong> {selectedCustomer.orders}
              </p>
              <p>
                <strong>Total Spent:</strong> ${selectedCustomer.totalSpent.toFixed(2)}
              </p>
              <p>
                <strong>Segment:</strong> {selectedCustomer.segment}
              </p>
              {/* Add more customer details here */}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

