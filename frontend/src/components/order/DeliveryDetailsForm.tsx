"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  customerName: z.string().min(2, "Name must be at least 2 characters."),
  customerPhone: z.string().min(10, "Phone number must be at least 10 digits."),
  deliveryAddress: z.string().min(5, "Address must be at least 5 characters."),
  notes: z.string().optional(),
});

export type DeliveryDetails = z.infer<typeof formSchema>;

interface DeliveryDetailsFormProps {
  onSubmit: (data: DeliveryDetails) => void;
  initialData?: DeliveryDetails;
}

export default function DeliveryDetailsForm({
  onSubmit,
  initialData,
}: DeliveryDetailsFormProps): React.JSX.Element {
  const form = useForm<DeliveryDetails>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      customerName: "",
      customerPhone: "",
      deliveryAddress: "",
      notes: "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="customerName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Your Name" {...field} data-testid="delivery-name" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="customerPhone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input placeholder="Your Phone Number" {...field} data-testid="delivery-phone" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="deliveryAddress"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Delivery Address</FormLabel>
              <FormControl>
                <Textarea placeholder="Your Delivery Address" {...field} data-testid="delivery-address" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Special Requests / Notes</FormLabel>
              <FormControl>
                <Textarea placeholder="Any special requests or notes?" {...field} data-testid="delivery-notes" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" data-testid="delivery-submit">
          Proceed to Payment
        </Button>
      </form>
    </Form>
  );
}