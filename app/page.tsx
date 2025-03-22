import { SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ClerkLogo } from "./components/auth/clerk-logo";
import { NextLogo } from "./components/auth/next-logo";
import { SupabaseLogo } from "./components/auth/supabase-logo";
import logo from "./images/logo.png";

export default function Home() {
  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-b from-neutral-50 to-neutral-100 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_50%_-60%,rgba(120,119,198,0.3),transparent)] animate-pulse" />
      <main className="container mx-auto px-6 py-12 my-auto">
        <div className="relative">
          <div className="absolute inset-0 bg-grid-neutral-100/50 [mask-image:radial-gradient(white,transparent_85%)] -z-10" />

          <div className="flex items-center justify-center mb-8 animate-fade-in">
            <div className="bg-white/80 backdrop-blur-sm px-4 py-3 rounded-full inline-flex gap-4 shadow-sm border border-neutral-200/50 transition-transform hover:scale-105">
              <div className="transition-opacity hover:opacity-80">
                <ClerkLogo />
              </div>
              <div aria-hidden className="w-px h-6 bg-neutral-200" />
              <div className="transition-opacity hover:opacity-80">
                <NextLogo />
              </div>
              <div aria-hidden className="w-px h-6 bg-neutral-200" />
              <div className="transition-opacity hover:opacity-80">
                <SupabaseLogo />
              </div>
            </div>
          </div>

          <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-2xl text-center mx-auto animate-slide-up">
              <h1 className="block font-semibold text-gray-800 text-4xl md:text-5xl lg:text-6xl">
                Modern Authentication
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-violet-500 animate-gradient">
                  {" "}
                  Starts Here
                </span>
              </h1>

              <p className="mt-6 text-lg text-gray-600 animate-fade-in">
                A powerful Next.js template featuring seamless authentication
                and user management powered by Clerk, with Supabase database
                integration.
              </p>

              <div className="mt-8 flex justify-center gap-3 animate-fade-in">
                <SignedIn>
                  <Link href="/dashboard">
                    <Button
                      size="lg"
                      className="transition-transform hover:scale-105"
                    >
                      Go to Dashboard
                    </Button>
                  </Link>
                </SignedIn>
                <SignedOut>
                  <SignInButton>
                    <Button
                      size="lg"
                      className="transition-transform hover:scale-105"
                    >
                      Get Started
                    </Button>
                  </SignInButton>
                  <Link href="/sign-up">
                    <Button
                      variant="outline"
                      size="lg"
                      className="transition-transform hover:scale-105"
                    >
                      Create Account
                    </Button>
                  </Link>
                </SignedOut>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
