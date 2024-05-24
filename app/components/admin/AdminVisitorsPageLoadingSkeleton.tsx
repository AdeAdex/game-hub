// app/components/AdminVisitorsPageLoadingSkeleton.tsx
import React from 'react';

const AdminVisitorsPageLoadingSkeleton: React.FC = () => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 border border-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {['Referrer', 'UTM Source', 'UTM Medium', 'UTM Campaign', 'URL', 'User Agent', 'IP Address', 'Screen Resolution', 'Language', 'Date'].map((heading) => (
              <th key={heading} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {heading}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {Array.from({ length: 10 }).map((_, index) => (
            <tr key={index} className={`animate-pulse ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
              {Array.from({ length: 10 }).map((_, i) => (
                <td key={i} className="px-6 py-4 whitespace-nowrap">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminVisitorsPageLoadingSkeleton;
