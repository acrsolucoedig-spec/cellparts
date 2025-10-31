import { useState, useEffect } from 'react';
import axios from 'axios';
import { Review, CreateReviewDto, ReviewStats, ReviewType } from '../types/review';

export const useReviews = (backendUrl: string = 'http://localhost:3000') => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getAuthHeaders = () => {
    const token = localStorage.getItem('auth_token');
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  const fetchReviews = async (filters: {
    type?: ReviewType;
    productId?: string;
    orderId?: string;
    userId?: string;
    rating?: number;
    limit?: number;
    offset?: number;
  } = {}): Promise<{ reviews: Review[]; total: number }> => {
    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams();

      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          params.append(key, String(value));
        }
      });

      const response = await axios.get<{ reviews: Review[]; total: number }>(
        `${backendUrl}/reviews?${params}`
      );

      setReviews(response.data.reviews);
      return response.data;
    } catch (err: any) {
      setError('Erro ao carregar avaliações');
      console.error('Error fetching reviews:', err);
      return { reviews: [], total: 0 };
    } finally {
      setLoading(false);
    }
  };

  const createReview = async (reviewData: CreateReviewDto): Promise<Review | null> => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post<Review>(
        `${backendUrl}/reviews`,
        reviewData,
        { headers: getAuthHeaders() }
      );
      return response.data;
    } catch (err: any) {
      if (err.response?.status === 400) {
        setError(err.response.data.message);
      } else {
        setError('Erro ao criar avaliação');
      }
      console.error('Error creating review:', err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const updateReview = async (id: string, updateData: Partial<CreateReviewDto>): Promise<Review | null> => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.patch<Review>(
        `${backendUrl}/reviews/${id}`,
        updateData,
        { headers: getAuthHeaders() }
      );
      return response.data;
    } catch (err: any) {
      setError('Erro ao atualizar avaliação');
      console.error('Error updating review:', err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const deleteReview = async (id: string): Promise<boolean> => {
    setLoading(true);
    setError(null);

    try {
      await axios.delete(`${backendUrl}/reviews/${id}`, {
        headers: getAuthHeaders(),
      });
      return true;
    } catch (err) {
      setError('Erro ao excluir avaliação');
      console.error('Error deleting review:', err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const markHelpful = async (id: string): Promise<Review | null> => {
    try {
      const response = await axios.post<Review>(`${backendUrl}/reviews/${id}/helpful`);
      return response.data;
    } catch (err) {
      console.error('Error marking review as helpful:', err);
      return null;
    }
  };

  const getReviewStats = async (productId?: string, userId?: string): Promise<ReviewStats | null> => {
    try {
      const params = new URLSearchParams();
      if (productId) params.append('productId', productId);
      if (userId) params.append('userId', userId);

      const response = await axios.get<ReviewStats>(
        `${backendUrl}/reviews/stats?${params}`
      );
      return response.data;
    } catch (err) {
      console.error('Error fetching review stats:', err);
      return null;
    }
  };

  return {
    reviews,
    loading,
    error,
    fetchReviews,
    createReview,
    updateReview,
    deleteReview,
    markHelpful,
    getReviewStats,
  };
};
