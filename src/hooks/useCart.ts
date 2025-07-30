import { useState } from 'react';
import { CartItem } from '@/types/product';

export const useCart = () => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (productId: string, quantity: number = 1, selectedOptions?: Record<string, string>) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => 
        item.productId === productId && 
        JSON.stringify(item.selectedOptions) === JSON.stringify(selectedOptions)
      );
      
      if (existingItem) {
        return prevCart.map(item =>
          item.productId === productId && 
          JSON.stringify(item.selectedOptions) === JSON.stringify(selectedOptions)
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      
      return [...prevCart, { productId, quantity, selectedOptions }];
    });
  };

  const removeFromCart = (productId: string, selectedOptions?: Record<string, string>) => {
    setCart(prevCart => 
      prevCart.filter(item => 
        !(item.productId === productId && 
          JSON.stringify(item.selectedOptions) === JSON.stringify(selectedOptions))
      )
    );
  };

  const updateQuantity = (productId: string, quantity: number, selectedOptions?: Record<string, string>) => {
    if (quantity <= 0) {
      removeFromCart(productId, selectedOptions);
      return;
    }
    
    setCart(prevCart =>
      prevCart.map(item =>
        item.productId === productId && 
        JSON.stringify(item.selectedOptions) === JSON.stringify(selectedOptions)
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  return {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
  };
};