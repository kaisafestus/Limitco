"use client";

import { useState } from "react";
import { PackageTier } from "@/lib/pricing";
import { Header } from "@/components/Header";
import { MainHero } from "@/components/MainHero";
import { PricingGrid } from "@/components/PricingGrid";
import { BottomLeftNotifications } from "@/components/BottomLeftNotifications";
import { PackagePurchaseModal } from "@/components/PackagePurchaseModal";
import { useRouter } from "next/navigation";
import { STKPushModal } from "@/components/STKPushModal";
import { Footer } from "@/components/Footer";

export default function Home() {
  const [selectedPackage, setSelectedPackage] = useState<PackageTier | null>(null);
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [transactionAmount, setTransactionAmount] = useState(0);
  const [transactionPackageName, setTransactionPackageName] = useState("");
  const [showSTKPush, setShowSTKPush] = useState(false);
  const [userPhone, setUserPhone] = useState("");
  const router = useRouter();

  const handlePackageSelect = (tier: PackageTier) => {
    setSelectedPackage(tier);
    setShowPurchaseModal(true);
  };
  const handlePaymentSuccess = (transactionCode: string) => {
    const packageName = transactionPackageName || "Fuliza Package";
    router.push(
      `/success?code=${transactionCode}&amount=${transactionAmount}&package=${encodeURIComponent(
        packageName,
      )}`,
    );
    // Redirect to success page or show success state
    console.log("Payment successful for:", selectedPackage);
  };

  const handleClosePurchaseModal = () => {
    setShowPurchaseModal(false);
    setSelectedPackage(null);
  };

  const handlePaymentInitiated = (checkoutRequestId: string, phoneNumber: string, amount: number) => {
    setUserPhone(phoneNumber);
    setTransactionAmount(amount);
    setTransactionPackageName(selectedPackage?.name || "Fuliza Package");
    setShowSTKPush(true);
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
      {selectedPackage && (
        <PackagePurchaseModal
          isOpen={showPurchaseModal}
          onPaymentInitiated={handlePaymentInitiated}
          selectedPackage={selectedPackage}
          onClose={handleClosePurchaseModal}
        />
      )}

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
