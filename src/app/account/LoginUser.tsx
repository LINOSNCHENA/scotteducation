"use client";

import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";
import { useShopStore } from "../memory/shop";
// import { supabase } from "@/lib/supabase";
// import { useShopStore } from "@/store/shop";

export default function UserLoader() {
  const setUser = useShopStore((state) => state.setUser);
  const setUserId = useShopStore((state) => state.setUserId);
  const clearUser = useShopStore((state) => state.clearUser);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUser() {
      setLoading(true);
      const {
        data: { user: authUser },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError || !authUser) {
        setError("No user logged in.");
        clearUser();
      } else {
        setUser(authUser);
        setUserId(authUser.id);
        setError(null);
      }
      setLoading(false);
    }

    fetchUser();
  }, [setUser, setUserId, clearUser]);

  if (loading) return <p>Loading user...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return null; // This component does not render anything when user is loaded
}
