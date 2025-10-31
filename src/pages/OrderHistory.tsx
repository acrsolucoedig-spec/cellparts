import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Clock, CheckCircle, Truck, Package, XCircle, Eye, Search, Filter } from 'lucide-react';
import { useOrders } from '@/hooks/useOrders';
import { Order, OrderStatus } from '@/types/order';
import PageHeader from '@/components/PageHeader';

const OrderHistory = () => {
  const { orders, loading, error, fetchOrders } = useOrders();
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [statusFilter, setStatusFilter] = useState<OrderStatus | 'all'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'date' | 'total'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  useEffect(() => {
    let filtered = [...orders];

    // Filtro por status
    if (statusFilter !== 'all') {
      filtered = filtered.filter(order => order.status === statusFilter);
    }

    // Filtro por busca (ID do pedido)
    if (searchTerm) {
      filtered = filtered.filter(order =>
        order.id.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Ordenação
    filtered.sort((a, b) => {
      let comparison = 0;

      if (sortBy === 'date') {
        comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      } else if (sortBy === 'total') {
        comparison = a.total - b.total;
      }

      return sortOrder === 'asc' ? comparison : -comparison;
    });

    setFilteredOrders(filtered);
  }, [orders, statusFilter, searchTerm, sortBy, sortOrder]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusIcon = (status: OrderStatus) => {
    switch (status) {
      case OrderStatus.PENDING:
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case OrderStatus.CONFIRMED:
        return <CheckCircle className="h-4 w-4 text-blue-500" />;
      case OrderStatus.PREPARING:
        return <Package className="h-4 w-4 text-orange-500" />;
      case OrderStatus.READY:
        return <Package className="h-4 w-4 text-purple-500" />;
      case OrderStatus.IN_TRANSIT:
        return <Truck className="h-4 w-4 text-blue-500" />;
      case OrderStatus.DELIVERED:
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case OrderStatus.CANCELLED:
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusLabel = (status: OrderStatus) => {
    switch (status) {
      case OrderStatus.PENDING:
        return 'Aguardando Confirmação';
      case OrderStatus.CONFIRMED:
        return 'Confirmado';
      case OrderStatus.PREPARING:
        return 'Preparando';
      case OrderStatus.READY:
        return 'Pronto para Entrega';
      case OrderStatus.IN_TRANSIT:
        return 'Em Trânsito';
      case OrderStatus.DELIVERED:
        return 'Entregue';
      case OrderStatus.CANCELLED:
        return 'Cancelado';
      default:
        return status;
    }
  };

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case OrderStatus.PENDING:
        return 'secondary';
      case OrderStatus.CONFIRMED:
        return 'default';
      case OrderStatus.PREPARING:
        return 'secondary';
      case OrderStatus.READY:
        return 'secondary';
      case OrderStatus.IN_TRANSIT:
        return 'default';
      case OrderStatus.DELIVERED:
        return 'default';
      case OrderStatus.CANCELLED:
        return 'destructive';
      default:
        return 'secondary';
    }
  };

  const getPaymentMethodLabel = (method: string) => {
    switch (method) {
      case 'credit_card':
        return 'Cartão de Crédito';
      case 'debit_card':
        return 'Cartão de Débito';
      case 'pix':
        return 'PIX';
      case 'bank_slip':
        return 'Boleto';
      case 'cash':
        return 'Dinheiro';
      default:
        return method;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black via-black to-green-950 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Carregando histórico de pedidos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-black to-green-950">
      <div className="container mx-auto px-4 py-8">
        <PageHeader />

        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Histórico de Pedidos
            </h1>
            <p className="text-muted-foreground">
              Acompanhe todos os seus pedidos e compras
            </p>
          </div>

          {/* Filtros e Busca */}
          <Card className="mb-6">
            <CardContent className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar por ID do pedido..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>

                <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as OrderStatus | 'all')}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filtrar por status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os status</SelectItem>
                    {Object.values(OrderStatus).map((status) => (
                      <SelectItem key={status} value={status}>
                        {getStatusLabel(status)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={(value) => setSortBy(value as 'date' | 'total')}>
                  <SelectTrigger>
                    <SelectValue placeholder="Ordenar por" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="date">Data do pedido</SelectItem>
                    <SelectItem value="total">Valor total</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={sortOrder} onValueChange={(value) => setSortOrder(value as 'asc' | 'desc')}>
                  <SelectTrigger>
                    <SelectValue placeholder="Ordem" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="desc">Mais recente primeiro</SelectItem>
                    <SelectItem value="asc">Mais antigo primeiro</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Lista de Pedidos */}
          {filteredOrders.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">
                  {orders.length === 0 ? 'Nenhum pedido encontrado' : 'Nenhum pedido corresponde aos filtros'}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {orders.length === 0
                    ? 'Você ainda não fez nenhum pedido.'
                    : 'Tente ajustar os filtros de busca.'
                  }
                </p>
                {orders.length === 0 && (
                  <Button onClick={() => window.location.href = '/cliente'}>
                    Fazer meu primeiro pedido
                  </Button>
                )}
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {filteredOrders.map((order) => (
                <Card key={order.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {getStatusIcon(order.status)}
                        <div>
                          <CardTitle className="text-lg">
                            Pedido #{order.id.slice(-8).toUpperCase()}
                          </CardTitle>
                          <p className="text-sm text-muted-foreground">
                            {formatDate(order.createdAt)}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <Badge variant={getStatusColor(order.status) as any}>
                          {getStatusLabel(order.status)}
                        </Badge>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => window.location.href = `/order/${order.id}`}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          Ver Detalhes
                        </Button>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {/* Itens do Pedido */}
                      <div className="md:col-span-2">
                        <h4 className="font-medium mb-2">Itens do Pedido</h4>
                        <div className="space-y-2">
                          {order.items.slice(0, 3).map((item, index) => (
                            <div key={item.id} className="flex items-center gap-3 text-sm">
                              <div className="w-8 h-8 bg-muted rounded flex-shrink-0 flex items-center justify-center text-xs">
                                {index + 1}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="truncate">{item.productName}</p>
                                <p className="text-muted-foreground">
                                  {item.quantity}x {formatPrice(item.productPromotionalPrice || item.productPrice)}
                                </p>
                              </div>
                            </div>
                          ))}
                          {order.items.length > 3 && (
                            <p className="text-sm text-muted-foreground">
                              +{order.items.length - 3} item(ns) adicional(is)
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Resumo */}
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm text-muted-foreground">Pagamento</p>
                          <p className="font-medium">{getPaymentMethodLabel(order.paymentMethod)}</p>
                        </div>

                        <Separator />

                        <div>
                          <p className="text-sm text-muted-foreground">Endereço de entrega</p>
                          <p className="text-sm">
                            {order.deliveryAddress}, {order.deliveryNumber}
                            <br />
                            {order.deliveryCity} - {order.deliveryState}
                          </p>
                        </div>

                        <Separator />

                        <div className="text-right">
                          <p className="text-sm text-muted-foreground">Total</p>
                          <p className="text-xl font-bold text-primary">{formatPrice(order.total)}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Estatísticas */}
          {orders.length > 0 && (
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Resumo dos Pedidos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold text-primary">{orders.length}</p>
                    <p className="text-sm text-muted-foreground">Total de Pedidos</p>
                  </div>

                  <div>
                    <p className="text-2xl font-bold text-green-500">
                      {orders.filter(o => o.status === OrderStatus.DELIVERED).length}
                    </p>
                    <p className="text-sm text-muted-foreground">Pedidos Entregues</p>
                  </div>

                  <div>
                    <p className="text-2xl font-bold text-blue-500">
                      {formatPrice(orders.reduce((sum, order) => sum + order.total, 0))}
                    </p>
                    <p className="text-sm text-muted-foreground">Valor Total</p>
                  </div>

                  <div>
                    <p className="text-2xl font-bold text-purple-500">
                      {orders.length > 0
                        ? formatPrice(orders.reduce((sum, order) => sum + order.total, 0) / orders.length)
                        : 'R$ 0,00'
                      }
                    </p>
                    <p className="text-sm text-muted-foreground">Ticket Médio</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;
