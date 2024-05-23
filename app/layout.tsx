'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
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

  useEffect(() => {
    const handleRouteChange = () => {
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
            url: `${pathname}?${searchParams.toString()}`,
            userAgent: navigator.userAgent,
          }),
        });
      }
    };

    handleRouteChange(); // Track the initial load

  }, [pathname, searchParams]); // Trigger effect on pathname or searchParams change

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
