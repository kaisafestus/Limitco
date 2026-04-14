import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-16 px-4 relative z-10">
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Company Info */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-12 h-12 bg-[#28a745] rounded-xl flex items-center justify-center transform transition-transform group-hover:scale-110">
                <Image 
                  src="/Home.jpeg" 
                  alt="Fuliza Boost" 
                  width={32}
                  height={32}
                  className="rounded-lg"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Fuliza Boost</h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Your trusted partner for instant Fuliza limit increases and financial solutions.
                </p>
              </div>
            </Link>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/services" className="text-gray-300 hover:text-white transition-colors flex items-center gap-2">
                  <span className="w-2 h-2 bg-[#28a745] rounded-full flex items-center justify-center text-xs">→</span>
                  Services
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white transition-colors flex items-center gap-2">
                  <span className="w-2 h-2 bg-[#28a745] rounded-full flex items-center justify-center text-xs">→</span>
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-white transition-colors flex items-center gap-2">
                  <span className="w-2 h-2 bg-[#28a745] rounded-full flex items-center justify-center text-xs">→</span>
                  Contact
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-300 hover:text-white transition-colors flex items-center gap-2">
                  <span className="w-2 h-2 bg-[#28a745] rounded-full flex items-center justify-center text-xs">→</span>
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-white mb-4">Get in Touch</h4>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[#28a745]/20 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 0 0 2 2v14a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2zm0 4h18a2 2 0 0 0 2 2v4a2 2 0 0 0 2-2h-4a2 2 0 0 0-2 2zm-2 8a2 2 0 0 0 2 2v4a2 2 0 0 0 2-2h-4a2 2 0 0 0-2 2z"/>
                  </svg>
                </div>
                <div>
                  <span className="font-medium">07XX XXX XXX</span>
                  <span className="text-gray-400">24/7 Support</span>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[#28a745]/20 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4h16a1 1 0 0 1 1v1a1 1 0 0 0 1 1H4a1 1 0 0 0-1 1V4a1 1 0 0 0 1 1zm0 2h7a2 2 0 0 0 2v2a2 2 0 0 0 2-2h-7a2 2 0 0 0-2 2z"/>
                  </svg>
                </div>
                <div>
                  <span className="font-medium">support@fulizaboost.com</span>
                  <span className="text-gray-400">Email Us</span>
                </div>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-white mb-4">Legal</h4>
            <ul className="space-y-3 text-gray-300">
              <li>
                <Link href="/terms" className="hover:text-white transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/compliance" className="hover:text-white transition-colors">
                  Compliance
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-6">
              {/* Security Badges */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 px-3 py-1 bg-green-500/20 rounded-lg">
                  <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 2-2 2-2 2 0 0 0 2 2l-2 7-7a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h3a1 1 0 0 0 1 1v3a1 1 0 0 0 1 1z"/>
                  </svg>
                  <span className="text-green-400 text-sm font-medium">SSL Secured</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 bg-blue-500/20 rounded-lg">
                  <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2C6.48 2 2 5.52 2 10 10 6.48 22 22 17.52 22 10 17.52 22 10 6.48 2 2 5.52 2 2 10 10 6.48 22 22 17.52 22 10 6.48 2 2 5.52 2 2 10 10 6.48 22 22 17.52 22 10 6.48 2 2z"/>
                  </svg>
                  <span className="text-blue-400 text-sm font-medium">M-Pesa Verified</span>
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <p className="text-gray-400 text-sm">
                &copy; 2024 Fuliza Boost. Official Safaricom Partner. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
