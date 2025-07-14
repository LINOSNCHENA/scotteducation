//
// File: src/types/index.ts
//

import { User } from "@supabase/supabase-js";
export interface IProduct {
    id: number;
    name: string;
    price: number;
    description: string;
    image_url: string;
}

export interface CarouselCartItem {
    id?: number;
    product_id: number;
    user_id: string;
    quantity: number;
}

export const exUser: IUser = {
    id: "",
    name: "",
    email: ""
}
export const SupabseUser: User = {
    id: "",
    app_metadata: {},
    user_metadata: {},
    aud: "",
    created_at: ""
}

// Option if column is full_name
export interface IUser {
    id: string;
    name: string;
    email: string;
    full_name?: string;
}

export type IOrder = {
    id: string;
    user_id: string;
  //  product_id: number;
    quantity: number;
    total: number;
    status: "pending" | "completed" | "cancelled";
    created_at: string;
   // product: IProduct;
    items: unknown[]
};

export type CartItem = {
    id: number;
    quantity: number;
    product: IProduct;
};