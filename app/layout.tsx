// RootLayout.tsx


'use client'

import React, { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import "./globals.css";
import { Inter } from 'next/font/google';
import CustomProvider from './components/Provider';
import ReduxProviders from './redux/Provider';
import { SpeedInsights } from '@vercel/speed-insights/next';
import Head from './head';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname();
  const searchParams = useSearchParams() ?? new URLSearchParams();

  useEffect(() => {
    const handleRouteChange = () => {
      const params = new URLSearchParams(searchParams.toString());
      const utmSource = params.get('utm_source');
      const utmMedium = params.get('utm_medium');
      const utmCampaign = params.get('utm_campaign');
      const referrer = document.referrer;

      // Send this information to your backend
      fetch('/api/track-visit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          referrer,
          utmSource,
          utmMedium,
          utmCampaign,
          url: `${pathname}?${searchParams.toString()}`,
          userAgent: navigator.userAgent,
        }),
      });
    };

    handleRouteChange(); // Track the initial load

    const handleComplete = () => handleRouteChange();

    // Subscribe to route changes
    window.addEventListener('routeChangeComplete', handleComplete);

    return () => {
      // Unsubscribe from route changes when component unmounts
      window.removeEventListener('routeChangeComplete', handleComplete);
    };
  }, [pathname, searchParams]);

  return (
    <html lang="en">
      <Head />
      <body className={inter.className}>
        <ReduxProviders>
          <CustomProvider>{children}</CustomProvider>
        </ReduxProviders>
        <SpeedInsights />
      </body>
    </html>
  );
}
