import React from 'react';
import { Mail, MapPin, Phone, Calendar, DollarSign, ShoppingBag, Clock, Star } from 'lucide-react';
import { Customer } from '../../types/customer';

interface CustomerDetailsProps {
  customer: Customer;
}

const CustomerDetails: React.FC<CustomerDetailsProps> = ({ customer }) => {
  return (
    <div className="rounded-lg bg-white shadow-sm">
      <div className="px-6 py-5 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center">
            <img
              src={customer.avatar}
              alt={customer.name}
              className="h-12 w-12 rounded-full object-cover border-2 border-primary-100"
            />
            <div className="ml-4">
              <h2 className="text-xl font-semibold text-gray-900">{customer.name}</h2>
              <p className="text-sm text-gray-500">{customer.email}</p>
            </div>
          </div>
          
          <div className="mt-4 sm:mt-0 flex space-x-3">
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              customer.status === 'active'
                ? 'bg-success-100 text-success-800'
                : customer.status === 'inactive'
                ? 'bg-gray-100 text-gray-800'
                : 'bg-warning-100 text-warning-800'
            }`}>
              {customer.status.charAt(0).toUpperCase() + customer.status.slice(1)}
            </span>
            
            {customer.isVIP && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary-100 text-secondary-800">
                VIP
              </span>
            )}
          </div>
        </div>
      </div>
      
      <div className="px-6 py-5">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Personal Information</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center">
            <Mail className="h-5 w-5 text-gray-400 mr-3" />
            <div>
              <p className="text-xs text-gray-500">Email</p>
              <p className="text-sm font-medium text-gray-900">{customer.email}</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <Phone className="h-5 w-5 text-gray-400 mr-3" />
            <div>
              <p className="text-xs text-gray-500">Phone</p>
              <p className="text-sm font-medium text-gray-900">{customer.phone}</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <MapPin className="h-5 w-5 text-gray-400 mr-3" />
            <div>
              <p className="text-xs text-gray-500">Location</p>
              <p className="text-sm font-medium text-gray-900">{customer.location}</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <Calendar className="h-5 w-5 text-gray-400 mr-3" />
            <div>
              <p className="text-xs text-gray-500">Customer Since</p>
              <p className="text-sm font-medium text-gray-900">{customer.joinDate}</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="px-6 py-5 border-t border-gray-200">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Customer Analytics</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center">
              <div className="bg-primary-100 p-2 rounded-full">
                <DollarSign className="h-5 w-5 text-primary-600" />
              </div>
              <div className="ml-3">
                <p className="text-xs text-gray-500">Lifetime Value</p>
                <p className="text-lg font-semibold text-gray-900">${customer.stats.lifetimeValue}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center">
              <div className="bg-secondary-100 p-2 rounded-full">
                <ShoppingBag className="h-5 w-5 text-secondary-600" />
              </div>
              <div className="ml-3">
                <p className="text-xs text-gray-500">Orders</p>
                <p className="text-lg font-semibold text-gray-900">{customer.stats.totalOrders}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center">
              <div className="bg-accent-100 p-2 rounded-full">
                <Clock className="h-5 w-5 text-accent-600" />
              </div>
              <div className="ml-3">
                <p className="text-xs text-gray-500">Last Purchase</p>
                <p className="text-lg font-semibold text-gray-900">{customer.stats.lastPurchase}</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-3">Email Engagement</h4>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-500">Open Rate</span>
                    <span className="font-medium text-gray-900">{customer.engagement.openRate}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-primary-500 h-2 rounded-full" 
                      style={{ width: `${customer.engagement.openRate}%` }}
                    ></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-500">Click Rate</span>
                    <span className="font-medium text-gray-900">{customer.engagement.clickRate}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-secondary-500 h-2 rounded-full" 
                      style={{ width: `${customer.engagement.clickRate}%` }}
                    ></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-500">Conversion Rate</span>
                    <span className="font-medium text-gray-900">{customer.engagement.conversionRate}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-accent-500 h-2 rounded-full" 
                      style={{ width: `${customer.engagement.conversionRate}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-3">Segments</h4>
              <div className="bg-gray-50 p-3 rounded-md">
                <ul className="space-y-2">
                  {customer.segments.map((segment, index) => (
                    <li key={index} className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-primary-500 mr-2"></div>
                      <span className="text-sm text-gray-700">{segment}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="px-6 py-5 border-t border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-900">Recent Activity</h3>
          <button className="text-sm text-primary-600 hover:text-primary-800 font-medium">
            View All
          </button>
        </div>
        
        <div className="space-y-4">
          {customer.recentActivity.map((activity, index) => (
            <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-md">
              <div className={`p-2 rounded-full ${
                activity.type === 'purchase' 
                  ? 'bg-success-100' 
                  : activity.type === 'email' 
                  ? 'bg-primary-100'
                  : 'bg-secondary-100'
              }`}>
                {activity.type === 'purchase' ? (
                  <ShoppingBag className={`h-4 w-4 text-success-600`} />
                ) : activity.type === 'email' ? (
                  <Mail className={`h-4 w-4 text-primary-600`} />
                ) : (
                  <Star className={`h-4 w-4 text-secondary-600`} />
                )}
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-900">{activity.description}</p>
                <p className="text-xs text-gray-500 mt-1">{activity.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CustomerDetails;