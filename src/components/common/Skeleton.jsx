import React from 'react';

export const CardSkeleton = ({ count = 1, className = '' }) => {
  return (
    <div className={`space-y-4 ${className}`}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="bg-white rounded-2xl shadow p-6 animate-pulse">
          <div className="flex justify-between items-start">
            <div className="space-y-3 w-full">
              <div className="h-5 bg-gray-200 rounded w-2/3"></div>
              <div className="h-4 bg-gray-200 rounded w-1/3"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
            <div className="flex space-x-2">
              <div className="w-8 h-8 bg-gray-200 rounded"></div>
              <div className="w-8 h-8 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export const StatsSkeleton = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6 animate-pulse">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="bg-gray-200 rounded-xl p-4 h-20"></div>
      ))}
    </div>
  );
};

export const TableSkeleton = ({ rows = 5, cols = 4 }) => {
  return (
    <div className="space-y-3 animate-pulse">
      <div className="flex bg-gray-100 rounded-lg p-3">
        {Array.from({ length: cols }).map((_, i) => (
          <div key={i} className="h-4 bg-gray-300 rounded flex-1 mx-1"></div>
        ))}
      </div>
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex bg-white border rounded-lg p-3">
          {Array.from({ length: cols }).map((_, j) => (
            <div key={j} className="h-4 bg-gray-200 rounded flex-1 mx-1"></div>
          ))}
        </div>
      ))}
    </div>
  );
};