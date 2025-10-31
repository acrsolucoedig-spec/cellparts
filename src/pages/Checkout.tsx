import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Loader2, CreditCard, Smartphone, Banknote, Truck } from 'lucide-react';
import { AddressForm } from '@/components/AddressForm';
import { useCart } from '@/hooks/useCart';
import { useOrders } from '@/hooks/useOrders';
import { PaymentMethod, CreateOrderDto } from '@/types/order';
import PageHeader from '@/components/PageHeader';

interface CheckoutFormData {
  paymentMethod: PaymentMethod;
  recipientName: string;
  recipientPhone: string;
  notes?: string;
  // Endereço será obtido do AddressForm
  deliveryAddress: string;
  deliveryNumber: string;
  deliveryComplement?: string;
  deliveryNeighborhood: string;
  deliveryCity: string;
  deliveryState: string;
  deliveryZipCode: string;
}

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, loading: cartLoading } = useCart();
  const { createOrder, loading: orderLoading } = useOrders();

  const [formData, setFormData] = useState<CheckoutFormData>({
    paymentMethod: PaymentMethod.PIX,
    recipientName: '',
    recipientPhone: '',
    notes: '',
    deliveryAddress: '',
    deliveryNumber: '',
    deliveryComplement: '',
    deliveryNeighborhood: '',
    deliveryCity: '',
    deliveryState: '',
    deliveryZipCode: '',
  });

  const [addressData, setAddressData] = useState<any>(null);

  // Redirecionar se carrinho estiver vazio
  if (!cart || cart.items.length === 0) {
    navigate('/cliente');
    return null;
  }

  const handleAddressFound = (address: any) => {
    setAddressData(address);
    setFormData(prev => ({
      ...prev,
      deliveryAddress: address.logradouro,
      deliveryNeighborhood: address.bairro,
      deliveryCity: address.localidade,
      deliveryState: address.uf,
      deliveryZipCode: address.cep,
    }));
  };

  const handleInputChange = (field: keyof CheckoutFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validações básicas
    if (!formData.recipientName.trim()) {
      alert('Nome do destinatário é obrigatório');
      return;
    }

    if (!formData.recipientPhone.trim()) {
      alert('Telefone do destinatário é obrigatório');
      return;
    }

    if (!addressData || !formData.deliveryAddress) {
      alert('Endereço de entrega é obrigatório');
      return;
    }

    if (!formData.deliveryNumber.trim()) {
      alert('Número do endereço é obrigatório');
      return;
    }

    const orderData: CreateOrderDto = {
      paymentMethod: formData.paymentMethod,
      deliveryAddress: formData.deliveryAddress,
      deliveryNumber: formData.deliveryNumber,
      deliveryComplement: formData.deliveryComplement,
      deliveryNeighborhood: formData.deliveryNeighborhood,
      deliveryCity: formData.deliveryCity,
      deliveryState: formData.deliveryState,
      deliveryZipCode: formData.deliveryZipCode,
      recipientName: formData.recipientName,
      recipientPhone: formData.recipientPhone,
      notes: formData.notes,
    };

    const order = await createOrder(orderData);

    if (order) {
      // Redirecionar para página de confirmação
      navigate(`/order/${order.id}`);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price);
  };

  const getPaymentMethodIcon = (method: PaymentMethod) => {
    switch (method) {
      case PaymentMethod.CREDIT_CARD:
        return <CreditCard className="h-4 w-4" />;
      case PaymentMethod.PIX:
        return <Smartphone className="h-4 w-4" />;
      case PaymentMethod.CASH:
        return <Banknote className="h-4 w-4" />;
      default:
        return <CreditCard className="h-4 w-4" />;
    }
  };

  const getPaymentMethodLabel = (method: PaymentMethod) => {
    switch (method) {
      case PaymentMethod.CREDIT_CARD:
        return 'Cartão de Crédito';
      case PaymentMethod.DEBIT_CARD:
        return 'Cartão de Débito';
      case PaymentMethod.PIX:
        return 'PIX';
      case PaymentMethod.BANK_SLIP:
        return 'Boleto Bancário';
      case PaymentMethod.CASH:
        return 'Dinheiro';
      default:
        return method;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-black to-green-950">
      <div className="container mx-auto px-4 py-8">
        <PageHeader />

        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Finalizar Pedido
          </h1>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Informações do Pedido */}
              <div className="space-y-6">
                {/* Endereço de Entrega */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Truck className="h-5 w-5" />
                      Endereço de Entrega
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <AddressForm onAddressFound={handleAddressFound} />

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="number">Número</Label>
                        <Input
                          id="number"
                          placeholder="123"
                          value={formData.deliveryNumber}
                          onChange={(e) => handleInputChange('deliveryNumber', e.target.value)}
                          required
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Dados do Destinatário */}
                <Card>
                  <CardHeader>
                    <CardTitle>Dados do Destinatário</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="recipientName">Nome Completo</Label>
                      <Input
                        id="recipientName"
                        placeholder="João Silva"
                        value={formData.recipientName}
                        onChange={(e) => handleInputChange('recipientName', e.target.value)}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="recipientPhone">Telefone</Label>
                      <Input
                        id="recipientPhone"
                        placeholder="(11) 99999-9999"
                        value={formData.recipientPhone}
                        onChange={(e) => handleInputChange('recipientPhone', e.target.value)}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="notes">Observações (opcional)</Label>
                      <Textarea
                        id="notes"
                        placeholder="Ex: Tocar campainha, entregar na portaria..."
                        value={formData.notes}
                        onChange={(e) => handleInputChange('notes', e.target.value)}
                        rows={3}
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Método de Pagamento */}
                <Card>
                  <CardHeader>
                    <CardTitle>Forma de Pagamento</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <RadioGroup
                      value={formData.paymentMethod}
                      onValueChange={(value) => handleInputChange('paymentMethod', value as PaymentMethod)}
                    >
                      <div className="space-y-3">
                        {Object.values(PaymentMethod).map((method) => (
                          <div key={method} className="flex items-center space-x-3">
                            <RadioGroupItem value={method} id={method} />
                            <Label htmlFor={method} className="flex items-center gap-2 cursor-pointer">
                              {getPaymentMethodIcon(method)}
                              {getPaymentMethodLabel(method)}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </RadioGroup>
                  </CardContent>
                </Card>
              </div>

              {/* Resumo do Pedido */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Resumo do Pedido</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Itens do Carrinho */}
                    <div className="space-y-3">
                      {cart.items.map((item) => (
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

                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">{item.productName}</p>
                            <p className="text-xs text-muted-foreground">
                              {item.quantity}x {formatPrice(item.productPromotionalPrice || item.productPrice)}
                            </p>
                          </div>

                          <div className="text-right">
                            <p className="text-sm font-medium">{formatPrice(item.totalPrice)}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <Separator />

                    {/* Totais */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Subtotal:</span>
                        <span>{formatPrice(cart.subtotal)}</span>
                      </div>

                      <div className="flex justify-between text-sm">
                        <span>Frete:</span>
                        <span>{formatPrice(cart.shipping)}</span>
                      </div>

                      {cart.shipping === 0 && (
                        <Badge variant="secondary" className="text-xs w-fit">
                          Frete grátis! 🎉
                        </Badge>
                      )}

                      <Separator />

                      <div className="flex justify-between text-lg font-bold">
                        <span>Total:</span>
                        <span>{formatPrice(cart.total)}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Botão Finalizar */}
                <Button
                  type="submit"
                  className="w-full"
                  size="lg"
                  disabled={cartLoading || orderLoading}
                >
                  {orderLoading ? (
                    <>
                      <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                      Processando Pedido...
                    </>
                  ) : (
                    <>
                      <CreditCard className="h-5 w-5 mr-2" />
                      Finalizar Pedido - {formatPrice(cart.total)}
                    </>
                  )}
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  Ao finalizar, você concorda com nossos termos de uso e política de privacidade.
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
