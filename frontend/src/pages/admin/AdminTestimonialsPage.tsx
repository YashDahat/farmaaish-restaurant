import { deleteTestimonial } from '@/services/apiService';
"use client";

import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { TestimonialDto } from "@/types/testimonial";
import { TestimonialsTable } from "@/components/admin/testimonials/TestimonialsTable";
import { TestimonialForm } from "@/components/admin/testimonials/TestimonialForm";
import { DeleteTestimonialDialog } from "@/components/admin/testimonials/DeleteTestimonialDialog";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAllTestimonials, createTestimonial, updateTestimonial } from '@/services/testimonialService';
import { toast } from 'sonner';
import { Skeleton } from "@/components/ui/skeleton";

export default function AdminTestimonialsPage() {
  const queryClient = useQueryClient();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedTestimonial, setSelectedTestimonial] = useState<TestimonialDto | null>(null);

  const { data: testimonials, isLoading, isError } = useQuery<TestimonialDto[], Error>({
    queryKey: ['adminTestimonials'],
    queryFn: getAllTestimonials,
  });

  const createTestimonialMutation = useMutation({
    mutationFn: createTestimonial,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminTestimonials'] });
      toast.success("Testimonial created successfully.");
      setIsFormOpen(false);
      setSelectedTestimonial(null);
    },
    onError: (error) => {
      toast.error(`Failed to create testimonial: ${error.message}`);
    },
  });

  const updateTestimonialMutation = useMutation({
    mutationFn: ({ id, request }: { id: string, request: TestimonialDto }) => updateTestimonial(id, request),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminTestimonials'] });
      toast.success("Testimonial updated successfully.");
      setIsFormOpen(false);
      setSelectedTestimonial(null);
    },
    onError: (error) => {
      toast.error(`Failed to update testimonial: ${error.message}`);
    },
  });

  const deleteTestimonialMutation = useMutation({
    mutationFn: deleteTestimonial,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminTestimonials'] });
      toast.success("Testimonial deleted successfully.");
      setIsDeleteDialogOpen(false);
      setSelectedTestimonial(null);
    },
    onError: (error) => {
      toast.error(`Failed to delete testimonial: ${error.message}`);
    },
  });

  const handleEditTestimonial = (testimonial: TestimonialDto) => {
    setSelectedTestimonial(testimonial);
    setIsFormOpen(true);
  };

  const handleDeleteTestimonial = (id: string) => {
    setSelectedTestimonial(testimonials?.find((t) => t.id === id) || null);
    setIsDeleteDialogOpen(true);
  };

  const handleFormSubmit = (data: TestimonialDto) => {
    if (selectedTestimonial?.id) {
      updateTestimonialMutation.mutate({ id: selectedTestimonial.id, request: data });
    } else {
      createTestimonialMutation.mutate(data);
    }
  };

  const confirmDeleteTestimonial = () => {
    if (selectedTestimonial?.id) {
      deleteTestimonialMutation.mutate(selectedTestimonial.id);
    }
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <section className="py-8 px-4">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-[#36454F] mb-6">Manage Testimonials</h1>
            <div className="flex justify-end mb-4">
              <Skeleton className="h-10 w-40" />
            </div>
            <Skeleton className="h-[400px] w-full" />
          </div>
        </section>
      </AdminLayout>
    );
  }

  if (isError) {
    return (
      <AdminLayout>
        <section className="py-8 px-4">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-[#36454F] mb-6">Manage Testimonials</h1>
            <p className="text-red-500">Error loading testimonials.</p>
          </div>
        </section>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <section className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-[#36454F] mb-6">Manage Testimonials</h1>
          <div className="flex justify-end mb-4">
            <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
              <DialogTrigger asChild>
                <Button
                  className="bg-[#D4AF37] hover:bg-[#b89a2f] text-white font-semibold rounded-md px-6 py-2 transition-all duration-200"
                  onClick={() => {
                    setSelectedTestimonial(null);
                    setIsFormOpen(true);
                  }}
                  data-testid="add-testimonial-button"
                >
                  <PlusCircle className="mr-2 h-4 w-4" /> Add New Testimonial
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px] bg-white p-6 rounded-lg shadow-lg">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold text-[#36454F]">
                    {selectedTestimonial ? "Edit Testimonial" : "Create Testimonial"}
                  </DialogTitle>
                </DialogHeader>
                <TestimonialForm initialData={selectedTestimonial ?? undefined} onSubmit={handleFormSubmit} />
              </DialogContent>
            </Dialog>
          </div>
          <TestimonialsTable
            testimonials={testimonials || []}
            onEdit={handleEditTestimonial}
            onDelete={handleDeleteTestimonial}
          />
          <DeleteTestimonialDialog
            testimonialId={selectedTestimonial?.id || ""}
            onClose={() => setIsDeleteDialogOpen(false)}
            onConfirm={confirmDeleteTestimonial}
            isOpen={isDeleteDialogOpen}
          />
        </div>
      </section>
    </AdminLayout>
  );
}