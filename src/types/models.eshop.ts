// //
// // File: src/types/index.ts

import { User } from "@supabase/supabase-js";

// ---------- USER ----------

export interface IUser {
    id: string; // UUID
    name: string;
    email: string;
    full_name?: string;
}

export const exUser: IUser = {
    id: "",
    name: "",
    email: "",
};

// Supabase Auth User Stub (only use if mocking)
export const SupabseUser: User = {
    id: "",
    app_metadata: {},
    user_metadata: {},
    aud: "",
    created_at: "",
};

// ---------- PRODUCT ----------

export interface IProduct {
    id: string; // UUID
    name: string;
    price: number;
    description: string;
    x?:string;
    image_url: string | null;
    stock_quantity: number;
    created: Date;
    updated: Date;
}

// ---------- CART ----------

export interface CarouselCartItem {
    id?: string; // UUID
    product_id: string; // UUID
    user_id: string; // UUID
    quantity: number;
}

export type CartItem = {
    id: string;
    quantity: number;
    product: IProduct;
};

// ---------- ORDER ----------

export type OrderItem = {
    product_id: string; // UUID
    quantity: number;
    subtotal: number;
};

export type IOrder = {
    id: string;
    user_id: string;
    quantity: number;
    total: number;
    status: "pending" | "completed" | "cancelled";
    created_at: string;
    products: OrderItem[];
};

// ---------- ORDER REQUEST (e.g. subscription plans) ----------

export interface IOrderRequest {
    plan_title: string;
    plan_price: string;
    plan_bill: number;
    plan_features: string[];
    customer_name: string;
    customer_email: string;
    customer_phone?: string;
    requirements?: string;
    created_at: string;
    status?: string;
    id?: string; // UUID
};
