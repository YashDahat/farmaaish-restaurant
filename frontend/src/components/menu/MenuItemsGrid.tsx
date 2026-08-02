import { MenuItemDto } from '@/types/menu';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useCart } from '@/cart/CartContext';
import { toast } from 'sonner';

interface MenuItemsGridProps {
  items: MenuItemDto[];
}

const MenuItemsGrid: React.FC<MenuItemsGridProps> = ({ items }) => {
  const { addItem } = useCart();

  const handleAddToCart = (item: MenuItemDto) => {
    if (item.id && item.name && item.price !== null) {
      addItem({
        id: item.id,
        name: item.name,
        unitPrice: item.price,
        imageUrl: item.imageUrl ?? undefined,
      });
      toast.success(`${item.name} added to order!`);
    } else {
      toast.error('Could not add item to cart. Missing item details.');
    }
  };

  if (!items || items.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">No menu items found for this category.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item) => (
        <Card key={item.id} className="flex flex-col justify-between" data-testid={`menu-item-card-${item.id}`}>
          <CardHeader className="p-0">
            {item.imageUrl && (
              <img
                src={item.imageUrl}
                alt={item.name ?? 'Menu Item'}
                className="w-full h-48 object-cover rounded-t-xl"
              />
            )}
          </CardHeader>
          <CardContent className="p-6 flex-grow">
            <CardTitle className="text-xl font-semibold mb-2">{item.name}</CardTitle>
            <p className="text-gray-700 text-sm mb-4">{item.description}</p>
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold text-[#D4AF37]">
                {item.price?.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}
              </span>
              <div className="flex items-center space-x-2">
                {item.vegetarian && (
                  <Badge variant="outline" className="bg-green-100 text-green-800">Veg</Badge>
                )}
                {item.spicy && (
                  <Badge variant="outline" className="bg-red-100 text-red-800">Spicy</Badge>
                )}
              </div>
            </div>
          </CardContent>
          <CardFooter className="p-6 pt-0">
            <Button
              onClick={() => handleAddToCart(item)}
              className="w-full bg-[#D4AF37] hover:bg-[#b89a30] text-white font-semibold rounded-full px-8 py-3 transition-all duration-200"
              data-testid={`add-to-order-cta-${item.id}`}
            >
              Add to Order
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default MenuItemsGrid;