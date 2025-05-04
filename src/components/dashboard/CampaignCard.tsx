import React from 'react';
import { Calendar, Clock, Users, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { Campaign } from '../../types/campaign';

interface CampaignCardProps {
  campaign: Campaign;
}

const CampaignCard: React.FC<CampaignCardProps> = ({ campaign }) => {
  const statusColors = {
    active: 'bg-success-100 text-success-800',
    scheduled: 'bg-primary-100 text-primary-800',
    draft: 'bg-gray-100 text-gray-800',
    completed: 'bg-secondary-100 text-secondary-800',
    paused: 'bg-warning-100 text-warning-800',
  };
  
  const progressColors = {
    active: 'bg-success-500',
    scheduled: 'bg-primary-500',
    draft: 'bg-gray-500',
    completed: 'bg-secondary-500',
    paused: 'bg-warning-500',
  };
  
  return (
    <div className="card hover:shadow transition-all duration-200 overflow-hidden fade-in">
      <div className="p-5">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2">
              <span
                className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                  statusColors[campaign.status as keyof typeof statusColors]
                }`}
              >
                {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
              </span>
              {campaign.isPriority && (
                <span className="bg-error-100 text-error-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                  Priority
                </span>
              )}
            </div>
            
            <h3 className="mt-1 text-lg font-semibold text-gray-900 truncate">{campaign.name}</h3>
            
            <p className="mt-1 text-sm text-gray-500 line-clamp-2">{campaign.description}</p>
          </div>
        </div>
        
        <div className="mt-4">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className={`${
                progressColors[campaign.status as keyof typeof progressColors]
              } h-2 rounded-full`}
              style={{ width: `${campaign.progress}%` }}
            ></div>
          </div>
          <div className="mt-1 flex justify-between text-xs text-gray-500">
            <span>{campaign.progress}% complete</span>
            <span>{campaign.stats.sent}/{campaign.stats.total} sent</span>
          </div>
        </div>
        
        <div className="mt-4 grid grid-cols-2 gap-4">
          <div className="flex items-center text-sm text-gray-500">
            <Calendar className="h-4 w-4 mr-1.5 text-gray-400" />
            <span>{campaign.dateCreated}</span>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <Clock className="h-4 w-4 mr-1.5 text-gray-400" />
            <span>{formatDistanceToNow(new Date(campaign.lastModified), { addSuffix: true })}</span>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <Users className="h-4 w-4 mr-1.5 text-gray-400" />
            <span>{campaign.audience}</span>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <span className="text-sm font-medium">Open rate:</span>
            <span className="ml-1">{campaign.stats.openRate}%</span>
          </div>
        </div>
      </div>
      
      <div className="border-t border-gray-200 bg-gray-50">
        <Link
          to={`/campaigns/${campaign.id}`}
          className="flex items-center justify-between px-5 py-3 text-sm font-medium text-primary-600 hover:text-primary-700 hover:bg-gray-100 transition-colors"
        >
          <span>View Campaign Details</span>
          <ChevronRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
};

export default CampaignCard;