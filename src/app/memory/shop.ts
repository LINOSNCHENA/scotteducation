// File: src/store/shop.ts

import { exUser, Product } from "@/types/models";
import { User } from "@supabase/supabase-js";
import { create } from "zustand";

interface ShopState {
    products: Product[];
    user: User;
    userId: string | null;
    cart: number[];
    setProducts: (products: Product[]) => void;
    setUser: (user: User) => void;
    clearUser: () => void;
    setUserId: (id: string) => void;
    addToCart: (productId: number) => void;
    removeFromCart: (productId: number) => void;
}

export const useShopStore = create<ShopState>((set) => ({
    products: [],
    user: exUser,
    userId: null,
    cart: [],
    setProducts: (products: Product[]) => set({ products }),
    setUser: (user: User) => set({ user }),
    clearUser: () => set({ user: exUser, userId: null }),
    setUserId: (id) => set({ userId: id }),
    addToCart: (productId) => set((state) => ({ cart: [...state.cart, productId] })),
    removeFromCart: (productId) =>
        set((state) => ({ cart: state.cart.filter((id) => id !== productId) })),
}));


type UserStore = {
    user: User | null;
    setUser: (user: User | null) => void;
};

export const useUserStore = create<UserStore>((set) => ({
    user: null,
    setUser: (user) => set({ user }),
}));
