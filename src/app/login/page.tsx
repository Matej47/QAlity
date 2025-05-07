"use client";

import { Suspense } from "react";
import LoginForm from "./LoginForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-yellow-400 flex flex-col">
      {/* Top Bar */}
      <header className="flex items-center justify-between px-6 py-4 bg-black text-yellow-400">
        <div className="font-bold text-3xl">
          QAlity <span className="text-base font-normal">v0.1a</span>
        </div>
        <div className="font-bold text-3xl">BBG</div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center">
        <Suspense fallback={<div>Loading...</div>}>
          <LoginForm />
        </Suspense>
      </main>
    </div>
  );
}
