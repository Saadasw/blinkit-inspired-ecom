import { useState } from 'react';
import { Plus, Edit, Eye, EyeOff, Trash2, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { dummyProducts, dummyCategories } from '@/data/mockData';
import { Product } from '@/types/product';
import { useToast } from '@/hooks/use-toast';

export const AdminPanel = () => {
  const [products, setProducts] = useState<Product[]>(dummyProducts);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    price: 0,
    originalPrice: 0,
    image: '',
    description: '',
    category: '',
    subcategory: '',
    brand: '',
    tags: '',
    inStock: true,
    featured: false,
    onSale: false,
    hidden: false,
  });

  const resetForm = () => {
    setFormData({
      name: '',
      price: 0,
      originalPrice: 0,
      image: '',
      description: '',
      category: '',
      subcategory: '',
      brand: '',
      tags: '',
      inStock: true,
      featured: false,
      onSale: false,
      hidden: false,
    });
    setEditingProduct(null);
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice || 0,
      image: product.image,
      description: product.description,
      category: product.category,
      subcategory: product.subcategory,
      brand: product.brand,
      tags: product.tags.join(', '),
      inStock: product.inStock,
      featured: product.featured || false,
      onSale: product.onSale || false,
      hidden: product.hidden || false,
    });
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    const productData = {
      ...formData,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0),
      originalPrice: formData.originalPrice || undefined,
    };

    if (editingProduct) {
      // Update existing product
      setProducts(prev => prev.map(p => 
        p.id === editingProduct.id 
          ? { ...p, ...productData }
          : p
      ));
      toast({
        title: "Product updated",
        description: `${productData.name} has been updated successfully.`,
      });
    } else {
      // Add new product
      const newProduct: Product = {
        id: Date.now().toString(),
        ...productData,
      };
      setProducts(prev => [...prev, newProduct]);
      toast({
        title: "Product added",
        description: `${productData.name} has been added successfully.`,
      });
    }

    setIsDialogOpen(false);
    resetForm();
  };

  const toggleVisibility = (productId: string) => {
    setProducts(prev => prev.map(p => 
      p.id === productId 
        ? { ...p, hidden: !p.hidden }
        : p
    ));
  };

  const toggleFeatured = (productId: string) => {
    setProducts(prev => prev.map(p => 
      p.id === productId 
        ? { ...p, featured: !p.featured }
        : p
    ));
  };

  const deleteProduct = (productId: string) => {
    setProducts(prev => prev.filter(p => p.id !== productId));
    toast({
      title: "Product deleted",
      description: "Product has been deleted successfully.",
    });
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Admin Panel</h1>
            <p className="text-muted-foreground">Manage your products and inventory</p>
          </div>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={resetForm}>
                <Plus className="h-4 w-4 mr-2" />
                Add Product
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingProduct ? 'Edit Product' : 'Add New Product'}
                </DialogTitle>
              </DialogHeader>
              
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Product Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="brand">Brand</Label>
                    <Input
                      id="brand"
                      value={formData.brand}
                      onChange={(e) => setFormData(prev => ({ ...prev, brand: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="price">Price (₹)</Label>
                    <Input
                      id="price"
                      type="number"
                      value={formData.price}
                      onChange={(e) => setFormData(prev => ({ ...prev, price: Number(e.target.value) }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="originalPrice">Original Price (₹)</Label>
                    <Input
                      id="originalPrice"
                      type="number"
                      value={formData.originalPrice}
                      onChange={(e) => setFormData(prev => ({ ...prev, originalPrice: Number(e.target.value) }))}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="image">Image URL</Label>
                  <Input
                    id="image"
                    value={formData.image}
                    onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
                    placeholder="/api/placeholder/300/300"
                  />
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Input
                      id="category"
                      value={formData.category}
                      onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="subcategory">Subcategory</Label>
                    <Input
                      id="subcategory"
                      value={formData.subcategory}
                      onChange={(e) => setFormData(prev => ({ ...prev, subcategory: e.target.value }))}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="tags">Tags (comma separated)</Label>
                  <Input
                    id="tags"
                    value={formData.tags}
                    onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))}
                    placeholder="fresh, organic, premium"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={formData.inStock}
                      onCheckedChange={(checked) => setFormData(prev => ({ ...prev, inStock: checked }))}
                    />
                    <Label>In Stock</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={formData.featured}
                      onCheckedChange={(checked) => setFormData(prev => ({ ...prev, featured: checked }))}
                    />
                    <Label>Featured</Label>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={formData.onSale}
                      onCheckedChange={(checked) => setFormData(prev => ({ ...prev, onSale: checked }))}
                    />
                    <Label>On Sale</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={formData.hidden}
                      onCheckedChange={(checked) => setFormData(prev => ({ ...prev, hidden: checked }))}
                    />
                    <Label>Hidden</Label>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSave}>
                  {editingProduct ? 'Update' : 'Add'} Product
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Products Grid */}
        <div className="grid gap-6">
          {products.map((product) => (
            <Card key={product.id} className="shadow-card">
              <CardContent className="p-6">
                <div className="flex gap-6">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-lg">{product.name}</h3>
                        <p className="text-sm text-muted-foreground">{product.brand}</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          {product.category} &gt; {product.subcategory}
                        </p>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => toggleVisibility(product.id)}
                        >
                          {product.hidden ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => toggleFeatured(product.id)}
                          className={product.featured ? "text-accent" : ""}
                        >
                          <Star className={`h-4 w-4 ${product.featured ? 'fill-current' : ''}`} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEdit(product)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => deleteProduct(product.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 mt-2">
                      <span className="font-bold text-primary">₹{product.price}</span>
                      {product.originalPrice && (
                        <span className="text-sm text-muted-foreground line-through">
                          ₹{product.originalPrice}
                        </span>
                      )}
                    </div>
                    
                    <div className="flex gap-2 mt-3">
                      {product.featured && <Badge variant="secondary">Featured</Badge>}
                      {product.onSale && <Badge className="bg-sale text-sale-foreground">On Sale</Badge>}
                      {product.hidden && <Badge variant="destructive">Hidden</Badge>}
                      {!product.inStock && <Badge variant="outline">Out of Stock</Badge>}
                    </div>
                    
                    <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                      {product.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {products.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <h3 className="text-lg font-medium mb-2">No products found</h3>
              <p className="text-muted-foreground mb-4">
                Start by adding your first product to the inventory
              </p>
              <Button onClick={() => setIsDialogOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add First Product
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};