import React, { useState } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import StatsCard from '../components/dashboard/StatsCard';
import { BarChart2, ArrowRight, PieChart as PieChartIcon, TrendingUp, Calendar, Clock } from 'lucide-react';
import { Users } from 'lucide-react';

// Mock data
const weeklyData = [
  { name: 'Mon', visits: 4000, conversions: 240 },
  { name: 'Tue', visits: 3000, conversions: 198 },
  { name: 'Wed', visits: 4800, conversions: 320 },
  { name: 'Thu', visits: 3800, conversions: 250 },
  { name: 'Fri', visits: 5000, conversions: 370 },
  { name: 'Sat', visits: 4700, conversions: 310 },
  { name: 'Sun', visits: 4200, conversions: 280 },
];

const monthlyData = [
  { name: 'Jan', visits: 15000, conversions: 1120 },
  { name: 'Feb', visits: 18000, conversions: 1350 },
  { name: 'Mar', visits: 22000, conversions: 1650 },
  { name: 'Apr', visits: 24000, conversions: 1800 },
  { name: 'May', visits: 26000, conversions: 2100 },
  { name: 'Jun', visits: 32000, conversions: 2400 },
];

const sourceData = [
  { name: 'Direct', value: 35 },
  { name: 'Social', value: 25 },
  { name: 'Email', value: 20 },
  { name: 'Referral', value: 15 },
  { name: 'Other', value: 5 },
];

const sourceColors = ['#3B82F6', '#8B5CF6', '#14B8A6', '#22C55E', '#F59E0B'];

const campaignPerformance = [
  { name: 'Summer Sale', opens: 8500, clicks: 3200, conversions: 680 },
  { name: 'Product Launch', opens: 7200, clicks: 2800, conversions: 520 },
  { name: 'Welcome Series', opens: 6800, clicks: 3500, conversions: 920 },
  { name: 'Abandoned Cart', opens: 5400, clicks: 2100, conversions: 750 },
  { name: 'Re-engagement', opens: 4200, clicks: 1800, conversions: 380 },
];

const AnalyticsPage: React.FC = () => {
  const [timeframe, setTimeframe] = useState<'weekly' | 'monthly'>('weekly');
  const data = timeframe === 'weekly' ? weeklyData : monthlyData;
  
  return (
    <div className="py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
          <p className="mt-1 text-sm text-gray-500">
            Track and analyze your marketing performance
          </p>
        </div>
        
        <div className="mt-4 md:mt-0">
          <div className="inline-flex rounded-md shadow-sm" role="group">
            <button
              type="button"
              className={`px-4 py-2 text-sm font-medium border rounded-l-md ${
                timeframe === 'weekly'
                  ? 'border-primary-600 bg-primary-600 text-white'
                  : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
              }`}
              onClick={() => setTimeframe('weekly')}
            >
              Weekly
            </button>
            <button
              type="button"
              className={`px-4 py-2 text-sm font-medium border rounded-r-md ${
                timeframe === 'monthly'
                  ? 'border-primary-600 bg-primary-600 text-white'
                  : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
              }`}
              onClick={() => setTimeframe('monthly')}
            >
              Monthly
            </button>
          </div>
        </div>
      </div>
      
      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <StatsCard
          title="Page Views"
          value={timeframe === 'weekly' ? '28,500' : '137,000'}
          icon={<BarChart2 className="h-6 w-6 text-primary-600" />}
          change={12.5}
          isPositive={true}
          changeTimeframe={timeframe === 'weekly' ? 'vs last week' : 'vs last month'}
        />
        <StatsCard
          title="Unique Visitors"
          value={timeframe === 'weekly' ? '12,420' : '58,350'}
          icon={<Users className="h-6 w-6 text-secondary-600" />}
          change={8.3}
          isPositive={true}
          changeTimeframe={timeframe === 'weekly' ? 'vs last week' : 'vs last month'}
        />
        <StatsCard
          title="Conversion Rate"
          value={timeframe === 'weekly' ? '5.8%' : '6.2%'}
          icon={<ArrowRight className="h-6 w-6 text-accent-600" />}
          change={0.7}
          isPositive={true}
          changeTimeframe={timeframe === 'weekly' ? 'vs last week' : 'vs last month'}
        />
        <StatsCard
          title="Avg. Session Duration"
          value={timeframe === 'weekly' ? '3m 12s' : '3m 45s'}
          icon={<Clock className="h-6 w-6 text-success-600" />}
          change={5.2}
          isPositive={true}
          changeTimeframe={timeframe === 'weekly' ? 'vs last week' : 'vs last month'}
        />
      </div>
      
      {/* Main charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="card bg-white p-5">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Visitors & Conversions</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={data}
                margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis yAxisId="left" orientation="left" stroke="#3B82F6" />
                <YAxis yAxisId="right" orientation="right" stroke="#14B8A6" />
                <Tooltip />
                <Legend />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="visits"
                  name="Visitors"
                  stroke="#3B82F6"
                  activeDot={{ r: 8 }}
                  strokeWidth={2}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="conversions"
                  name="Conversions"
                  stroke="#14B8A6"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="card bg-white p-5">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Traffic Sources</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={sourceData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                  label={({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
                    const radius = innerRadius + (outerRadius - innerRadius) * 1.35;
                    const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
                    const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));
                    return (
                      <text
                        x={x}
                        y={y}
                        fill="#555"
                        textAnchor={x > cx ? 'start' : 'end'}
                        dominantBaseline="central"
                      >
                        {`${(percent * 100).toFixed(0)}%`}
                      </text>
                    );
                  }}
                >
                  {sourceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={sourceColors[index % sourceColors.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend
                  layout="vertical"
                  verticalAlign="middle"
                  align="right"
                  wrapperStyle={{ paddingLeft: '20px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      {/* Campaign performance */}
      <div className="card bg-white p-5 mb-8">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Campaign Performance</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={campaignPerformance}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar
                name="Email Opens"
                dataKey="opens"
                fill="#3B82F6"
                radius={[4, 4, 0, 0]}
              />
              <Bar
                name="Clicks"
                dataKey="clicks"
                fill="#8B5CF6"
                radius={[4, 4, 0, 0]}
              />
              <Bar
                name="Conversions"
                dataKey="conversions"
                fill="#14B8A6"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      {/* Key metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="card bg-white p-5">
          <div className="flex items-center mb-4">
            <div className="bg-primary-100 p-2 rounded-md">
              <BarChart2 className="h-5 w-5 text-primary-600" />
            </div>
            <h3 className="ml-3 text-lg font-medium text-gray-900">Open Rate</h3>
          </div>
          
          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Average</p>
              <p className="text-2xl font-semibold text-gray-900">48.3%</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Industry Avg</p>
              <p className="text-2xl font-semibold text-gray-500">21.5%</p>
            </div>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div className="bg-primary-600 h-2.5 rounded-full" style={{ width: '48.3%' }}></div>
          </div>
          <p className="mt-2 text-xs text-success-600">+26.8% above industry average</p>
        </div>
        
        <div className="card bg-white p-5">
          <div className="flex items-center mb-4">
            <div className="bg-secondary-100 p-2 rounded-md">
              <PieChartIcon className="h-5 w-5 text-secondary-600" />
            </div>
            <h3 className="ml-3 text-lg font-medium text-gray-900">Click Rate</h3>
          </div>
          
          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Average</p>
              <p className="text-2xl font-semibold text-gray-900">12.7%</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Industry Avg</p>
              <p className="text-2xl font-semibold text-gray-500">7.8%</p>
            </div>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div className="bg-secondary-600 h-2.5 rounded-full" style={{ width: '12.7%' }}></div>
          </div>
          <p className="mt-2 text-xs text-success-600">+4.9% above industry average</p>
        </div>
        
        <div className="card bg-white p-5">
          <div className="flex items-center mb-4">
            <div className="bg-accent-100 p-2 rounded-md">
              <TrendingUp className="h-5 w-5 text-accent-600" />
            </div>
            <h3 className="ml-3 text-lg font-medium text-gray-900">Conversion Rate</h3>
          </div>
          
          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Average</p>
              <p className="text-2xl font-semibold text-gray-900">5.9%</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Industry Avg</p>
              <p className="text-2xl font-semibold text-gray-500">3.2%</p>
            </div>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div className="bg-accent-600 h-2.5 rounded-full" style={{ width: '5.9%' }}></div>
          </div>
          <p className="mt-2 text-xs text-success-600">+2.7% above industry average</p>
        </div>
      </div>
      
      {/* Upcoming trend analysis */}
      <div className="card bg-white p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-900">Engagement Trends</h3>
          <button className="btn btn-outline text-xs px-3 py-1">
            <Calendar className="h-3 w-3 mr-1" />
            Select Date Range
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Metric
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Week
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  This Week
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Change
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Trend
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  Email Open Rate
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  45.8%
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                  48.3%
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-success-600">
                  +2.5%
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="h-6 w-20">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={[
                        { value: 40 },
                        { value: 35 },
                        { value: 45 },
                        { value: 42 },
                        { value: 48 }
                      ]}>
                        <Line type="monotone" dataKey="value" stroke="#3B82F6" strokeWidth={2} dot={false} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  Click-through Rate
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  10.2%
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                  12.7%
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-success-600">
                  +2.5%
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="h-6 w-20">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={[
                        { value: 8 },
                        { value: 10 },
                        { value: 9.5 },
                        { value: 11 },
                        { value: 12.7 }
                      ]}>
                        <Line type="monotone" dataKey="value" stroke="#8B5CF6" strokeWidth={2} dot={false} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  Conversion Rate
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  6.3%
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                  5.9%
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-error-600">
                  -0.4%
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="h-6 w-20">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={[
                        { value: 5.8 },
                        { value: 6.2 },
                        { value: 6.5 },
                        { value: 6.1 },
                        { value: 5.9 }
                      ]}>
                        <Line type="monotone" dataKey="value" stroke="#14B8A6" strokeWidth={2} dot={false} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  Bounce Rate
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  2.8%
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                  2.1%
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-success-600">
                  -0.7%
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="h-6 w-20">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={[
                        { value: 3.5 },
                        { value: 3.2 },
                        { value: 2.9 },
                        { value: 2.8 },
                        { value: 2.1 }
                      ]}>
                        <Line type="monotone" dataKey="value" stroke="#22C55E" strokeWidth={2} dot={false} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;