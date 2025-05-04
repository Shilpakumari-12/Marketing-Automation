import React from 'react';
import { formatDistanceToNow } from 'date-fns';

interface Activity {
  id: string;
  user: {
    name: string;
    avatar: string;
  };
  action: string;
  target: string;
  timestamp: string;
}

interface RecentActivitiesProps {
  activities: Activity[];
}

const RecentActivities: React.FC<RecentActivitiesProps> = ({ activities }) => {
  return (
    <div className="card bg-white">
      <div className="border-b border-gray-200 px-5 py-4">
        <h3 className="text-lg font-medium text-gray-900">Recent Activities</h3>
      </div>
      <div className="divide-y divide-gray-200">
        {activities.map((activity) => (
          <div key={activity.id} className="px-5 py-4 slide-in">
            <div className="flex items-start">
              <img
                src={activity.user.avatar}
                alt={activity.user.name}
                className="h-10 w-10 rounded-full object-cover"
              />
              <div className="ml-3 flex-1">
                <p className="text-sm text-gray-900">
                  <span className="font-medium">{activity.user.name}</span>{' '}
                  <span>{activity.action}</span>{' '}
                  <a href="#" className="font-medium text-primary-600 hover:text-primary-500">
                    {activity.target}
                  </a>
                </p>
                <p className="mt-1 text-xs text-gray-500">
                  {formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true })}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="border-t border-gray-200 px-5 py-3">
        <a
          href="#"
          className="text-sm font-medium text-primary-600 hover:text-primary-500 transition-colors"
        >
          View all activities
        </a>
      </div>
    </div>
  );
};

export default RecentActivities;