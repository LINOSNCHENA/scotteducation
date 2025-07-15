//
// File: src/memory/shop.ts
//

import { create } from "zustand";
import { IProduct, IUser } from "@/types/models.eshop";

interface ShopState {
    products: IProduct[];
    setProducts: (products: IProduct[]) => void;
    user: IUser | null;
    userId: string | null;
    setUserId: (id: string) => void;
    setUser: (user: IUser) => void;
    clearUser: () => void;
    cart: { product: IProduct; quantity: number }[];
    addToCart: (product: IProduct, quantity?: number) => void;
    removeFromCart: (productId: string) => void;
    clearCart: () => void;
}

export const useShopStore = create<ShopState>((set) => ({
    products: [],
    setProducts: (products) => set({ products }),
    user: null,
    userId: null,
    setUser: (user) => set({ user }),
    clearUser: () => set({ user: null }),
    setUserId: (id) => set({ userId: id }),
    cart: [],
    addToCart: (product, quantity = 1) =>
        set((state) => {
            const existingItem = state.cart.find((item) => item.product.id === product.id);
            if (existingItem) {
                return {
                    cart: state.cart.map((item) =>
                        item.product.id === product.id
                            ? { ...item, quantity: item.quantity + quantity }
                            : item
                    ),
                };
            }
            return { cart: [...state.cart, { product, quantity }] };
        }),
    removeFromCart: (productId) =>
        set((state) => ({
            cart: state.cart.filter((item) => String(item.product.id) !== productId),
        })),
    clearCart: () => set({ cart: [] }),
}));