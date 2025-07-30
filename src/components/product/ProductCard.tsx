import { Plus, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Product } from '@/types/product';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  onAddToCart?: (productId: string) => void;
  size?: 'sm' | 'md' | 'lg';
}

export const ProductCard = ({ product, onAddToCart, size = 'md' }: ProductCardProps) => {
  const sizeClasses = {
    sm: 'w-40',
    md: 'w-48',
    lg: 'w-56'
  };

  const imageSizes = {
    sm: 'h-32',
    md: 'h-40',
    lg: 'h-48'
  };

  return (
    <Card className={cn(
      "shadow-card hover:shadow-product transition-shadow duration-200 border-0 overflow-hidden group",
      sizeClasses[size]
    )}>
      <CardContent className="p-0">
        {/* Product Image */}
        <div className={cn("relative overflow-hidden bg-muted", imageSizes[size])}>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          
          {/* Sale Badge */}
          {product.onSale && (
            <span className="absolute top-2 left-2 bg-sale text-sale-foreground text-xs font-medium px-2 py-1 rounded">
              Sale
            </span>
          )}
          
          {/* Featured Badge */}
          {product.featured && (
            <span className="absolute top-2 right-2 bg-accent text-accent-foreground text-xs font-medium px-2 py-1 rounded">
              Featured
            </span>
          )}
        </div>

        {/* Product Info */}
        <div className="p-3">
          {/* Brand */}
          <p className="text-xs text-muted-foreground mb-1">{product.brand}</p>
          
          {/* Product Name */}
          <h3 className="font-medium text-sm mb-2 line-clamp-2 leading-tight">
            {product.name}
          </h3>

          {/* Price */}
          <div className="flex items-center gap-2 mb-3">
            <span className="font-bold text-primary">₹{product.price}</span>
            {product.originalPrice && (
              <span className="text-xs text-muted-foreground line-through">
                ₹{product.originalPrice}
              </span>
            )}
          </div>

          {/* Add to Cart Button */}
          <Button
            onClick={() => onAddToCart?.(product.id)}
            disabled={!product.inStock}
            className="w-full h-8 text-xs font-medium"
            variant={product.inStock ? "default" : "secondary"}
          >
            {product.inStock ? (
              <>
                <Plus className="h-3 w-3 mr-1" />
                Add
              </>
            ) : (
              'Out of Stock'
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};