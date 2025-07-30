import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Minus, ShoppingCart } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { CategorySidebar } from '@/components/layout/CategorySidebar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useCart } from '@/hooks/useCart';
import { dummyProducts } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';

export const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  
  const { addToCart, getCartTotal } = useCart();
  const { toast } = useToast();

  const product = dummyProducts.find(p => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Product not found</h1>
          <Button onClick={() => navigate('/')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product.id, quantity, selectedOptions);
    toast({
      title: "Added to cart",
      description: `${quantity} x ${product.name} added to your cart.`,
    });
  };

  const handleCategorySelect = (categoryId: string, subcategoryId?: string) => {
    navigate(`/products?category=${categoryId}${subcategoryId ? `&subcategory=${subcategoryId}` : ''}`);
  };

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
        {/* Back Button */}
        <Button 
          variant="ghost" 
          onClick={() => navigate(-1)}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Product Image */}
          <div className="space-y-4">
            <Card className="shadow-card border-0 overflow-hidden">
              <CardContent className="p-0">
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  {product.onSale && (
                    <span className="absolute top-4 left-4 bg-sale text-sale-foreground text-sm font-medium px-3 py-1 rounded">
                      Sale
                    </span>
                  )}
                  {product.featured && (
                    <span className="absolute top-4 right-4 bg-accent text-accent-foreground text-sm font-medium px-3 py-1 rounded">
                      Featured
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            {/* Product Info */}
            <div>
              <p className="text-sm text-muted-foreground mb-2">{product.brand}</p>
              <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
              
              <div className="flex items-center gap-4 mb-4">
                <span className="text-3xl font-bold text-primary">₹{product.price}</span>
                {product.originalPrice && (
                  <span className="text-lg text-muted-foreground line-through">
                    ₹{product.originalPrice}
                  </span>
                )}
                {product.onSale && product.originalPrice && (
                  <span className="text-sm bg-sale text-sale-foreground px-2 py-1 rounded font-medium">
                    {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                  </span>
                )}
              </div>

              <p className="text-muted-foreground leading-relaxed mb-6">
                {product.description}
              </p>

              {/* Category & Tags */}
              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-2 text-sm">
                  <span className="font-medium">Category:</span>
                  <span className="text-muted-foreground">{product.category} &gt; {product.subcategory}</span>
                </div>
                {product.tags.length > 0 && (
                  <div className="flex items-center gap-2 text-sm">
                    <span className="font-medium">Tags:</span>
                    <div className="flex gap-1">
                      {product.tags.map((tag, index) => (
                        <span key={index} className="bg-muted text-muted-foreground px-2 py-1 rounded text-xs">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Options */}
            {product.options?.map((option) => (
              <div key={option.name} className="space-y-2">
                <label className="text-sm font-medium">
                  {option.name} {option.required && <span className="text-destructive">*</span>}
                </label>
                <div className="flex flex-wrap gap-2">
                  {option.values.map((value) => (
                    <Button
                      key={value}
                      variant={selectedOptions[option.name] === value ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedOptions(prev => ({ ...prev, [option.name]: value }))}
                    >
                      {value}
                    </Button>
                  ))}
                </div>
              </div>
            ))}

            {/* Quantity Selector */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Quantity</label>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Add to Cart */}
            <div className="space-y-4">
              <Button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="w-full"
                size="lg"
              >
                {product.inStock ? (
                  <>
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add to Cart - ₹{product.price * quantity}
                  </>
                ) : (
                  'Out of Stock'
                )}
              </Button>

              {/* Stock Status */}
              <p className="text-sm text-center">
                {product.inStock ? (
                  <span className="text-success">✓ In Stock</span>
                ) : (
                  <span className="text-destructive">✗ Out of Stock</span>
                )}
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};