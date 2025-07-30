import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Card, CardContent } from '@/components/ui/card';
import { dummyBrands } from '@/data/mockData';

export const BrandTiles = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Shop by Brands</h2>
      
      <ScrollArea className="w-full whitespace-nowrap">
        <div className="flex space-x-4 pb-4">
          {dummyBrands.map((brand) => (
            <Card 
              key={brand.id} 
              className="flex-shrink-0 w-24 h-24 shadow-card hover:shadow-product transition-shadow duration-200 cursor-pointer border-0"
            >
              <CardContent className="p-0 h-full flex flex-col items-center justify-center">
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="w-12 h-6 object-contain mb-2"
                />
                <span className="text-xs font-medium text-center">{brand.name}</span>
              </CardContent>
            </Card>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};