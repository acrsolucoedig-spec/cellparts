import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Star, Loader2, Upload } from 'lucide-react';
import { useReviews } from '@/hooks/useReviews';
import { CreateReviewDto, ReviewType } from '@/types/review';

interface CreateReviewProps {
  type: ReviewType;
  productId?: string;
  orderId?: string;
  onReviewCreated?: () => void;
  onCancel?: () => void;
  className?: string;
}

export const CreateReview = ({
  type,
  productId,
  orderId,
  onReviewCreated,
  onCancel,
  className
}: CreateReviewProps) => {
  const { createReview, loading, error } = useReviews();
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState('');
  const [photos, setPhotos] = useState<File[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (rating === 0) {
      alert('Por favor, selecione uma avaliação em estrelas');
      return;
    }

    const reviewData: CreateReviewDto = {
      type,
      productId,
      orderId,
      rating,
      comment: comment.trim() || undefined,
      // TODO: Implementar upload de fotos
      // photos: photos.length > 0 ? photoUrls : undefined,
    };

    const review = await createReview(reviewData);

    if (review) {
      onReviewCreated?.();
    }
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setPhotos(prev => [...prev, ...files].slice(0, 5)); // Máximo 5 fotos
  };

  const removePhoto = (index: number) => {
    setPhotos(prev => prev.filter((_, i) => i !== index));
  };

  const getTypeTitle = () => {
    switch (type) {
      case ReviewType.PRODUCT:
        return 'Avaliar Produto';
      case ReviewType.ORDER:
        return 'Avaliar Pedido';
      case ReviewType.DELIVERY:
        return 'Avaliar Entrega';
      default:
        return 'Criar Avaliação';
    }
  };

  const getTypeDescription = () => {
    switch (type) {
      case ReviewType.PRODUCT:
        return 'Conte-nos sua opinião sobre este produto';
      case ReviewType.ORDER:
        return 'Como foi sua experiência com este pedido?';
      case ReviewType.DELIVERY:
        return 'Avalie o serviço de entrega';
      default:
        return 'Compartilhe sua avaliação';
    }
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{getTypeTitle()}</CardTitle>
        <p className="text-muted-foreground">{getTypeDescription()}</p>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Rating */}
          <div className="space-y-2">
            <Label>Sua avaliação</Label>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  className="p-1 hover:scale-110 transition-transform"
                >
                  <Star
                    className={`h-8 w-8 ${
                      star <= (hoveredRating || rating)
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                </button>
              ))}
              <span className="ml-2 text-sm text-muted-foreground">
                {rating > 0 && `${rating} de 5 estrelas`}
              </span>
            </div>
          </div>

          {/* Comment */}
          <div className="space-y-2">
            <Label htmlFor="comment">
              Comentário <span className="text-muted-foreground">(opcional)</span>
            </Label>
            <Textarea
              id="comment"
              placeholder="Conte-nos mais sobre sua experiência..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={4}
              maxLength={500}
            />
            <div className="text-right text-sm text-muted-foreground">
              {comment.length}/500 caracteres
            </div>
          </div>

          {/* Photos */}
          <div className="space-y-2">
            <Label>Fotos <span className="text-muted-foreground">(opcional, máximo 5)</span></Label>
            <div className="flex flex-wrap gap-2">
              {photos.map((photo, index) => (
                <div key={index} className="relative">
                  <img
                    src={URL.createObjectURL(photo)}
                    alt={`Preview ${index + 1}`}
                    className="w-20 h-20 object-cover rounded border"
                  />
                  <button
                    type="button"
                    onClick={() => removePhoto(index)}
                    className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-destructive/90"
                  >
                    ×
                  </button>
                </div>
              ))}

              {photos.length < 5 && (
                <label className="w-20 h-20 border-2 border-dashed border-muted-foreground/25 rounded flex items-center justify-center cursor-pointer hover:border-primary/50 transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                  <Upload className="h-6 w-6 text-muted-foreground" />
                </label>
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              Adicione fotos do produto, embalagem ou experiência
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-3 bg-destructive/10 border border-destructive/20 rounded text-destructive text-sm">
              {error}
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button type="submit" disabled={loading || rating === 0}>
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Enviando...
                </>
              ) : (
                'Enviar Avaliação'
              )}
            </Button>

            {onCancel && (
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancelar
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
