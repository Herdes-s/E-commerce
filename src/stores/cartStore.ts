// src/stores/cartStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "../@types/Product";
import type { ItemCart } from "../@types/Product";

interface CartState {
  cartItems: ItemCart[];
  addToCart: (product: Product) => void;
  addToCartWithQuantity: (product: Product, quantity: number) => void;
  reduceToCartWithQuantity: (product: Product, quantity: number) => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      cartItems: [],

      addToCart: (product) => {
        set((state) => {
          const existing = state.cartItems.find((i) => i.id === product.id);
          if (existing) {
            return {
              cartItems: state.cartItems.map((i) =>
                i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i,
              ),
            };
          }
          return { cartItems: [...state.cartItems, { ...product, quantity: 1 }] };
        });
      },

      addToCartWithQuantity: (product, quantity) => {
        set((state) => {
          const existing = state.cartItems.find((i) => i.id === product.id);
          if (existing) {
            return {
              cartItems: state.cartItems.map((i) =>
                i.id === product.id
                  ? { ...i, quantity: i.quantity + quantity }
                  : i,
              ),
            };
          }
          return { cartItems: [...state.cartItems, { ...product, quantity }] };
        });
      },

      reduceToCartWithQuantity: (product, quantity) => {
        set((state) => {
          const existing = state.cartItems.find((i) => i.id === product.id);
          if (!existing) return state;

          const newQuantity = existing.quantity - quantity;
          if (newQuantity <= 0) {
            return { cartItems: state.cartItems.filter((i) => i.id !== product.id) };
          }
          return {
            cartItems: state.cartItems.map((i) =>
              i.id === product.id ? { ...i, quantity: newQuantity } : i,
            ),
          };
        });
      },
    }),
    {
      name: "cartItems", // mesma chave que você já usa no localStorage
    },
  ),
);