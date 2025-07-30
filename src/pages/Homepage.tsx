import { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { CategorySidebar } from '@/components/layout/CategorySidebar';
import { Footer } from '@/components/layout/Footer';
import { HeroSlider } from '@/components/product/HeroSlider';
import { BrandTiles } from '@/components/product/BrandTiles';
import { ProductSection } from '@/components/product/ProductSection';
import { FeaturedProductSection } from '@/components/product/FeaturedProductSection';
import { PromotionSection } from '@/components/product/PromotionSection';
import { useCart } from '@/hooks/useCart';
import { dummyProducts, promoBanner } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';

export const Homepage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { addToCart, getCartTotal } = useCart();
  const { toast } = useToast();

  const handleAddToCart = (productId: string) => {
    addToCart(productId);
    const product = dummyProducts.find(p => p.id === productId);
    toast({
      title: "Added to cart",
      description: `${product?.name} has been added to your cart.`,
    });
  };

  const handleCategorySelect = (categoryId: string, subcategoryId?: string) => {
    // Navigate to product listing page with filters
    console.log('Category selected:', categoryId, subcategoryId);
  };

  // Filter products for different sections
  const featuredProducts = dummyProducts.filter(p => p.featured);
  const saleProducts = dummyProducts.filter(p => p.onSale);
  const freshFruits = dummyProducts.filter(p => p.subcategory === 'Fresh Fruits');
  const beverages = dummyProducts.filter(p => p.category === 'Beverages');

  return (
    <div className="min-h-screen bg-background">
      <Navbar 
        onToggleSidebar={() => setSidebarOpen(true)}
        cartItemCount={getCartTotal()}
      />
      
      <CategorySidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onCategorySelect={handleCategorySelect}
      />

      <main className="container px-4 py-6 space-y-12">
        {/* 1. Hero Slider */}
        <HeroSlider />

        {/* 2. Brand Tiles */}
        <BrandTiles />

        {/* 3. Fresh Fruits Section */}
        <ProductSection
          title="Fresh Fruits"
          products={freshFruits}
          onAddToCart={handleAddToCart}
        />

        {/* 4. Featured Product */}
        {featuredProducts[0] && (
          <FeaturedProductSection
            product={featuredProducts[0]}
            onAddToCart={handleAddToCart}
          />
        )}

        {/* 5. Beverages Section */}
        <ProductSection
          title="Refreshing Beverages"
          products={beverages}
          onAddToCart={handleAddToCart}
        />

        {/* 6. Promotion Section */}
        <PromotionSection
          featuredImage={promoBanner}
          title="Weekend Special"
          subtitle="Up to 30% off on selected items"
          topProducts={saleProducts.slice(0, 4)}
          bottomProducts={featuredProducts.slice(1, 5)}
          onAddToCart={handleAddToCart}
        />
      </main>

      <Footer />
    </div>
  );
};