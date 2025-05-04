import React from 'react';
import { Users, ChevronRight, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Segment {
  id: string;
  name: string;
  description: string;
  count: number;
  criteria: string[];
  dateCreated: string;
}

interface SegmentCardProps {
  segment: Segment;
}

const SegmentCard: React.FC<SegmentCardProps> = ({ segment }) => {
  return (
    <div className="card hover:shadow-md transition-all duration-200 fade-in">
      <div className="p-5">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-900">{segment.name}</h3>
          <div className="bg-primary-50 rounded-full p-2">
            <Users className="h-5 w-5 text-primary-500" />
          </div>
        </div>
        
        <p className="mt-2 text-sm text-gray-500">{segment.description}</p>
        
        <div className="mt-4 bg-gray-50 rounded-md p-3">
          <p className="text-sm font-medium text-gray-700 mb-2">Segment criteria:</p>
          <ul className="space-y-1">
            {segment.criteria.map((criterion, index) => (
              <li key={index} className="text-xs text-gray-600 flex items-start">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary-500 mt-1.5 mr-2"></span>
                {criterion}
              </li>
            ))}
          </ul>
        </div>
        
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center text-sm text-gray-500">
            <Calendar className="h-4 w-4 mr-1.5 text-gray-400" />
            <span>Created: {segment.dateCreated}</span>
          </div>
          <div className="flex items-center">
            <span className="text-sm font-medium text-gray-700 mr-1">Audience size:</span>
            <span className="text-sm font-semibold text-gray-900">{segment.count.toLocaleString()}</span>
          </div>
        </div>
      </div>
      
      <div className="border-t border-gray-200 bg-gray-50">
        <Link
          to={`/segmentation/${segment.id}`}
          className="flex items-center justify-between px-5 py-3 text-sm font-medium text-primary-600 hover:text-primary-700 hover:bg-gray-100 transition-colors"
        >
          <span>View Segment Details</span>
          <ChevronRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
};

export default SegmentCard;