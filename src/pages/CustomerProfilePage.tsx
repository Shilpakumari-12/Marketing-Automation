import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Star, Mail, MessageSquare } from 'lucide-react';
import CustomerDetails from '../components/customers/CustomerDetails';
import { Customer } from '../types/customer';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Mock customer data
const mockCustomer: Customer = {
  id: '1',
  name: 'Sarah Johnson',
  email: 'sarah.johnson@example.com',
  phone: '+1 (555) 123-4567',
  location: 'New York, USA',
  joinDate: 'Jun 15, 2024',
  status: 'active',
  isVIP: true,
  avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
  segments: [
    'High-Value Customers',
    'Newsletter Subscribers',
    'Mobile App Users',
  ],
  stats: {
    lifetimeValue: 1850,
    totalOrders: 12,
    lastPurchase: '3 days ago',
    averageOrderValue: 154,
  },
  engagement: {
    openRate: 65,
    clickRate: 28,
    conversionRate: 12,
  },
  recentActivity: [
    {
      type: 'purchase',
      description: 'Purchased Premium Subscription Plan ($89.99)',
      date: 'Jun 28, 2025',
    },
    {
      type: 'email',
      description: 'Opened "Summer Sale Preview" email campaign',
      date: 'Jun 25, 2025',
    },
    {
      type: 'review',
      description: 'Left a 5-star review for Premium Support Service',
      date: 'Jun 20, 2025',
    },
    {
      type: 'purchase',
      description: 'Purchased Pro Membership Renewal ($129.99)',
      date: 'Jun 15, 2025',
    },
  ],
};

// Mock purchase history data
const purchaseHistory = [
  { month: 'Jan', amount: 0 },
  { month: 'Feb', amount: 120 },
  { month: 'Mar', amount: 0 },
  { month: 'Apr', amount: 250 },
  { month: 'May', amount: 180 },
  { month: 'Jun', amount: 320 },
];

// Mock email engagement data
const emailEngagement = [
  { campaign: 'Welcome Series', opened: true, clicked: true, converted: true },
  { campaign: 'Product Update', opened: true, clicked: true, converted: false },
  { campaign: 'Special Offer', opened: true, clicked: false, converted: false },
  { campaign: 'Summer Sale', opened: true, clicked: true, converted: true },
  { campaign: 'Customer Survey', opened: false, clicked: false, converted: false },
];

const CustomerProfilePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // In a real application, this would be an API call
    const fetchCustomer = async () => {
      setLoading(true);
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));
        setCustomer(mockCustomer);
      } catch (error) {
        console.error('Error fetching customer:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchCustomer();
  }, [id]);
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }
  
  if (!customer) {
    return (
      <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="bg-white shadow rounded-lg p-8 text-center">
          <h2 className="text-2xl font-medium text-gray-900 mb-4">Customer Not Found</h2>
          <p className="text-gray-500 mb-6">
            The customer you're looking for doesn't exist or has been removed.
          </p>
          <Link
            to="/campaigns"
            className="btn btn-primary"
          >
            Go Back
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="mb-6">
        <Link
          to="/campaigns"
          className="inline-flex items-center text-sm font-medium text-primary-600 hover:text-primary-800"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Dashboard
        </Link>
      </div>
      
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Customer Profile</h1>
        <div className="mt-4 md:mt-0 flex space-x-3">
          <button className="btn btn-outline">
            <Mail className="h-4 w-4 mr-2" />
            Email Customer
          </button>
          <button className="btn btn-primary">
            <MessageSquare className="h-4 w-4 mr-2" />
            Start Conversation
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <CustomerDetails customer={customer} />
        </div>
        
        <div className="lg:col-span-1 space-y-6">
          {/* Purchase History Chart */}
          <div className="bg-white rounded-lg shadow-sm p-5">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Purchase History</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={purchaseHistory}
                  margin={{ top: 5, right: 5, left: 0, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`$${value}`, 'Amount']} />
                  <Bar 
                    dataKey="amount" 
                    fill="#3B82F6" 
                    radius={[4, 4, 0, 0]} 
                    barSize={30}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-3 text-center">
              <p className="text-sm text-gray-500">
                Total Spent: <span className="font-semibold text-gray-900">${customer.stats.lifetimeValue}</span>
              </p>
            </div>
          </div>
          
          {/* Email Engagement */}
          <div className="bg-white rounded-lg shadow-sm p-5">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Email Engagement</h3>
            <div className="space-y-3">
              {emailEngagement.map((campaign, index) => (
                <div key={index} className="p-3 border border-gray-200 rounded-md">
                  <p className="text-sm font-medium text-gray-900">{campaign.campaign}</p>
                  <div className="mt-2 flex space-x-4">
                    <div className="flex items-center">
                      <div className={`h-2 w-2 rounded-full ${
                        campaign.opened ? 'bg-success-500' : 'bg-gray-300'
                      } mr-1.5`}></div>
                      <span className="text-xs text-gray-500">Opened</span>
                    </div>
                    <div className="flex items-center">
                      <div className={`h-2 w-2 rounded-full ${
                        campaign.clicked ? 'bg-success-500' : 'bg-gray-300'
                      } mr-1.5`}></div>
                      <span className="text-xs text-gray-500">Clicked</span>
                    </div>
                    <div className="flex items-center">
                      <div className={`h-2 w-2 rounded-full ${
                        campaign.converted ? 'bg-success-500' : 'bg-gray-300'
                      } mr-1.5`}></div>
                      <span className="text-xs text-gray-500">Converted</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Customer Notes */}
          <div className="bg-white rounded-lg shadow-sm p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Customer Notes</h3>
              <button className="text-sm text-primary-600 hover:text-primary-800 font-medium">
                Add Note
              </button>
            </div>
            <div className="space-y-3">
              <div className="p-3 bg-gray-50 rounded-md">
                <div className="flex items-start justify-between">
                  <p className="text-sm text-gray-900">Customer reached out about upgrading their plan next month.</p>
                  <span className="text-xs text-gray-500 whitespace-nowrap ml-2">Jun 25</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">Added by Admin User</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-md">
                <div className="flex items-start justify-between">
                  <p className="text-sm text-gray-900">VIP status granted due to high engagement and referrals.</p>
                  <span className="text-xs text-gray-500 whitespace-nowrap ml-2">Jun 10</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">Added by Sarah Johnson</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerProfilePage;