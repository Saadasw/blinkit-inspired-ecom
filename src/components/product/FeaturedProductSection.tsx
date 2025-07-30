import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Plus } from 'lucide-react';
import { Product } from '@/types/product';

interface FeaturedProductSectionProps {
  product: Product;
  onAddToCart?: (productId: string) => void;
}

export const FeaturedProductSection = ({ product, onAddToCart }: FeaturedProductSectionProps) => {
  return (
    <Card className="shadow-card border-0 overflow-hidden">
      <CardContent className="p-0">
        <div className="grid md:grid-cols-2 gap-0">
          {/* Product Image */}
          <div className="relative h-64 md:h-80 overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {product.onSale && (
              <span className="absolute top-4 left-4 bg-sale text-sale-foreground text-sm font-medium px-3 py-1 rounded">
                Special Offer
              </span>
            )}
          </div>

          {/* Product Details */}
          <div className="p-6 md:p-8 flex flex-col justify-center">
            <p className="text-sm text-muted-foreground mb-2">{product.brand}</p>
            <h3 className="text-2xl md:text-3xl font-bold mb-4">{product.name}</h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              {product.description}
            </p>
            
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl font-bold text-primary">₹{product.price}</span>
              {product.originalPrice && (
                <span className="text-lg text-muted-foreground line-through">
                  ₹{product.originalPrice}
                </span>
              )}
            </div>

            <Button
              onClick={() => onAddToCart?.(product.id)}
              disabled={!product.inStock}
              className="w-full md:w-auto"
              size="lg"
            >
              {product.inStock ? (
                <>
                  <Plus className="h-4 w-4 mr-2" />
                  Add to Cart
                </>
              ) : (
                'Out of Stock'
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};