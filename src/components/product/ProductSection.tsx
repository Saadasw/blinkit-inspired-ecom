import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { ProductCard } from './ProductCard';
import { Product } from '@/types/product';

interface ProductSectionProps {
  title: string;
  products: Product[];
  onAddToCart?: (productId: string) => void;
}

export const ProductSection = ({ title, products, onAddToCart }: ProductSectionProps) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">{title}</h2>
      
      <ScrollArea className="w-full whitespace-nowrap">
        <div className="flex space-x-4 pb-4">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
              size="md"
            />
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};