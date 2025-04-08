import { Facebook, Instagram, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="font-serif text-2xl font-bold">Floral Boutique</h3>
            <p className="text-sm text-gray-600">
              Creating beautiful, custom floral arrangements for all your special moments.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Twitter className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/flowers" className="text-sm text-gray-600 hover:text-primary">
                  All Flowers
                </Link>
              </li>
              <li>
                <Link href="/occasions" className="text-sm text-gray-600 hover:text-primary">
                  Special Occasions
                </Link>
              </li>
              <li>
                <Link href="/custom" className="text-sm text-gray-600 hover:text-primary">
                  Custom Orders
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-gray-600 hover:text-primary">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-4">Customer Service</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/delivery" className="text-sm text-gray-600 hover:text-primary">
                  Delivery Information
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-sm text-gray-600 hover:text-primary">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-gray-600 hover:text-primary">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm text-gray-600 hover:text-primary">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-4">Contact Us</h4>
            <ul className="space-y-2">
              <li className="text-sm text-gray-600">
                123 Flower Street
              </li>
              <li className="text-sm text-gray-600">
                Garden City, GC 12345
              </li>
              <li className="text-sm text-gray-600">
                Tel: (555) 123-4567
              </li>
              <li className="text-sm text-gray-600">
                Email: hello@floralboutique.com
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t text-center text-sm text-gray-600">
          <p>&copy; {new Date().getFullYear()} Floral Boutique. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}