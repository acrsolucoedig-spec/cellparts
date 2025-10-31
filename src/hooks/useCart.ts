import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Cart, CartItem, AddToCartDto, UpdateCartItemDto } from '../types/cart';

export const useCart = (backendUrl: string = 'http://localhost:3000') => {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Função para obter headers de autenticação (simulado por enquanto)
  const getAuthHeaders = () => {
    const token = localStorage.getItem('auth_token');
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  const fetchCart = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get<Cart>(`${backendUrl}/cart`, {
        headers: getAuthHeaders(),
      });
      setCart(response.data);
    } catch (err: any) {
      if (err.response?.status === 401) {
        setError('Usuário não autenticado');
      } else {
        setError('Erro ao carregar carrinho');
      }
      console.error('Error fetching cart:', err);
    } finally {
      setLoading(false);
    }
  }, [backendUrl]);

  const addToCart = async (productId: string, quantity: number = 1) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post<Cart>(
        `${backendUrl}/cart/items`,
        { productId, quantity } as AddToCartDto,
        { headers: getAuthHeaders() }
      );
      setCart(response.data);
    } catch (err: any) {
      if (err.response?.status === 400) {
        setError(err.response.data.message);
      } else if (err.response?.status === 401) {
        setError('Usuário não autenticado');
      } else {
        setError('Erro ao adicionar produto ao carrinho');
      }
      console.error('Error adding to cart:', err);
    } finally {
      setLoading(false);
    }
  };

  const updateCartItem = async (itemId: string, quantity: number) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.put<Cart>(
        `${backendUrl}/cart/items/${itemId}`,
        { quantity } as UpdateCartItemDto,
        { headers: getAuthHeaders() }
      );
      setCart(response.data);
    } catch (err: any) {
      if (err.response?.status === 400) {
        setError(err.response.data.message);
      } else {
        setError('Erro ao atualizar item do carrinho');
      }
      console.error('Error updating cart item:', err);
    } finally {
      setLoading(false);
    }
  };

  const removeCartItem = async (itemId: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.delete<Cart>(
        `${backendUrl}/cart/items/${itemId}`,
        { headers: getAuthHeaders() }
      );
      setCart(response.data);
    } catch (err: any) {
      setError('Erro ao remover item do carrinho');
      console.error('Error removing cart item:', err);
    } finally {
      setLoading(false);
    }
  };

  const clearCart = async () => {
    setLoading(true);
    setError(null);

    try {
      await axios.delete(`${backendUrl}/cart`, { headers: getAuthHeaders() });
      setCart(null);
    } catch (err: any) {
      setError('Erro ao limpar carrinho');
      console.error('Error clearing cart:', err);
    } finally {
      setLoading(false);
    }
  };

  const getCartItemCount = async (): Promise<number> => {
    try {
      const response = await axios.get<{ count: number }>(
        `${backendUrl}/cart/count`,
        { headers: getAuthHeaders() }
      );
      return response.data.count;
    } catch (err) {
      console.error('Error getting cart count:', err);
      return 0;
    }
  };

  // Carregar carrinho na inicialização se houver token
  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      fetchCart();
    }
  }, [fetchCart]);

  return {
    cart,
    loading,
    error,
    fetchCart,
    addToCart,
    updateCartItem,
    removeCartItem,
    clearCart,
    getCartItemCount,
  };
};
