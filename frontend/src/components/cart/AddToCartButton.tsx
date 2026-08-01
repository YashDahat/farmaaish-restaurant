import { Button } from '@/components/ui/button';
import { MenuItemDto } from '@/types/menu';
import { useCart } from '@/cart/CartContext';
import { toast } from 'sonner';

interface AddToCartButtonProps {
  item: MenuItemDto;
}

export function AddToCartButton({ item }: AddToCartButtonProps) {
  const { addItem } = useCart();

  const handleAddToCart = () => {
    if (item.id && item.name && item.price !== null && item.price !== undefined) {
      addItem({
        id: item.id,
        name: item.name,
        unitPrice: item.price,
        imageUrl: item.imageUrl ?? undefined,
      }, 1);
      toast.success(`${item.name} added to cart!`);
    } else {
      toast.error('Cannot add item to cart: missing item details.');
    }
  };

  return (
    <Button
      onClick={handleAddToCart}
      className="bg-[#D4AF37] hover:bg-[#b89a2e] text-white font-semibold rounded-full px-8 py-3 transition-all duration-200"
      data-testid={`add-to-cart-${item.id}`}
    >
      Add to Cart
    </Button>
  );
}