"use client";

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Flower {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
}

interface CustomizationOptions {
  color: string;
  size: number;
  ribbon: string;
  vase: string;
}

const colorOptions = [
  { value: 'pink', label: 'Pink', priceModifier: 0 },
  { value: 'red', label: 'Red', priceModifier: 5 },
  { value: 'white', label: 'White', priceModifier: 0 },
  { value: 'purple', label: 'Purple', priceModifier: 10 },
  { value: 'yellow', label: 'Yellow', priceModifier: 0 }
];

const ribbonOptions = [
  { value: 'none', label: 'No Ribbon', priceModifier: 0 },
  { value: 'satin', label: 'Satin Ribbon', priceModifier: 5 },
  { value: 'velvet', label: 'Velvet Ribbon', priceModifier: 8 },
  { value: 'lace', label: 'Lace Ribbon', priceModifier: 10 }
];

const vaseOptions = [
  { value: 'none', label: 'No Vase', priceModifier: 0 },
  { value: 'glass', label: 'Glass Vase', priceModifier: 15 },
  { value: 'ceramic', label: 'Ceramic Vase', priceModifier: 25 },
  { value: 'crystal', label: 'Crystal Vase', priceModifier: 40 }
];

export default function FlowerCustomization({ flower }: { flower: Flower }) {
  const [customization, setCustomization] = useState<CustomizationOptions>({
    color: colorOptions[0].value,
    size: 100,
    ribbon: ribbonOptions[0].value,
    vase: vaseOptions[0].value
  });

  const [totalPrice, setTotalPrice] = useState(flower.price);

  const selectedColor = colorOptions.find(c => c.value === customization.color);

  useEffect(() => {
    let price = flower.price;
    price = price * (customization.size / 100);
    const colorMod = colorOptions.find(c => c.value === customization.color)?.priceModifier || 0;
    price += colorMod;
    const ribbonMod = ribbonOptions.find(r => r.value === customization.ribbon)?.priceModifier || 0;
    price += ribbonMod;
    const vaseMod = vaseOptions.find(v => v.value === customization.vase)?.priceModifier || 0;
    price += vaseMod;
    setTotalPrice(Number(price.toFixed(2)));
  }, [customization, flower.price]);

  const getModifiedImageUrl = () => {
    const filters: { [key: string]: string } = {
      pink: 'hue-rotate(340deg) saturate(1.5)',
      red: 'hue-rotate(0deg) saturate(1.5)',
      white: 'saturate(0) brightness(1.2)',
      purple: 'hue-rotate(270deg) saturate(1.5)',
      yellow: 'hue-rotate(60deg) saturate(1.5)'
    };
    return filters[customization.color] || '';
  };

  return (
    <div className="max-w-6xl mx-auto pt-24 pb-16 px-4">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Preview Section */}
        <div className="relative h-fit">
          <Card className="sticky top-32">
            <CardHeader>
              <CardTitle>{flower.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative aspect-square overflow-hidden rounded-lg mb-4">
                <img
                  src={flower.image}
                  alt={flower.name}
                  className="w-full h-full object-cover transition-transform duration-300"
                  style={{
                    filter: getModifiedImageUrl(),
                    transform: `scale(${customization.size / 100})`
                  }}
                />
                {customization.ribbon !== 'none' && (
                  <div
                    className="absolute bottom-4 left-0 right-0 h-8"
                    style={{
                      background: `linear-gradient(90deg, transparent 0%, ${customization.ribbon === 'satin' ? '#ffd700' : customization.ribbon === 'velvet' ? '#800020' : '#fff'} 50%, transparent 100%)`,
                      opacity: 0.6
                    }}
                  />
                )}
                {customization.vase !== 'none' && (
                  <div
                    className="absolute bottom-0 left-1/4 right-1/4 h-16"
                    style={{
                      background: customization.vase === 'glass' ? 'rgba(255,255,255,0.3)' :
                        customization.vase === 'ceramic' ? '#d4c5b9' :
                          'rgba(255,255,255,0.5)',
                      borderRadius: '8px 8px 0 0'
                    }}
                  />
                )}
              </div>
              <div className="text-2xl font-bold text-center">${totalPrice}</div>
            </CardContent>
          </Card>
        </div>

        {/* Customization Controls */}
        <Card>
          <CardHeader>
            <CardTitle>Customize Your Bouquet</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Color Selection */}
            <div className="space-y-2">
              <Label>Flower Color</Label>
              <div className="grid grid-cols-5 gap-2">
                {colorOptions.map((color) => (
                  <button
                    key={color.value}
                    className={`w-full aspect-square rounded-full border-2 transition-all ${customization.color === color.value
                        ? 'border-primary scale-110'
                        : 'border-transparent scale-100'
                      }`}
                    style={{
                      backgroundColor: color.value,
                      opacity: customization.color === color.value ? 1 : 0.7
                    }}
                    onClick={() => setCustomization({ ...customization, color: color.value })}
                  />
                ))}
              </div>
              <div className="text-sm text-muted-foreground">
                {selectedColor && selectedColor.priceModifier > 0 &&
                  `+$${selectedColor.priceModifier}`
                }
              </div>

            </div>

            {/* Size Adjustment */}
            <div className="space-y-2">
              <Label>Bouquet Size</Label>
              <Slider
                value={[customization.size]}
                onValueChange={(value) => setCustomization({ ...customization, size: value[0] })}
                min={50}
                max={150}
                step={10}
                className="w-full"
              />
              <div className="text-sm text-muted-foreground">
                {customization.size}% of original size
              </div>
            </div>

            {/* Ribbon Selection */}
            <div className="space-y-2">
              <Label>Ribbon Style</Label>
              <Select
                value={customization.ribbon}
                onValueChange={(value) => setCustomization({ ...customization, ribbon: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a ribbon style" />
                </SelectTrigger>
                <SelectContent>
                  {ribbonOptions.map((ribbon) => (
                    <SelectItem key={ribbon.value} value={ribbon.value}>
                      {ribbon.label} {ribbon.priceModifier > 0 && `(+$${ribbon.priceModifier})`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Vase Selection */}
            <div className="space-y-2">
              <Label>Vase Option</Label>
              <Select
                value={customization.vase}
                onValueChange={(value) => setCustomization({ ...customization, vase: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a vase option" />
                </SelectTrigger>
                <SelectContent>
                  {vaseOptions.map((vase) => (
                    <SelectItem key={vase.value} value={vase.value}>
                      {vase.label} {vase.priceModifier > 0 && `(+$${vase.priceModifier})`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button className="w-full mt-6" size="lg">
              Add to Cart - ${totalPrice}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}