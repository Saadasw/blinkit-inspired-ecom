import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Card, CardContent } from '@/components/ui/card';
import { ProductCard } from './ProductCard';
import { Product } from '@/types/product';

interface PromotionSectionProps {
  featuredImage: string;
  title: string;
  subtitle: string;
  topProducts: Product[];
  bottomProducts: Product[];
  onAddToCart?: (productId: string) => void;
}

export const PromotionSection = ({ 
  featuredImage, 
  title, 
  subtitle, 
  topProducts, 
  bottomProducts, 
  onAddToCart 
}: PromotionSectionProps) => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Special Offers</h2>
      
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Left Column - Featured Promotional Image */}
        <Card className="shadow-card border-0 overflow-hidden">
          <CardContent className="p-0">
            <div className="relative h-64 lg:h-80">
              <img
                src={featuredImage}
                alt={title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-6">
                <h3 className="text-white text-xl font-bold mb-2">{title}</h3>
                <p className="text-white/90 text-sm">{subtitle}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Right Column - Two Scrollable Product Rows */}
        <div className="space-y-4">
          {/* Top Row */}
          <div>
            <h3 className="text-lg font-medium mb-3">Hot Deals</h3>
            <ScrollArea className="w-full whitespace-nowrap">
              <div className="flex space-x-3 pb-2">
                {topProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={onAddToCart}
                    size="sm"
                  />
                ))}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </div>

          {/* Bottom Row */}
          <div>
            <h3 className="text-lg font-medium mb-3">Limited Time</h3>
            <ScrollArea className="w-full whitespace-nowrap">
              <div className="flex space-x-3 pb-2">
                {bottomProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={onAddToCart}
                    size="sm"
                  />
                ))}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </div>
        </div>
      </div>
    </div>
  );
};