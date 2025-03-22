import { UserDetails } from "../components/auth/user-details";
import { UserButton } from "@clerk/nextjs";
import { CodeSwitcher } from "../components/auth/code-switcher";
import { ClerkLogo } from "../components/auth/clerk-logo";
import { NextLogo } from "../components/auth/next-logo";
import { SupabaseLogo } from "../components/auth/supabase-logo";

export default async function DashboardPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-neutral-50 to-neutral-100 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_50%_-60%,rgba(120,119,198,0.3),transparent)] animate-pulse" />
      <div className="max-w-[75rem] w-full mx-auto px-6 py-8">
        <div className="grid grid-cols-[1fr_20.5rem] gap-10">
          <div className="space-y-8">
            <header className="flex items-center justify-between w-full h-16 gap-4 bg-white/80 backdrop-blur-sm px-6 rounded-xl shadow-sm border border-neutral-200/50 transition-all hover:shadow-md">
              <div className="flex gap-4">
                <div className="transition-opacity hover:opacity-80">
                  <ClerkLogo />
                </div>
                <div aria-hidden className="w-px h-6 bg-[#C7C7C8]" />
                <div className="transition-opacity hover:opacity-80">
                  <NextLogo />
                </div>
                <div aria-hidden className="w-px h-6 bg-[#C7C7C8]" />
                <div className="transition-opacity hover:opacity-80">
                  <SupabaseLogo />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <UserButton
                  afterSignOutUrl="/"
                  appearance={{
                    elements: {
                      userButtonAvatarBox: "size-6",
                    },
                  }}
                />
              </div>
            </header>
            <div className="animate-fade-in">
              <UserDetails />
            </div>
          </div>
          <div className="pt-[3.5rem] animate-slide-up">
            <CodeSwitcher />
          </div>
        </div>
      </div>
    </main>
  );
}
