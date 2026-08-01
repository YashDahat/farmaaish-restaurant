import { CartItem as CartItemType, useCart } from '@/cart';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X } from 'lucide-react';

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const { setItemQuantity, removeItem } = useCart();

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const quantity = parseInt(e.target.value, 10);
    if (!isNaN(quantity) && quantity > 0) {
      setItemQuantity(item.id, quantity);
    }
  };

  const handleRemoveItem = () => {
    removeItem(item.id);
  };

  const formattedPrice = item.unitPrice.toLocaleString('en-IN', {
    style: 'currency',
    currency: 'INR',
  });

  const formattedTotalPrice = (item.unitPrice * item.quantity).toLocaleString('en-IN', {
    style: 'currency',
    currency: 'INR',
  });

  return (
    <div className="flex items-center space-x-4 py-4 border-b last:border-b-0" data-testid={`cart-item-${item.id}`}>
      <img src={item.imageUrl ?? '/placeholder-food.jpg'} alt={item.name ?? 'Cart item'} className="w-20 h-20 object-cover rounded-md" />
      <div className="flex-1">
        <h3 className="font-semibold text-lg">{item.name}</h3>
        <p className="text-gray-600">{formattedPrice}</p>
      </div>
      <div className="flex items-center space-x-2">
        <Input
          type="number"
          min="1"
          value={item.quantity}
          onChange={handleQuantityChange}
          className="w-20 text-center"
          data-testid={`cart-item-quantity-${item.id}`}
        />
        <span className="font-semibold">{formattedTotalPrice}</span>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleRemoveItem}
          data-testid={`cart-item-remove-${item.id}`}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}