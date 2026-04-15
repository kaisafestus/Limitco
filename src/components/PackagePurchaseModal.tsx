"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PackageTier } from "@/lib/pricing";
import { Phone, User, Shield, CheckCircle, ArrowRight, Lock, CreditCard, UserCheck, AlertCircle, Clock, XCircle } from "lucide-react";
import { X } from "lucide-react";
import { formatPhoneNumberForPayhero, checkPaymentStatus } from "@/lib/payhero";

interface PackagePurchaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPackage: PackageTier;
  onPaymentInitiated?: (checkoutRequestId: string, phoneNumber: string, amount: number) => void;
  onPaymentCompleted?: (success: boolean, message: string) => void;
}

type PaymentStatus = 'idle' | 'initiated' | 'pending' | 'completed' | 'failed' | 'cancelled' | 'timeout';
type ErrorType = 'network' | 'invalid_phone' | 'insufficient_funds' | 'cancelled' | 'timeout' | 'general';

export function PackagePurchaseModal({ 
  isOpen, 
  onClose, 
  selectedPackage, 
  onPaymentInitiated,
  onPaymentCompleted
}: PackagePurchaseModalProps) {
  const [formData, setFormData] = useState({
    phoneNumber: "",
    fullName: "",
    idNumber: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>('idle');
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [checkoutRequestId, setCheckoutRequestId] = useState<string>("");
  const [timeLeft, setTimeLeft] = useState<number>(300); // 5 minutes timeout
  const statusCheckInterval = useRef<NodeJS.Timeout | null>(null);
  const timeoutInterval = useRef<NodeJS.Timeout | null>(null);

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    // Clear error when user starts typing
    if (errorMessage) {
      setErrorMessage("");
    }
  };

  const clearIntervals = () => {
    if (statusCheckInterval.current) {
      clearInterval(statusCheckInterval.current);
      statusCheckInterval.current = null;
    }
    if (timeoutInterval.current) {
      clearInterval(timeoutInterval.current);
      timeoutInterval.current = null;
    }
  };

  const getErrorMessage = (errorType: ErrorType, responseDescription?: string): string => {
    switch (errorType) {
      case 'network':
        return 'Network error. Please check your internet connection and try again.';
      case 'invalid_phone':
        return 'Invalid phone number. Please enter a valid Safaricom number (e.g., 07XX XXX XXX).';
      case 'insufficient_funds':
        return 'Insufficient funds in your M-PESA account. Please top up and try again.';
      case 'cancelled':
        return 'Payment was cancelled. Please try again if you still wish to proceed.';
      case 'timeout':
        return 'Payment timed out. The STK push expired. Please try again.';
      case 'general':
      default:
        return responseDescription || 'Payment failed. Please try again.';
    }
  };

  const checkPaymentStatusPeriodically = async (checkoutId: string) => {
    try {
      const statusResult = await checkPaymentStatus(checkoutId);
      
      if (statusResult.success) {
        // Payment completed successfully
        setPaymentStatus('completed');
        clearIntervals();
        if (onPaymentCompleted) {
          onPaymentCompleted(true, 'Payment completed successfully!');
        }
        setTimeout(() => onClose(), 2000);
      } else if (statusResult.responseCode === '1001' || statusResult.responseDescription?.toLowerCase().includes('cancel')) {
        // Payment cancelled
        setPaymentStatus('cancelled');
        setErrorMessage(getErrorMessage('cancelled', statusResult.responseDescription));
        clearIntervals();
      } else if (statusResult.responseCode === '1002' || statusResult.responseDescription?.toLowerCase().includes('timeout')) {
        // Payment timed out
        setPaymentStatus('timeout');
        setErrorMessage(getErrorMessage('timeout', statusResult.responseDescription));
        clearIntervals();
      } else if (statusResult.responseCode === '1003' || statusResult.responseDescription?.toLowerCase().includes('insufficient')) {
        // Insufficient funds
        setPaymentStatus('failed');
        setErrorMessage(getErrorMessage('insufficient_funds', statusResult.responseDescription));
        clearIntervals();
      }
    } catch (error) {
      console.error('Status check error:', error);
    }
  };

  useEffect(() => {
    // Start timeout countdown when payment is initiated
    if (paymentStatus === 'pending' && timeLeft > 0) {
      timeoutInterval.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setPaymentStatus('timeout');
            setErrorMessage(getErrorMessage('timeout'));
            clearIntervals();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearIntervals();
  }, [paymentStatus, timeLeft]);

  useEffect(() => {
    // Cleanup intervals on unmount
    return clearIntervals;
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");
    setPaymentStatus('initiated');
    
    try {
      // Format phone number for Payhero
      const formattedPhone = formatPhoneNumberForPayhero(formData.phoneNumber);
      
      // Validate phone number
      if (formattedPhone.length !== 12 || !formattedPhone.startsWith('2547')) {
        setPaymentStatus('failed');
        setErrorMessage(getErrorMessage('invalid_phone'));
        setIsSubmitting(false);
        return;
      }
      
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
        // Payment initiated successfully
        setPaymentStatus('pending');
        setCheckoutRequestId(paymentResult.checkoutRequestID || '');
        setTimeLeft(300); // Reset timeout
        
        if (onPaymentInitiated) {
          onPaymentInitiated(paymentResult.checkoutRequestID || '', formattedPhone, selectedPackage.price);
        }

        // Start checking payment status every 5 seconds
        statusCheckInterval.current = setInterval(() => {
          checkPaymentStatusPeriodically(paymentResult.checkoutRequestID || '');
        }, 5000);
      } else {
        // Payment initiation failed
        setPaymentStatus('failed');
        let errorType: ErrorType = 'general';
        
        if (paymentResult.responseCode === '1001') errorType = 'invalid_phone';
        else if (paymentResult.responseCode === '1002') errorType = 'network';
        else if (paymentResult.responseCode === '1003') errorType = 'insufficient_funds';
        else if (paymentResult.responseDescription?.toLowerCase().includes('network')) errorType = 'network';
        else if (paymentResult.responseDescription?.toLowerCase().includes('phone')) errorType = 'invalid_phone';
        
        setErrorMessage(getErrorMessage(errorType, paymentResult.responseDescription));
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error('Payment error:', error);
      setPaymentStatus('failed');
      setErrorMessage(getErrorMessage('network'));
      setIsSubmitting(false);
    }
  };

  const handleRetry = () => {
    setPaymentStatus('idle');
    setErrorMessage("");
    setCheckoutRequestId("");
    setTimeLeft(300);
    clearIntervals();
  };

  const formatTimeLeft = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
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
                    placeholder="07XX XXX XXX"
                    value={formData.phoneNumber}
                    onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                    className={`pl-12 pr-4 py-4 border-2 rounded-xl transition-all duration-200 bg-white text-gray-900 placeholder-gray-500 text-base font-medium ${
                      errorMessage && errorMessage.includes('phone') 
                        ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' 
                        : 'border-gray-200 focus:border-[#00C853] focus:ring-2 focus:ring-[#00C853]/20'
                    }`}
                    disabled={paymentStatus !== 'idle' && paymentStatus !== 'failed' && paymentStatus !== 'cancelled' && paymentStatus !== 'timeout'}
                    required
                  />
                </div>
                
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <User className="w-5 h-5 text-gray-400" />
                  </div>
                  <Input
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange("fullName", e.target.value)}
                    className="pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-[#00C853] focus:ring-2 focus:ring-[#00C853]/20 transition-all duration-200 bg-white text-gray-900 placeholder-gray-500 text-base font-medium"
                    disabled={paymentStatus !== 'idle' && paymentStatus !== 'failed' && paymentStatus !== 'cancelled' && paymentStatus !== 'timeout'}
                    required
                  />
                </div>
                
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Shield className="w-5 h-5 text-gray-400" />
                  </div>
                  <Input
                    type="text"
                    placeholder="Enter your ID number"
                    value={formData.idNumber}
                    onChange={(e) => handleInputChange("idNumber", e.target.value)}
                    className="pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-[#00C853] focus:ring-2 focus:ring-[#00C853]/20 transition-all duration-200 bg-white text-gray-900 placeholder-gray-500 text-base font-medium"
                    disabled={paymentStatus !== 'idle' && paymentStatus !== 'failed' && paymentStatus !== 'cancelled' && paymentStatus !== 'timeout'}
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

            {/* Payment Status Display */}
            {paymentStatus === 'pending' && (
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <Clock className="w-4 h-4 text-white animate-spin" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-blue-900">Waiting for Payment</h4>
                    <p className="text-sm text-blue-700">Please check your phone and complete the M-PESA transaction</p>
                  </div>
                </div>
                <div className="bg-blue-100 rounded-lg px-3 py-2 text-center">
                  <span className="text-sm font-medium text-blue-800">Time remaining: {formatTimeLeft(timeLeft)}</span>
                </div>
              </div>
            )}

            {paymentStatus === 'completed' && (
              <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-green-900">Payment Successful!</h4>
                    <p className="text-sm text-green-700">Your package has been activated</p>
                  </div>
                </div>
              </div>
            )}

            {paymentStatus === 'failed' && errorMessage && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <XCircle className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-red-900 mb-1">Payment Failed</h4>
                    <p className="text-sm text-red-700">{errorMessage}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3 pt-2">
              {paymentStatus === 'idle' || paymentStatus === 'failed' || paymentStatus === 'cancelled' || paymentStatus === 'timeout' ? (
                <>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={onClose}
                    className="flex-1 border-2 border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 font-semibold py-4 rounded-xl transition-all duration-200"
                  >
                    Close
                  </Button>
                  {(paymentStatus === 'failed' || paymentStatus === 'cancelled' || paymentStatus === 'timeout') && (
                    <Button
                      type="button"
                      onClick={handleRetry}
                      className="flex-1 bg-gradient-to-r from-[#00C853] via-[#00E676] to-[#00C853] hover:from-[#00B844] hover:via-[#00D35F] hover:to-[#00B844] text-white font-bold py-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
                    >
                      Try Again
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  )}
                  {paymentStatus === 'idle' && (
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
                  )}
                </>
              ) : paymentStatus === 'pending' ? (
                <Button
                  type="button"
                  onClick={() => {
                    clearIntervals();
                    setPaymentStatus('cancelled');
                    setErrorMessage(getErrorMessage('cancelled'));
                  }}
                  variant="outline"
                  className="w-full border-2 border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 font-semibold py-4 rounded-xl transition-all duration-200"
                >
                  Cancel Payment
                </Button>
              ) : (
                <Button
                  type="button"
                  onClick={onClose}
                  className="w-full bg-gradient-to-r from-[#00C853] via-[#00E676] to-[#00C853] hover:from-[#00B844] hover:via-[#00D35F] hover:to-[#00B844] text-white font-bold py-4 rounded-xl transition-all duration-200"
                >
                  Done
                </Button>
              )}
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
