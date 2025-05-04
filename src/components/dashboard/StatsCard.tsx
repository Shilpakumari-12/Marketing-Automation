import React from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  change?: number;
  changeLabel?: string;
  changeTimeframe?: string;
  isPositive?: boolean;
  bgColor?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  icon,
  change,
  changeLabel,
  changeTimeframe = 'from last period',
  isPositive = true,
  bgColor = 'bg-white',
}) => {
  return (
    <div className={`card ${bgColor} p-5 h-full fade-in`}>
      <div className="flex justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="mt-1 text-3xl font-semibold text-gray-900">{value}</p>
        </div>
        <div className="rounded-md p-2 bg-gray-50">{icon}</div>
      </div>
      
      {typeof change !== 'undefined' && (
        <div className="mt-3 flex items-center text-sm">
          {isPositive ? (
            <ArrowUp className="h-4 w-4 text-success-500 mr-1" />
          ) : (
            <ArrowDown className="h-4 w-4 text-error-500 mr-1" />
          )}
          <span
            className={`font-medium ${
              isPositive ? 'text-success-600' : 'text-error-600'
            }`}
          >
            {change}%
          </span>
          <span className="ml-1 text-gray-500">
            {changeLabel || changeTimeframe}
          </span>
        </div>
      )}
    </div>
  );
};

export default StatsCard;