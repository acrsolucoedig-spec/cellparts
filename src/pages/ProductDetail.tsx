import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Star, ShoppingCart, ArrowLeft, Heart, Share2 } from 'lucide-react';
import { useProducts } from '@/hooks/useProducts';
import { useCart } from '@/hooks/useCart';
import { ProductReviews } from '@/components/ProductReviews';
import { CreateReview } from '@/components/CreateReview';
import { Product, ProductCategory } from '@/types/product';
import PageHeader from '@/components/PageHeader';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { fetchProductById } = useProducts();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [showReviewForm, setShowReviewForm] = useState(false);

  useEffect(() => {
    const loadProduct = async () => {
      if (id) {
        const productData = await fetchProductById(id);
        setProduct(productData);
      }
      setLoading(false);
    };

    loadProduct();
  }, [id, fetchProductById]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-5 w-5 ${
          i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black via-black to-green-950 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Carregando produto...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black via-black to-green-950 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Produto não encontrado</h1>
          <Button onClick={() => navigate('/cliente')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar ao Catálogo
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-black to-green-950">
      <div className="container mx-auto px-4 py-8">
        <PageHeader />

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Imagem do Produto */}
            <div className="space-y-4">
              <div className="aspect-square bg-muted rounded-lg overflow-hidden">
                {product.imageUrl ? (
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                    Sem imagem
                  </div>
                )}
              </div>

              {/* Galeria de imagens adicionais (placeholder) */}
              {product.images && product.images.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {product.images.slice(1).map((image, index) => (
                    <div key={index} className="aspect-square bg-muted rounded overflow-hidden">
                      <img
                        src={image}
                        alt={`${product.name} ${index + 2}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Informações do Produto */}
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="secondary">{getCategoryLabel(product.category)}</Badge>
                  {product.stock > 0 ? (
                    <Badge variant="default">{product.stock} em estoque</Badge>
                  ) : (
                    <Badge variant="destructive">Esgotado</Badge>
                  )}
                </div>

                <h1 className="text-3xl font-bold mb-4">{product.name}</h1>

                <div className="flex items-center gap-2 mb-4">
                  {renderStars(product.rating)}
                  <span className="text-muted-foreground">
                    {product.rating.toFixed(1)} ({product.reviewCount} avaliações)
                  </span>
                </div>

                <div className="space-y-2 mb-6">
                  {product.promotionalPrice ? (
                    <>
                      <div className="text-3xl font-bold text-primary">
                        {formatPrice(product.promotionalPrice)}
                      </div>
                      <div className="text-lg text-muted-foreground line-through">
                        {formatPrice(product.price)}
                      </div>
                      <Badge variant="secondary" className="text-green-600">
                        Economia de {formatPrice(product.price - product.promotionalPrice)}
                      </Badge>
                    </>
                  ) : (
                    <div className="text-3xl font-bold text-primary">
                      {formatPrice(product.price)}
                    </div>
                  )}
                </div>

                <div className="flex gap-3">
                  <Button
                    className="flex-1"
                    disabled={product.stock === 0}
                    onClick={() => addToCart(product.id)}
                  >
                    <ShoppingCart className="h-5 w-5 mr-2" />
                    {product.stock > 0 ? 'Adicionar ao Carrinho' : 'Indisponível'}
                  </Button>

                  <Button variant="outline" size="icon">
                    <Heart className="h-5 w-5" />
                  </Button>

                  <Button variant="outline" size="icon">
                    <Share2 className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-lg font-semibold mb-2">Descrição</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {product.description}
                </p>
              </div>

              <Separator />

              <div>
                <h3 className="text-lg font-semibold mb-2">Informações do Vendedor</h3>
                <p className="text-muted-foreground">
                  Vendido por: {product.merchant?.name || 'ACR Marketplace'}
                </p>
              </div>
            </div>
          </div>

          {/* Tabs de Conteúdo */}
          <Tabs defaultValue="reviews" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="reviews">Avaliações ({product.reviewCount})</TabsTrigger>
              <TabsTrigger value="details">Detalhes</TabsTrigger>
            </TabsList>

            <TabsContent value="reviews" className="space-y-6">
              {showReviewForm ? (
                <CreateReview
                  type="product"
                  productId={product.id}
                  onReviewCreated={() => {
                    setShowReviewForm(false);
                    // Recarregar dados do produto para atualizar rating
                    window.location.reload();
                  }}
                  onCancel={() => setShowReviewForm(false)}
                />
              ) : (
                <div className="text-center">
                  <Button onClick={() => setShowReviewForm(true)}>
                    Escrever Avaliação
                  </Button>
                </div>
              )}

              <ProductReviews productId={product.id} />
            </TabsContent>

            <TabsContent value="details" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Especificações do Produto</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <span className="font-medium">Categoria:</span>
                      <p className="text-muted-foreground">{getCategoryLabel(product.category)}</p>
                    </div>

                    <div>
                      <span className="font-medium">Estoque:</span>
                      <p className="text-muted-foreground">{product.stock} unidades</p>
                    </div>

                    <div>
                      <span className="font-medium">Avaliação:</span>
                      <div className="flex items-center gap-2">
                        {renderStars(product.rating)}
                        <span className="text-muted-foreground">
                          {product.rating.toFixed(1)} ({product.reviewCount} avaliações)
                        </span>
                      </div>
                    </div>

                    <div>
                      <span className="font-medium">Visto:</span>
                      <p className="text-muted-foreground">{product.viewCount} vezes</p>
                    </div>
                  </div>

                  {product.tags && product.tags.length > 0 && (
                    <div>
                      <span className="font-medium">Tags:</span>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {product.tags.map((tag, index) => (
                          <Badge key={index} variant="outline">{tag}</Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
