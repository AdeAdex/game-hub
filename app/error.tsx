"use client" 

import React from 'react';
import { useRouter } from 'next/navigation';

const Error = () => {
  const router = useRouter();

  const goBackHome = () => {
    router.push('/');
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-red-600 mb-4">Error</h2>
        <p className="text-gray-700">Oops! Something went wrong. Please try again later.</p>
        <button onClick={goBackHome} className="mt-6 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 focus:outline-none focus:bg-red-700">Go Back</button>
      </div>
    </div>
  );
}

export default Error;
 
