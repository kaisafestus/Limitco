"use client";

import { useState, useEffect } from "react";

const backgroundImages = [
  "/decode.jpeg", 
  "/kenyan.jpeg",
  "/customers.jpeg" // Corrected filename
];

// Dynamic font color based on background image
export const getFontColor = (imageIndex: number) => {
  const colorSchemes = [
    { text: 'text-gray-900', shadow: 'drop-shadow-lg' },    // decode.jpeg - dark text
    { text: 'text-white', shadow: 'drop-shadow-xl' },      // kenyan.jpeg - light text
    { text: 'text-gray-900', shadow: 'drop-shadow-lg' }     // customers.jpeg - dark text
  ];
  return colorSchemes[imageIndex % colorSchemes.length];
};

export function BackgroundRotator() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    console.log('Background Rotator - Current Image:', backgroundImages[currentImageIndex]);
    console.log('Background Rotator - All Images:', backgroundImages);
    
    // Change background every 8 seconds
    const interval = setInterval(() => {
      setIsVisible(false); // Fade out
      
      // Change image after fade out
      setTimeout(() => {
        setCurrentImageIndex((prev) => (prev + 1) % backgroundImages.length);
        setIsVisible(true); // Fade in
      }, 500); // 500ms fade transition
    }, 8000); // Change every 8 seconds

    return () => clearInterval(interval);
  }, []);

  const currentFontColor = getFontColor(currentImageIndex);

  return (
    <div className="absolute inset-0 z-0">
      {/* Background Image with reduced blur */}
      <div
        className={`
          absolute inset-0 bg-cover bg-center bg-no-repeat
          transition-opacity duration-2000 ease-in-out
          ${isVisible ? 'opacity-100' : 'opacity-0'}
        `}
        style={{
          backgroundImage: `url(${backgroundImages[currentImageIndex]})`,
          filter: 'blur(1px) brightness(0.9)', // Minimal blur for quality with clear text
        }}
      />
      
      {/* Lighter overlay for better visibility */}
      <div className="absolute inset-0 bg-black/10" />
      
      {/* Dynamic Font Color Context */}
      <div className={`absolute inset-0 pointer-events-none ${currentFontColor.text}`} />
    </div>
  );
}
