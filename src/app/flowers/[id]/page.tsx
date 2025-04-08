import FlowerCustomization from "./flower-customization";

// Define available flower IDs for static generation
const flowers = [
  {
    id: "1",
    name: "Pink Roses",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?q=80&w=2070",
    description: "Classic pink roses, perfect for romantic occasions"
  },
  {
    id: "2",
    name: "Red Roses",
    price: 54.99,
    image: "https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?q=80&w=2070",
    description: "Passionate red roses for special moments"
  },
  {
    id: "3",
    name: "White Lilies",
    price: 44.99,
    image: "https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?q=80&w=2070",
    description: "Elegant white lilies for any occasion"
  }
];

// Add generateStaticParams function for static site generation
export async function generateStaticParams() {
  return flowers.map((flower) => ({
    id: flower.id,
  }));
}

export default async function FlowerPage({ params }: { params: { id: string } }) {
  const flower = flowers.find(f => f.id === params.id) || flowers[0];
  
  return (
    <div>
      <FlowerCustomization flower={flower} />
    </div>
  );
}