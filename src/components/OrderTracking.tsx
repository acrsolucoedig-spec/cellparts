import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Clock,
  CheckCircle,
  Truck,
  Package,
  MapPin,
  RefreshCw,
  CheckCircle2
} from 'lucide-react';
import { useTracking } from '@/hooks/useTracking';
import { Order, OrderStatus } from '@/types/order';
import { OrderTracking } from '@/types/tracking';

interface OrderTrackingProps {
  order: Order;
  onStatusUpdate?: () => void;
  className?: string;
}

export const OrderTrackingComponent = ({ order, onStatusUpdate, className }: OrderTrackingProps) => {
  const {
    trackingHistory,
    latestTracking,
    loading,
    error,
    fetchTrackingHistory,
    fetchLatestTracking,
  } = useTracking();

  const [showMap, setShowMap] = useState(false);

  useEffect(() => {
    fetchTrackingHistory(order.id);
    fetchLatestTracking(order.id);
  }, [order.id, fetchTrackingHistory, fetchLatestTracking]);

  const getStatusIcon = (status: OrderStatus) => {
    switch (status) {
      case OrderStatus.PENDING:
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case OrderStatus.CONFIRMED:
        return <CheckCircle className="h-5 w-5 text-blue-500" />;
      case OrderStatus.PREPARING:
        return <Package className="h-5 w-5 text-orange-500" />;
      case OrderStatus.READY:
        return <Package className="h-5 w-5 text-purple-500" />;
      case OrderStatus.IN_TRANSIT:
        return <Truck className="h-5 w-5 text-blue-500" />;
      case OrderStatus.DELIVERED:
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case OrderStatus.CANCELLED:
        return <Clock className="h-5 w-5 text-red-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusLabel = (status: OrderStatus) => {
    switch (status) {
      case OrderStatus.PENDING:
        return 'Aguardando Confirmação';
      case OrderStatus.CONFIRMED:
        return 'Confirmado';
      case OrderStatus.PREPARING:
        return 'Preparando Pedido';
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

  const getStatusDescription = (status: OrderStatus) => {
    switch (status) {
      case OrderStatus.PENDING:
        return 'Seu pedido foi recebido e está aguardando confirmação do restaurante.';
      case OrderStatus.CONFIRMED:
        return 'Seu pedido foi confirmado e será preparado em breve.';
      case OrderStatus.PREPARING:
        return 'Estamos preparando seu pedido com muito cuidado.';
      case OrderStatus.READY:
        return 'Seu pedido está pronto e aguardando o entregador.';
      case OrderStatus.IN_TRANSIT:
        return 'Seu pedido está a caminho! Acompanhe a localização em tempo real.';
      case OrderStatus.DELIVERED:
        return 'Pedido entregue com sucesso! Aproveite sua refeição.';
      case OrderStatus.CANCELLED:
        return 'Este pedido foi cancelado.';
      default:
        return '';
    }
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusSteps = () => {
    return [
      { status: OrderStatus.PENDING, label: 'Recebido', icon: Clock },
      { status: OrderStatus.CONFIRMED, label: 'Confirmado', icon: CheckCircle },
      { status: OrderStatus.PREPARING, label: 'Preparando', icon: Package },
      { status: OrderStatus.READY, label: 'Pronto', icon: Package },
      { status: OrderStatus.IN_TRANSIT, label: 'A Caminho', icon: Truck },
      { status: OrderStatus.DELIVERED, label: 'Entregue', icon: CheckCircle },
    ];
  };

  const getCurrentStepIndex = () => {
    const steps = getStatusSteps();
    return steps.findIndex(step => step.status === order.status);
  };

  const renderMapPlaceholder = () => {
    if (!latestTracking?.latitude || !latestTracking?.longitude) {
      return (
        <div className="w-full h-64 bg-muted rounded-lg flex items-center justify-center text-muted-foreground">
          <div className="text-center">
            <MapPin className="h-12 w-12 mx-auto mb-2 opacity-50" />
            <p>Mapa não disponível</p>
            <p className="text-sm">Integração com Google Maps em desenvolvimento</p>
          </div>
        </div>
      );
    }

    return (
      <div className="w-full h-64 bg-muted rounded-lg flex items-center justify-center text-muted-foreground">
        <div className="text-center">
          <MapPin className="h-12 w-12 mx-auto mb-2 text-primary" />
          <p>Entregador em rota</p>
          <p className="text-sm">
            Lat: {latestTracking.latitude.toFixed(6)}
            <br />
            Lng: {latestTracking.longitude.toFixed(6)}
          </p>
          {latestTracking.address && (
            <p className="text-sm mt-2 text-foreground">
              {latestTracking.address}
            </p>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Status Atual */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              {getStatusIcon(order.status)}
              Status do Pedido
            </CardTitle>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                fetchTrackingHistory(order.id);
                fetchLatestTracking(order.id);
              }}
              disabled={loading}
            >
              <RefreshCw className={`h-4 w-4 mr-1 ${loading ? 'animate-spin' : ''}`} />
              Atualizar
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="text-lg px-3 py-1">
              {getStatusLabel(order.status)}
            </Badge>
            {order.actualDeliveryTime && (
              <span className="text-sm text-muted-foreground">
                Entregue em {formatDateTime(order.actualDeliveryTime)}
              </span>
            )}
          </div>

          <p className="text-muted-foreground">
            {getStatusDescription(order.status)}
          </p>
        </CardContent>
      </Card>

      {/* Timeline de Status */}
      <Card>
        <CardHeader>
          <CardTitle>Acompanhamento do Pedido</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {getStatusSteps().map((step, index) => {
              const Icon = step.icon;
              const isCompleted = index <= getCurrentStepIndex();
              const isCurrent = index === getCurrentStepIndex();

              return (
                <div key={step.status} className="flex items-center gap-4">
                  <div className={`
                    w-10 h-10 rounded-full flex items-center justify-center
                    ${isCompleted ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}
                    ${isCurrent ? 'ring-2 ring-primary ring-offset-2' : ''}
                  `}>
                    <Icon className="h-5 w-5" />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className={`font-medium ${isCompleted ? 'text-foreground' : 'text-muted-foreground'}`}>
                        {step.label}
                      </span>
                      {isCompleted && <CheckCircle2 className="h-4 w-4 text-green-500" />}
                    </div>
                    {isCurrent && order.status === step.status && (
                      <p className="text-sm text-muted-foreground mt-1">
                        {getStatusDescription(order.status)}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Mapa (se em trânsito) */}
      {(order.status === OrderStatus.IN_TRANSIT || order.status === OrderStatus.READY) && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Localização em Tempo Real
              </CardTitle>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowMap(!showMap)}
              >
                {showMap ? 'Ocultar' : 'Mostrar'} Mapa
              </Button>
            </div>
          </CardHeader>
          {showMap && (
            <CardContent>
              {renderMapPlaceholder()}
            </CardContent>
          )}
        </Card>
      )}

      {/* Histórico de Rastreamento */}
      {trackingHistory.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Atualizações de Rastreamento</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {trackingHistory.map((tracking, index) => (
                <div key={tracking.id} className="flex gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 text-sm">
                      <span className="font-medium">{formatDateTime(tracking.createdAt)}</span>
                      {tracking.isCompleted && <CheckCircle2 className="h-3 w-3 text-green-500" />}
                    </div>
                    {tracking.address && (
                      <p className="text-sm text-muted-foreground mt-1">
                        📍 {tracking.address}
                        {tracking.city && `, ${tracking.city}`}
                        {tracking.state && ` - ${tracking.state}`}
                      </p>
                    )}
                    {tracking.notes && (
                      <p className="text-sm text-muted-foreground mt-1">
                        💬 {tracking.notes}
                      </p>
                    )}
                    {tracking.latitude && tracking.longitude && (
                      <p className="text-xs text-muted-foreground mt-1">
                        GPS: {tracking.latitude.toFixed(6)}, {tracking.longitude.toFixed(6)}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Informações de Entrega */}
      <Card>
        <CardHeader>
          <CardTitle>Informações de Entrega</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Destinatário</p>
              <p className="font-medium">{order.recipientName}</p>
              <p className="text-sm text-muted-foreground">{order.recipientPhone}</p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Endereço</p>
              <p className="font-medium">
                {order.deliveryAddress}, {order.deliveryNumber}
              </p>
              <p className="text-sm text-muted-foreground">
                {order.deliveryNeighborhood} - {order.deliveryCity}/{order.deliveryState}
              </p>
              <p className="text-sm text-muted-foreground">CEP: {order.deliveryZipCode}</p>
            </div>
          </div>

          {order.notes && (
            <>
              <Separator />
              <div>
                <p className="text-sm text-muted-foreground">Observações</p>
                <p className="text-sm">{order.notes}</p>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
