import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useCart } from '@/cart/CartContext';
import type { MenuItemDto } from '@/types/menu';

interface MenuItemCardProps {
  item: MenuItemDto;
}

export default function MenuItemCard({ item }: MenuItemCardProps): JSX.Element {
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem({
      id: item.id,
      name: item.name,
      unitPrice: item.price,
      imageUrl: item.imageUrl,
    });
  };

  return (
    <Card className="bg-white rounded-xl shadow-md border border-gray-100 p-6 flex flex-col h-full" data-testid={`menu-item-card-${item.id}`}>
      <CardHeader className="p-0 mb-4">
        <img
          src={item.imageUrl}
          alt={item.name}
          className="w-full h-48 object-cover rounded-md"
        />
      </CardHeader>
      <CardContent className="flex-grow p-0">
        <CardTitle className="text-xl font-semibold text-[#36454F] mb-2">{item.name}</CardTitle>
        <p className="text-gray-600 text-sm mb-4">{item.description}</p>
        <p className="text-lg font-bold text-[#D4AF37]">
          {item.price.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}
        </p>
      </CardContent>
      <CardFooter className="p-0 mt-4">
        <Button
          onClick={handleAddToCart}
          className="w-full bg-[#D4AF37] hover:bg-[#b8942e] text-white font-semibold rounded-full px-8 py-3 transition-all duration-200"
          data-testid={`add-to-cart-button-${item.id}`}
        >
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}