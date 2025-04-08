"use client";

import { ArrowRight, Flower2, Heart, Star, Truck, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { useState, useEffect } from "react";

interface PopularFlower {
  id: string;
  name: string;
  price: number;
  image: string;
  tag?: string;
}

const popularFlowers: PopularFlower[] = [
  {
    id: "1",
    name: "Pink Roses",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?q=80&w=2070",
    tag: "Popular"
  },
  {
    id: "2",
    name: "White Lilies",
    price: 39.99,
    image: "https://images.unsplash.com/photo-1587292818536-5638079be114?q=80&w=2070",
    tag: "New"
  },
  {
    id: "3",
    name: "Purple Orchids",
    price: 59.99,
    image: "https://images.unsplash.com/photo-1566873535350-a3f5d4a804b7?q=80&w=2070",
    tag: "Exclusive"
  }
];

const features = [
  {
    icon: Truck,
    title: "Same Day Delivery",
    description: "Order before 2 PM for same-day delivery in the city"
  },
  {
    icon: Heart,
    title: "Fresh Guarantee",
    description: "7-day freshness guarantee on all our flowers"
  },
  {
    icon: Star,
    title: "Expert Florists",
    description: "Handcrafted by our experienced floral designers"
  },
  {
    icon: Clock,
    title: "24/7 Support",
    description: "Always here to help with your floral needs"
  }
];

export default function Home() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((current) => (current + 1) % popularFlowers.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <main className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${popularFlowers[activeIndex].image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(0.7)',
            transition: 'all 0.5s ease-in-out'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent" />
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 font-serif">
            Design Your Perfect Bouquet
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200">
            Create a unique floral masterpiece that tells your story
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/flowers">
              <Button size="lg" className="bg-white text-black hover:bg-gray-100 group">
                Start Customizing Your Bouquet
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/occasions">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/20">
                Browse Occasions
              </Button>
            </Link>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-2 pb-8">
          {popularFlowers.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-all ${
                index === activeIndex ? 'bg-white w-8' : 'bg-white/50'
              }`}
              onClick={() => setActiveIndex(index)}
            />
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex p-3 rounded-full bg-primary/10 mb-4">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-medium mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Flowers Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-background to-secondary">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl md:text-4xl font-serif">Popular Choices</h2>
            <Link href="/flowers">
              <Button variant="ghost">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {popularFlowers.map((flower, index) => (
              <Card 
                key={flower.id}
                className="group overflow-hidden transition-all duration-300 hover:shadow-xl"
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img
                    src={flower.image}
                    alt={flower.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  {flower.tag && (
                    <span className="absolute top-4 right-4 bg-white/90 px-3 py-1 rounded-full text-sm font-medium">
                      {flower.tag}
                    </span>
                  )}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-4 left-4 bg-white/90 hover:bg-white"
                  >
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-medium">{flower.name}</h3>
                    <Flower2 className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold">${flower.price}</span>
                    <Link href={`/flowers/${flower.id}`}>
                      <Button variant="secondary" size="sm">
                        Customize
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}