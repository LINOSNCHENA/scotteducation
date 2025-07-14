// app/account/page.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { useShopStore } from "../memory/shop";
import S13Footer from "../components/LandingPages/P14FooterSmall";
import { Order, CartItem, Product, exUser, IUser } from "@/types/models";
import { CartList } from "./CartList";
import { OrderList } from "./OrderList";
import { UserDetails } from "./userDetails";

export default function AccountPage() {
  const { user, setUser, userId, setUserId } = useShopStore();
  const [loading, setLoading] = useState<boolean>(false);
  const [cartLoading, setCartLoading] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<string>("");
  const [orders, setOrders] = useState<Order[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    async function fetchSessionAndUser() {
      try {
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession();

        if (error) throw error;
        if (!session) return;

        const id = session.user.id;
        setUserId(id);

        const { data, error: userError } = await supabase.from("users").select("id, email, name").eq("id", id).single();

        if (userError) throw userError;
        if (data) setUser(data as IUser);
      } catch (error) {
        console.error("Error fetching session/user:", error);
        setStatusMessage("❌ Failed to load user details. Please try again.");
      }
    }

    fetchSessionAndUser();
  }, [setUser, setUserId]);

  useEffect(() => {
    if (!userId) return;

    const fetchCartAndOrders = async () => {
      console.log("==========|54|===========");
      setCartLoading(true);
      try {
        // Fetch cart items
        // const { data: cartData, error: cartError } = await supabase
        //   .from("carousel_cart")
        //   .select(
        //     `
        //     id,
        //     quantity,
        //     products!inner(
        //       id,
        //       name,
        //       price,
        //       image_url
        //     )
        //   `
        //   )
        const { data: cartData, error: cartError } = await supabase.from("carousel_cart").select(`*`); //.eq("user_id", userId);
        const x = cartData?.filter((z) => z.user_id === userId);
        console.log("============|74|===============");
        console.log(cartData);
        console.log(userId);
        console.log(x);

        if (cartError) throw cartError;

        const validatedCartItems = (cartData || [])
          .map((item) => {
            const cartItem = item as {
              id: number;
              quantity: number;
              products: Product[];
            };

            if (
              typeof cartItem.id === "number" &&
              typeof cartItem.quantity === "number" &&
              Array.isArray(cartItem.products) &&
              cartItem.products.length > 0 &&
              typeof cartItem.products[0]?.id === "number" &&
              typeof cartItem.products[0]?.name === "string" &&
              typeof cartItem.products[0]?.price === "number" &&
              (cartItem.products[0]?.image_url === null || typeof cartItem.products[0]?.image_url === "string")
            ) {
              return {
                id: cartItem.id,
                quantity: cartItem.quantity,
                product: cartItem.products[0],
              };
            }
            return null;
          })
          .filter((item): item is CartItem => item !== null);

        setCartItems(validatedCartItems);

        // Fetch orders
        const { data: orderData, error: orderError } = await supabase
          .from("orders")
          .select(
            `
            id,
            product_id,
            quantity,
            total,
            status,
            created_at,
            products!inner(
              id,
              name,
              price,
              image_url
            )
          `
          )
          .eq("user_id", userId)
          .order("created_at", { ascending: false });

        if (orderError) throw orderError;

        const validatedOrders = (orderData || [])
          .map((order) => {
            const orderItem = order as {
              id: number;
              product_id: number;
              quantity: number;
              total: number;
              status: string;
              created_at: string;
              products: Product[];
            };

            if (
              typeof orderItem.id === "number" &&
              typeof orderItem.product_id === "number" &&
              typeof orderItem.quantity === "number" &&
              typeof orderItem.total === "number" &&
              ["pending", "completed", "cancelled"].includes(orderItem.status) &&
              typeof orderItem.created_at === "string" &&
              Array.isArray(orderItem.products) &&
              orderItem.products.length > 0 &&
              typeof orderItem.products[0]?.id === "number" &&
              typeof orderItem.products[0]?.name === "string" &&
              typeof orderItem.products[0]?.price === "number" &&
              (orderItem.products[0]?.image_url === null || typeof orderItem.products[0]?.image_url === "string")
            ) {
              return {
                id: orderItem.id,
                product_id: orderItem.product_id,
                quantity: orderItem.quantity,
                total: orderItem.total,
                status: orderItem.status as "pending" | "completed" | "cancelled",
                created_at: orderItem.created_at,
                product: orderItem.products[0],
              };
            }
            return null;
          })
          .filter((order): order is Order => order !== null);

        setOrders(validatedOrders);
      } catch (error) {
        console.error("Error fetching cart/orders:", error);
        setStatusMessage("❌ Failed to load cart/orders. Please try again.");
      } finally {
        setCartLoading(false);
      }
    };

    fetchCartAndOrders();
  }, [userId]);

  const handleCreateUserAndCart = async () => {
    console.log("================|184|=================");
    setLoading(true);
    setStatusMessage("");

    try {
      const {
        data: { user: authUser },
        error: authError,
      } = await supabase.auth.getUser();
      if (authError || !authUser) throw new Error("User not authenticated");

      const userId = authUser.id;
      const userEmail = authUser.email ?? "unknown@example.com";

      // Check/create user
      const { data: existingUser, error: userError } = await supabase.from("users").select("id").eq("id", userId).single();

      if (userError && !existingUser) {
        const { error: insertError } = await supabase.from("users").insert([
          {
            id: userId,
            email: userEmail,
            name: authUser.user_metadata?.full_name ?? null,
          },
        ]);
        if (insertError) throw insertError;
      }

      // Check/create cart
      const { data: existingCart, error: cartError } = await supabase.from("carousel_cart").select("id").eq("user_id", userId).maybeSingle();

      if (cartError && !existingCart) {
        const { data: defaultProduct, error: productError } = await supabase.from("products").select("id").limit(1).single();

        if (productError) throw productError;
        if (!defaultProduct) throw new Error("No products available");

        const { error: insertCartError } = await supabase.from("carousel_cart").insert([
          {
            user_id: userId,
            product_id: defaultProduct.id,
            quantity: 1,
          },
        ]);

        if (insertCartError) throw insertCartError;
      }

      setStatusMessage("✅ User and cart successfully initialized.");
    } catch (error) {
      console.error(error);
      setStatusMessage(`❌ ${error instanceof Error ? error.message : "An unknown error occurred"}`);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      setUser(exUser);
      setUserId("");
      setCartItems([]);
      setOrders([]);
      setStatusMessage("✅ Successfully logged out.");
    } catch (error) {
      console.error("Error logging out:", error);
      setStatusMessage("❌ Failed to log out. Please try again.");
    }
  };

  if (!userId) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center">
        <p>
          Please{" "}
          <Link href="/login/" className="text-blue-600 underline">
            login
          </Link>{" "}
          to view your account.
        </p>
      </div>
    );
  }

  return (
    <div className="min-w-8xl mx-auto mt-16 p-6 bg-white rounded shadow space-y-8">
      <p>1. One</p>
      <UserDetails user={user} loading={loading} onCreateAccount={handleCreateUserAndCart} onLogout={handleLogout} statusMessage={statusMessage} />
      <p>2. Second</p>
      <CartList items={cartItems} loading={cartLoading} />
      <p>3. Three</p>

      <OrderList orders={orders} loading={cartLoading} />
      <p>4. End</p>

      <S13Footer />
    </div>
  );
}
