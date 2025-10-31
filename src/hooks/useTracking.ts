import { useState, useEffect } from 'react';
import axios from 'axios';
import { OrderTracking, TrackingUpdateDto, LocationUpdateDto } from '../types/tracking';

export const useTracking = (backendUrl: string = 'http://localhost:3000') => {
  const [trackingHistory, setTrackingHistory] = useState<OrderTracking[]>([]);
  const [latestTracking, setLatestTracking] = useState<OrderTracking | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getAuthHeaders = () => {
    const token = localStorage.getItem('auth_token');
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  const fetchTrackingHistory = async (orderId: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get<OrderTracking[]>(
        `${backendUrl}/orders/${orderId}/tracking`,
        { headers: getAuthHeaders() }
      );
      setTrackingHistory(response.data);
    } catch (err: any) {
      setError('Erro ao carregar histórico de rastreamento');
      console.error('Error fetching tracking history:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchLatestTracking = async (orderId: string) => {
    try {
      const response = await axios.get<OrderTracking | null>(
        `${backendUrl}/orders/${orderId}/tracking/latest`,
        { headers: getAuthHeaders() }
      );
      setLatestTracking(response.data);
      return response.data;
    } catch (err) {
      console.error('Error fetching latest tracking:', err);
      return null;
    }
  };

  const addTrackingUpdate = async (orderId: string, trackingData: TrackingUpdateDto) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post<OrderTracking>(
        `${backendUrl}/orders/${orderId}/tracking`,
        trackingData,
        { headers: getAuthHeaders() }
      );

      // Atualizar o histórico local
      setTrackingHistory(prev => [...prev, response.data]);
      setLatestTracking(response.data);

      return response.data;
    } catch (err: any) {
      if (err.response?.status === 400) {
        setError(err.response.data.message);
      } else {
        setError('Erro ao adicionar atualização de rastreamento');
      }
      console.error('Error adding tracking update:', err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const updateLocation = async (orderId: string, locationData: LocationUpdateDto) => {
    return addTrackingUpdate(orderId, locationData);
  };

  const markAsDelivered = async (orderId: string) => {
    setLoading(true);
    setError(null);

    try {
      await axios.post(
        `${backendUrl}/orders/${orderId}/deliver`,
        {},
        { headers: getAuthHeaders() }
      );

      // Atualizar o status local se necessário
      // Isso pode ser feito através de um callback ou refetch
    } catch (err: any) {
      setError('Erro ao marcar pedido como entregue');
      console.error('Error marking as delivered:', err);
    } finally {
      setLoading(false);
    }
  };

  return {
    trackingHistory,
    latestTracking,
    loading,
    error,
    fetchTrackingHistory,
    fetchLatestTracking,
    addTrackingUpdate,
    updateLocation,
    markAsDelivered,
  };
};
