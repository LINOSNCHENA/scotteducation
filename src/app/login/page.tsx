// app/auth/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAuthStore } from "../../lib/store.users";

export default function AuthPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { login, signUp, signInWithGoogle, currentUser } = useAuthStore();
  console.log(currentUser);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        await login(email, password);
        toast.success("Logged in successfully!");
        router.push("/account");
        console.log(currentUser);
        // Update menu logined name
      } else {
        await signUp(email, password);
        toast.success("Registration successful. Please check your email to confirm.");
        setIsLogin(true);
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  const loginWithGoogle = async () => {
    setLoading(true);
    try {
      await signInWithGoogle();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Google login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md space-y-6">
        <h1 className="text-2xl font-bold text-center text-gray-800">{isLogin ? "Login to Your Account" : "Create an Account"}</h1>

        <form onSubmit={handleAuth} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
            {loading ? (isLogin ? "Logging in..." : "Registering...") : isLogin ? "Login" : "Register"}
          </button>
        </form>

        <div className="flex items-center justify-between">
          <hr className="w-full border-gray-300" />
          <span className="px-2 text-sm text-gray-500">or</span>
          <hr className="w-full border-gray-300" />
        </div>

        <button
          onClick={loginWithGoogle}
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
        >
          <svg className="w-5 h-5" viewBox="0 0 48 48">
            <path
              fill="#FFC107"
              d="M43.6 20.5H42V20H24v8h11.3C33.2 32.2 29 35 24 35c-6.1 0-11-4.9-11-11s4.9-11 11-11c2.8 0 5.4 1 7.4 2.8l6-6C33.1 6.7 28.8 5 24 5 12.9 5 4 13.9 4 25s8.9 20 20 20c11 0 19.8-8.4 19.8-19 0-1.2-.1-2.2-.2-3.2z"
            />
            <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.4 16 18.9 13 24 13c2.8 0 5.4 1 7.4 2.8l6-6C33.1 6.7 28.8 5 24 5c-7.2 0-13.4 3.6-17.1 9.1l-.6.6z" />
            <path fill="#4CAF50" d="M24 45c5.4 0 10.3-2.1 13.9-5.5l-6.4-5.4C29.2 35.6 26.7 37 24 37c-5.1 0-9.4-3.3-10.9-7.9l-6.6 5.1C9.9 41.5 16.4 45 24 45z" />
            <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-1.3 3.4-4 6-7.3 7.4l6.4 5.4C39.1 37.5 43.8 32.3 43.8 25c0-1.5-.1-2.9-.2-4.5z" />
          </svg>
          Sign in with Google
        </button>

        <p className="text-center text-sm text-gray-500">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button onClick={() => setIsLogin(!isLogin)} className="text-blue-600 hover:underline font-medium">
            {isLogin ? "Register here" : "Login here"}
          </button>
        </p>
      </div>
    </div>
  );
}
