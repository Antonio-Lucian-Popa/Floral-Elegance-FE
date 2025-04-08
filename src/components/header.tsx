"use client";

import { ShoppingCart, Menu, User, Heart, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { isAuthenticated, logout, getUserRole } from "@/lib/auth";

export function Header() {
  const router = useRouter();
  const authenticated = isAuthenticated();
  const userRole = getUserRole();

  const handleLogout = () => {
    logout();
    router.push("/");
  };

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
            {userRole === "SELLER" && (
              <Link href="/seller/dashboard" className="text-sm font-medium hover:text-primary">
                Seller Dashboard
              </Link>
            )}
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
            
            {authenticated ? (
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" onClick={handleLogout}>
                  <LogOut className="h-5 w-5" />
                </Button>
              </div>
            ) : (
              <Link href="/auth/login">
                <Button variant="default" size="sm" className="hidden md:flex">
                  <User className="h-4 w-4 mr-2" />
                  Sign In
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}