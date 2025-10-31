import { useState, useEffect } from 'react';
import axios from 'axios';
import { Order, CreateOrderDto, OrderStats, OrderStatus, PaymentStatus } from '../types/order';

export const useOrders = (backendUrl: string = 'http://localhost:3000') => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getAuthHeaders = () => {
    const token = localStorage.getItem('auth_token');
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  const fetchOrders = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get<Order[]>(`${backendUrl}/orders`, {
        headers: getAuthHeaders(),
      });
      setOrders(response.data);
    } catch (err: any) {
      setError('Erro ao carregar pedidos');
      console.error('Error fetching orders:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchOrderById = async (id: string): Promise<Order | null> => {
    try {
      const response = await axios.get<Order>(`${backendUrl}/orders/${id}`, {
        headers: getAuthHeaders(),
      });
      return response.data;
    } catch (err) {
      console.error('Error fetching order:', err);
      return null;
    }
  };

  const createOrder = async (orderData: CreateOrderDto): Promise<Order | null> => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post<Order>(`${backendUrl}/orders`, orderData, {
        headers: getAuthHeaders(),
      });
      return response.data;
    } catch (err: any) {
      if (err.response?.status === 400) {
        setError(err.response.data.message);
      } else {
        setError('Erro ao criar pedido');
      }
      console.error('Error creating order:', err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const cancelOrder = async (id: string): Promise<boolean> => {
    try {
      await axios.delete(`${backendUrl}/orders/${id}`, {
        headers: getAuthHeaders(),
      });
      return true;
    } catch (err) {
      console.error('Error canceling order:', err);
      return false;
    }
  };

  const getOrderStats = async (): Promise<OrderStats | null> => {
    try {
      const response = await axios.get<OrderStats>(`${backendUrl}/orders/stats`, {
        headers: getAuthHeaders(),
      });
      return response.data;
    } catch (err) {
      console.error('Error fetching order stats:', err);
      return null;
    }
  };

  return {
    orders,
    loading,
    error,
    fetchOrders,
    fetchOrderById,
    createOrder,
    cancelOrder,
    getOrderStats,
  };
};
