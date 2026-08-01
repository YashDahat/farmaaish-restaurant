import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MenuItemDto } from '@/types/menu';
import { useCart } from '@/hooks/useCart';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/routes';

interface MenuItemCardProps {
  item: MenuItemDto;
}

const MenuItemCard: React.FC<MenuItemCardProps> = ({ item }) => {
  const { addItem } = useCart();

  const handleAddToCart = () => {
    if (item.id && item.name && item.price !== null && item.imageUrl) {
      addItem({
        id: item.id,
        name: item.name,
        unitPrice: item.price,
        imageUrl: item.imageUrl,
        quantity: 1,
      });
    }
  };

  return (
    <Card className="flex flex-col overflow-hidden rounded-xl shadow-md border border-gray-100 transition-all duration-200 hover:shadow-lg" data-testid="menu-item-card">
      <Link to={`${ROUTES.MENU}/${item.id}`} className="block">
        <div className="relative h-48 w-full overflow-hidden">
          <img
            src={item.imageUrl ?? '/placeholder-image.jpg'}
            alt={item.name ?? 'Menu item'}
            className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
      </Link>
      <CardHeader className="flex-grow">
        <CardTitle className="text-xl font-semibold text-gray-800">{item.name}</CardTitle>
        <p className="text-sm text-gray-600 mt-1">{item.description}</p>
      </CardHeader>
      <CardContent className="flex items-center justify-between">
        <span className="text-lg font-bold text-[#D4AF37]">
          ₹{item.price?.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </span>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button
          onClick={handleAddToCart}
          className="w-full bg-[#D4AF37] hover:bg-[#b8942e] text-white font-semibold rounded-full px-8 py-3 transition-all duration-200"
          data-testid="add-to-cart-cta"
        >
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MenuItemCard;