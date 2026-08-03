import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MenuItemDto } from '@/types/menu';
import { useCart } from '@/cart/CartContext';
import { toast } from 'sonner';

interface MenuItemCardProps {
  menuItem: MenuItemDto;
}

export default function MenuItemCard({ menuItem }: MenuItemCardProps): JSX.Element {
  const { addItem } = useCart();

  const handleAddToCart = (): void => {
    addItem({
      id: menuItem.id,
      name: menuItem.name,
      unitPrice: menuItem.price,
      imageUrl: menuItem.imageUrl,
      quantity: 1,
    });
    toast.success(`${menuItem.name} added to cart!`);
  };

  return (
    <Card className="flex flex-col overflow-hidden rounded-xl shadow-md border border-gray-100 p-0 transition-all duration-200 hover:shadow-lg">
      <div className="relative h-48 w-full overflow-hidden">
        <img
          src={menuItem.imageUrl}
          alt={menuItem.name}
          className="h-full w-full object-cover transition-transform duration-200 hover:scale-105"
        />
      </div>
      <CardHeader className="flex-grow p-4">
        <CardTitle className="text-lg font-semibold">{menuItem.name}</CardTitle>
        <p className="text-sm text-gray-600 line-clamp-2">{menuItem.description}</p>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-[#800020]">
            {menuItem.price.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}
          </span>
          {menuItem.vegetarian && (
            <Badge variant="outline" className="bg-green-100 text-green-700">
              Vegetarian
            </Badge>
          )}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button
          className="w-full bg-[#D4AF37] hover:bg-[#b89a30] text-white font-semibold rounded-full px-8 py-3 transition-all duration-200"
          onClick={handleAddToCart}
          disabled={!menuItem.available}
          data-testid={`add-to-cart-${menuItem.id}`}
        >
          {menuItem.available ? 'Add to Order' : 'Unavailable'}
        </Button>
      </CardFooter>
    </Card>
  );
}

// Inline Badge component as it's not explicitly listed in allowed UI imports for this file
function Badge({ children, variant, className }: { children: React.ReactNode; variant: 'outline'; className?: string }): JSX.Element {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${className}`}>
      {children}
    </span>
  );
}