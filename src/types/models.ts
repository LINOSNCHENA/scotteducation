// File: src/types/index.ts
export interface Product {
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


import { User } from "@supabase/supabase-js";

export const exUser:User={
    id: "",
    app_metadata: {},
    user_metadata: {},
    aud: "",
    created_at: ""
}


// Option if column is full_name
export interface IUser {
    id: string;
    full_name: string;
    email: string;
}
