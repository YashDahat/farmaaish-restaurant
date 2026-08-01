import { MinusCircle, PlusCircle, ShoppingCart, XCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

import { useCart } from '@/cart/CartContext';
import { ROUTES } from '@/routes';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

export function CartDrawer() {
  const { cartItems, totals, removeItem, setItemQuantity } = useCart();

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString('en-IN', { style: 'currency', currency: 'INR' });
  };

  const handleRemoveItem = (itemId: string) => {
    removeItem(itemId);
    toast.info('Item removed from cart.');
  };

  const handleUpdateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) {
      handleRemoveItem(itemId);
    } else {
      setItemQuantity(itemId, newQuantity);
      toast.success('Cart updated.');
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative" data-testid="cart-drawer-trigger">
          <ShoppingCart className="h-6 w-6" />
          {cartItems.length > 0 && (
            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#D4AF37] text-xs text-white">
              {cartItems.length}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        <SheetHeader>
          <SheetTitle className="text-2xl font-bold">Your Cart</SheetTitle>
        </SheetHeader>
        <Separator />
        <div className="flex-1 overflow-y-auto py-4">
          {cartItems.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-gray-500">
              <ShoppingCart className="mb-4 h-16 w-16" />
              <p className="text-lg">Your cart is empty.</p>
              <p className="text-sm">Add some delicious items from our menu!</p>
              <Button asChild className="mt-6 bg-[#D4AF37] hover:bg-[#b89a2e] text-white" data-testid="browse-menu-cta">
                <Link to={ROUTES.MENU}>Browse Menu</Link>
              </Button>
            </div>
          ) : (
            <ul className="space-y-6">
              {cartItems.map((item) => (
                <li key={item.id} className="flex items-center gap-4">
                  <img
                    src={item.imageUrl ?? '/placeholder-food.jpg'}
                    alt={item.name ?? 'Cart item'}
                    className="h-20 w-20 rounded-md object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-sm text-gray-600">{formatCurrency(item.unitPrice ?? 0)}</p>
                    <div className="mt-2 flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleUpdateQuantity(item.id, (item.quantity ?? 0) - 1)}
                        data-testid={`decrease-quantity-${item.id}`}
                      >
                        <MinusCircle className="h-5 w-5 text-gray-600 hover:text-red-500" />
                      </Button>
                      <span className="w-8 text-center text-lg font-medium" data-testid={`item-quantity-${item.id}`}>
                        {item.quantity}
                      </span>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleUpdateQuantity(item.id, (item.quantity ?? 0) + 1)}
                        data-testid={`increase-quantity-${item.id}`}
                      >
                        <PlusCircle className="h-5 w-5 text-gray-600 hover:text-green-500" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <p className="font-semibold" data-testid={`item-total-${item.id}`}>
                      {formatCurrency((item.unitPrice ?? 0) * (item.quantity ?? 0))}
                    </p>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveItem(item.id)}
                      className="mt-2 text-red-500 hover:text-red-700"
                      data-testid={`remove-item-${item.id}`}
                    >
                      <XCircle className="h-5 w-5" />
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        {cartItems.length > 0 && (
          <>
            <Separator />
            <div className="space-y-2 py-4">
              <div className="flex justify-between text-lg font-semibold">
                <span>Subtotal:</span>
                <span data-testid="cart-subtotal">{formatCurrency(totals.subtotal ?? 0)}</span>
              </div>
              {totals.adjustments && totals.adjustments.length > 0 && (
                <div className="space-y-1">
                  {totals.adjustments.map((adj, index) => (
                    <div key={index} className="flex justify-between text-sm text-gray-600">
                      <span>{adj.description}:</span>
                      <span>{formatCurrency(adj.amount ?? 0)}</span>
                    </div>
                  ))}
                </div>
              )}
              <div className="flex justify-between text-xl font-bold">
                <span>Total:</span>
                <span data-testid="cart-total">{formatCurrency(totals.total ?? 0)}</span>
              </div>
            </div>
            <Button asChild className="w-full bg-[#D4AF37] hover:bg-[#b89a2e] text-white py-3 text-lg" data-testid="checkout-cta">
              <Link to={ROUTES.CHECKOUT}>Proceed to Checkout</Link>
            </Button>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}