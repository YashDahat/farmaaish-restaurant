import { Button } from '@/components/ui/button';
import { useCart } from '@/cart/CartContext';
import { MenuItemDto } from '@/types/menu';
import { toast } from 'sonner';

interface AddToCartButtonProps {
  menuItem: MenuItemDto;
}

export default function AddToCartButton({ menuItem }: AddToCartButtonProps) {
  const { addItem } = useCart();

  const handleAddToCart = (): void => {
    addItem({
      id: menuItem.id,
      name: menuItem.name,
      unitPrice: menuItem.price,
      imageUrl: menuItem.imageUrl,
      variantKey: menuItem.id, // Using menuItem.id as variantKey for simplicity
    }, 1);
    toast.success(`${menuItem.name} added to cart!`);
  };

  return (
    <Button
      onClick={handleAddToCart}
      className="w-full bg-[#D4AF37] hover:bg-[#b8952c] text-white font-semibold transition-all duration-200"
      data-testid={`add-to-cart-${menuItem.id}`}
    >
      Add to Cart
    </Button>
  );
}