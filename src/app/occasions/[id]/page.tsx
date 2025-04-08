import { notFound } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// This would typically come from your database
const occasions = {
  "wedding": {
    title: "Wedding Flowers",
    description: "Beautiful floral arrangements for your special day",
    content: "Make your wedding day unforgettable with our stunning wedding flower collections. From elegant bouquets to sophisticated centerpieces, we create magical floral experiences."
  },
  "birthday": {
    title: "Birthday Flowers",
    description: "Celebrate with vibrant blooms",
    content: "Express your joy with our birthday flower arrangements. Perfect for making someone's special day even more memorable."
  },
  "anniversary": {
    title: "Anniversary Flowers",
    description: "Romantic floral expressions",
    content: "Celebrate love and commitment with our romantic anniversary flower arrangements. Each bouquet tells a unique story of enduring love."
  }
};

export function generateStaticParams() {
  return Object.keys(occasions).map((id) => ({
    id: id,
  }));
}

export default function OccasionPage({ params }: { params: { id: string } }) {
  const occasion = occasions[params.id as keyof typeof occasions];

  if (!occasion) {
    notFound();
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">{occasion.title}</CardTitle>
          <CardDescription className="text-lg">{occasion.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 leading-relaxed">{occasion.content}</p>
        </CardContent>
      </Card>
    </div>
  );
}