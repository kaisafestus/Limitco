"use client";

import { useState } from "react";
import { PackageTier } from "@/lib/pricing";
import { Header } from "@/components/Header";
import { MainHero } from "@/components/MainHero";
import { PricingGrid } from "@/components/PricingGrid";
import { BottomLeftNotifications } from "@/components/BottomLeftNotifications";
import { BackgroundRotator } from "@/components/BackgroundRotator";
import { PackagePurchaseModal } from "@/components/PackagePurchaseModal";
import { STKPushModal } from "@/components/STKPushModal";
import { Footer } from "@/components/Footer";

export default function Home() {
  const [selectedPackage, setSelectedPackage] = useState<PackageTier | null>(null);
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [showSTKPush, setShowSTKPush] = useState(false);
  const [userPhone, setUserPhone] = useState("");

  const handlePackageSelect = (tier: PackageTier) => {
    setSelectedPackage(tier);
    setShowPurchaseModal(true);
  };

  const handleProceedToPayment = (userData: { phoneNumber: string; fullName: string; idNumber: string }) => {
    setUserPhone(userData.phoneNumber);
    setShowPurchaseModal(false);
    setShowSTKPush(true);
  };

  const handlePaymentSuccess = () => {
    // Redirect to success page or show success state
    console.log("Payment successful for:", selectedPackage);
  };

  const handleClosePurchaseModal = () => {
    setShowPurchaseModal(false);
    setSelectedPackage(null);
  };

  const handleCloseSTKPush = () => {
    setShowSTKPush(false);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header />

      {/* Bottom Left Notifications */}
      <BottomLeftNotifications />

      {/* Main Hero Section */}
      <MainHero />

      {/* Pricing Grid */}
      <section className="py-12 px-4 bg-white">
        <PricingGrid onPackageSelect={handlePackageSelect} />
      </section>

      <Footer />

      {/* Package Purchase Modal */}
      <PackagePurchaseModal
        isOpen={showPurchaseModal}
        onClose={handleClosePurchaseModal}
        selectedPackage={selectedPackage}
        onProceedToPayment={handleProceedToPayment}
      />

      {/* STK Push Modal */}
      <STKPushModal
        isOpen={showSTKPush}
        onClose={handleCloseSTKPush}
        phoneNumber={userPhone || "+254 7XX XXX XXX"}
        amount={selectedPackage?.price || 0}
        onSuccess={handlePaymentSuccess}
      />
    </div>
  );
}
