"use client";

import { useState, useEffect } from "react";
import { CheckCircle, TrendingUp, X, Sparkles } from "lucide-react";

interface BottomNotification {
  id: number;
  name: string;
  phone: string;
  newLimit: number;
  timestamp: Date;
}

const clientNames = [
  "Peter", "John", "Mary", "David", "Grace", "Sarah", "James", "Lucy", "Michael", "Ann",
  "Samuel", "Esther", "Robert", "Joyce", "Daniel", "Margaret", "Joseph", "Susan", "Francis", "Beatrice",
  "Thomas", "Dorcas", "Patrick", "Rebecca", "Christopher", "Naomi", "Benard", "Ruth", "Elijah", "Miriam",
  "George", "Hannah", "William", "Faith", "Henry", "Martha", "Charles", "Veronica", "Andrew", "Lydia",
  "Nicholas", "Priscilla", "Jonathan", "Catherine", "Aaron", "Emily", "Benjamin", "Rachel", "Joshua", "Deborah",
  "Samuel", "Elizabeth", "David", "Victoria", "Michael", "Patricia", "Robert", "Jennifer", "William", "Linda",
  "Richard", "Barbara", "Joseph", "Susan", "Thomas", "Jessica", "Charles", "Sarah", "Christopher", "Karen",
  "Daniel", "Nancy", "Matthew", "Lisa", "Anthony", "Betty", "Mark", "Helen", "Donald", "Sandra",
  "Steven", "Donna", "Paul", "Carol", "Andrew", "Ruth", "Joshua", "Sharon", "Kenneth", "Michelle"
];

const phonePrefixes = ["074", "072", "071", "073", "078", "075", "077", "076", "079", "070"];

export function BottomLeftNotifications() {
  const [currentNotification, setCurrentNotification] = useState<BottomNotification | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isRunning, setIsRunning] = useState(false);

  const generateNotification = (): BottomNotification => {
    // Random selection from all available names for endless variety
    const name = clientNames[Math.floor(Math.random() * clientNames.length)];
    const phonePrefix = phonePrefixes[Math.floor(Math.random() * phonePrefixes.length)];
    const phoneSuffix = String(Math.floor(Math.random() * 900000) + 100000).padStart(6, '0');
    const phoneNumber = `${phonePrefix}xxx${phoneSuffix.substring(3)}`;
    
    const limits = [25000, 30000, 35000, 40000, 45000, 50000, 60000, 75000, 85000, 100000, 125000, 150000, 175000, 200000, 250000, 300000];
    const newLimit = limits[Math.floor(Math.random() * limits.length)];
    
    return {
      id: Date.now() + Math.random(), // Unique ID using timestamp + random
      name: name,
      phone: phoneNumber,
      newLimit: newLimit,
      timestamp: new Date()
    };
  };

  useEffect(() => {
    // Start showing notifications immediately
    if (!isRunning) {
      setIsRunning(true);
      const startTimer = setTimeout(() => {
        showNextNotification();
      }, 1000); // Start after 1 second

      return () => clearTimeout(startTimer);
    }
  }, []); // Only run once on mount

  const showNextNotification = () => {
    const notification = generateNotification(); // Generate random notification
    setCurrentNotification(notification);
    setIsVisible(true);
    
    // Hide notification after 3.5 seconds
    setTimeout(() => {
      setIsVisible(false);
      
      // Clear current notification and show next after transition
      setTimeout(() => {
        setCurrentNotification(null);
        
        // Schedule next notification with random delay
        const delay = Math.random() * 1500 + 800; // Random delay between 0.8-2.3 seconds
        setTimeout(() => {
          showNextNotification(); // Endless loop - no index tracking needed
        }, delay);
      }, 300); // Wait for fade out animation
    }, 3500);
  };

  const dismissNotification = () => {
    setIsVisible(false);
    setTimeout(() => {
      setCurrentNotification(null);
      
      // Schedule next notification
      const delay = Math.random() * 1500 + 800;
      setTimeout(() => {
        showNextNotification(); // Endless loop - no index tracking needed
      }, delay);
    }, 300);
  };

  if (!currentNotification) return null;

  return (
    <div className="fixed bottom-4 left-4 z-50 max-w-sm">
      <div
        className={`
          bg-white border border-gray-200 rounded-lg shadow-lg p-3 min-w-[280px] 
          transform transition-all duration-300
          ${isVisible 
            ? 'translate-x-0 opacity-100 scale-100' 
            : 'translate-x-full opacity-0 scale-95'
          }
        `}
      >
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-2 flex-1">
            <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <CheckCircle className="w-3 h-3 text-green-600" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1 mb-1">
                <span className="font-semibold text-gray-900 text-sm">{currentNotification.name}</span>
                <span className="text-gray-500 text-xs">{currentNotification.phone}</span>
              </div>
              <div className="text-sm text-gray-600">
                increased to <span className="font-bold text-green-600">Ksh {currentNotification.newLimit.toLocaleString()}</span>
              </div>
              <div className="text-xs text-gray-400 mt-1">
                Just now
              </div>
            </div>
          </div>
          <button
            onClick={dismissNotification}
            className="text-gray-400 hover:text-gray-600 transition-colors ml-2 flex-shrink-0"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
}
