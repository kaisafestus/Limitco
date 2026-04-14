"use client";

import { useState, useEffect } from "react";
import { TrendingUp, Clock, User } from "lucide-react";

interface Testimonial {
  id: number;
  phone: string;
  newLimit: string;
  timeAgo: string;
  package: string;
}

const testimonials: Testimonial[] = [
  { id: 1, phone: "0722**", newLimit: "15,000", timeAgo: "2 mins ago", package: "Package 8" },
  { id: 2, phone: "0712**", newLimit: "25,000", timeAgo: "5 mins ago", package: "Package 12" },
  { id: 3, phone: "0789**", newLimit: "8,000", timeAgo: "8 mins ago", package: "Package 5" },
  { id: 4, phone: "0734**", newLimit: "50,000", timeAgo: "12 mins ago", package: "Package 15" },
  { id: 5, phone: "0777**", newLimit: "35,000", timeAgo: "15 mins ago", package: "Package 13" },
  { id: 6, phone: "0745**", newLimit: "12,000", timeAgo: "18 mins ago", package: "Package 7" },
  { id: 7, phone: "0799**", newLimit: "75,000", timeAgo: "22 mins ago", package: "Package 17" },
  { id: 8, phone: "0766**", newLimit: "20,000", timeAgo: "25 mins ago", package: "Package 10" },
];

export function TestimonialScroller() {
  const [visibleTestimonials, setVisibleTestimonials] = useState<Testimonial[]>(testimonials.slice(0, 4));
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        const nextIndex = (prev + 1) % testimonials.length;
        const newTestimonials = [];
        
        for (let i = 0; i < 4; i++) {
          const index = (nextIndex + i) % testimonials.length;
          newTestimonials.push(testimonials[index]);
        }
        
        setVisibleTestimonials(newTestimonials);
        return nextIndex;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gradient-to-r from-[#28a745]/5 to-[#00A500]/5 py-8 px-4 border-y border-[#28a745]/20">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-center gap-2 mb-6">
          <TrendingUp className="w-5 h-5 text-[#28a745]" />
          <h3 className="text-lg font-bold text-gray-900">Recent Success Stories</h3>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-[#28a745] rounded-full animate-pulse"></div>
            <span className="text-xs text-[#28a745] font-medium">LIVE</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {visibleTestimonials.map((testimonial, index) => (
            <div
              key={`${testimonial.id}-${currentIndex}`}
              className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 transition-all duration-500 hover:shadow-md hover:border-[#28a745]/30"
              style={{
                animation: index === 0 ? 'slideIn 0.5s ease-out' : 'fadeIn 0.5s ease-out'
              }}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-[#28a745]" />
                  <span className="font-semibold text-gray-900">{testimonial.phone}</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <Clock className="w-3 h-3" />
                  {testimonial.timeAgo}
                </div>
              </div>
              
              <div className="space-y-1">
                <div className="text-sm text-gray-600">
                  Increased to
                  <span className="font-bold text-[#28a745] ml-1">
                    {testimonial.newLimit} KES
                  </span>
                </div>
                <div className="text-xs text-gray-500">
                  via {testimonial.package}
                </div>
              </div>
              
              <div className="mt-3 pt-3 border-t border-gray-100">
                <div className="flex items-center gap-1">
                  <div className="w-1 h-1 bg-[#28a745] rounded-full"></div>
                  <div className="w-1 h-1 bg-[#28a745] rounded-full"></div>
                  <div className="w-1 h-1 bg-[#28a745] rounded-full"></div>
                  <span className="text-xs text-gray-500 ml-1">Verified</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            <span className="font-semibold text-[#28a745]">50,000+</span> customers 
            have successfully increased their limits
          </p>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
