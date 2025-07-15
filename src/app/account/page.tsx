// app/account/page.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { useShopStore } from "../memory/shop";
import { CartList } from "./CartList";
import { OrderList } from "./OrderList";
import { UserDetails } from "./userDetails";
import S13Footer from "../components/Foundation/P14FooterSmall";
import { CartItem, exUser, IOrder, IProduct, IUser } from "@/types/models.eshop";

export default function AccountPage() {
  const { user, setUser, userId, setUserId } = useShopStore();
  const [loading, setLoading] = useState<boolean>(false);
  const [cartLoading, setCartLoading] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<string>("");
  const [orders, setOrders] = useState<IOrder[]>([]);
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
              id: string;
              quantity: number;
              products: IProduct[];
            };

            const product = cartItem.products?.[0];

            if (
              typeof cartItem.id === "string" &&
              typeof cartItem.quantity === "number" &&
              product &&
              typeof product.id === "string" &&
              typeof product.name === "string" &&
              typeof product.price === "number" &&
              (product.image_url === null || typeof product.image_url === "string")
            ) {
              return {
                id: cartItem.id,
                quantity: cartItem.quantity,
                product,
              };
            }

            return null;
          })
          .filter((item): item is CartItem => item !== null);

        setCartItems(validatedCartItems);

        // Fetch orders
        const { data: orderData, error: orderError } = await supabase
          .from("orders")
          .select(`id,user_id,product_id,quantity,total, status, created_at, products (id,name, price,image_url,description)`)
          .eq("user_id", userId)
          .order("created_at", { ascending: false });

        if (orderError) throw orderError;
        const validatedOrders = (orderData || [])
          .map((order) => {
            const product = order.products?.[0] ?? order.products;

            if (
              typeof order.id === "string" &&
              typeof order.user_id === "string" &&
              typeof order.product_id === "string" &&
              typeof order.quantity === "number" &&
              typeof order.total === "number" &&
              ["pending", "completed", "cancelled"].includes(order.status) &&
              typeof order.created_at === "string" &&
              product &&
              typeof product.id === "string" &&
              typeof product.name === "string" &&
              typeof product.price === "number"
            ) {
              return {
                id: order.id,
                user_id: order.user_id,
                quantity: order.quantity,
                total: order.total,
                status: order.status as "pending" | "completed" | "cancelled",
                created_at: order.created_at,

                // products: Array.isArray(order.products)
                //   ? order.products.map((product: OrderItem & { quantity?: number }) => ({
                //       product_id: product.id,
                //       quantity: product.quantity ?? 1,
                //       subtotal: (product.price ?? 0) * (product.quantity ?? 1),
                //     }))
                //   : [],

                products: Array.isArray(order.products)
                  ? order.products.map((product: IProduct) => ({
                      product_id: product.id,
                      quantity: product.stock_quantity ?? 1,
                      subtotal: (product.price ?? 0) * (product.stock_quantity ?? 1),
                    }))
                  : [],
              } satisfies IOrder;
            }

            return null;
          })
          .filter((order): order is IOrder => order !== null);
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
