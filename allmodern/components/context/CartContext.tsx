"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { 
  getCart, 
  addToCart as addToCartAction, 
  updateCartItemQuantity as updateQuantityAction, 
  removeFromCart as removeItemAction,
  updateCartItemProtection as updateProtectionAction
} from "@/lib/actions/cart";

// Re-define prisma model types locally for client-side safety
export interface CartProduct {
  id: string;
  name: string;
  price: number | null;
  priceStr: string | null;
  image: string;
  slug: string;
  [key: string]: any;
}

export interface CartItemType {
  id: string;
  userId: string | null;
  guestToken: string | null;
  productId: string;
  quantity: number;
  color: string | null;
  protection: boolean;
  product: CartProduct;
  createdAt: any;
  updatedAt: any;
}

interface CartContextType {
  cartItems: CartItemType[];
  cartCount: number;
  cartOpen: boolean;
  isLoading: boolean;
  setCartOpen: (open: boolean) => void;
  fetchCart: () => Promise<void>;
  addToCart: (productId: string, quantity: number, color: string | null, protection: boolean) => Promise<boolean>;
  updateQuantity: (itemId: string, quantity: number) => Promise<boolean>;
  removeItem: (itemId: string) => Promise<boolean>;
  toggleProtection: (itemId: string, protection: boolean) => Promise<boolean>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();

  // Helper to get or create guest token and check email
  const getCartIdentifiers = () => {
    if (typeof window === "undefined") return { guestToken: null, email: null };

    const email = localStorage.getItem("allmodern-auth-email");
    let guestToken = localStorage.getItem("allmodern-guest-token");

    if (!guestToken) {
      guestToken = "guest_" + Math.random().toString(36).substring(2, 15) + Date.now().toString(36);
      localStorage.setItem("allmodern-guest-token", guestToken);
    }

    return { guestToken, email };
  };

  const fetchCart = async () => {
    setIsLoading(true);
    try {
      const { guestToken, email } = getCartIdentifiers();
      const items = await getCart(guestToken, email);
      setCartItems(items as any[]);
    } catch (error) {
      console.error("Failed to load cart items:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Re-fetch whenever path changes (in case of login/logout redirects)
  useEffect(() => {
    fetchCart();
  }, [pathname]);

  const handleAddToCart = async (
    productId: string,
    quantity: number,
    color: string | null,
    protection: boolean
  ) => {
    try {
      const { guestToken, email } = getCartIdentifiers();
      const res = await addToCartAction(productId, quantity, color, protection, guestToken, email);
      if (res.success) {
        await fetchCart();
        setCartOpen(true); // Auto-open cart drawer on add
        return true;
      }
      return false;
    } catch (error) {
      console.error("Failed to add item to cart:", error);
      return false;
    }
  };

  const handleUpdateQuantity = async (itemId: string, quantity: number) => {
    try {
      const res = await updateQuantityAction(itemId, quantity);
      if (res.success) {
        // Optimistic update or refetch
        await fetchCart();
        return true;
      }
      return false;
    } catch (error) {
      console.error("Failed to update cart item quantity:", error);
      return false;
    }
  };

  const handleRemoveItem = async (itemId: string) => {
    try {
      const res = await removeItemAction(itemId);
      if (res.success) {
        await fetchCart();
        return true;
      }
      return false;
    } catch (error) {
      console.error("Failed to remove item from cart:", error);
      return false;
    }
  };

  const handleToggleProtection = async (itemId: string, protection: boolean) => {
    try {
      const res = await updateProtectionAction(itemId, protection);
      if (res.success) {
        await fetchCart();
        return true;
      }
      return false;
    } catch (error) {
      console.error("Failed to update protection plan status:", error);
      return false;
    }
  };

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        cartOpen,
        isLoading,
        setCartOpen,
        fetchCart,
        addToCart: handleAddToCart,
        updateQuantity: handleUpdateQuantity,
        removeItem: handleRemoveItem,
        toggleProtection: handleToggleProtection,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
