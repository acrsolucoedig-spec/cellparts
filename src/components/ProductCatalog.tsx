import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loader2, Search, Star, ShoppingCart, Filter } from 'lucide-react';
import { useProducts } from '@/hooks/useProducts';
import { Product, ProductCategory, ProductFilters } from '@/types/product';
import { useCart } from '@/hooks/useCart';

interface ProductCatalogProps {
  className?: string;
  showFilters?: boolean;
  initialFilters?: Partial<ProductFilters>;
}

export const ProductCatalog = ({ className, showFilters = true, initialFilters }: ProductCatalogProps) => {
  const { products, loading, error, total, fetchProducts } = useProducts();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [filters, setFilters] = useState<ProductFilters>({
    limit: 20,
    offset: 0,
    ...initialFilters,
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilterPanel, setShowFilterPanel] = useState(false);

  useEffect(() => {
    fetchProducts(filters);
  }, [filters]);

  const handleSearch = () => {
    setFilters(prev => ({ ...prev, search: searchTerm, offset: 0 }));
  };

  const handleFilterChange = (key: keyof ProductFilters, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value, offset: 0 }));
  };

  const clearFilters = () => {
    setFilters({
      limit: 20,
      offset: 0,
      ...initialFilters,
    });
    setSearchTerm('');
  };

  const loadMore = () => {
    setFilters(prev => ({ ...prev, offset: prev.offset! + prev.limit! }));
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price);
  };

  const getCategoryLabel = (category: ProductCategory) => {
    const labels = {
      [ProductCategory.ELETRONICOS]: 'Eletrônicos',
      [ProductCategory.ROUPAS]: 'Roupas',
      [ProductCategory.ALIMENTOS]: 'Alimentos',
      [ProductCategory.CASA]: 'Casa',
      [ProductCategory.ESPORTES]: 'Esportes',
      [ProductCategory.SAUDE]: 'Saúde',
      [ProductCategory.LIVROS]: 'Livros',
      [ProductCategory.OUTROS]: 'Outros',
    };
    return labels[category] || category;
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-destructive">{error}</p>
        <Button onClick={() => fetchProducts(filters)} className="mt-4">
          Tentar Novamente
        </Button>
      </div>
    );
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Search and Filters */}
      {showFilters && (
        <div className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Input
                placeholder="Buscar produtos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                className="pr-10"
              />
              <Button
                size="sm"
                onClick={handleSearch}
                className="absolute right-1 top-1 h-8 w-8 p-0"
              >
                <Search className="h-4 w-4" />
              </Button>
            </div>
            <Button
              variant="outline"
              onClick={() => setShowFilterPanel(!showFilterPanel)}
            >
              <Filter className="h-4 w-4 mr-2" />
              Filtros
            </Button>
          </div>

          {showFilterPanel && (
            <Card className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="text-sm font-medium">Categoria</label>
                  <Select
                    value={filters.category || ''}
                    onValueChange={(value) => handleFilterChange('category', value || undefined)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Todas as categorias" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Todas as categorias</SelectItem>
                      {Object.values(ProductCategory).map((category) => (
                        <SelectItem key={category} value={category}>
                          {getCategoryLabel(category)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium">Ordenar por</label>
                  <Select
                    value={filters.sortBy || 'createdAt'}
                    onValueChange={(value) => handleFilterChange('sortBy', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="createdAt">Mais recentes</SelectItem>
                      <SelectItem value="price">Preço</SelectItem>
                      <SelectItem value="rating">Avaliação</SelectItem>
                      <SelectItem value="name">Nome</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium">Ordem</label>
                  <Select
                    value={filters.sortOrder || 'DESC'}
                    onValueChange={(value) => handleFilterChange('sortOrder', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ASC">Crescente</SelectItem>
                      <SelectItem value="DESC">Decrescente</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-end">
                  <Button variant="outline" onClick={clearFilters}>
                    Limpar Filtros
                  </Button>
                </div>
              </div>
            </Card>
          )}
        </div>
      )}

      {/* Products Grid */}
      {loading && products.length === 0 ? (
        <div className="flex justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : (
        <>
          <div className="text-sm text-muted-foreground">
            {total} produto{total !== 1 ? 's' : ''} encontrado{total !== 1 ? 's' : ''}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <Card
                key={product.id}
                className="group hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => navigate(`/product/${product.id}`)}
              >
                <CardHeader className="p-0">
                  <div className="aspect-square bg-muted rounded-t-lg overflow-hidden">
                    {product.imageUrl ? (
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                        Sem imagem
                      </div>
                    )}
                  </div>
                </CardHeader>

                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <Badge variant="secondary" className="text-xs">
                      {getCategoryLabel(product.category)}
                    </Badge>
                    <div className="flex items-center gap-1">
                      {renderStars(product.rating)}
                      <span className="text-xs text-muted-foreground ml-1">
                        ({product.reviewCount})
                      </span>
                    </div>
                  </div>

                  <CardTitle className="text-lg mb-2 line-clamp-2">
                    {product.name}
                  </CardTitle>

                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                    {product.description}
                  </p>

                  <div className="flex items-center gap-1 mb-3">
                    {renderStars(product.rating)}
                    <span className="text-sm text-muted-foreground ml-1">
                      {product.rating.toFixed(1)} ({product.reviewCount} avaliações)
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      {product.promotionalPrice ? (
                        <>
                          <div className="text-lg font-bold text-primary">
                            {formatPrice(product.promotionalPrice)}
                          </div>
                          <div className="text-sm text-muted-foreground line-through">
                            {formatPrice(product.price)}
                          </div>
                        </>
                      ) : (
                        <div className="text-lg font-bold text-primary">
                          {formatPrice(product.price)}
                        </div>
                      )}
                    </div>

                    <Badge variant={product.stock > 0 ? 'default' : 'destructive'}>
                      {product.stock > 0 ? `${product.stock} em estoque` : 'Esgotado'}
                    </Badge>
                  </div>
                </CardContent>

                <CardFooter className="p-4 pt-0">
                  <Button
                    className="w-full"
                    disabled={product.stock === 0}
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(product.id);
                    }}
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    {product.stock > 0 ? 'Adicionar ao Carrinho' : 'Indisponível'}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          {products.length < total && (
            <div className="text-center py-8">
              <Button onClick={loadMore} disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Carregando...
                  </>
                ) : (
                  'Carregar Mais'
                )}
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
};
