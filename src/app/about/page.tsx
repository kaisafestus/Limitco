import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">About Fuliza Boost</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-lg text-gray-600 mb-6">
              Fuliza Boost is Kenya's leading platform for increasing your M-Pesa Fuliza overdraft limits. 
              As an official Safaricom partner, we provide instant, secure, and reliable limit increases 
              to help you access the funds you need, when you need them.
            </p>
            
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Our Mission</h2>
            <p className="text-gray-600 mb-6">
              To empower Kenyans with instant access to financial services through seamless Fuliza limit 
              optimization, ensuring no one is left behind in the digital economy.
            </p>
            
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Why Choose Us?</h2>
            <ul className="space-y-3 text-gray-600">
              <li>Official Safaricom partnership guaranteeing legitimacy</li>
              <li>Instant approval and processing</li>
              <li>24/7 customer support</li>
              <li>Secure M-Pesa payment integration</li>
              <li>Transparent pricing with no hidden fees</li>
              <li>Over 50,000 satisfied customers</li>
            </ul>
            
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Our Impact</h2>
            <p className="text-gray-600 mb-6">
              Since our inception, we've helped over 50,000 Kenyans increase their Fuliza limits, 
              providing access to over KES 1 billion in emergency funds. Our platform continues to 
              grow, serving customers across all counties in Kenya.
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
