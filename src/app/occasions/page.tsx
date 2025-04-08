"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const occasions = [
  {
    id: "wedding",
    title: "Weddings",
    description: "Make your special day unforgettable with our stunning wedding flowers",
    image: "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?q=80&w=2070",
    price: "From $299"
  },
  {
    id: "birthday",
    title: "Birthdays",
    description: "Celebrate another year with our vibrant birthday arrangements",
    image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?q=80&w=2070",
    price: "From $49"
  },
  {
    id: "anniversary",
    title: "Anniversaries",
    description: "Express your love with our romantic anniversary bouquets",
    image: "https://images.unsplash.com/photo-1518709766631-a6a7f45921c3?q=80&w=2070",
    price: "From $79"
  },
  {
    id: "sympathy",
    title: "Sympathy",
    description: "Send your condolences with our elegant sympathy arrangements",
    image: "https://images.unsplash.com/photo-1516478379578-ea8bea43365f?q=80&w=2070",
    price: "From $89"
  },
  {
    id: "graduation",
    title: "Graduation",
    description: "Celebrate academic achievements with our graduation bouquets",
    image: "https://images.unsplash.com/photo-1558180077-09f158c76707?q=80&w=2070",
    price: "From $59"
  },
  {
    id: "corporate",
    title: "Corporate Events",
    description: "Enhance your corporate events with our professional arrangements",
    image: "https://images.unsplash.com/photo-1492571350019-22de08371fd3?q=80&w=2070",
    price: "From $149"
  }
];

export default function OccasionsPage() {
  return (
    <main className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif mb-4">Special Occasions</h1>
          <p className="text-lg text-gray-600">Perfect flowers for every moment in life</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {occasions.map((occasion) => (
            <Card key={occasion.id} className="group overflow-hidden">
              <div className="aspect-[4/3] relative overflow-hidden">
                <img
                  src={occasion.image}
                  alt={occasion.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 transition-opacity group-hover:opacity-0" />
                <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
                  <h3 className="text-2xl font-serif mb-2">{occasion.title}</h3>
                  <p className="text-sm mb-4">{occasion.description}</p>
                  <p className="font-semibold">{occasion.price}</p>
                </div>
              </div>
              <div className="p-6 bg-white">
                <Link href={`/occasions/${occasion.id}`}>
                  <Button className="w-full group">
                    View Collections
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}