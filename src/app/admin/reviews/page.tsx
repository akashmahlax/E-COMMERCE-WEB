import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// This would typically come from a database
const reviews = [
  { id: 1, product: "Product 1", customer: "John Doe", rating: 5, comment: "Great product!", date: "2023-06-01" },
  { id: 2, product: "Product 2", customer: "Jane Smith", rating: 4, comment: "Good quality", date: "2023-06-02" },
  { id: 3, product: "Product 3", customer: "Bob Johnson", rating: 3, comment: "Average", date: "2023-06-03" },
]

export default function AdminReviews() {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Review Management</h1>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Product</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Rating</TableHead>
            <TableHead>Comment</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {reviews.map((review) => (
            <TableRow key={review.id}>
              <TableCell>{review.id}</TableCell>
              <TableCell>{review.product}</TableCell>
              <TableCell>{review.customer}</TableCell>
              <TableCell>{review.rating}</TableCell>
              <TableCell>{review.comment}</TableCell>
              <TableCell>{review.date}</TableCell>
              <TableCell>
                <Button variant="outline" size="sm" className="mr-2">
                  Approve
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

