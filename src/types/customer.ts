export interface CustomerActivity {
  type: 'purchase' | 'email' | 'review';
  description: string;
  date: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  joinDate: string;
  status: 'active' | 'inactive' | 'at-risk';
  isVIP: boolean;
  avatar: string;
  segments: string[];
  stats: {
    lifetimeValue: number;
    totalOrders: number;
    lastPurchase: string;
    averageOrderValue: number;
  };
  engagement: {
    openRate: number;
    clickRate: number;
    conversionRate: number;
  };
  recentActivity: CustomerActivity[];
}