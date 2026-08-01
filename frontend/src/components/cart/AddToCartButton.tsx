"use client";

import { Button } from "@/components/ui/button";
import { MenuItemDto } from "@/types/menu";
import { useCart } from "@/hooks/useCart";
import { toast } from "sonner";

interface AddToCartButtonProps {
  item: MenuItemDto;
  quantity?: number;
}

export function AddToCartButton({ item, quantity = 1 }: AddToCartButtonProps) {
  const { addItem } = useCart();

  const handleAddToCart = () => {
    if (!item.id || !item.name || item.price === null) {
      toast.error("Cannot add item to cart: missing item details.");
      return;
    }
    addItem({
      id: item.id,
      name: item.name,
      unitPrice: item.price,
      imageUrl: item.imageUrl ?? undefined,
      quantity: quantity,
    });
    toast.success(`${quantity} x ${item.name} added to cart!`);
  };

  return (
    <Button
      onClick={handleAddToCart}
      className="bg-[#D4AF37] hover:bg-[#b89a2e] text-white font-semibold rounded-full px-8 py-3 transition-all duration-200"
      data-testid="add-to-cart-button"
    >
      Add to Cart
    </Button>
  );
}