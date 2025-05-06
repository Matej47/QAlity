// /src/app/signup/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email.endsWith("@go-bbg.com")) {
      setError("Please use your company email.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const res = await fetch("/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      router.push("/login");
    } else {
      const data = await res.json();
      setError(data.message || "Signup failed.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-yellow-400 flex flex-col">
      {/* Top Bar */}
      <header className="flex items-center justify-between px-6 py-4 bg-black text-yellow-400">
        <div className="font-bold text-3xl">
          QAlity <span className="text-base font-normal">v0.1a</span>
        </div>
        <div className="font-bold text-3xl">BBG</div>
      </header>

      {/* Signup Form */}
      <main className="flex-1 flex items-center justify-center px-4">
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-semibold mb-6 text-center">Sign Up</h2>
          {error && (
            <div className="bg-red-600 text-white p-2 mb-4 rounded text-sm text-center">
              {error}
            </div>
          )}
          <form onSubmit={handleSignup} className="flex flex-col gap-4">
            <input
              type="email"
              placeholder="Company Email"
              className="px-4 py-2 rounded bg-gray-700 text-yellow-400 placeholder-yellow-300/50 placeholder-opacity-50 focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Create Password"
                className="px-4 py-2 rounded bg-gray-700 text-yellow-400 placeholder-yellow-300/50 focus:outline-none w-full"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-yellow-400"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                className="px-4 py-2 rounded bg-gray-700 text-yellow-400 placeholder-yellow-300/50 focus:outline-none w-full"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-yellow-400"
              >
                {showConfirmPassword ? "Hide" : "Show"}
              </button>
            </div>
            <button
              type="submit"
              className="bg-yellow-400 text-black font-bold py-2 rounded hover:bg-yellow-300 transition"
            >
              Sign Up
            </button>
          </form>
          <p className="text-center text-sm mt-4">
            Already have an account?{" "}
            <Link href="/login" className="underline hover:text-yellow-300">
              Login here
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
