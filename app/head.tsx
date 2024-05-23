// app/head.tsx

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Game Hub",
  description: "Generated by Game Hub",
};

export default function Head() {
  return (
    <>
      <title>{String(metadata.title ?? 'Default Title')}</title>
      <meta name="description" content={String(metadata.description ?? 'Default Description')} />
    </>
  );
}




// app/layout.tsx

/* import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import CustomProvider from "./components/Provider";
import ReduxProviders from "./redux/Provider";
import { SpeedInsights } from '@vercel/speed-insights/next';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Game Hub",
  description: "Generated by Game Hub",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProviders>
          <CustomProvider>{children}</CustomProvider>
        </ReduxProviders>
        <SpeedInsights />
      </body>
    </html>
  );
}
*/
