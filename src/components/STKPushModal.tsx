"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Smartphone, CheckCircle, X, Loader2 } from "lucide-react";
import { generateTransactionCode } from "@/lib/utils";

interface STKPushModalProps {
  isOpen: boolean;
  onClose: () => void;
  phoneNumber: string;
  amount: number;
  onSuccess: (transactionCode: string) => void;
}

export function STKPushModal({ isOpen, onClose, phoneNumber, amount, onSuccess }: STKPushModalProps) {
  const [status, setStatus] = useState<'pending' | 'processing' | 'success' | 'error'>('pending');
  const [countdown, setCountdown] = useState(30);
  const [transactionCode, setTransactionCode] = useState('');

  useEffect(() => {
    if (isOpen) {
      setStatus('pending');
      setCountdown(30);
      setTransactionCode(generateTransactionCode(8));
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && status === 'pending') {
      setTransactionCode(generateTransactionCode(8));
      const timer = setTimeout(() => {
        setStatus('processing');
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [isOpen, status]);

  useEffect(() => {
    if (status === 'processing') {
      const interval = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            setStatus('success');
            setTimeout(() => {
                onSuccess(transactionCode);
              onClose();
            }, 2000);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      
      return () => clearInterval(interval);
    }
  }, [status, onSuccess, onClose, transactionCode]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="stk-push-overlay absolute inset-0" onClick={onClose}></div>
      
      <Card className="relative z-10 w-full max-w-md bg-white shadow-2xl">
        <CardContent className="p-6">
          <div className="text-center space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-[#28a745] rounded-full flex items-center justify-center">
                  <Smartphone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">M-Pesa STK Push</h3>
                  <p className="text-xs text-gray-500">Enter your PIN to complete</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Status Content */}
            {status === 'pending' && (
              <div className="space-y-4">
                <div className="w-16 h-16 bg-[#28a745]/10 rounded-full flex items-center justify-center mx-auto">
                  <Smartphone className="w-8 h-8 text-[#28a745]" />
                </div>
                <div>
                  <p className="text-lg font-semibold text-gray-900">Initiating Payment</p>
                  <p className="text-sm text-gray-600 mt-1">Sending STK Push to your phone...</p>
                </div>
              </div>
            )}

            {status === 'processing' && (
              <div className="space-y-4">
                <div className="w-16 h-16 bg-[#FFB612]/10 rounded-full flex items-center justify-center mx-auto">
                  <Loader2 className="w-8 h-8 text-[#FFB612] animate-spin" />
                </div>
                <div>
                  <p className="text-lg font-semibold text-gray-900">Awaiting Confirmation</p>
                  <p className="text-sm text-gray-600 mt-1">
                    Check your phone and enter your M-Pesa PIN
                  </p>
                  <div className="mt-3 bg-gray-100 rounded-lg p-3">
                    <p className="text-xs text-gray-500 mb-1">Payment Details:</p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Amount:</span>
                      <span className="text-sm font-bold text-[#28a745]">{amount.toLocaleString()} KES</span>
                    </div>
                    <div className="flex justify-between items-center mt-1">
                      <span className="text-sm font-medium">To:</span>
                      <span className="text-sm">Fuliza Boost</span>
                    </div>
                  </div>
                  <div className="mt-3">
                    <div className="text-2xl font-bold text-[#28a745]">{countdown}s</div>
                    <p className="text-xs text-gray-500">Auto-cancelling in...</p>
                  </div>
                </div>
              </div>
            )}

            {status === 'success' && (
              <div className="space-y-4">
                <div className="w-16 h-16 bg-[#28a745] rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
                <div>
                  <p className="text-lg font-semibold text-gray-900">Payment Successful!</p>
                  <p className="text-sm text-gray-600 mt-1">Your limit boost is being processed</p>
                  <div className="mt-4 bg-green-50 border border-green-200 rounded-lg p-4 text-left">
                    <p className="text-xs uppercase tracking-wide text-green-700">Transaction code</p>
                    <p className="mt-2 text-xl font-semibold text-green-900">{transactionCode}</p>
                    <p className="mt-2 text-sm text-gray-600">
                      Keep this reference safe. It confirms your successful transaction.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Phone Display */}
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center">
                  <Smartphone className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-gray-500">Sending to</p>
                  <p className="font-semibold text-gray-900">{phoneNumber}</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            {status === 'processing' && (
              <div className="space-y-2">
                <Button
                  variant="outline"
                  onClick={() => setStatus('error')}
                  className="w-full border-gray-300 text-gray-600 hover:bg-gray-50"
                >
                  I didn't receive the prompt
                </Button>
                <p className="text-xs text-gray-500">
                  Make sure your phone has network coverage and M-Pesa is active
                </p>
              </div>
            )}

            {status === 'error' && (
              <div className="space-y-3">
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <p className="text-sm text-red-800">Payment cancelled or timed out</p>
                </div>
                <Button onClick={onClose} className="w-full">
                  Try Again
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
