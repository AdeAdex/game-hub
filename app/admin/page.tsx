// app/admin/page.tsx

import { NextResponse } from 'next/server';
import { connectToDb } from '../../../utils/database';
import Visitor from '../../../models/visitors';

export const GET = async () => {
  try {
    await connectToDb();
    const visitors = await Visitor.find().sort({ date: -1 }); // Fetch all visitors sorted by date
    return NextResponse.json(visitors, { status: 200 });
  } catch (error) {
    console.error("Error fetching visitors:", error.message);
    return NextResponse.error(new Error("Failed to fetch visitors"), { status: 500 });
  }
};

'use client';
import React, { useEffect, useState } from 'react';

// Define the Visitor interface
interface Visitor {
  referrer: string;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  url: string;
  userAgent: string;
  ipAddress: string;
  screenResolution: string;
  language: string;
  date: string;
}

const AdminPage: React.FC = () => {
  const [visitors, setVisitors] = useState<Visitor[]>([]);

  useEffect(() => {
    const fetchVisitors = async () => {
      try {
        const response = await fetch('/api/admin/visitors');
        const data = await response.json();
        setVisitors(data);
      } catch (error) {
        console.error('Error fetching visitors:', error);
      }
    };

    fetchVisitors();
  }, []);

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Visitor Information</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 border border-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Referrer</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">UTM Source</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">UTM Medium</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">UTM Campaign</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">URL</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User Agent</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">IP Address</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Screen Resolution</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Language</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {visitors.map((visitor, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                <td className="px-6 py-4 whitespace-nowrap">{visitor.referrer}</td>
                <td className="px-6 py-4 whitespace-nowrap">{visitor.utmSource}</td>
                <td className="px-6 py-4 whitespace-nowrap">{visitor.utmMedium}</td>
                <td className="px-6 py-4 whitespace-nowrap">{visitor.utmCampaign}</td>
                <td className="px-6 py-4 whitespace-nowrap">{visitor.url}</td>
                <td className="px-6 py-4 whitespace-nowrap">{visitor.userAgent}</td>
                <td className="px-6 py-4 whitespace-nowrap">{visitor.ipAddress}</td>
                <td className="px-6 py-4 whitespace-nowrap">{visitor.screenResolution}</td>
                <td className="px-6 py-4 whitespace-nowrap">{visitor.language}</td>
                <td className="px-6 py-4 whitespace-nowrap">{new Date(visitor.date).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPage;
