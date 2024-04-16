"use client" 

import React from 'react';
import { useRouter } from 'next/navigation';
import { FaExclamationCircle } from 'react-icons/fa';

const Error = () => {
  const router = useRouter();

  const goBackHome = () => {
    router.push('/');
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="max-w-md p-8 bg-white rounded-lg shadow-lg text-center">
        <div className="text-red-600 text-6xl mb-4 animate-pulse"><FaExclamationCircle /></div>
        <h2 className="text-3xl font-semibold text-red-600 mb-4">Oops!</h2>
        <p className="text-gray-700 mb-6">It seems something went wrong.</p>
        <p className="text-gray-700 mb-6">Don't worry, our team has been notified and we're working on fixing it. In the meantime, you can try refreshing the page or go back to the home page.</p>
        <button onClick={goBackHome} className="px-6 py-3 bg-red-600 text-white rounded hover:bg-red-700 focus:outline-none focus:bg-red-700">Go Back to Home</button>
      </div>
      <div className="mt-8 text-gray-500 text-sm">If the problem persists, please contact support.</div>
    </div>
  );
}

export default Error;
