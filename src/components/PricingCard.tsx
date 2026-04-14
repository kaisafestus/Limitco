"use client";

import { PackageTier } from "@/lib/pricing";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Flame, Zap } from "lucide-react";

interface PricingCardProps {
  tier: PackageTier;
  onSelect: (tier: PackageTier) => void;
  selected?: boolean;
}

export function PricingCard({ tier, onSelect, selected }: PricingCardProps) {
  return (
    <Card className={`relative transition-all duration-300 hover:shadow-xl hover:scale-105 ${
      selected ? 'ring-2 ring-[#28a745] bg-[#F0FFF0]' : 'bg-white border border-gray-200'
    }`}>
      <CardContent className="p-6 space-y-4">
        {/* Hot Badge */}
        {tier.hot && (
          <div className="flex items-center justify-center">
            <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
              <Flame className="w-3 h-3" />
              Hot
            </div>
          </div>
        )}
        
        {/* Package Name */}
        <div className="text-center">
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            {tier.name}
          </h3>
        </div>
        
        {/* Limit Amount */}
        <div className="text-center">
          <div className="text-3xl font-bold text-[#28a745] mb-1">
            KSh {tier.limit.toLocaleString()}
          </div>
        </div>
        
        {/* Features */}
        <div className="space-y-2 text-center">
          <div className="text-sm text-gray-600">One-time fee</div>
          <div className="text-2xl font-bold text-gray-900">
            KSh {tier.price}
          </div>
        </div>
        
        {/* Get Now Button */}
        <Button 
          onClick={() => onSelect(tier)}
          className="w-full bg-[#28a745] hover:bg-[#1e7e34] text-white font-bold py-3 transition-all duration-200"
        >
          Get Now
        </Button>
        
        {selected && (
          <div className="text-center text-sm text-[#28a745] font-medium">
            Selected Package
          </div>
        )}
      </CardContent>
    </Card>
  );
}
