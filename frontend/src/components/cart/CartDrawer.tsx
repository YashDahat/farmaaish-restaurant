import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter, SheetClose } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ShoppingCart, XCircle } from 'lucide-react';
import { useCart } from '@/cart';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/routes';
import { CartItem } from './CartItem';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartDrawer = ({ isOpen, onClose }: CartDrawerProps) => {
  const { cartItems, totals, cartCount } = useCart();

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="flex flex-col">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ShoppingCart className="h-6 w-6" /> Your Cart ({cartCount})
          </SheetTitle>
        </SheetHeader>
        <Separator />
        <div className="flex-1 overflow-y-auto pr-4">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
              <XCircle className="h-16 w-16 mb-4" />
              <p className="text-lg">Your cart is empty.</p>
              <p className="text-sm">Add some delicious items from our menu!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>
        {cartItems.length > 0 && (
          <SheetFooter className="flex flex-col gap-4 p-4 border-t">
            <div className="flex justify-between text-lg font-semibold">
              <span>Total:</span>
              <span>
                {totals.total.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}
              </span>
            </div>
            <SheetClose asChild>
              <Link to={ROUTES.CHECKOUT}>
                <Button data-testid="checkout-cta" className="w-full bg-[#D4AF37] hover:bg-[#b89a2e] text-white font-semibold rounded-full px-8 py-3 transition-all duration-200">
                  Proceed to Checkout
                </Button>
              </Link>
            </SheetClose>
            <SheetClose asChild>
              <Button variant="outline" onClick={onClose} className="w-full">
                Continue Shopping
              </Button>
            </SheetClose>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartDrawer;