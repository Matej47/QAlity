"use client";

import Link from "next/link";
import {
  ShoppingCartIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/solid";
import {
  CubeTransparentIcon,
  DocumentTextIcon,
  UserGroupIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";

export default function HomePage() {
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
        <div className="flex flex-col gap-8 w-full max-w-4xl px-4 sm:px-0">
          {/* First Row: Orders, Katalon, Smoke Test */}
          <div className="grid grid-cols-3 gap-8">
            {/* Orders Card - wrapped in Link */}
            <Link href="/orders">
              <div className="bg-gray-800 hover:bg-gray-700 transition rounded-md p-8 flex flex-col items-center justify-center cursor-pointer">
                <ShoppingCartIcon className="w-14 h-14 mb-4" />
                <h2 className="text-2xl font-semibold">Orders</h2>
              </div>
            </Link>

            {/* FrontEnd Card */}
            <div className="bg-gray-800 hover:bg-gray-700 transition rounded-md p-8 flex flex-col items-center justify-center cursor-pointer">
              <CubeTransparentIcon className="w-14 h-14 mb-4" />
              <h2 className="text-2xl font-semibold">Front-End</h2>
            </div>

            {/* Smoke Test Card */}
            <div className="bg-gray-800 hover:bg-gray-700 transition rounded-md p-8 flex flex-col items-center justify-center cursor-pointer">
              <ExclamationTriangleIcon className="w-14 h-14 mb-4" />
              <h2 className="text-2xl font-semibold">Smoke Test</h2>
            </div>
          </div>

          {/* Second Row: Reports, Documentation, QA Team */}
          <div className="grid grid-cols-3 gap-8">
            {/* Reports Card */}
            <div className="bg-gray-800 hover:bg-gray-700 transition rounded-md p-8 flex flex-col items-center justify-center cursor-pointer">
              <ChartBarIcon className="w-14 h-14 mb-4" />
              <h2 className="text-2xl font-semibold">Reports</h2>
            </div>

            {/* Documentation Card */}
            <div className="bg-gray-800 hover:bg-gray-700 transition rounded-md p-8 flex flex-col items-center justify-center cursor-pointer">
              <DocumentTextIcon className="w-14 h-14 mb-4" />
              <h2 className="text-2xl font-semibold">Documentation</h2>
            </div>

            {/* QA Team Card */}
            <div className="bg-gray-800 hover:bg-gray-700 transition rounded-md p-8 flex flex-col items-center justify-center cursor-pointer">
              <UserGroupIcon className="w-14 h-14 mb-4" />
              <h2 className="text-2xl font-semibold">QA Team</h2>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
