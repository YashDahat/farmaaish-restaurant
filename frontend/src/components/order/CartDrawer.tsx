import { Link } from 'react-router-dom';
import { MinusCircle, PlusCircle, ShoppingCart, XCircle } from 'lucide-react';
import { useCart } from '@/cart/CartContext';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ROUTES } from '@/routes';

export default function CartDrawer() {
  const { cartItems, removeItem, setItemQuantity, totals, cartCount } = useCart();

  const formatCurrency = (amount: number): string => {
    return amount.toLocaleString('en-IN', { style: 'currency', currency: 'INR' });
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" className="relative" data-testid="cart-drawer-trigger">
          <ShoppingCart className="h-6 w-6" />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#D4AF37] text-xs font-bold text-white">
              {cartCount}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="flex w-full flex-col sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ShoppingCart className="h-6 w-6" /> Your Cart ({cartCount})
          </SheetTitle>
        </SheetHeader>
        <Separator />
        {cartItems.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center text-gray-500">
            <ShoppingCart className="mb-4 h-16 w-16" />
            <p className="text-lg">Your cart is empty.</p>
            <p className="text-sm">Add some delicious items from our menu!</p>
            <Button asChild className="mt-6 bg-[#D4AF37] hover:bg-[#b8952c]" data-testid="cart-drawer-menu-button">
              <Link to={ROUTES.MENU}>Go to Menu</Link>
            </Button>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1 pr-4">
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 border-b pb-4 last:border-b-0">
                    {item.imageUrl && (
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="h-16 w-16 rounded-md object-cover"
                      />
                    )}
                    <div className="flex-1">
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="text-sm text-gray-600">{formatCurrency(item.unitPrice)}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setItemQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          data-testid={`decrease-quantity-${item.id}`}
                        >
                          <MinusCircle className="h-5 w-5 text-gray-500 hover:text-gray-700" />
                        </Button>
                        <span className="w-6 text-center text-sm font-medium">{item.quantity}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setItemQuantity(item.id, item.quantity + 1)}
                          data-testid={`increase-quantity-${item.id}`}
                        >
                          <PlusCircle className="h-5 w-5 text-gray-500 hover:text-gray-700" />
                        </Button>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <p className="font-semibold">{formatCurrency(item.unitPrice * item.quantity)}</p>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeItem(item.id)}
                        className="text-red-500 hover:text-red-700"
                        data-testid={`remove-item-${item.id}`}
                      >
                        <XCircle className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
            <div className="mt-auto space-y-2 py-4">
              <Separator />
              <div className="flex justify-between text-lg font-semibold">
                <span>Subtotal:</span>
                <span>{formatCurrency(totals.subtotal)}</span>
              </div>
              {totals.adjustments.map((adj) => (
                <div key={adj.id} className="flex justify-between text-sm text-gray-600">
                  <span>{adj.label}:</span>
                  <span>{formatCurrency(adj.amount)}</span>
                </div>
              ))}
              <div className="flex justify-between text-xl font-bold text-[#800020]">
                <span>Total:</span>
                <span>{formatCurrency(totals.total)}</span>
              </div>
              <Button asChild className="w-full bg-[#D4AF37] hover:bg-[#b8952c]" data-testid="cart-drawer-checkout-button">
                <Link to={ROUTES.CHECKOUT}>Proceed to Checkout</Link>
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}