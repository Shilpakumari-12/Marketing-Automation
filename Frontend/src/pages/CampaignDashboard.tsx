import React, { useState } from 'react';
import { Plus, Search, BarChart, Users, MailCheck, TrendingUp, X } from 'lucide-react';
import CampaignCard from '../components/dashboard/CampaignCard';
import StatsCard from '../components/dashboard/StatsCard';
import RecentActivities from '../components/dashboard/RecentActivities';
import { Campaign } from '../types/campaign';

// Mock data
const mockCampaigns: Campaign[] = [
  {
    id: '1',
    name: 'Summer Sale Newsletter',
    description: 'Promotional email for our summer sale with special discounts for loyal customers.',
    status: 'active',
    type: 'email',
    audience: 'Loyal Customers',
    dateCreated: '2025-06-01',
    lastModified: new Date().toISOString(),
    progress: 68,
    isPriority: true,
    stats: {
      total: 5000,
      sent: 3400,
      delivered: 3350,
      opened: 1842,
      clicked: 736,
      bounced: 50,
      openRate: 55,
      clickRate: 22,
    },
  },
  {
    id: '2',
    name: 'Product Launch Announcement',
    description: 'Announcement for our new product line launching next month.',
    status: 'scheduled',
    type: 'email',
    audience: 'All Subscribers',
    dateCreated: '2025-06-03',
    lastModified: new Date(Date.now() - 86400000).toISOString(),
    progress: 100,
    isPriority: false,
    stats: {
      total: 10000,
      sent: 0,
      delivered: 0,
      opened: 0,
      clicked: 0,
      bounced: 0,
      openRate: 0,
      clickRate: 0,
    },
  },
  {
    id: '3',
    name: 'Customer Feedback Survey',
    description: 'Survey to collect feedback about our recent service changes.',
    status: 'draft',
    type: 'email',
    audience: 'Recent Customers',
    dateCreated: '2025-06-02',
    lastModified: new Date(Date.now() - 172800000).toISOString(),
    progress: 45,
    isPriority: false,
    stats: {
      total: 2500,
      sent: 0,
      delivered: 0,
      opened: 0,
      clicked: 0,
      bounced: 0,
      openRate: 0,
      clickRate: 0,
    },
  },
  {
    id: '4',
    name: 'Welcome Series',
    description: 'A series of welcome emails for new subscribers.',
    status: 'completed',
    type: 'email',
    audience: 'New Subscribers',
    dateCreated: '2025-05-15',
    lastModified: new Date(Date.now() - 259200000).toISOString(),
    progress: 100,
    isPriority: false,
    stats: {
      total: 1200,
      sent: 1200,
      delivered: 1180,
      opened: 885,
      clicked: 472,
      bounced: 20,
      openRate: 75,
      clickRate: 40,
    },
  },
];

const mockActivities = [
  {
    id: '1',
    user: {
      name: 'Admin User',
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150',
    },
    action: 'updated campaign',
    target: 'Summer Sale Newsletter',
    timestamp: new Date().toISOString(),
  },
  {
    id: '2',
    user: {
      name: 'Sarah Johnson',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
    },
    action: 'created a new segment',
    target: 'High-Value Customers',
    timestamp: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: '3',
    user: {
      name: 'Michael Chen',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
    },
    action: 'scheduled campaign',
    target: 'Product Launch Announcement',
    timestamp: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: '4',
    user: {
      name: 'Admin User',
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150',
    },
    action: 'created template',
    target: 'Promotional Email',
    timestamp: new Date(Date.now() - 172800000).toISOString(),
  },
];

const CampaignDashboard: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newCampaign, setNewCampaign] = useState({
    name: '',
    type: 'email',
    description: '',
    audience: '',
  });
  
  const filteredCampaigns = mockCampaigns.filter((campaign) => {
    // Filter by search query
    const matchesSearch =
      campaign.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      campaign.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Filter by status
    const matchesFilter = filter === 'all' || campaign.status === filter;
    
    return matchesSearch && matchesFilter;
  });
  
  const handleCreateCampaign = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle campaign creation logic here
    console.log('Creating campaign:', newCampaign);
    setIsCreateModalOpen(false);
    setNewCampaign({ name: '', type: 'email', description: '', audience: '' });
  };
  
  return (
    <div className="py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Campaign Dashboard</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage and monitor your marketing campaigns
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <button 
            className="btn btn-primary"
            onClick={() => setIsCreateModalOpen(true)}
          >
            <Plus className="h-4 w-4 mr-2" />
            Create Campaign
          </button>
        </div>
      </div>
  
      {/* Create Campaign Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Create New Campaign</h2>
              <button 
                onClick={() => setIsCreateModalOpen(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
  
            <form onSubmit={handleCreateCampaign}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="campaign-name" className="block text-sm font-medium text-gray-700">
                    Campaign Name *
                  </label>
                  <input
                    type="text"
                    id="campaign-name"
                    required
                    className="input mt-1 w-full"
                    value={newCampaign.name}
                    onChange={(e) => setNewCampaign({ ...newCampaign, name: e.target.value })}
                    placeholder="Enter campaign name"
                  />
                </div>
  
                <div>
                  <label htmlFor="campaign-type" className="block text-sm font-medium text-gray-700">
                    Campaign Type *
                  </label>
                  <select
                    id="campaign-type"
                    required
                    className="input mt-1 w-full"
                    value={newCampaign.type}
                    onChange={(e) => setNewCampaign({ ...newCampaign, type: e.target.value })}
                  >
                    <option value="email">Email Campaign</option>
                    <option value="sms">SMS Campaign</option>
                    <option value="push">Push Notification</option>
                    <option value="social">Social Media</option>
                  </select>
                </div>
  
                <div>
                  <label htmlFor="campaign-description" className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <textarea
                    id="campaign-description"
                    rows={3}
                    className="input mt-1 w-full"
                    value={newCampaign.description}
                    onChange={(e) => setNewCampaign({ ...newCampaign, description: e.target.value })}
                    placeholder="Enter campaign description"
                  />
                </div>
  
                <div>
                  <label htmlFor="campaign-audience" className="block text-sm font-medium text-gray-700">
                    Target Audience *
                  </label>
                  <select
                    id="campaign-audience"
                    required
                    className="input mt-1 w-full"
                    value={newCampaign.audience}
                    onChange={(e) => setNewCampaign({ ...newCampaign, audience: e.target.value })}
                  >
                    <option value="">Select audience</option>
                    <option value="all">All Subscribers</option>
                    <option value="loyal">Loyal Customers</option>
                    <option value="new">New Subscribers</option>
                    <option value="inactive">Inactive Users</option>
                  </select>
                </div>
              </div>
  
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => setIsCreateModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                >
                  Create Campaign
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      
      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <StatsCard
          title="Total Campaigns"
          value="12"
          icon={<BarChart className="h-6 w-6 text-primary-600" />}
          change={8.2}
          isPositive={true}
        />
        <StatsCard
          title="Active Subscribers"
          value="24,521"
          icon={<Users className="h-6 w-6 text-secondary-600" />}
          change={12.5}
          isPositive={true}
        />
        <StatsCard
          title="Avg. Open Rate"
          value="48.3%"
          icon={<MailCheck className="h-6 w-6 text-accent-600" />}
          change={3.2}
          isPositive={true}
        />
        <StatsCard
          title="Conversion Rate"
          value="5.9%"
          icon={<TrendingUp className="h-6 w-6 text-success-600" />}
          change={0.8}
          isPositive={false}
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Campaigns section */}
        <div className="lg:col-span-2">
          <div className="bg-white p-5 rounded-lg shadow-sm mb-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-3 md:space-y-0 mb-5">
              <h2 className="text-lg font-medium text-gray-900">Your Campaigns</h2>
              
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search campaigns..."
                    className="input pl-10 w-full sm:w-auto"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                <select
                  className="input pr-8"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="scheduled">Scheduled</option>
                  <option value="draft">Draft</option>
                  <option value="completed">Completed</option>
                  <option value="paused">Paused</option>
                </select>
              </div>
            </div>
            
            {filteredCampaigns.length === 0 ? (
              <div className="py-12 text-center">
                <p className="text-gray-500">No campaigns found matching your search criteria.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {filteredCampaigns.map((campaign) => (
                  <CampaignCard key={campaign.id} campaign={campaign} />
                ))}
              </div>
            )}
          </div>
        </div>
        
        {/* Activity feed */}
        <div className="lg:col-span-1">
          <RecentActivities activities={mockActivities} />
        </div>
      </div>
    </div>
  );
};

export default CampaignDashboard;