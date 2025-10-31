import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Loader2, Plus, Minus, Trash2, ShoppingBag, CreditCard } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { CartItem } from '@/types/cart';

interface CartProps {
  onCheckout?: () => void;
  className?: string;
}

export const Cart = ({ onCheckout, className }: CartProps) => {
  const navigate = useNavigate();
  const { cart, loading, removeCartItem, updateCartItem, clearCart } = useCart();

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
      <div className={`text-center py-12 ${className}`}>
        <ShoppingBag className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-medium mb-2">Seu carrinho está vazio</h3>
        <p className="text-muted-foreground mb-4">
          Adicione alguns produtos para começar suas compras
        </p>
        <Button onClick={() => window.history.back()}>
          Continuar Comprando
        </Button>
      </div>
    );
  }

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Carrinho de Compras</h1>
        <Button
          variant="outline"
          onClick={clearCart}
          disabled={loading}
        >
          Limpar Carrinho
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Items do Carrinho */}
        <div className="lg:col-span-2 space-y-4">
          {cart.items.map((item) => (
            <Card key={item.id}>
              <CardContent className="p-4">
                <div className="flex gap-4">
                  <div className="w-20 h-20 bg-muted rounded overflow-hidden flex-shrink-0">
                    {item.productImageUrl ? (
                      <img
                        src={item.productImageUrl}
                        alt={item.productName}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs">
                        Sem imagem
                      </div>
                    )}
                  </div>

                  <div className="flex-1">
                    <h3 className="font-medium mb-1">{item.productName}</h3>

                    <div className="flex items-center gap-4 mb-3">
                      <div className="flex items-center border rounded">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                          onClick={() => handleQuantityChange(item, item.quantity - 1)}
                          disabled={loading}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="px-3 py-1 text-sm">{item.quantity}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                          onClick={() => handleQuantityChange(item, item.quantity + 1)}
                          disabled={loading}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>

                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-destructive hover:text-destructive"
                        onClick={() => removeCartItem(item.id)}
                        disabled={loading}
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Remover
                      </Button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        {item.productPromotionalPrice ? (
                          <>
                            <div className="text-lg font-bold text-primary">
                              {formatPrice(item.productPromotionalPrice)}
                            </div>
                            <div className="text-sm text-muted-foreground line-through">
                              {formatPrice(item.productPrice)}
                            </div>
                          </>
                        ) : (
                          <div className="text-lg font-bold">
                            {formatPrice(item.productPrice)}
                          </div>
                        )}
                      </div>

                      <div className="text-right">
                        <div className="text-lg font-bold">
                          {formatPrice(item.totalPrice)}
                        </div>
                        {item.productPromotionalPrice && (
                          <div className="text-xs text-muted-foreground">
                            Economia: {formatPrice((item.productPrice - item.productPromotionalPrice) * item.quantity)}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Resumo do Pedido */}
        <div className="lg:col-span-1">
          <Card className="sticky top-4">
            <CardHeader>
              <CardTitle>Resumo do Pedido</CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal ({cart.items.reduce((total, item) => total + item.quantity, 0)} itens):</span>
                  <span>{formatPrice(cart.subtotal)}</span>
                </div>

                <div className="flex justify-between text-sm">
                  <span>Frete:</span>
                  <span>{formatPrice(cart.shipping)}</span>
                </div>

                {cart.shipping === 0 && (
                  <Badge variant="secondary" className="text-xs">
                    Frete grátis! 🎉
                  </Badge>
                )}
              </div>

              <Separator />

              <div className="flex justify-between text-lg font-bold">
                <span>Total:</span>
                <span>{formatPrice(cart.total)}</span>
              </div>

              <div className="space-y-2 pt-4">
                <Button
                  type="submit"
                  className="w-full"
                  size="lg"
                  disabled={loading}
                  onClick={() => navigate('/checkout')}
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Processando...
                    </>
                  ) : (
                    <>
                      <CreditCard className="h-4 w-4 mr-2" />
                      Finalizar Compra
                    </>
                  )}
                </Button>

                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => window.history.back()}
                >
                  Continuar Comprando
                </Button>
              </div>

              <div className="text-xs text-muted-foreground space-y-1">
                <p>• Frete grátis em compras acima de R$ 100</p>
                <p>• Prazo de entrega: 2-5 dias úteis</p>
                <p>• Formas de pagamento: Cartão, PIX, Boleto</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
