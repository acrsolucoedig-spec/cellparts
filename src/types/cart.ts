import { Product } from './product';

export interface CartItem {
  id: string;
  cartId: string;
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

export interface Cart {
  id: string;
  userId: string;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  total: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AddToCartDto {
  productId: string;
  quantity: number;
}

export interface UpdateCartItemDto {
  quantity: number;
}
