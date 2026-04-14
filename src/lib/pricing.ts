export interface PackageTier {
  id: number;
  name: string;
  limit: number;
  price: number;
  description: string;
  features: string[];
  hot?: boolean;
}

export const packageTiers: PackageTier[] = [
  {
    id: 1,
    name: "FULIZA 3,000",
    limit: 3000,
    price: 49,
    description: "Get instant access to 3,000 KES Fuliza limit",
    features: ["One-time fee", "Instant approval", "24/7 support"],
    hot: true
  },
  {
    id: 2,
    name: "FULIZA 7,500",
    limit: 7500,
    price: 99,
    description: "Get instant access to 7,500 KES Fuliza limit",
    features: ["One-time fee", "Instant approval", "24/7 support"],
    hot: true
  },
  {
    id: 3,
    name: "FULIZA 10,000",
    limit: 10000,
    price: 140,
    description: "Get instant access to 10,000 KES Fuliza limit",
    features: ["One-time fee", "Instant approval", "24/7 support"],
    hot: true
  },
  {
    id: 4,
    name: "FULIZA 12,500",
    limit: 12500,
    price: 160,
    description: "Get instant access to 12,500 KES Fuliza limit",
    features: ["One-time fee", "Instant approval", "24/7 support"],
    hot: true
  },
  {
    id: 5,
    name: "FULIZA 16,000",
    limit: 16000,
    price: 200,
    description: "Get instant access to 16,000 KES Fuliza limit",
    features: ["One-time fee", "Instant approval", "24/7 support"],
    hot: true
  },
  {
    id: 6,
    name: "FULIZA 20,000",
    limit: 20000,
    price: 260,
    description: "Get instant access to 20,000 KES Fuliza limit",
    features: ["One-time fee", "Instant approval", "24/7 support"],
    hot: true
  },
  {
    id: 7,
    name: "FULIZA 24,500",
    limit: 24500,
    price: 310,
    description: "Get instant access to 24,500 KES Fuliza limit",
    features: ["One-time fee", "Instant approval", "24/7 support"],
    hot: true
  },
  {
    id: 8,
    name: "FULIZA 29,500",
    limit: 29500,
    price: 350,
    description: "Get instant access to 29,500 KES Fuliza limit",
    features: ["One-time fee", "Instant approval", "24/7 support"],
    hot: true
  },
  {
    id: 9,
    name: "FULIZA 33,000",
    limit: 33000,
    price: 420,
    description: "Get instant access to 33,000 KES Fuliza limit",
    features: ["One-time fee", "Instant approval", "24/7 support"],
    hot: true
  },
  {
    id: 10,
    name: "FULIZA 38,500",
    limit: 38500,
    price: 490,
    description: "Get instant access to 38,500 KES Fuliza limit",
    features: ["One-time fee", "Instant approval", "24/7 support"],
    hot: true
  },
  {
    id: 11,
    name: "FULIZA 43,000",
    limit: 43000,
    price: 560,
    description: "Get instant access to 43,000 KES Fuliza limit",
    features: ["One-time fee", "Instant approval", "24/7 support"],
    hot: true
  },
  {
    id: 12,
    name: "FULIZA 50,000",
    limit: 50000,
    price: 690,
    description: "Get instant access to 50,000 KES Fuliza limit",
    features: ["One-time fee", "Instant approval", "24/7 support"],
    hot: true
  },
  {
    id: 13,
    name: "FULIZA 60,000",
    limit: 60000,
    price: 850,
    description: "Get instant access to 60,000 KES Fuliza limit",
    features: ["One-time fee", "Instant approval", "24/7 support", "VIP processing"],
    hot: true
  },
  {
    id: 14,
    name: "FULIZA 75,000",
    limit: 75000,
    price: 1200,
    description: "Get instant access to 75,000 KES Fuliza limit",
    features: ["One-time fee", "Instant approval", "24/7 support", "VIP processing"],
    hot: true
  },
  {
    id: 15,
    name: "FULIZA 85,000",
    limit: 85000,
    price: 1450,
    description: "Get instant access to 85,000 KES Fuliza limit",
    features: ["One-time fee", "Instant approval", "24/7 support", "VIP processing"],
    hot: true
  },
  {
    id: 16,
    name: "FULIZA 100,000",
    limit: 100000,
    price: 1800,
    description: "Get instant access to 100,000 KES Fuliza limit",
    features: ["One-time fee", "Instant approval", "24/7 support", "VIP processing", "Priority support"],
    hot: true
  },
  {
    id: 17,
    name: "FULIZA 125,000",
    limit: 125000,
    price: 2500,
    description: "Get instant access to 125,000 KES Fuliza limit",
    features: ["One-time fee", "Instant approval", "24/7 support", "VIP processing", "Priority support"],
    hot: true
  },
  {
    id: 18,
    name: "FULIZA 150,000",
    limit: 150000,
    price: 3200,
    description: "Get instant access to 150,000 KES Fuliza limit",
    features: ["One-time fee", "Instant approval", "24/7 support", "VIP processing", "Priority support"],
    hot: true
  },
  {
    id: 19,
    name: "FULIZA 175,000",
    limit: 175000,
    price: 3900,
    description: "Get instant access to 175,000 KES Fuliza limit",
    features: ["One-time fee", "Instant approval", "24/7 support", "VIP processing", "Priority support", "Dedicated manager"],
    hot: true
  },
  {
    id: 20,
    name: "FULIZA 200,000",
    limit: 200000,
    price: 4500,
    description: "Get instant access to 200,000 KES Fuliza limit",
    features: ["One-time fee", "Instant approval", "24/7 support", "VIP processing", "Priority support", "Dedicated manager"],
    hot: true
  },
  {
    id: 21,
    name: "FULIZA 250,000",
    limit: 250000,
    price: 5500,
    description: "Get instant access to 250,000 KES Fuliza limit",
    features: ["One-time fee", "Instant approval", "24/7 support", "VIP processing", "Priority support", "Dedicated manager"],
    hot: true
  },
  {
    id: 22,
    name: "FULIZA 300,000",
    limit: 300000,
    price: 6500,
    description: "Get instant access to 300,000 KES Fuliza limit",
    features: ["One-time fee", "Instant approval", "24/7 support", "VIP processing", "Priority support", "Dedicated manager", "Platinum status"],
    hot: true
  }
];
