import { Card } from "@/components/ui/card";
import { Heart, Flower2, Award, Users } from "lucide-react";

const stats = [
  {
    icon: Heart,
    value: "15+",
    label: "Years of Experience"
  },
  {
    icon: Flower2,
    value: "10k+",
    label: "Bouquets Created"
  },
  {
    icon: Award,
    value: "50+",
    label: "Design Awards"
  },
  {
    icon: Users,
    value: "25+",
    label: "Expert Florists"
  }
];

export default function AboutPage() {
  return (
    <main className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif mb-6">Our Story</h1>
          <p className="text-lg text-gray-600 mb-8">
            For over 15 years, Floral Boutique has been crafting beautiful floral arrangements
            that bring joy, comfort, and style to every occasion.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <Card key={index} className="p-6 text-center">
                <stat.icon className="h-8 w-8 mx-auto mb-4 text-primary" />
                <div className="text-3xl font-bold mb-2">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </Card>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <img
              src="https://images.unsplash.com/photo-1558350315-8aa00e8e4590?q=80&w=2070"
              alt="Our workshop"
              className="rounded-lg shadow-lg"
            />
          </div>
          <div className="space-y-6">
            <h2 className="text-3xl font-serif">Our Passion</h2>
            <p className="text-gray-600">
              At Floral Boutique, we believe that every flower tells a story. Our team of expert
              florists combines artistry with nature's beauty to create arrangements that capture
              the essence of your special moments.
            </p>
            <p className="text-gray-600">
              We source our flowers from sustainable growers, ensuring that each bloom is not
              only beautiful but also environmentally responsible.
            </p>
          </div>
        </div>

        <div className="bg-secondary rounded-lg p-8 md:p-12">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-serif mb-6">Our Promise</h2>
            <p className="text-gray-600 mb-8">
              We're committed to delivering not just flowers, but moments of joy, comfort,
              and celebration. Every arrangement is crafted with care, creativity, and attention
              to detail.
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <h3 className="font-medium mb-2">Fresh Guarantee</h3>
                <p className="text-sm text-gray-600">7-day freshness guarantee on all flowers</p>
              </div>
              <div className="text-center">
                <h3 className="font-medium mb-2">Expert Design</h3>
                <p className="text-sm text-gray-600">Professionally arranged by certified florists</p>
              </div>
              <div className="text-center">
                <h3 className="font-medium mb-2">Timely Delivery</h3>
                <p className="text-sm text-gray-600">Same-day delivery available</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}