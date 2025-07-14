// // File: src/store/shop.ts

// import { exUser, IUser, Product } from "@/types/models";
// import { create } from "zustand";

// interface ShopState {
//     products: Product[];
//     user: IUser;
//     userId: string | null;
//     cart: number[];
//     setProducts: (products: Product[]) => void;
//     setUser: (user: IUser) => void;
//     clearUser: () => void;
//     setUserId: (id: string) => void;
//     addToCart: (productId: number) => void;
//     removeFromCart: (productId: number) => void;
// }

// export const useShopStore = create<ShopState>((set) => ({
//     products: [],
//     user: exUser,
//     userId: null,
//     cart: [],
//     setProducts: (products: Product[]) => set({ products }),
//     setUser: (user: IUser) => set({ user }),
//     clearUser: () => set({ user: exUser, userId: null }),
//     setUserId: (id) => set({ userId: id }),
//     addToCart: (productId) => set((state) => ({ cart: [...state.cart, productId] })),
//     removeFromCart: (productId) =>
//         set((state) => ({ cart: state.cart.filter((id) => id !== productId) })),
// }));


// type UserStore = {
//     user: IUser | null;
//     setUser: (user: IUser | null) => void;
// };

// export const useUserStore = create<UserStore>((set) => ({
//     user: null,
//     setUser: (user) => set({ user }),
// }));

// File: src/memory/shop.ts
import { create } from "zustand";
import { IProduct, IUser } from "@/types/models";

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