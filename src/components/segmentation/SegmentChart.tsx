import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

interface SegmentChartProps {
  data: Array<{
    name: string;
    value: number;
    color: string;
  }>;
  title?: string;
}

const SegmentChart: React.FC<SegmentChartProps> = ({ data, title }) => {
  const total = data.reduce((sum, entry) => sum + entry.value, 0);
  
  return (
    <div className="card bg-white p-5 h-full">
      {title && <h3 className="text-lg font-medium text-gray-900 mb-4">{title}</h3>}
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={2}
              dataKey="value"
              label={({
                cx,
                cy,
                midAngle,
                innerRadius,
                outerRadius,
                percent,
              }) => {
                const radius = innerRadius + (outerRadius - innerRadius) * 1.4;
                const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
                const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));
                
                return (
                  <text
                    x={x}
                    y={y}
                    fill="#555"
                    textAnchor={x > cx ? 'start' : 'end'}
                    dominantBaseline="middle"
                    fontSize={12}
                  >
                    {`${(percent * 100).toFixed(0)}%`}
                  </text>
                );
              }}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value: number) => [`${value} (${((value / total) * 100).toFixed(1)}%)`, '']}
            />
            <Legend
              layout="horizontal"
              verticalAlign="bottom"
              align="center"
              wrapperStyle={{ paddingTop: '20px' }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-4 grid grid-cols-1 gap-2">
        {data.map((segment, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center">
              <div
                className="w-3 h-3 rounded-full mr-2"
                style={{ backgroundColor: segment.color }}
              ></div>
              <span className="text-sm text-gray-700">{segment.name}</span>
            </div>
            <div className="text-sm font-medium text-gray-900">
              {segment.value.toLocaleString()}
            </div>
          </div>
        ))}
        <div className="pt-2 mt-2 border-t border-gray-200 flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">Total</span>
          <span className="text-sm font-medium text-gray-900">
            {total.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default SegmentChart;