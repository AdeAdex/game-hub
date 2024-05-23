'use client';

import { useEffect } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { Inter } from 'next/font/google';
import Head from './head';
import "./globals.css";
import CustomProvider from "./components/Provider";
import ReduxProviders from "./redux/Provider";
import { SpeedInsights } from '@vercel/speed-insights/next';

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      if (searchParams) {
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
            url,
            userAgent: navigator.userAgent,
          }),
        });
      }
    };

    handleRouteChange(`${pathname}?${searchParams?.toString()}`); // Track the initial load

    const handleComplete = () => handleRouteChange(`${pathname}?${searchParams?.toString()}`);
    
    // Adding event listener for URL change
    router.beforePopState(() => {
      handleComplete();
      return true;
    });

    return () => {
      // Cleanup event listener
      router.beforePopState(() => true);
    };
  }, [router, pathname, searchParams]);

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
 
