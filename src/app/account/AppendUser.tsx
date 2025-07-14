"use client";

import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";
import { useShopStore } from "../memory/shop";
import { IUser } from "@/types/models";

export default function UserLoader() {
  const setUser = useShopStore((state) => state.setUser);
  const setUserId = useShopStore((state) => state.setUserId);
  const clearUser = useShopStore((state) => state.clearUser);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUser() {
      setLoading(true);
      try {
        const {
          data: { user: authUser },
          error: authError,
        } = await supabase.auth.getUser();

        if (authError || !authUser) {
          setError("No user logged in.");
          clearUser();
          return;
        }

        // Fetch additional user data from your profiles table
        const { data: profileData, error: profileError } = await supabase.from("users").select("name, email").eq("id", authUser.id).single();

        if (profileError) throw profileError;
        console.log(profileData);

        // Create IUser object combining auth and profile data
        const userData: IUser = {
          id: authUser.id,
          email: authUser.email || "",
          name: profileData?.name || "",
          full_name: profileData?.name,
        };

        setUser(userData);
        setUserId(authUser.id);
      } catch (err) {
        setError("Failed to load user data");
        console.log(err);
        clearUser();
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, [setUser, setUserId, clearUser]);

  if (loading) return <p>Loading user...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return null;
}
