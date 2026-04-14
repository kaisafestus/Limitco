"use client";

import { Shield, Zap, TrendingUp, Lock, CheckCircle, ArrowRight } from "lucide-react";
import { BackgroundRotator, getFontColor } from "./BackgroundRotator";

export function MainHero() {
  const currentFontColor = getFontColor(0); // Initial color state

  return (
    <section className="relative py-20 px-4 text-center z-10">
      {/* Background Rotator - Only in Hero Section */}
      <BackgroundRotator />
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 bg-[#28a745]/10 px-4 py-2 rounded-full">
                <Shield className="w-5 h-5 text-[#28a745]" />
                <span className="text-sm font-semibold text-[#28a745]">
                  Official Safaricom Partner
                </span>
              </div>
              
              <h1 className={`text-5xl lg:text-6xl font-bold mb-6 ${currentFontColor.shadow}`}>
                Increase Your Fuliza Limit Instantly
              </h1>
              <p className={`text-xl mb-8 max-w-2xl mx-auto ${currentFontColor.text} ${currentFontColor.shadow}`}>
                Get access to emergency funds when you need them most. Our automated 
                system ensures quick approval and processing.
              </p>

            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className={`text-3xl font-bold mb-1 ${currentFontColor.shadow}`}>50K+</div>
                <div className={`text-sm ${currentFontColor.text} ${currentFontColor.shadow}`}>Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#FFB612] mb-1 drop-shadow-md">4.9/5</div>
                <div className={`text-sm ${currentFontColor.text} ${currentFontColor.shadow}`}>Customer Rating</div>
              </div>
              <div className="text-center">
                <div className={`text-3xl font-bold mb-1 ${currentFontColor.shadow}`}>24/7</div>
                <div className={`text-sm ${currentFontColor.text} ${currentFontColor.shadow}`}>Support Available</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#FFB612] mb-1 drop-shadow-md">100%</div>
                <div className={`text-sm ${currentFontColor.text} ${currentFontColor.shadow}`}>Secure & Safe</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-[#28a745] text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#1e7e34] transition-colors flex items-center justify-center gap-2 shadow-lg">
                <Zap className="w-5 h-5" />
                Check My Limit Now
                <ArrowRight className="w-5 h-5" />
              </button>
              <button className="border-2 border-[#28a745] text-[#28a745] px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#28a745] hover:text-white transition-colors flex items-center justify-center gap-2">
                <TrendingUp className="w-5 h-5" />
                View Packages
              </button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-[#28a745] flex-shrink-0" />
                <span className="text-sm text-gray-700">Instant Approval</span>
              </div>
              <div className="flex items-center gap-3">
                <Lock className="w-5 h-5 text-[#28a745] flex-shrink-0" />
                <span className="text-sm text-gray-700">Secure Payment</span>
              </div>
              <div className="flex items-center gap-3">
                <Zap className="w-5 h-5 text-[#28a745] flex-shrink-0" />
                <span className="text-sm text-gray-700">24/7 Support</span>
              </div>
            </div>
          </div>

          {/* Right Content - Phone Mockup */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              {/* Phone Frame */}
              <div className="w-80 h-[600px] bg-gray-900 rounded-[3rem] p-4 shadow-2xl">
                <div className="w-full h-full bg-white rounded-[2.5rem] overflow-hidden relative">
                  {/* Phone Screen Content */}
                  <div className="bg-[#28a745] p-4 text-white">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                          <span className="text-[#28a745] font-bold text-xs">F</span>
                        </div>
                        <span className="font-bold">Fuliza Boost</span>
                      </div>
                      <div className="text-xs">9:41 AM</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold mb-2">Current Limit</div>
                      <div className="text-4xl font-bold">5,000 KES</div>
                    </div>
                  </div>
                  
                  <div className="p-4 space-y-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="text-sm text-gray-600 mb-2">Available Packages</div>
                      <div className="space-y-2">
                        <div className="bg-white p-3 rounded border border-gray-200 flex justify-between items-center">
                          <div>
                            <div className="font-semibold text-sm">Package 5</div>
                            <div className="text-xs text-gray-500">Up to 10,000 KES</div>
                          </div>
                          <div className="text-[#28a745] font-bold">1,249 KES</div>
                        </div>
                        <div className="bg-white p-3 rounded border border-gray-200 flex justify-between items-center">
                          <div>
                            <div className="font-semibold text-sm">Package 10</div>
                            <div className="text-xs text-gray-500">Up to 25,000 KES</div>
                          </div>
                          <div className="text-[#28a745] font-bold">2,499 KES</div>
                        </div>
                      </div>
                    </div>
                    
                    <button className="w-full bg-[#28a745] text-white py-3 rounded-lg font-bold">
                      Boost My Limit Now
                    </button>
                    
                    <div className="text-center text-xs text-gray-500">
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <Shield className="w-4 h-4 text-[#28a745]" />
                        <span>Official Partner</span>
                      </div>
                      <div>SSL Secured & M-Pesa Verified</div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Glow Effect */}
              <div className="absolute -inset-4 bg-gradient-to-r from-[#28a745]/20 to-[#1e7e34]/20 rounded-[3rem] blur-xl -z-10"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
