import React, { useState } from 'react';
import { Plus, Filter, PieChart , Users, Globe, MapPin, Smartphone, Calendar, Search, Mail, ShoppingCart, Share2 } from 'lucide-react';
import SegmentChart from '../components/segmentation/SegmentChart';
import SegmentCard from '../components/segmentation/SegmentCard';

// Mock segment data
const mockSegments = [
  {
    id: '1',
    name: 'High-Value Customers',
    description: 'Customers who have spent over $500 in the last 6 months',
    count: 2547,
    criteria: [
      'Total spend > $500',
      'Purchase within last 6 months',
      'Completed at least 3 orders',
    ],
    dateCreated: '2025-05-12',
  },
  {
    id: '2',
    name: 'Newsletter Subscribers',
    description: 'Customers who have subscribed to our newsletter',
    count: 15243,
    criteria: [
      'Subscribed to newsletter',
      'Email confirmed',
      'Not opted out of marketing',
    ],
    dateCreated: '2025-04-18',
  },
  {
    id: '3',
    name: 'Mobile App Users',
    description: 'Customers who actively use our mobile app',
    count: 8752,
    criteria: [
      'App installed',
      'App opened in last 30 days',
      'Push notifications enabled',
    ],
    dateCreated: '2025-05-28',
  },
  {
    id: '4',
    name: 'Cart Abandoners',
    description: 'Customers who abandoned their shopping cart',
    count: 3621,
    criteria: [
      'Added items to cart',
      'Session ended without purchase',
      'Within last 14 days',
    ],
    dateCreated: '2025-06-01',
  },
];

// Chart data
const deviceData = [
  { name: 'Mobile', value: 13850, color: '#3B82F6' },
  { name: 'Desktop', value: 8540, color: '#8B5CF6' },
  { name: 'Tablet', value: 2130, color: '#14B8A6' },
];

const locationData = [
  { name: 'North America', value: 12500, color: '#3B82F6' },
  { name: 'Europe', value: 7800, color: '#8B5CF6' },
  { name: 'Asia', value: 5400, color: '#14B8A6' },
  { name: 'Australia', value: 1850, color: '#22C55E' },
  { name: 'South America', value: 950, color: '#F59E0B' },
  { name: 'Africa', value: 320, color: '#EF4444' },
];

const ageData = [
  { name: '18-24', value: 4200, color: '#3B82F6' },
  { name: '25-34', value: 8700, color: '#8B5CF6' },
  { name: '35-44', value: 7300, color: '#14B8A6' },
  { name: '45-54', value: 4500, color: '#22C55E' },
  { name: '55-64', value: 2800, color: '#F59E0B' },
  { name: '65+', value: 1200, color: '#EF4444' },
];

const SegmentationPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredSegments = mockSegments.filter((segment) =>
    segment.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    segment.description.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <div className="py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Customer Segmentation</h1>
          <p className="mt-1 text-sm text-gray-500">
            Create and analyze customer segments for targeted campaigns
          </p>
        </div>
        <div className="mt-4 md:mt-0 flex space-x-3">
          <button className="btn btn-outline">
            <Filter className="h-4 w-4 mr-2" />
            Create Filter
          </button>
          <button className="btn btn-primary">
            <Plus className="h-4 w-4 mr-2" />
            New Segment
          </button>
        </div>
      </div>
      
      {/* Audience Overview */}
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Audience Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <SegmentChart data={deviceData} title="Device Distribution" />
        <SegmentChart data={locationData} title="Geographic Distribution" />
        <SegmentChart data={ageData} title="Age Distribution" />
      </div>
      
      {/* Customer Attributes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <div className="card bg-white p-5">
          <div className="flex items-start">
            <div className="bg-primary-100 p-2 rounded-md">
              <Users className="h-5 w-5 text-primary-600" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-gray-900">Total Customers</h3>
              <p className="text-2xl font-semibold text-gray-900 mt-1">24,521</p>
              <p className="text-xs text-success-600 mt-1 flex items-center">
                <span>↑ 12.5% from last month</span>
              </p>
            </div>
          </div>
        </div>
        
        <div className="card bg-white p-5">
          <div className="flex items-start">
            <div className="bg-secondary-100 p-2 rounded-md">
              <Globe className="h-5 w-5 text-secondary-600" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-gray-900">Countries</h3>
              <p className="text-2xl font-semibold text-gray-900 mt-1">42</p>
              <p className="text-xs text-gray-500 mt-1">Across 6 continents</p>
            </div>
          </div>
        </div>
        
        <div className="card bg-white p-5">
          <div className="flex items-start">
            <div className="bg-accent-100 p-2 rounded-md">
              <MapPin className="h-5 w-5 text-accent-600" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-gray-900">Top Region</h3>
              <p className="text-2xl font-semibold text-gray-900 mt-1">North America</p>
              <p className="text-xs text-gray-500 mt-1">51% of customers</p>
            </div>
          </div>
        </div>
        
        <div className="card bg-white p-5">
          <div className="flex items-start">
            <div className="bg-success-100 p-2 rounded-md">
              <Smartphone className="h-5 w-5 text-success-600" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-gray-900">Mobile Users</h3>
              <p className="text-2xl font-semibold text-gray-900 mt-1">56.5%</p>
              <p className="text-xs text-success-600 mt-1 flex items-center">
                <span>↑ 3.2% from last month</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Segments */}
      <div className="bg-white p-5 rounded-lg shadow-sm mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-3 md:space-y-0 mb-5">
          <h2 className="text-lg font-medium text-gray-900">Your Segments</h2>
          
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search segments..."
              className="input pl-10 w-full md:w-auto"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        {filteredSegments.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-gray-500">No segments found matching your search criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredSegments.map((segment) => (
              <SegmentCard key={segment.id} segment={segment} />
            ))}
          </div>
        )}
      </div>
      
      {/* Engagement Timeline */}
      <div className="card bg-white p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Customer Engagement Timeline</h2>
        <div className="relative">
          <div className="absolute h-full w-0.5 bg-gray-200 left-3.5 top-0" />
          
          <div className="space-y-6">
            <div className="flex">
              <div className="flex flex-col items-center">
                <div className="rounded-full h-7 w-7 bg-primary-100 flex items-center justify-center">
                  <Calendar className="h-4 w-4 text-primary-600" />
                </div>
                <div className="h-full w-0.5 bg-gray-200"></div>
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-900">First website visit</h3>
                <p className="text-xs text-gray-500 mt-0.5">Average: 15 days before first purchase</p>
              </div>
            </div>
            
            <div className="flex">
              <div className="flex flex-col items-center">
                <div className="rounded-full h-7 w-7 bg-secondary-100 flex items-center justify-center">
                  <Mail className="h-4 w-4 text-secondary-600" />
                </div>
                <div className="h-full w-0.5 bg-gray-200"></div>
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-900">Email signup</h3>
                <p className="text-xs text-gray-500 mt-0.5">Average: 10 days before first purchase</p>
              </div>
            </div>
            
            <div className="flex">
              <div className="flex flex-col items-center">
                <div className="rounded-full h-7 w-7 bg-accent-100 flex items-center justify-center">
                  <ShoppingCart className="h-4 w-4 text-accent-600" />
                </div>
                <div className="h-full w-0.5 bg-gray-200"></div>
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-900">First purchase</h3>
                <p className="text-xs text-gray-500 mt-0.5">Average order value: $78.50</p>
              </div>
            </div>
            
            <div className="flex">
              <div className="flex flex-col items-center">
                <div className="rounded-full h-7 w-7 bg-success-100 flex items-center justify-center">
                  <Share2 className="h-4 w-4 text-success-600" />
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-900">Repeat customer</h3>
                <p className="text-xs text-gray-500 mt-0.5">Average time to second purchase: 45 days</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SegmentationPage;