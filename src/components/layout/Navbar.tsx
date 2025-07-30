import { ShoppingCart, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/useCart';
import { useNavigate } from 'react-router-dom';

interface NavbarProps {
  onToggleSidebar: () => void;
  cartItemCount?: number;
}

export const Navbar = ({ onToggleSidebar, cartItemCount = 0 }: NavbarProps) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Hamburger Menu */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleSidebar}
          className="h-10 w-10"
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>

        {/* Brand Logo & Name */}
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">F</span>
          </div>
          <span className="font-bold text-lg tracking-tight">FreshMart</span>
        </div>

        {/* Cart Icon */}
        <Button
          variant="ghost"
          size="icon"
          className="relative h-10 w-10"
        >
          <ShoppingCart className="h-5 w-5" />
          {cartItemCount > 0 && (
            <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-medium">
              {cartItemCount > 99 ? '99+' : cartItemCount}
            </span>
          )}
          <span className="sr-only">Shopping cart</span>
        </Button>
      </div>
    </header>
  );
};