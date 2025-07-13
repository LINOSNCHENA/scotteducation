import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL3!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEZ3!,
    {
        auth: {
            flowType: "pkce", // Important for Next.js
            autoRefreshToken: true,
            detectSessionInUrl: true,
            persistSession: true,
        }
    }
);
