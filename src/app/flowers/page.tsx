"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Heart, Search, SlidersHorizontal } from "lucide-react";
import Link from "next/link";

interface Flower {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
  tags: string[];
}

const flowers: Flower[] = [
  {
    id: "1",
    name: "Pink Roses",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?q=80&w=2070",
    description: "Classic pink roses, perfect for romantic occasions",
    category: "Roses",
    tags: ["Popular", "Romantic"]
  },
  {
    id: "2",
    name: "White Lilies",
    price: 39.99,
    image: "https://images.unsplash.com/photo-1587292818536-5638079be114?q=80&w=2070",
    description: "Pure white lilies symbolizing purity and refined beauty",
    category: "Lilies",
    tags: ["Elegant", "Pure"]
  },
  {
    id: "3",
    name: "Purple Orchids",
    price: 59.99,
    image: "https://images.unsplash.com/photo-1566873535350-a3f5d4a804b7?q=80&w=2070",
    description: "Exotic purple orchids for a touch of luxury",
    category: "Orchids",
    tags: ["Luxury", "Exotic"]
  },
  {
    id: "4",
    name: "Sunflowers",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1551731409-43eb3e517a1a?q=80&w=2070",
    description: "Bright and cheerful sunflowers to light up any room",
    category: "Sunflowers",
    tags: ["Cheerful", "Summer"]
  },
  {
    id: "5",
    name: "Red Tulips",
    price: 34.99,
    image: "https://images.unsplash.com/photo-1593796383792-8fe2cd0ea2c0?q=80&w=2070",
    description: "Classic red tulips, perfect for spring celebrations",
    category: "Tulips",
    tags: ["Spring", "Classic"]
  },
  {
    id: "6",
    name: "Blue Hydrangeas",
    price: 44.99,
    image: "https://images.unsplash.com/photo-1604323990536-89b50a90114f?q=80&w=2070",
    description: "Beautiful blue hydrangeas for a touch of elegance",
    category: "Hydrangeas",
    tags: ["Elegant", "Summer"]
  }
];

const categories = ["All", "Roses", "Lilies", "Orchids", "Sunflowers", "Tulips", "Hydrangeas"];
const tags = ["Popular", "Romantic", "Elegant", "Pure", "Luxury", "Exotic", "Cheerful", "Summer", "Spring", "Classic"];

export default function FlowersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedTag, setSelectedTag] = useState("All");
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [showFilters, setShowFilters] = useState(false);

  const filteredFlowers = flowers.filter(flower => {
    const matchesSearch = flower.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         flower.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || flower.category === selectedCategory;
    const matchesTag = selectedTag === "All" || flower.tags.includes(selectedTag);
    const matchesPrice = flower.price >= priceRange[0] && flower.price <= priceRange[1];

    return matchesSearch && matchesCategory && matchesTag && matchesPrice;
  });

  return (
    <main className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          {/* Filters Section */}
          <div className="w-full md:w-64 space-y-6">
            <div className="flex items-center justify-between md:justify-start">
              <h2 className="text-2xl font-serif">Filters</h2>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setShowFilters(!showFilters)}
              >
                <SlidersHorizontal className="h-5 w-5" />
              </Button>
            </div>

            <div className={`space-y-6 ${showFilters ? 'block' : 'hidden md:block'}`}>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search flowers..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Category</label>
                <Select
                  value={selectedCategory}
                  onValueChange={setSelectedCategory}
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Tags</label>
                <Select
                  value={selectedTag}
                  onValueChange={setSelectedTag}
                >
                  <option value="All">All Tags</option>
                  {tags.map((tag) => (
                    <option key={tag} value={tag}>
                      {tag}
                    </option>
                  ))}
                </Select>
              </div>

              <div className="space-y-4">
                <label className="text-sm font-medium">Price Range</label>
                <Slider
                  value={priceRange}
                  onValueChange={setPriceRange}
                  max={100}
                  step={1}
                  className="mt-2"
                />
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Flowers Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredFlowers.map((flower) => (
                <Card
                  key={flower.id}
                  className="group overflow-hidden transition-all duration-300 hover:shadow-xl"
                >
                  <Link href={`/flowers/${flower.id}`}>
                    <div className="relative aspect-[4/5] overflow-hidden">
                      <img
                        src={flower.image}
                        alt={flower.name}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-4 right-4 bg-white/90 hover:bg-white"
                      >
                        <Heart className="h-4 w-4" />
                      </Button>
                      <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2">
                        {flower.tags.map((tag) => (
                          <span
                            key={tag}
                            className="bg-white/90 px-2 py-1 rounded-full text-xs font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-medium mb-1">{flower.name}</h3>
                      <p className="text-sm text-gray-600 mb-2">{flower.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-semibold">${flower.price}</span>
                        <Button variant="secondary" size="sm">
                          Customize
                        </Button>
                      </div>
                    </div>
                  </Link>
                </Card>
              ))}
            </div>

            {filteredFlowers.length === 0 && (
              <div className="text-center py-12">
                <p className="text-lg text-gray-600">No flowers found matching your criteria.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}