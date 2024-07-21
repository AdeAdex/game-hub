// /app/layout.tsx

'use client'

import React, { useEffect, useState, Suspense, ReactNode } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import "./globals.css";
import { Inter } from "next/font/google";
import CustomProvider from "./components/Provider";
import ReduxProviders from "./redux/Provider";
import { SpeedInsights } from "@vercel/speed-insights/next";
import HeadComponent from "./head";
import CookieConsent from "@/app/components/cookies/CookieConsent";
import { ThemeProvider } from "@/app/lib/ThemeContext";
import { SearchProvider } from "./lib/SearchContext";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname() ?? "";
  const [hasConsent, setHasConsent] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (consent) {
      setHasConsent(true);
    }
  }, []);

  const setInitialThemeScript = `
    (function() {
      const savedTheme = localStorage.getItem('theme') || 'light';
      document.documentElement.classList.add(savedTheme);
    })();
  `;

  return (
    <html lang="en">
      <head>
        <HeadComponent />
        <script dangerouslySetInnerHTML={{ __html: setInitialThemeScript }} />
      </head>
      <body className={`${inter.className}`}>
        <ThemeProvider>
          <ReduxProviders>
            <CustomProvider>
            <SearchProvider>
              <Suspense fallback={<LoadingScreen />}>
                {hasConsent ? (
                  <InnerRootLayout pathname={pathname}>{children}</InnerRootLayout>
                ) : (
                  children
                )}
              </Suspense>
              </SearchProvider>
            </CustomProvider>
          </ReduxProviders>
          <CookieConsent onConsent={() => setHasConsent(true)} />
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  );
}

function InnerRootLayout({ pathname, children }: { pathname: string; children: ReactNode }) {
  const searchParams = useSearchParams();

  useEffect(() => {
    const actualSearchParams = searchParams ?? new URLSearchParams();

    const handleRouteChange = () => {
      if (pathname === "/" || pathname === "https://adex-game-hub.vercel.app") {
        const params = new URLSearchParams(actualSearchParams.toString());
        const utmSource = params.get("utm_source");
        const utmMedium = params.get("utm_medium");
        const utmCampaign = params.get("utm_campaign");
        const referrer = document.referrer;

        fetch("/api/track-visit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            referrer,
            utmSource,
            utmMedium,
            utmCampaign,
            url: `${window.location.href}`,
            userAgent: navigator.userAgent,
            screenResolution: `${window.screen.width}x${window.screen.height}`,
            language: navigator.language,
          }),
        });
      }
    };

    handleRouteChange();

    const handleComplete = () => handleRouteChange();

    window.addEventListener("routeChangeComplete", handleComplete);

    return () => {
      window.removeEventListener("routeChangeComplete", handleComplete);
    };
  }, [pathname, searchParams]);

  return <div className="">{children}</div>;
}

const LoadingScreen = () => {
  return <div>Loading...</div>;
}
