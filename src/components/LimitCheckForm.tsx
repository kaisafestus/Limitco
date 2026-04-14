"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, User, CreditCard, CheckCircle } from "lucide-react";

interface FormData {
  phoneNumber: string;
  fullName: string;
  currentLimit: string;
}

export function LimitCheckForm() {
  const [formData, setFormData] = useState<FormData>({
    phoneNumber: "",
    fullName: "",
    currentLimit: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (field: keyof FormData, value: string) => {
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
      setIsSubmitted(true);
    }, 2000);
  };

  if (isSubmitted) {
    return (
      <Card className="max-w-md mx-auto border-2 border-[#00BE00] bg-[#F0FFF0]">
        <CardContent className="p-8 text-center">
          <CheckCircle className="w-16 h-16 text-[#00BE00] mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            Limit Check Complete!
          </h3>
          <p className="text-gray-600 mb-4">
            Your current limit analysis is ready. Choose a package below to boost your limit.
          </p>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="text-sm text-gray-500">Current Limit</div>
            <div className="text-2xl font-bold text-[#00BE00]">
              {formData.currentLimit || "0"} KES
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-md mx-auto shadow-xl">
      <CardHeader className="bg-gradient-to-r from-[#00BE00] to-[#00A500] text-white">
        <CardTitle className="text-xl font-bold text-center">
          Check Your Fuliza Limit
        </CardTitle>
        <CardDescription className="text-center text-white/90">
          Enter your details to get started
        </CardDescription>
      </CardHeader>
      
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <Phone className="w-4 h-4 text-[#00BE00]" />
              Phone Number
            </label>
            <Input
              type="tel"
              placeholder="+254 7XX XXX XXX"
              value={formData.phoneNumber}
              onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
              className="border-2 focus:border-[#00BE00] transition-colors"
              required
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <User className="w-4 h-4 text-[#00BE00]" />
              Full Name
            </label>
            <Input
              type="text"
              placeholder="John Doe"
              value={formData.fullName}
              onChange={(e) => handleInputChange("fullName", e.target.value)}
              className="border-2 focus:border-[#00BE00] transition-colors"
              required
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-[#00BE00]" />
              Current Limit (KES)
            </label>
            <Input
              type="number"
              placeholder="5000"
              value={formData.currentLimit}
              onChange={(e) => handleInputChange("currentLimit", e.target.value)}
              className="border-2 focus:border-[#00BE00] transition-colors"
              required
            />
          </div>
          
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-[#00BE00] to-[#00A500] hover:from-[#00A500] hover:to-[#00BE00] text-white font-bold py-3 transition-all duration-200"
          >
            {isSubmitting ? "Checking..." : "Check Limit"}
          </Button>
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            By continuing, you agree to our terms and privacy policy
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
