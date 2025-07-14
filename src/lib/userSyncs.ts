import { supabase } from "./supabase";

// Make sure user exists before placing order
export async function ensureUserExists(userId: string, email: string, name: string) {
    const { data } = await supabase
        .from("users")
        .select("id")
        .eq("id", userId)
        .maybeSingle();

    if (!data) {
        await supabase.from("users").insert([
            {
                id: userId, // match Supabase Auth ID exactly
                email,
                name,
            },
        ]);
    }
}
