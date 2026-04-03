import { AuthButton } from "@/components/auth-button";
import { ThemeSwitcher } from "@/components/theme-switcher";
import Link from "next/link";
import { Suspense } from "react";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center">
      <div className="text-center">
        <h1 className="text-5xl font-bold mb-4">My Book App</h1>
        <p className="text-xl text-gray-600 mb-8">ようこそ！</p>
        
        <div className="flex gap-4 justify-center mb-8">
          <Link 
            href="/auth/sign-up"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Sign Up
          </Link>
          <Link 
            href="/auth/login"
            className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
          >
            Sign In
          </Link>
        </div>

        <Suspense>
          <AuthButton />
        </Suspense>
      </div>
      
      <footer className="fixed bottom-4 right-4">
        <ThemeSwitcher />
      </footer>
    </main>
  );
}