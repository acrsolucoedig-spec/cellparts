import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ShoppingCart, Plus, Minus, Trash2, X } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { CartItem } from '@/types/cart';

interface MiniCartProps {
  onViewFullCart?: () => void;
  className?: string;
}

export const MiniCart = ({ onViewFullCart, className }: MiniCartProps) => {
  const { cart, loading, removeCartItem, updateCartItem } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  const itemCount = cart?.items.reduce((total, item) => total + item.quantity, 0) || 0;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price);
  };

  const handleQuantityChange = async (item: CartItem, newQuantity: number) => {
    if (newQuantity <= 0) {
      await removeCartItem(item.id);
    } else {
      await updateCartItem(item.id, newQuantity);
    }
  };

  if (!cart || cart.items.length === 0) {
    return (
      <div className={`relative ${className}`}>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsOpen(!isOpen)}
          className="relative"
        >
          <ShoppingCart className="h-4 w-4" />
          <span className="ml-2">Carrinho</span>
        </Button>

        {isOpen && (
          <Card className="absolute right-0 top-12 w-80 z-50 shadow-lg">
            <CardContent className="p-4">
              <p className="text-center text-muted-foreground">Seu carrinho está vazio</p>
            </CardContent>
          </Card>
        )}
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="relative"
      >
        <ShoppingCart className="h-4 w-4" />
        <span className="ml-2">Carrinho</span>
        {itemCount > 0 && (
          <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center text-xs">
            {itemCount}
          </Badge>
        )}
      </Button>

      {isOpen && (
        <Card className="absolute right-0 top-12 w-80 z-50 shadow-lg">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Carrinho</CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>

          <CardContent className="p-0">
            <ScrollArea className="max-h-80">
              <div className="px-4">
                {cart.items.map((item) => (
                  <div key={item.id} className="flex items-center gap-3 py-3 border-b last:border-b-0">
                    <div className="w-12 h-12 bg-muted rounded flex-shrink-0 overflow-hidden">
                      {item.productImageUrl ? (
                        <img
                          src={item.productImageUrl}
                          alt={item.productName}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs">
                          Sem img
                        </div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{item.productName}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex items-center border rounded">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0"
                            onClick={() => handleQuantityChange(item, item.quantity - 1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="px-2 text-sm">{item.quantity}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0"
                            onClick={() => handleQuantityChange(item, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0 text-destructive"
                          onClick={() => removeCartItem(item.id)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="text-sm font-medium">{formatPrice(item.totalPrice)}</p>
                      {item.productPromotionalPrice && (
                        <p className="text-xs text-muted-foreground line-through">
                          {formatPrice(item.productPrice * item.quantity)}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="p-4 border-t">
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span>Subtotal:</span>
                  <span>{formatPrice(cart.subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Frete:</span>
                  <span>{formatPrice(cart.shipping)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-medium">
                  <span>Total:</span>
                  <span>{formatPrice(cart.total)}</span>
                </div>
              </div>

              <Button
                className="w-full"
                onClick={() => {
                  setIsOpen(false);
                  onViewFullCart?.();
                }}
              >
                Ver Carrinho Completo
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
