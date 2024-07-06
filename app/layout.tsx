 // /app/layout.tsx

"use client";

import React, { useEffect, useState, Suspense, useContext } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import "./globals.css";
import { Inter } from "next/font/google";
import CustomProvider from "./components/Provider";
import ReduxProviders from "./redux/Provider";
import { SpeedInsights } from "@vercel/speed-insights/next";
import HeadComponent from "./head";
import CookieConsent from "@/app/components/cookies/CookieConsent";
import { ThemeProvider, ThemeContext } from "@/app/lib/ThemeContext";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname() ?? "";
  const [hasConsent, setHasConsent] = useState(false);
  const [initialTheme, setInitialTheme] = useState("light");

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (consent) {
      setHasConsent(true);
    }

    const savedTheme = localStorage.getItem("theme") || "light";
    setInitialTheme(savedTheme);

    document.documentElement.classList.add(savedTheme);
  }, []);

  return (
    <html lang="en" className={initialTheme}>
      <head>
        <HeadComponent />
      </head>
      <body className={inter.className}>
        <ThemeProvider>
          <ReduxProviders>
            <CustomProvider>
              <Suspense fallback={<LoadingScreen initialTheme={initialTheme} />}>
                {hasConsent && (
                  <InnerRootLayout pathname={pathname}>
                    {children}
                  </InnerRootLayout>
                )}
                {!hasConsent && children}
              </Suspense>
            </CustomProvider>
          </ReduxProviders>
          <CookieConsent onConsent={() => setHasConsent(true)} />
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  );
}

function InnerRootLayout({
  pathname,
  children,
}: {
  pathname: string;
  children: React.ReactNode;
}) {
  const searchParams = useSearchParams();
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    const actualSearchParams = searchParams ?? new URLSearchParams();

    const handleRouteChange = () => {
      if (
        pathname === "/" ||
        pathname === "https://adex-game-hub.vercel.app"
      ) {
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

  useEffect(() => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
  }, [theme]);

  return (
    <div className={theme === "dark" ? "dark-mode" : "light-mode"}>
      {children}
    </div>
  );
}

const LoadingScreen = ({ initialTheme }: { initialTheme: string }) => {
  useEffect(() => {
    document.documentElement.classList.add(initialTheme);
  }, [initialTheme]);

  return (
    <div className={initialTheme === "dark" ? "dark-mode" : "light-mode"}>
      Loading...
    </div>
  );
};

