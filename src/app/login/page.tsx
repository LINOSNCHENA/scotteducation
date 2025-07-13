"use client";
import { supabase } from "@/lib/supabase";
// import { useRouter } from "next/navigation";

export default function LoginPage() {
  // const router = useRouter();

  const loginWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "http://localhost:3000/auth/callback",
      },
    });

    if (error) {
      console.error("Login error:", error);
      alert("Google login failed");
    }
  };

  return (
    <div className="p-6 text-center">
      <button onClick={loginWithGoogle} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Sign in with Google
      </button>
    </div>
  );
}
