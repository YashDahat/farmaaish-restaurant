"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  deliveryAddress: z.string().min(1, "Delivery address is required"),
  contactPhone: z.coerce
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number must not exceed 15 digits")
    .regex(/^\+?[0-9]{10,15}$/, "Invalid phone number format"),
});

interface DeliveryAddressFormProps {
  initialData?: {
    deliveryAddress: string;
    contactPhone: string;
  };
  onSubmit: (values: z.infer<typeof formSchema>) => void;
}

export default function DeliveryAddressForm({
  initialData,
  onSubmit,
}: DeliveryAddressFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      deliveryAddress: "",
      contactPhone: "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="deliveryAddress"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Delivery Address</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your delivery address"
                  {...field}
                  data-testid="delivery-address"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="contactPhone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contact Phone</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your contact phone number"
                  {...field}
                  data-testid="contact-phone"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="bg-[#D4AF37] hover:bg-[#b89a30] text-white font-semibold rounded-full px-8 py-3 transition-all duration-200"
          data-testid="delivery-address-submit"
        >
          Proceed to Payment
        </Button>
      </form>
    </Form>
  );
}