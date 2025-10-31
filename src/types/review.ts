import { User } from './user';
import { Product } from './product';
import { Order } from './order';

export enum ReviewType {
  PRODUCT = 'product',
  ORDER = 'order',
  DELIVERY = 'delivery',
}

export interface Review {
  id: string;
  type: ReviewType;
  userId: string;
  user?: User;
  productId?: string;
  product?: Product;
  orderId?: string;
  order?: Order;
  rating: number;
  comment?: string;
  photos?: string[];
  isVisible: boolean;
  helpful: number;
  metadata?: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}

export interface CreateReviewDto {
  type: ReviewType;
  productId?: string;
  orderId?: string;
  rating: number;
  comment?: string;
  photos?: string[];
  metadata?: Record<string, any>;
}

export interface ReviewStats {
  totalReviews: number;
  averageRating: number;
  minRating: number;
  maxRating: number;
  starDistribution: Record<number, number>;
}
