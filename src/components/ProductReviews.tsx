import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Star, ThumbsUp, MessageSquare, User } from 'lucide-react';
import { useReviews } from '@/hooks/useReviews';
import { Review, ReviewStats, ReviewType } from '@/types/review';

interface ProductReviewsProps {
  productId: string;
  className?: string;
}

export const ProductReviews = ({ productId, className }: ProductReviewsProps) => {
  const { reviews, loading, error, fetchReviews, getReviewStats, markHelpful } = useReviews();
  const [stats, setStats] = useState<ReviewStats | null>(null);

  useEffect(() => {
    fetchReviews({ productId, type: ReviewType.PRODUCT, limit: 10 });
    getReviewStats(productId).then(setStats);
  }, [productId, fetchReviews, getReviewStats]);

  const renderStars = (rating: number, size: 'sm' | 'md' = 'sm') => {
    const starSize = size === 'sm' ? 'h-4 w-4' : 'h-5 w-5';
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`${starSize} ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const handleMarkHelpful = async (reviewId: string) => {
    await markHelpful(reviewId);
    // Recarregar reviews para atualizar contadores
    fetchReviews({ productId, type: ReviewType.PRODUCT, limit: 10 });
  };

  if (loading && reviews.length === 0) {
    return (
      <div className={`space-y-4 ${className}`}>
        <div className="animate-pulse space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <Card key={i}>
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-muted rounded-full"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-muted rounded w-1/4"></div>
                    <div className="h-3 bg-muted rounded w-1/2"></div>
                    <div className="h-3 bg-muted rounded w-3/4"></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`text-center py-8 ${className}`}>
        <p className="text-muted-foreground">{error}</p>
        <Button
          variant="outline"
          onClick={() => {
            fetchReviews({ productId, type: ReviewType.PRODUCT, limit: 10 });
            getReviewStats(productId).then(setStats);
          }}
          className="mt-4"
        >
          Tentar Novamente
        </Button>
      </div>
    );
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Estatísticas */}
      {stats && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-400" />
              Avaliações dos Clientes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-3xl font-bold text-primary">
                  {stats.averageRating.toFixed(1)}
                </div>
                <div className="flex justify-center mb-1">
                  {renderStars(Math.floor(stats.averageRating), 'md')}
                </div>
                <div className="text-sm text-muted-foreground">
                  Média geral
                </div>
              </div>

              <div>
                <div className="text-3xl font-bold">{stats.totalReviews}</div>
                <div className="text-sm text-muted-foreground">
                  Avaliações
                </div>
              </div>

              <div>
                <div className="text-3xl font-bold">{stats.starDistribution[5] || 0}</div>
                <div className="flex justify-center mb-1">
                  {renderStars(5)}
                </div>
                <div className="text-sm text-muted-foreground">
                  5 estrelas
                </div>
              </div>

              <div>
                <div className="text-3xl font-bold">{stats.starDistribution[4] || 0}</div>
                <div className="flex justify-center mb-1">
                  {renderStars(4)}
                </div>
                <div className="text-sm text-muted-foreground">
                  4 estrelas
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Lista de Avaliações */}
      <div className="space-y-4">
        {reviews.map((review) => (
          <Card key={review.id}>
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={review.user?.avatar} />
                  <AvatarFallback>
                    <User className="h-5 w-5" />
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">
                        {review.user?.name || 'Usuário'}
                      </span>
                      <div className="flex items-center gap-1">
                        {renderStars(review.rating)}
                        <span className="text-sm text-muted-foreground ml-1">
                          {review.rating}/5
                        </span>
                      </div>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {formatDate(review.createdAt)}
                    </span>
                  </div>

                  {review.comment && (
                    <p className="text-muted-foreground mb-3 leading-relaxed">
                      {review.comment}
                    </p>
                  )}

                  {review.photos && review.photos.length > 0 && (
                    <div className="flex gap-2 mb-3 overflow-x-auto">
                      {review.photos.map((photo, index) => (
                        <img
                          key={index}
                          src={photo}
                          alt={`Foto da avaliação ${index + 1}`}
                          className="w-20 h-20 object-cover rounded flex-shrink-0"
                        />
                      ))}
                    </div>
                  )}

                  <div className="flex items-center gap-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleMarkHelpful(review.id)}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <ThumbsUp className="h-4 w-4 mr-1" />
                      Útil ({review.helpful})
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {reviews.length === 0 && (
          <Card>
            <CardContent className="text-center py-8">
              <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">
                Ainda não há avaliações para este produto.
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Seja o primeiro a avaliar!
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};
