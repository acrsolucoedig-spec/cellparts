export interface OrderTracking {
  id: string;
  orderId: string;
  latitude?: number;
  longitude?: number;
  address?: string;
  city?: string;
  state?: string;
  notes?: string;
  isCompleted: boolean;
  createdAt: string;
}

export interface TrackingUpdateDto {
  latitude?: number;
  longitude?: number;
  address?: string;
  city?: string;
  state?: string;
  notes?: string;
}

export interface LocationUpdateDto {
  latitude: number;
  longitude: number;
}
