"use client";

import { Shield, Zap, TrendingUp, Lock } from "lucide-react";

export function HeroSection() {
  return (
    <div className="safaricom-wave bg-white py-16 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 bg-[#00BE00]/10 px-4 py-2 rounded-full mb-6">
            <Shield className="w-5 h-5 text-[#00BE00]" />
            <span className="text-sm font-semibold text-[#00BE00]">
              Official Safaricom Partner
            </span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Unlock Your
            <span className="text-[#00BE00]"> Financial Freedom</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Official limit optimization for Safaricom M-Pesa users. 
            <span className="font-semibold"> Secure, fast, and transparent.</span>
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Zap className="w-5 h-5 text-[#FFB612]" />
              <span>Instant Processing</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <TrendingUp className="w-5 h-5 text-[#00BE00]" />
              <span>Guaranteed Results</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Lock className="w-5 h-5 text-[#E60000]" />
              <span>Bank-Level Security</span>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
            <div className="text-3xl font-bold text-[#00BE00] mb-2">50K+</div>
            <div className="text-sm text-gray-600">Happy Customers</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
            <div className="text-3xl font-bold text-[#FFB612] mb-2">4.9/5</div>
            <div className="text-sm text-gray-600">Customer Rating</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
            <div className="text-3xl font-bold text-[#E60000] mb-2">2 mins</div>
            <div className="text-sm text-gray-600">Average Processing</div>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <div className="trust-badge flex items-center gap-2">
            <Shield className="w-4 h-4" />
            Powered by Lipana SDK
          </div>
          <div className="trust-badge flex items-center gap-2">
            <Lock className="w-4 h-4" />
            SSL Secured
          </div>
          <div className="trust-badge flex items-center gap-2">
            <Zap className="w-4 h-4" />
            M-Pesa Verified
          </div>
        </div>
      </div>
    </div>
  );
}
