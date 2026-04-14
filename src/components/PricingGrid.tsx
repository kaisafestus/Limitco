"use client";

import { useState } from "react";
import { PackageTier, packageTiers } from "@/lib/pricing";
import { PricingCard } from "./PricingCard";

interface PricingGridProps {
  onPackageSelect: (tier: PackageTier) => void;
}

export function PricingGrid({ onPackageSelect }: PricingGridProps) {
  const [selectedTier, setSelectedTier] = useState<PackageTier | null>(null);
  
  const handleSelect = (tier: PackageTier) => {
    setSelectedTier(tier);
    onPackageSelect(tier);
  };
  
  return (
    <div className="max-w-7xl mx-auto relative z-10 px-4 py-8 border-t-4 border-[#28a745]">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Choose Your Fuliza Limit Package
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Select the package that best fits your financial goals. All packages include 
          instant approval and 24/7 support.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {packageTiers.map((tier) => (
          <PricingCard
            key={tier.id}
            tier={tier}
            onSelect={handleSelect}
            selected={selectedTier?.id === tier.id}
          />
        ))}
      </div>
      
      <div className="mt-12 text-center">
        <div className="inline-flex items-center gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-[#28a745] rounded-full"></div>
            <span>All packages include instant processing</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-[#FFB612] rounded-full"></div>
            <span>Secure M-Pesa payment</span>
          </div>
        </div>
      </div>
    </div>
  );
}
