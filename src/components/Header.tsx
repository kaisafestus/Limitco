"use client";

import { Menu, X, Smartphone, User, Shield } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Main Header */}
      <header className="bg-[#28a745] text-white relative z-10">
        <div className="max-w-7xl mx-auto px-4">
          {/* Top Bar */}
          <div className="flex items-center justify-between py-3 border-b border-green-600">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Smartphone className="w-5 h-5" />
              
              </div>
              <div className="hidden md:flex items-center gap-2">
                <Shield className="w-4 h-4" />
                <span className="text-sm">Official Safaricom Partner</span>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <button className="hidden md:flex items-center gap-2 text-sm hover:bg-green-600 px-3 py-1 rounded transition-colors">
                <User className="w-4 h-4" />
            
              </button>
              <button 
                className="md:hidden"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Main Navigation */}
          <div className="py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-8">
                <Link href="/" className="flex items-center gap-2">
                  <Image 
                    src="/Home.jpeg" 
                    alt="Fuliza Limit Optimization" 
                    width={50}
                    height={50}
                    className="rounded-lg"
                  />
                  <span className="text-2xl font-bold">Fuliza Limit Increase</span>
                </Link>
                
                <nav className="hidden lg:flex items-center gap-6">
                  <Link href="/" className="text-white hover:text-green-100 transition-colors font-medium">Home</Link>
                  <Link href="/services" className="text-white hover:text-green-100 transition-colors font-medium">Services</Link>
                  <Link href="/about" className="text-white hover:text-green-100 transition-colors font-medium">About</Link>
                  <Link href="/contact" className="text-white hover:text-green-100 transition-colors font-medium">Contact</Link>
                </nav>
              </div>

              <div className="hidden lg:flex items-center gap-4">
                <button className="bg-white text-[#28a745] px-4 py-2 rounded font-bold hover:bg-green-50 transition-colors">
                  Get Started
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-green-600">
              <nav className="flex flex-col gap-4">
                <Link href="/" className="text-white hover:text-green-100 transition-colors font-medium">Home</Link>
                <Link href="/services" className="text-white hover:text-green-100 transition-colors font-medium">Services</Link>
                <Link href="/about" className="text-white hover:text-green-100 transition-colors font-medium">About</Link>
                <Link href="/contact" className="text-white hover:text-green-100 transition-colors font-medium">Contact</Link>
                <Link href="/" className="bg-white text-[#28a745] px-4 py-2 rounded font-bold hover:bg-green-50 transition-colors w-fit text-center">
                  Get Started
                </Link>
              </nav>
            </div>
          )}
        </div>
      </header>

          </>
  );
}
