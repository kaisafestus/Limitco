import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Shield, Zap, Clock, Users } from "lucide-react";

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">Our Services</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#28a745]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-[#28a745]" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Instant Approval</h3>
              <p className="text-gray-600">
                Get your Fuliza limit increased within minutes, not hours.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-[#28a745]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-[#28a745]" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Secure Processing</h3>
              <p className="text-gray-600">
                Bank-level security for all your transactions and data.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-[#28a745]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-[#28a745]" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">24/7 Support</h3>
              <p className="text-gray-600">
                Round-the-clock customer support for all your needs.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-[#28a745]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-[#28a745]" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Expert Team</h3>
              <p className="text-gray-600">
                Professional team with years of experience in financial services.
              </p>
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Package Options</h2>
            <p className="text-gray-600 mb-6">
              Choose from our range of Fuliza limit packages starting from KSh 49 to KSh 690, 
              with limits ranging from KSh 3,000 to KSh 50,000.
            </p>
            <p className="text-gray-600">
              All packages include instant processing, one-time fees, and dedicated support.
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
