import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { CheckCircle, Home } from 'lucide-react';
import { useOrders } from '@/hooks/useOrders';
import { Order } from '@/types/order';
import { OrderTrackingComponent } from '@/components/OrderTracking';
import PageHeader from '@/components/PageHeader';

const OrderConfirmation = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { fetchOrderById } = useOrders();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadOrder = async () => {
      if (id) {
        const orderData = await fetchOrderById(id);
        setOrder(orderData);
      }
      setLoading(false);
    };

    loadOrder();
  }, [id, fetchOrderById]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black via-black to-green-950 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Carregando pedido...</p>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black via-black to-green-950 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Pedido não encontrado</h1>
          <Button onClick={() => navigate('/cliente')}>
            <Home className="h-4 w-4 mr-2" />
            Voltar ao Início
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-black to-green-950">
      <div className="container mx-auto px-4 py-8">
        <PageHeader />

        <div className="max-w-4xl mx-auto">
          {/* Header de Confirmação */}
          <div className="text-center mb-8">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Pedido Confirmado!
            </h1>
            <p className="text-muted-foreground">
              Seu pedido #{order.id.slice(-8).toUpperCase()} foi criado com sucesso
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Rastreamento Completo */}
            <div className="lg:col-span-2">
              <OrderTrackingComponent order={order} />
            </div>

            {/* Resumo do Pedido */}
            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle>Resumo do Pedido</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Itens */}
                <div className="space-y-3">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex items-center gap-3 p-3 border rounded">
                      <div className="w-12 h-12 bg-muted rounded overflow-hidden flex-shrink-0">
                        {item.productImageUrl ? (
                          <img
                            src={item.productImageUrl}
                            alt={item.productName}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-xs text-muted-foreground">
                            Sem img
                          </div>
                        )}
                      </div>

                      <div className="flex-1">
                        <p className="font-medium">{item.productName}</p>
                        <p className="text-sm text-muted-foreground">
                          {item.quantity}x {formatPrice(item.productPromotionalPrice || item.productPrice)}
                        </p>
                      </div>

                      <div className="text-right">
                        <p className="font-medium">{formatPrice(item.totalPrice)}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <Separator />

                {/* Totais */}
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>{formatPrice(order.subtotal)}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Frete:</span>
                    <span>{formatPrice(order.shipping)}</span>
                  </div>

                  {order.discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Desconto:</span>
                      <span>-{formatPrice(order.discount)}</span>
                    </div>
                  )}

                  <Separator />

                  <div className="flex justify-between text-lg font-bold">
                    <span>Total:</span>
                    <span>{formatPrice(order.total)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Ações */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Button onClick={() => navigate('/cliente')} variant="outline">
              <Home className="h-4 w-4 mr-2" />
              Continuar Comprando
            </Button>

            <Button onClick={() => navigate('/cliente')}>
              Acompanhar Pedido
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
