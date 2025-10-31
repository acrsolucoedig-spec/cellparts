import { useState, useEffect } from 'react';
import axios from 'axios';
import { Product, ProductCategory, ProductFilters } from '../types/product';

export interface ProductsResponse {
  products: Product[];
  total: number;
}

export const useProducts = (backendUrl: string = 'http://localhost:3000') => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);

  const fetchProducts = async (filters: ProductFilters = {}) => {
    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams();

      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          params.append(key, String(value));
        }
      });

      const response = await axios.get<ProductsResponse>(`${backendUrl}/products?${params}`);
      setProducts(response.data.products);
      setTotal(response.data.total);
    } catch (err: any) {
      setError('Erro ao carregar produtos. Tente novamente.');
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchProductById = async (id: string): Promise<Product | null> => {
    try {
      const response = await axios.get<Product>(`${backendUrl}/products/${id}`);
      return response.data;
    } catch (err) {
      console.error('Error fetching product:', err);
      return null;
    }
  };

  const fetchPopularProducts = async (limit: number = 10): Promise<Product[]> => {
    try {
      const response = await axios.get<Product[]>(`${backendUrl}/products/popular?limit=${limit}`);
      return response.data;
    } catch (err) {
      console.error('Error fetching popular products:', err);
      return [];
    }
  };

  const fetchPromotionalProducts = async (): Promise<Product[]> => {
    try {
      const response = await axios.get<Product[]>(`${backendUrl}/products/promotional`);
      return response.data;
    } catch (err) {
      console.error('Error fetching promotional products:', err);
      return [];
    }
  };

  const fetchProductsByCategory = async (category: ProductCategory, limit: number = 20): Promise<Product[]> => {
    try {
      const response = await axios.get<Product[]>(`${backendUrl}/products/category/${category}?limit=${limit}`);
      return response.data;
    } catch (err) {
      console.error('Error fetching products by category:', err);
      return [];
    }
  };

  return {
    products,
    loading,
    error,
    total,
    fetchProducts,
    fetchProductById,
    fetchPopularProducts,
    fetchPromotionalProducts,
    fetchProductsByCategory,
  };
};
