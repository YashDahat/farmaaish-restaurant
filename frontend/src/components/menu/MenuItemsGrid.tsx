import { MenuItemDto } from '@/types/menu';
import { useCart } from '@/cart/CartContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

interface MenuItemsGridProps {
  items: MenuItemDto[];
}

export default function MenuItemsGrid({ items }: MenuItemsGridProps) {
  const { addItem } = useCart();

  const handleAddToCart = (menuItem: MenuItemDto): void => {
    addItem({
      id: menuItem.id,
      name: menuItem.name,
      unitPrice: menuItem.price,
      imageUrl: menuItem.imageUrl,
    });
    toast.success(`${menuItem.name} added to cart!`);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-8">
      {items.map((item) => (
        <Card key={item.id} className="flex flex-col justify-between" data-testid={`menu-item-card-${item.id}`}>
          <CardHeader>
            <img src={item.imageUrl} alt={item.name} className="w-full h-48 object-cover rounded-md mb-4" />
            <CardTitle className="text-xl font-semibold">{item.name}</CardTitle>
          </CardHeader>
          <CardContent className="flex-grow">
            <p className="text-gray-600 mb-2">{item.description}</p>
            <p className="text-lg font-bold text-[#D4AF37]">
              {item.price.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}
            </p>
            {item.isVegetarian && (
              <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full mt-2">
                Vegetarian
              </span>
            )}
          </CardContent>
          <CardFooter>
            <Button
              onClick={() => handleAddToCart(item)}
              className="w-full bg-[#D4AF37] hover:bg-[#B8860B] text-white font-semibold transition-all duration-200"
              data-testid={`add-to-cart-button-${item.id}`}
            >
              Add to Cart
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}