import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MenuItemDto } from '@/types/menu';
import { useCart } from '@/cart/CartContext';

interface MenuItemCardProps {
  item: MenuItemDto;
}

export function MenuItemCard({ item }: MenuItemCardProps) {
  const { addItem } = useCart();

  const handleAddToCart = () => {
    if (item.id && item.name && item.price !== null) {
      addItem({
        id: item.id,
        name: item.name,
        unitPrice: item.price,
        imageUrl: item.imageUrl ?? undefined,
        quantity: 1,
      });
    }
  };

  return (
    <Card className="overflow-hidden rounded-xl shadow-md border border-gray-100 p-0" data-testid="menu-item-card">
      <img
        src={item.imageUrl ?? '/images/placeholder-menu-item.jpg'}
        alt={item.name ?? 'Menu Item'}
        className="w-full h-48 object-cover rounded-t-xl"
      />
      <CardHeader className="p-4">
        <CardTitle className="text-xl font-semibold text-[#36454F]">{item.name ?? 'Unknown Item'}</CardTitle>
        <p className="text-gray-600 text-sm">{item.description ?? 'No description available.'}</p>
      </CardHeader>
      <CardContent className="px-4 pb-2">
        <p className="text-lg font-bold text-[#D4AF37]">
          {item.price !== null
            ? item.price.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })
            : 'Price N/A'}
        </p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button
          onClick={handleAddToCart}
          className="w-full bg-[#D4AF37] hover:bg-[#b89a30] text-white font-semibold rounded-full px-8 py-3 transition-all duration-200"
          data-testid={`add-to-cart-button-${item.id}`}
        >
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}