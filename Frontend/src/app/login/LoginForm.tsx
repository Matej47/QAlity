"use client";

import { signIn } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

export default function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const initialError = params.get("error");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<{
    type: "error" | "success";
    text: string;
  } | null>(initialError ? { type: "error", text: initialError } : null);

  // Clear the query error so it doesn't persist on refresh
  useEffect(() => {
    if (initialError) {
      const url = new URL(window.location.href);
      url.searchParams.delete("error");
      window.history.replaceState({}, "", url.toString());
    }
  }, [initialError]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res?.ok) {
      setMessage({ type: "success", text: "Login successful! Redirecting…" });
      setTimeout(() => router.push("/dashboard"), 1000);
    } else {
      setMessage({ type: "error", text: res?.error || "Invalid credentials" });
    }
  };

  return (
    <div className="w-full max-w-md p-8 bg-gray-800 rounded-md space-y-6">
      <h2 className="text-2xl font-semibold text-center">Sign In</h2>

      {message && (
        <div
          className={`p-3 rounded ${
            message.type === "error"
              ? "bg-red-700 text-white"
              : "bg-green-700 text-white"
          }`}
        >
          {message.text}
        </div>
      )}

      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="block text-yellow-300 mb-1">Email</label>
          <input
            type="email"
            placeholder="example@go-bbg.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full bg-gray-700 border border-gray-600 text-yellow-400 placeholder-yellow-300/50 px-3 py-2 rounded focus:outline-none focus:border-yellow-400"
          />
        </div>

        <div>
          <label className="block text-yellow-300 mb-1">Password</label>
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full bg-gray-700 border border-gray-600 text-yellow-400 placeholder-yellow-300/50 px-3 py-2 rounded focus:outline-none focus:border-yellow-400"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-yellow-400 text-black py-2 rounded hover:bg-yellow-500 transition"
        >
          Sign In
        </button>
      </form>

      <div className="text-center text-yellow-300">
        Don't have an account?{" "}
        <Link
          href="/signup"
          className="text-yellow-400 underline hover:text-yellow-500"
        >
          Sign up
        </Link>
      </div>
    </div>
  );
} 