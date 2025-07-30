import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const Footer = () => {
  return (
    <footer className="bg-muted/30 border-t mt-16">
      <div className="container px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">F</span>
              </div>
              <span className="font-bold text-lg">FreshMart</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Your trusted partner for fresh groceries and daily essentials. 
              Quality products delivered to your doorstep.
            </p>
            <div className="flex space-x-2">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Instagram className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold">Quick Links</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">How it Works</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Delivery Info</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Returns Policy</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Help Center</a></li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h3 className="font-semibold">Categories</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">Fruits & Vegetables</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Dairy & Bakery</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Beverages</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Snacks</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Personal Care</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-semibold">Contact</h3>
            <div className="space-y-3 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>help@freshmart.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>Delhi, India</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2024 FreshMart. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};