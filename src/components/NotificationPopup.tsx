"use client";

import { useState, useEffect } from "react";
import { CheckCircle, TrendingUp, X, Sparkles } from "lucide-react";

interface Notification {
  id: number;
  name: string;
  phone: string;
  newLimit: number;
  package: string;
  timestamp: Date;
}

const clientNames = [
  "John Kamau", "Mary Wanjiru", "David Mutiso", "Grace Atieno", "Peter Njoroge",
  "Sarah Chebet", "James Mwangi", "Lucy Kiplagat", "Michael Ochieng", "Ann Wairimu",
  "Samuel Kiprop", "Esther Nyambura", "Robert Kariuki", "Joyce Adhiambo", "Daniel Muiruri",
  "Margaret Njeri", "Joseph Kipkemboi", "Susan Nduta", "Francis Maina", "Beatrice Jepkosgei",
  "Thomas Thiongo", "Dorcas Wanjala", "Patrick Nderitu", "Rebecca Cheptoo", "Christopher Kinyua",
  "Naomi Muthoni", "Benard Kiplagat", "Ruth Wairimu", "Elijah Kipruto", "Miriam Nyokabi",
  "Samuel Njenga", "Elizabeth Chepngeno", "George Muriuki", "Hannah Wangui", "William Kipchumba",
  "Faith Njeri", "Henry Kiplagat", "Martha Wanjiru", "Charles Kiprop", "Veronica Nyambura",
  "Andrew Mutiso", "Lydia Wanjala", "Peter Kariuki", "Catherine Chebet", "Jonathan Mwangi",
  "Priscilla Adhiambo", "Nicholas Njoroge", "Rebecca Njoroge", "Daniel Kipkemboi", "Susan Ndungu"
];

const locations = ["Nairobi", "Mombasa", "Kisumu", "Eldoret", "Nakuru", "Thika", "Kitale", "Garissa"];

export function NotificationPopup() {
  const [currentNotification, setCurrentNotification] = useState<Notification | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isRunning, setIsRunning] = useState(false);

  const generateNotification = (index: number): Notification => {
    const name = clientNames[index % clientNames.length];
    const phonePrefix = ["0722", "0712", "0733", "0789", "0745", "0777", "0768", "0799"][index % 8];
    const phoneSuffix = String(Math.floor(Math.random() * 900000) + 100000).padStart(6, '0');
    const phoneNumber = `${phonePrefix}**${phoneSuffix.substring(2)}`;
    const location = locations[index % locations.length];
    
    const limits = [3000, 7500, 10000, 12500, 16000, 20000, 24500, 29500, 33000, 38500, 43000, 50000, 60000, 75000, 85000, 100000, 125000, 150000, 175000, 200000, 250000, 300000];
    const newLimit = limits[index % limits.length];
    const packageNum = (index % 22) + 1;
    
    return {
      id: index,
      name: `${name} (${location})`,
      phone: phoneNumber,
      newLimit: newLimit,
      package: `Package ${packageNum}`,
      timestamp: new Date()
    };
  };

  useEffect(() => {
    // Start showing notifications immediately after mount
    if (!isRunning) {
      setIsRunning(true);
      const startTimer = setTimeout(() => {
        showNextNotification();
      }, 2000); // Start after 2 seconds

      return () => clearTimeout(startTimer);
    }
  }, []); // Only run once on mount

  const showNextNotification = () => {
    const notification = generateNotification(currentIndex);
    setCurrentNotification(notification);
    setIsVisible(true);
    
    // Hide notification after 4 seconds
    setTimeout(() => {
      setIsVisible(false);
      
      // Clear current notification and show next after transition
      setTimeout(() => {
        setCurrentNotification(null);
        
        // Schedule next notification
        const delay = Math.random() * 2000 + 1000; // Random delay between 1-3 seconds
        setTimeout(() => {
          setCurrentIndex((prev) => (prev + 1) % 100); // Loop through all 100 notifications
          showNextNotification();
        }, delay);
      }, 300); // Wait for fade out animation
    }, 4000);
  };

  const dismissNotification = () => {
    setIsVisible(false);
    setTimeout(() => {
      setCurrentNotification(null);
      
      // Schedule next notification
      const delay = Math.random() * 3000 + 1500;
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % 100);
        showNextNotification();
      }, delay);
    }, 300);
  };

  if (!currentNotification) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-sm">
      <div
        className={`
          bg-white border-l-4 border-[#28a745] rounded-lg shadow-lg p-4 min-w-[320px] 
          transform transition-all duration-500 ease-out
          ${isVisible 
            ? 'translate-y-0 opacity-100 scale-100' 
            : 'translate-y-full opacity-0 scale-95'
          }
        `}
      >
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#28a745]/10 rounded-full flex items-center justify-center">
              <CheckCircle className="w-4 h-4 text-[#28a745]" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 text-sm">Limit Increased!</h4>
              <p className="text-xs text-gray-500">Just now</p>
            </div>
          </div>
          <button
            onClick={dismissNotification}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#FFB612]" />
            <span className="font-semibold text-gray-900">{currentNotification.name}</span>
          </div>
          <div className="text-sm text-gray-600">
            Successfully increased to <span className="font-bold text-[#28a745]">KSh {currentNotification.newLimit.toLocaleString()}</span>
          </div>
          <div className="text-xs text-gray-500">
            Phone: {currentNotification.phone} | Package: {currentNotification.package}
          </div>
        </div>
        
        <div className="mt-2 pt-2 border-t border-gray-100">
          <div className="flex items-center gap-2 text-xs text-[#28a745]">
            <TrendingUp className="w-3 h-3" />
            <span className="font-medium">Join {currentIndex + 1} other satisfied customers!</span>
          </div>
        </div>
      </div>
    </div>
  );
}
