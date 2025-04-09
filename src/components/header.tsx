"use client";

import { ShoppingCart, Menu, User, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

export function Header() {
  const { data: session } = useSession();

  return (
    <header className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Link href="/" className="font-serif text-2xl font-bold">
              Floral Boutique
            </Link>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            <Link href="/flowers" className="text-sm font-medium hover:text-primary">
              Flowers
            </Link>
            <Link href="/occasions" className="text-sm font-medium hover:text-primary">
              Occasions
            </Link>
            <Link href="/about" className="text-sm font-medium hover:text-primary">
              About
            </Link>
            <Link href="/contact" className="text-sm font-medium hover:text-primary">
              Contact
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <Heart className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <ShoppingCart className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
            {session ? (
              <Button 
                variant="default" 
                size="sm" 
                className="hidden md:flex"
                onClick={() => signOut()}
              >
                <User className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            ) : (
              <Button 
                variant="default" 
                size="sm" 
                className="hidden md:flex"
                onClick={() => signIn("keycloak")}
              >
                <User className="h-4 w-4 mr-2" />
                Sign In
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}