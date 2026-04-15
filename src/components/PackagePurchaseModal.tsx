"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PackageTier } from "@/lib/pricing";
import { Phone, User, Shield, CheckCircle, ArrowRight, Lock, CreditCard, UserCheck } from "lucide-react";
import { X } from "lucide-react";
import { formatPhoneNumberForPayhero } from "@/lib/payhero";

interface PackagePurchaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPackage: PackageTier;
  onPaymentInitiated?: (checkoutRequestId: string, phoneNumber: string, amount: number) => void;
}

export function PackagePurchaseModal({ 
  isOpen, 
  onClose, 
  selectedPackage, 
  onPaymentInitiated 
}: PackagePurchaseModalProps) {
  const [formData, setFormData] = useState({
    phoneNumber: "",
    fullName: "",
    idNumber: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Format phone number for Payhero
      const formattedPhone = formatPhoneNumberForPayhero(formData.phoneNumber);
      
      const response = await fetch('/api/payhero', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          amount: selectedPackage.price,
          phoneNumber: formattedPhone,
          externalReference: `FULIZA_${selectedPackage.id}_${Date.now()}`,
          customerName: formData.fullName,
        }),
      });

      const paymentResult = await response.json();

      if (response.ok && paymentResult.success) {
        if (onPaymentInitiated) {
          onPaymentInitiated(paymentResult.checkoutRequestID || '', formattedPhone, selectedPackage.price);
        }
        onClose();
      } else {
        alert(`Payment failed: ${paymentResult.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Payment error:', error);
      alert('Payment service unavailable. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen || !selectedPackage) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose}></div>
      
      <Card className="relative z-10 w-full max-w-md mx-auto shadow-2xl border-0 overflow-hidden">
        <CardHeader className="bg-gradient-to-br from-[#00C853] via-[#00E676] to-[#00C853] text-white relative p-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="absolute right-4 top-4 text-white hover:bg-white/20 transition-all duration-200 rounded-full"
          >
            <X className="w-5 h-5" />
          </Button>
          
          <div className="text-center pr-8">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <CreditCard className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold mb-2">
              Complete Your Purchase
            </CardTitle>
            <CardDescription className="text-white/90 text-base font-medium">
              Package {selectedPackage.id} - {selectedPackage.name}
            </CardDescription>
          </div>
        </CardHeader>
        
        <CardContent className="p-6 space-y-6">
          {/* Package Summary */}
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-5 border border-gray-200">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-xl p-4 text-center">
                <div className="text-xs text-gray-600 font-semibold uppercase tracking-wider mb-1">Package Price</div>
                <div className="text-2xl font-bold text-[#00C853]">
                  KSh {selectedPackage.price.toLocaleString()}
                </div>
              </div>
              <div className="bg-white rounded-xl p-4 text-center">
                <div className="text-xs text-gray-600 font-semibold uppercase tracking-wider mb-1">New Limit</div>
                <div className="text-2xl font-bold text-[#00C853]">
                  KSh {selectedPackage.limit.toLocaleString()}
                </div>
              </div>
            </div>
          </div>

          {/* Limit Check Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-5">
              <div className="text-center mb-6">
                <div className="inline-flex items-center gap-2 bg-[#00C853]/10 rounded-full px-4 py-2">
                  <UserCheck className="w-4 h-4 text-[#00C853]" />
                  <h3 className="text-base font-semibold text-gray-800">
                    Enter Your Details
                  </h3>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Phone className="w-5 h-5 text-gray-400" />
                  </div>
                  <Input
                    type="tel"
                    placeholder="+254 7XX XXX XXX"
                    value={formData.phoneNumber}
                    onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                    className="pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-[#00C853] focus:ring-2 focus:ring-[#00C853]/20 transition-all duration-200 bg-white text-gray-900 placeholder-gray-500 text-base font-medium"
                    required
                  />
                </div>
                
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <User className="w-5 h-5 text-gray-400" />
                  </div>
                  <Input
                    type="text"
                    placeholder="John Doe"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange("fullName", e.target.value)}
                    className="pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-[#00C853] focus:ring-2 focus:ring-[#00C853]/20 transition-all duration-200 bg-white text-gray-900 placeholder-gray-500 text-base font-medium"
                    required
                  />
                </div>
                
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Shield className="w-5 h-5 text-gray-400" />
                  </div>
                  <Input
                    type="text"
                    placeholder="12345678"
                    value={formData.idNumber}
                    onChange={(e) => handleInputChange("idNumber", e.target.value)}
                    className="pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-[#00C853] focus:ring-2 focus:ring-[#00C853]/20 transition-all duration-200 bg-white text-gray-900 placeholder-gray-500 text-base font-medium"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Package Features */}
            <div className="bg-gradient-to-r from-[#00C853]/5 to-[#00E676]/5 rounded-2xl p-5 border border-[#00C853]/20">
              <h4 className="font-semibold text-gray-900 mb-4 text-base">What You'll Get:</h4>
              <ul className="space-y-3">
                {selectedPackage.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-3 text-sm text-gray-700">
                    <div className="w-5 h-5 bg-[#00C853] rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-3 h-3 text-white" />
                    </div>
                    <span className="font-medium">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1 border-2 border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 font-semibold py-4 rounded-xl transition-all duration-200"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-gradient-to-r from-[#00C853] via-[#00E676] to-[#00C853] hover:from-[#00B844] hover:via-[#00D35F] hover:to-[#00B844] text-white font-bold py-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    Proceed to Payment
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </Button>
            </div>
          </form>
          
          <div className="mt-6 text-center">
            <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
              <Lock className="w-3 h-3" />
              <span>Secured by industry-standard encryption</span>
            </div>
            <p className="text-xs text-gray-400 mt-2">
              By continuing, you agree to our terms and privacy policy
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
