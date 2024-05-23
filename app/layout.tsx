// /apo/layout.tsx

'use client'
import React, { useEffect, Suspense, useMemo } from 'react';
import { usePathname, useSearchParams } from 'next/navigation'; 
import "./globals.css";
import { Inter } from 'next/font/google';
import CustomProvider from './components/Provider';
import ReduxProviders from './redux/Provider';
import { SpeedInsights } from '@vercel/speed-insights/next';
import Head from './head';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname() ?? ''; // Assign a default value if usePathname returns null

  return (
    <html lang="en">
      <Head />
      <body className={inter.className}>
        <ReduxProviders>
          <CustomProvider>
            {/* Wrap children with Suspense */}
            <Suspense fallback={<div>Loading...</div>}>
              <InnerRootLayout pathname={pathname}>{children}</InnerRootLayout>
            </Suspense>
          </CustomProvider>
        </ReduxProviders>
        <SpeedInsights />
      </body>
    </html>
  );
}

function InnerRootLayout({ pathname, children }: { pathname: string; children: React.ReactNode }) {
  const searchParams = useSearchParams();

  useEffect(() => {
    const actualSearchParams = searchParams ?? new URLSearchParams();

    const handleRouteChange = () => {
      const params = new URLSearchParams(actualSearchParams.toString());
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
          url: `${pathname}?${actualSearchParams.toString()}`,
          userAgent: navigator.userAgent,
        }),
      });
    };

    handleRouteChange(); // Track the initial load

    const handleComplete = () => handleRouteChange();

    // Subscribe to route changes
    window.addEventListener('routeChangeComplete', handleComplete);

    // Return a cleanup function to remove the event listener
    return () => {
      window.removeEventListener('routeChangeComplete', handleComplete);
    };
  }, [pathname, searchParams]);

  return <>{children}</>;
}
