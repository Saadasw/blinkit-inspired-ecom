import { useState } from 'react';
import { Search } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { CategorySidebar } from '@/components/layout/CategorySidebar';
import { Footer } from '@/components/layout/Footer';
import { ProductCard } from '@/components/product/ProductCard';
import { Input } from '@/components/ui/input';
import { useCart } from '@/hooks/useCart';
import { dummyProducts } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';

export const ProductListing = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
  
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
    setSelectedCategory(categoryId);
    setSelectedSubcategory(subcategoryId || null);
  };

  // Filter products based on search and category
  const filteredProducts = dummyProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.brand.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = !selectedCategory || product.category === selectedCategory;
    const matchesSubcategory = !selectedSubcategory || product.subcategory === selectedSubcategory;
    
    return matchesSearch && matchesCategory && matchesSubcategory && !product.hidden;
  });

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

      <main className="container px-4 py-6">
        {/* Search Bar */}
        <div className="relative mb-8">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search for products, brands..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-12 text-base"
          />
        </div>

        {/* Category Breadcrumb */}
        {(selectedCategory || selectedSubcategory) && (
          <div className="mb-6 text-sm text-muted-foreground">
            <span 
              className="cursor-pointer hover:text-foreground"
              onClick={() => {
                setSelectedCategory(null);
                setSelectedSubcategory(null);
              }}
            >
              All Products
            </span>
            {selectedCategory && (
              <>
                <span className="mx-2">/</span>
                <span 
                  className="cursor-pointer hover:text-foreground"
                  onClick={() => setSelectedSubcategory(null)}
                >
                  {selectedCategory}
                </span>
              </>
            )}
            {selectedSubcategory && (
              <>
                <span className="mx-2">/</span>
                <span className="text-foreground font-medium">{selectedSubcategory}</span>
              </>
            )}
          </div>
        )}

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-muted-foreground">
            {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-12">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
              size="md"
            />
          ))}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium mb-2">No products found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search or browse our categories
            </p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};