"use client";

import { useCart } from "@/cart/CartContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { MinusCircle, PlusCircle, Trash2 } from "lucide-react";

export default function CartSummary() {
  const { cartItems, totals, setItemQuantity, removeItem } = useCart();

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString('en-IN', { style: 'currency', currency: 'INR' });
  };

  return (
    <Card className="w-full max-w-2xl mx-auto" data-testid="cart-summary">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold">Your Cart</CardTitle>
      </CardHeader>
      <CardContent>
        {cartItems.length === 0 ? (
          <div className="text-center py-8 text-gray-600">
            Your cart is empty. Add some delicious items!
          </div>
        ) : (
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between border-b pb-4 last:border-b-0 last:pb-0">
                <div className="flex items-center space-x-4">
                  {item.imageUrl && (
                    <img src={item.imageUrl} alt={item.name} className="w-16 h-16 object-cover rounded-md" />
                  )}
                  <div>
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-sm text-gray-600">{formatCurrency(item.unitPrice)} each</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setItemQuantity(item.id, item.quantity - 1, item.variantKey)}
                      disabled={item.quantity <= 1}
                      data-testid={`decrease-quantity-${item.id}`}
                    >
                      <MinusCircle className="h-4 w-4" />
                    </Button>
                    <Input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => {
                        const newQty = parseInt(e.target.value);
                        if (!isNaN(newQty) && newQty > 0) {
                          setItemQuantity(item.id, newQty, item.variantKey);
                        }
                      }}
                      className="w-16 text-center mx-2"
                      min="1"
                      data-testid={`item-quantity-${item.id}`}
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setItemQuantity(item.id, item.quantity + 1, item.variantKey)}
                      data-testid={`increase-quantity-${item.id}`}
                    >
                      <PlusCircle className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="font-medium w-24 text-right">{formatCurrency(item.unitPrice * item.quantity)}</p>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeItem(item.id, item.variantKey)}
                    data-testid={`remove-item-${item.id}`}
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              </div>
            ))}

            <Separator className="my-4" />

            <div className="space-y-2">
              <div className="flex justify-between font-medium">
                <span>Subtotal:</span>
                <span>{formatCurrency(totals.subtotal)}</span>
              </div>
              {totals.adjustments.map((adj) => (
                <div key={adj.id} className="flex justify-between text-sm text-gray-700">
                  <span>{adj.label}:</span>
                  <span>{formatCurrency(adj.amount)}</span>
                </div>
              ))}
              <div className="flex justify-between text-lg font-bold pt-2">
                <span>Total:</span>
                <span>{formatCurrency(totals.total)}</span>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}