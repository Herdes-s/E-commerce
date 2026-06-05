import { createContext, useContext, useEffect, useState } from "react";
import type { Product } from "../@types/Product";
import type { ItemCart } from "../@types/Product";

interface CartContextType {
  cartItems: ItemCart[];
  addToCart: (product: Product) => void;
  totalItems: number;
  addToCartWithQuantity: (product: Product, quantity: number) => void;
  reduceToCartWithQuantity: (product: Product, quantity: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartItems, setCartItems] = useState<ItemCart[]>(() => {
    const localData = localStorage.getItem("cartItems");
    return localData ? JSON.parse(localData) : [];
  });

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product: Product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  const addToCartWithQuantity = (product: Product, quantity: number) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      }
      return [...prevItems, { ...product, quantity }];
    });
  };

  const reduceToCartWithQuantity = (product: Product, quantity: number) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        const newQuantity = existingItem.quantity - quantity;
        if (newQuantity <= 0) {
          return prevItems.filter((item) => item.id !== product.id);
        }
        return prevItems.map((item) =>
          item.id === product.id ? { ...item, quantity: newQuantity } : item
        );
      }
      return prevItems;
    });
  };

  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, totalItems, addToCartWithQuantity, reduceToCartWithQuantity }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart Deve ser usado dentro de um CartProvider");
    }
    return context;
}