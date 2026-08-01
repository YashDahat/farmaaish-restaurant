"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { TestimonialDto } from "@/types/testimonial";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

interface TestimonialsTableProps {
  testimonials: TestimonialDto[];
  onEdit: (testimonial: TestimonialDto) => void;
  onDelete: (id: string) => void;
}

export function TestimonialsTable({
  testimonials,
  onEdit,
  onDelete,
}: TestimonialsTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(testimonials.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentTestimonials = testimonials.slice(startIndex, endIndex);

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table data-testid="testimonials-table">
          <TableHeader>
            <TableRow>
              <TableHead>Customer Name</TableHead>
              <TableHead>Review Text</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Display Order</TableHead>
              <TableHead>Visible</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentTestimonials.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center">
                  No testimonials found.
                </TableCell>
              </TableRow>
            ) : (
              currentTestimonials.map((testimonial) => (
                <TableRow key={testimonial.id} data-testid="testimonial-card">
                  <TableCell className="font-medium">
                    {testimonial.customerName}
                  </TableCell>
                  <TableCell className="max-w-xs truncate">
                    {testimonial.reviewText}
                  </TableCell>
                  <TableCell>{testimonial.rating}</TableCell>
                  <TableCell>{testimonial.displayOrder}</TableCell>
                  <TableCell>
                    <Checkbox checked={testimonial.isVisible ?? false} disabled />
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => onEdit(testimonial)}
                          data-testid="edit-testimonial-button"
                        >
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() =>
                            testimonial.id && onDelete(testimonial.id)
                          }
                          data-testid="delete-testimonial-button"
                        >
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          data-testid="previous-page-button"
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          data-testid="next-page-button"
        >
          Next
        </Button>
      </div>
    </div>
  );
}