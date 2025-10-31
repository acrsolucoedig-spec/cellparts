export enum ProductCategory {
  ELETRONICOS = 'eletronicos',
  ROUPAS = 'roupas',
  ALIMENTOS = 'alimentos',
  CASA = 'casa',
  ESPORTES = 'esportes',
  SAUDE = 'saude',
  LIVROS = 'livros',
  OUTROS = 'outros',
}

export interface Category {
  id: string;
  name: string;
  description?: string;
  icon?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  promotionalPrice?: number;
  imageUrl?: string;
  images?: string[];
  isActive: boolean;
  stock: number;
  category: ProductCategory;
  categoryEntity?: Category;
  categoryId?: string;
  merchantId: string;
  merchant: {
    id: string;
    name: string;
    email: string;
  };
  rating: number;
  reviewCount: number;
  tags?: string[];
  viewCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface ProductFilters {
  category?: ProductCategory;
  categoryId?: string;
  merchantId?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  inStock?: boolean;
  sortBy?: 'price' | 'rating' | 'createdAt' | 'name';
  sortOrder?: 'ASC' | 'DESC';
  limit?: number;
  offset?: number;
}
