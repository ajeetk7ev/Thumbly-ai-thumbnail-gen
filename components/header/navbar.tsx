import { ModeToggle } from "../dark-mode";
import { auth } from "@clerk/nextjs/server";
import { UserButton } from "@clerk/nextjs";
import { Button } from "../ui/button";
import Link from "next/link";

export async function Navbar() {
  const { userId } = await auth();

  return (
    <header className="w-screen h-[60px] bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 shadow-sm border-b border-slate-200 dark:border-slate-700 fixed top-0 z-50">
      <div className="w-[90%] max-w-7xl mx-auto h-full flex items-center justify-between">
        {/* Logo */}
        <Link href={"/"}>
         <h1 className="text-2xl font-bold tracking-tight text-slate-800 dark:text-white">Thumbly</h1>
        </Link>

        {/* Right-side controls */}
        <div className="flex items-center gap-3">
          <ModeToggle />

          {userId ? (
            // Clerk User dropdown if logged in
            <UserButton  />
          ) : (
            // Sign in button
            <Link href="/sign-in">
              <Button
                variant="outline"
                className="border-slate-300 bg-slate-100 text-slate-800 hover:bg-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700 transition-all duration-200"
              >
                Sign In
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
