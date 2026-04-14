"use client";

import { useState } from "react";
import { PackageTier } from "@/lib/pricing";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, User, CreditCard, CheckCircle, ArrowRight, X, IdCard } from "lucide-react";

interface PackagePurchaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPackage: PackageTier | null;
  onProceedToPayment: (userData: { phoneNumber: string; fullName: string; idNumber: string }) => void;
}

export function PackagePurchaseModal({ 
  isOpen, 
  onClose, 
  selectedPackage, 
  onProceedToPayment 
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
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      onProceedToPayment(formData);
    }, 1500);
  };

  if (!isOpen || !selectedPackage) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose}></div>
      
      <Card className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
        <CardHeader className="bg-gradient-to-r from-[#28a745] to-[#1e7e34] text-white relative">
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="absolute right-4 top-4 text-white hover:bg-white/20"
          >
            <X className="w-5 h-5" />
          </Button>
          
          <CardTitle className="text-2xl font-bold text-center pr-8">
            Complete Your Purchase
          </CardTitle>
          <CardDescription className="text-center text-white/90 text-lg">
            Package {selectedPackage.id} - {selectedPackage.name}
          </CardDescription>
        </CardHeader>
        
        <CardContent className="p-6">
          {/* Package Summary */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-gray-600">Package Price</div>
                <div className="text-2xl font-bold text-[#28a745]">
                  KSh {selectedPackage.price.toLocaleString()}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-600">New Limit</div>
                <div className="text-2xl font-bold text-[#28a745]">
                  KSh {selectedPackage.limit.toLocaleString()}
                </div>
              </div>
            </div>
          </div>

          {/* Limit Check Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Enter Your Details
              </h3>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#28a745]" />
                  Phone Number
                </label>
                <Input
                  type="tel"
                  placeholder="+254 7XX XXX XXX"
                  value={formData.phoneNumber}
                  onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                  className="border-2 focus:border-[#28a745] transition-colors"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <User className="w-4 h-4 text-[#28a745]" />
                  Full Name
                </label>
                <Input
                  type="text"
                  placeholder="John Doe"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange("fullName", e.target.value)}
                  className="border-2 focus:border-[#28a745] transition-colors"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <IdCard className="w-4 h-4 text-[#28a745]" />
                  ID Number
                </label>
                <Input
                  type="text"
                  placeholder="12345678"
                  value={formData.idNumber}
                  onChange={(e) => handleInputChange("idNumber", e.target.value)}
                  className="border-2 focus:border-[#28a745] transition-colors"
                  required
                />
              </div>
            </div>

            {/* Package Features */}
            <div className="bg-blue-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-3">What You'll Get:</h4>
              <ul className="space-y-2">
                {selectedPackage.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm text-gray-700">
                    <CheckCircle className="w-4 h-4 text-[#28a745] flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1 border-gray-300 text-gray-600 hover:bg-gray-50"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-gradient-to-r from-[#28a745] to-[#1e7e34] hover:from-[#1e7e34] hover:to-[#28a745] text-white font-bold py-3 transition-all duration-200 flex items-center justify-center gap-2"
              >
                {isSubmitting ? "Processing..." : "Proceed to Payment"}
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">
              By continuing, you agree to our terms and privacy policy
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
