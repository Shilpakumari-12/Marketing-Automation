import React, { useState, useEffect } from 'react';
import { Bell, Check, Calendar, ArrowUpRight, Filter, MailPlus, Users, RefreshCw } from 'lucide-react';

interface Notification {
  id: string;
  type: 'system' | 'campaign' | 'user' | 'alert';
  message: string;
  timestamp: string;
  read: boolean;
  actionUrl?: string;
  actionText?: string;
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'campaign',
    message: 'Summer Sale Newsletter campaign has been sent to 3,450 recipients',
    timestamp: new Date(Date.now() - 30 * 60000).toISOString(), // 30 minutes ago
    read: false,
    actionUrl: '/campaigns/1',
    actionText: 'View Campaign',
  },
  {
    id: '2',
    type: 'user',
    message: 'Sarah Johnson updated the Product Launch Announcement campaign',
    timestamp: new Date(Date.now() - 3 * 3600000).toISOString(), // 3 hours ago
    read: false,
  },
  {
    id: '3',
    type: 'alert',
    message: 'Your subscription will expire in 7 days. Renew now to avoid service interruption.',
    timestamp: new Date(Date.now() - 5 * 3600000).toISOString(), // 5 hours ago
    read: true,
    actionUrl: '/settings/billing',
    actionText: 'Renew Subscription',
  },
  {
    id: '4',
    type: 'system',
    message: 'System maintenance scheduled for June 30th, 2025 at 01:00 UTC',
    timestamp: new Date(Date.now() - 24 * 3600000).toISOString(), // 1 day ago
    read: true,
  },
  {
    id: '5',
    type: 'campaign',
    message: 'Customer Feedback Survey is scheduled to send tomorrow at 9:00 AM',
    timestamp: new Date(Date.now() - 2 * 24 * 3600000).toISOString(), // 2 days ago
    read: true,
    actionUrl: '/campaigns/3',
    actionText: 'Edit Campaign',
  },
  {
    id: '6',
    type: 'user',
    message: 'Michael Chen created a new segment: High-Value Customers',
    timestamp: new Date(Date.now() - 3 * 24 * 3600000).toISOString(), // 3 days ago
    read: true,
    actionUrl: '/segmentation/1',
    actionText: 'View Segment',
  },
  {
    id: '7',
    type: 'alert',
    message: 'Campaign "Flash Sale" has an unusually high bounce rate of 8.2%',
    timestamp: new Date(Date.now() - 4 * 24 * 3600000).toISOString(), // 4 days ago
    read: true,
    actionUrl: '/campaigns/analytics',
    actionText: 'View Analytics',
  },
];

const formatNotificationTime = (timestamp: string): string => {
  const date = new Date(timestamp);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);
  
  if (diffDay > 0) {
    return diffDay === 1 ? 'Yesterday' : `${diffDay} days ago`;
  }
  
  if (diffHour > 0) {
    return `${diffHour} hour${diffHour !== 1 ? 's' : ''} ago`;
  }
  
  if (diffMin > 0) {
    return `${diffMin} minute${diffMin !== 1 ? 's' : ''} ago`;
  }
  
  return 'Just now';
};

const NotificationPage: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [filter, setFilter] = useState<'all' | 'unread' | 'system' | 'campaign' | 'user' | 'alert'>('all');
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate loading data
    const loadData = async () => {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 800));
      setNotifications(mockNotifications);
      setIsLoading(false);
    };
    
    loadData();
    
    // Set up a mock real-time connection
    const interval = setInterval(() => {
      // Simulate a new notification every ~2 minutes
      if (Math.random() > 0.9) {
        const newNotification: Notification = {
          id: Date.now().toString(),
          type: ['system', 'campaign', 'user', 'alert'][Math.floor(Math.random() * 4)] as any,
          message: 'New activity detected in your account',
          timestamp: new Date().toISOString(),
          read: false,
        };
        
        setNotifications(prev => [newNotification, ...prev]);
      }
    }, 20000);
    
    return () => clearInterval(interval);
  }, []);
  
  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !notification.read;
    return notification.type === filter;
  });
  
  const unreadCount = notifications.filter(n => !n.read).length;
  
  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };
  
  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
  };
  
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'system':
        return <RefreshCw className="h-5 w-5 text-primary-500" />;
      case 'campaign':
        return <MailPlus className="h-5 w-5 text-accent-500" />;
      case 'user':
        return <Users className="h-5 w-5 text-secondary-500" />;
      case 'alert':
        return <Bell className="h-5 w-5 text-warning-500" />;
      default:
        return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };
  
  return (
    <div className="py-6 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
          {unreadCount > 0 && (
            <span className="ml-3 bg-primary-100 text-primary-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
              {unreadCount} unread
            </span>
          )}
        </div>
        
        <div className="mt-4 md:mt-0 flex space-x-3">
          <div className="relative">
            <select
              className="input pr-8"
              value={filter}
              onChange={(e) => setFilter(e.target.value as any)}
            >
              <option value="all">All Notifications</option>
              <option value="unread">Unread</option>
              <option value="system">System</option>
              <option value="campaign">Campaigns</option>
              <option value="user">User Activity</option>
              <option value="alert">Alerts</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <Filter className="h-4 w-4 text-gray-400" />
            </div>
          </div>
          
          {unreadCount > 0 && (
            <button
              className="btn btn-outline"
              onClick={markAllAsRead}
            >
              <Check className="h-4 w-4 mr-2" />
              Mark all as read
            </button>
          )}
        </div>
      </div>
      
      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium text-gray-900">Activity Feed</h2>
            <button className="text-sm text-primary-600 hover:text-primary-700 font-medium flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              View Calendar
            </button>
          </div>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center items-center py-16">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-500"></div>
          </div>
        ) : filteredNotifications.length === 0 ? (
          <div className="py-16 text-center">
            <Bell className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-1">No notifications</h3>
            <p className="text-gray-500 text-sm">
              {filter === 'all' 
                ? "You're all caught up! Check back later for new notifications."
                : "No notifications match your current filter."}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {filteredNotifications.map((notification) => (
              <div 
                key={notification.id} 
                className={`px-5 py-4 hover:bg-gray-50 transition-colors ${!notification.read ? 'bg-primary-50' : ''}`}
              >
                <div className="flex items-start">
                  <div className="bg-gray-100 rounded-full p-2 mr-3">
                    {getNotificationIcon(notification.type)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900">{notification.message}</p>
                    <p className="mt-1 text-xs text-gray-500">{formatNotificationTime(notification.timestamp)}</p>
                    
                    {notification.actionUrl && notification.actionText && (
                      <a
                        href={notification.actionUrl}
                        className="mt-2 inline-flex items-center text-xs font-medium text-primary-600 hover:text-primary-700"
                      >
                        {notification.actionText}
                        <ArrowUpRight className="ml-1 h-3 w-3" />
                      </a>
                    )}
                  </div>
                  
                  {!notification.read && (
                    <button
                      className="ml-3 flex-shrink-0 p-1 text-gray-400 rounded-full hover:bg-gray-200 hover:text-gray-500"
                      onClick={() => markAsRead(notification.id)}
                    >
                      <span className="sr-only">Mark as read</span>
                      <Check className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
        
        <div className="px-5 py-4 border-t border-gray-200 bg-gray-50 text-center">
          <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">
            Load more
          </button>
        </div>
      </div>
      
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white shadow-sm rounded-lg overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Notification Settings</h2>
          </div>
          
          <div className="p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-900">Email Notifications</h3>
                <p className="text-xs text-gray-500">Receive daily digests of your notifications</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" value="" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-900">Campaign Alerts</h3>
                <p className="text-xs text-gray-500">Receive alerts about campaign performance</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" value="" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-900">User Activity</h3>
                <p className="text-xs text-gray-500">Notifications about team member actions</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" value="" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-900">System Updates</h3>
                <p className="text-xs text-gray-500">Notifications about platform updates</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" value="" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
              </label>
            </div>
          </div>
        </div>
        
        <div className="bg-white shadow-sm rounded-lg overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Real-time Events</h2>
          </div>
          
          <div className="p-5 h-52 flex flex-col justify-center items-center text-center">
            <div className="relative">
              <div className="absolute animate-ping w-3 h-3 rounded-full bg-secondary-400 opacity-75"></div>
              <div className="relative w-3 h-3 rounded-full bg-secondary-500"></div>
            </div>
            
            <h3 className="mt-4 text-sm font-medium text-gray-900">Listening for events</h3>
            <p className="mt-1 text-xs text-gray-500">
              Real-time events will appear here as they happen
            </p>
            
            <p className="mt-4 text-xs text-primary-600 flex items-center">
              <RefreshCw className="h-3 w-3 mr-1 animate-spin" />
              Connected to event stream
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationPage;