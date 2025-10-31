import { User } from './user';

export enum OrderStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  PREPARING = 'preparing',
  READY = 'ready',
  IN_TRANSIT = 'in_transit',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled',
  PROBLEM = 'problem',
}

export enum PaymentMethod {
  CREDIT_CARD = 'credit_card',
  DEBIT_CARD = 'debit_card',
  PIX = 'pix',
  BANK_SLIP = 'bank_slip',
  CASH = 'cash',
}

export enum PaymentStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  REFUNDED = 'refunded',
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  productName: string;
  productPrice: number;
  productPromotionalPrice?: number;
  productImageUrl?: string;
  quantity: number;
  totalPrice: number;
  createdAt: string;
  updatedAt: string;
}

export interface Order {
  id: string;
  customerId: string;
  customer?: User;
  driverId?: string;
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  deliveryAddress: string;
  deliveryNumber: string;
  deliveryComplement?: string;
  deliveryNeighborhood: string;
  deliveryCity: string;
  deliveryState: string;
  deliveryZipCode: string;
  recipientName: string;
  recipientPhone: string;
  notes?: string;
  items: OrderItem[];
  estimatedDeliveryTime?: string;
  actualDeliveryTime?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateOrderDto {
  paymentMethod: PaymentMethod;
  deliveryAddress: string;
  deliveryNumber: string;
  deliveryComplement?: string;
  deliveryNeighborhood: string;
  deliveryCity: string;
  deliveryState: string;
  deliveryZipCode: string;
  recipientName: string;
  recipientPhone: string;
  notes?: string;
}

export interface OrderStats {
  totalOrders: number;
  totalRevenue: number;
  averageOrderValue: number;
}
