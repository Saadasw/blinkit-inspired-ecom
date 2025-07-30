import { useState } from 'react';
import { ChevronDown, ChevronRight, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { dummyCategories } from '@/data/mockData';
import { Category } from '@/types/product';
import { cn } from '@/lib/utils';

interface CategorySidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onCategorySelect?: (categoryId: string, subcategoryId?: string) => void;
}

export const CategorySidebar = ({ isOpen, onClose, onCategorySelect }: CategorySidebarProps) => {
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleCategoryClick = (categoryId: string) => {
    onCategorySelect?.(categoryId);
    onClose();
  };

  const handleSubcategoryClick = (categoryId: string, subcategoryId: string) => {
    onCategorySelect?.(categoryId, subcategoryId);
    onClose();
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed top-0 left-0 z-50 h-full w-80 bg-background border-r shadow-lg transform transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Categories</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-8 w-8"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Categories List */}
        <ScrollArea className="h-[calc(100vh-80px)]">
          <div className="p-2">
            {dummyCategories.map((category: Category) => (
              <div key={category.id} className="mb-2">
                <div
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-muted cursor-pointer"
                  onClick={() => toggleCategory(category.id)}
                >
                  <span
                    className="font-medium text-sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCategoryClick(category.id);
                    }}
                  >
                    {category.name}
                  </span>
                  {expandedCategories.includes(category.id) ? (
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  )}
                </div>

                {/* Subcategories */}
                {expandedCategories.includes(category.id) && (
                  <div className="ml-4 mt-1 space-y-1">
                    {category.subcategories.map((subcategory) => (
                      <div
                        key={subcategory.id}
                        className="p-2 rounded-md hover:bg-muted/50 cursor-pointer text-sm text-muted-foreground hover:text-foreground"
                        onClick={() => handleSubcategoryClick(category.id, subcategory.id)}
                      >
                        {subcategory.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    </>
  );
};