// RootLayout.tsx
'use client'
import React, { useEffect, Suspense } from 'react';
import { usePathname } from 'next/navigation'; // Import Suspense from next/navigation
import "./globals.css";
import { Inter } from 'next/font/google';
import CustomProvider from './components/Provider';
import ReduxProviders from './redux/Provider';
import { SpeedInsights } from '@vercel/speed-insights/next';
import Head from './head';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname();

  useEffect(() => {
    const handleRouteChange = () => {
      // Your route change logic here
    };

    handleRouteChange(); // Track the initial load

    const handleComplete = () => handleRouteChange();

    // Subscribe to route changes
    window.addEventListener('routeChangeComplete', handleComplete);

    return () => {
      // Unsubscribe from route changes when component unmounts
      window.removeEventListener('routeChangeComplete', handleComplete);
    };
  }, [pathname]);

  return (
    <html lang="en">
      <Head />
      <body className={inter.className}>
        <ReduxProviders>
          <CustomProvider>
            {/* Wrap the children with Suspense */}
            <Suspense fallback={<div>Loading...</div>}>
              {children}
            </Suspense>
          </CustomProvider>
        </ReduxProviders>
        <SpeedInsights />
      </body>
    </html>
  );
}








// 'use client'
// // RootLayout.tsx
// import React, { useEffect } from 'react';
// import { usePathname } from 'next/navigation'; // Import Suspense from next/navigation
// import "./globals.css";
// import { Inter } from 'next/font/google';
// import CustomProvider from './components/Provider';
// import ReduxProviders from './redux/Provider';
// import { SpeedInsights } from '@vercel/speed-insights/next';
// import Head from './head';
// import { Suspense } from 'react'

// const inter = Inter({ subsets: ['latin'] });

// export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
//   const pathname = usePathname();

//   useEffect(() => {
//     const handleRouteChange = () => {
//       // Your route change logic here
//     };

//     handleRouteChange(); // Track the initial load

//     const handleComplete = () => handleRouteChange();

//     // Subscribe to route changes
//     window.addEventListener('routeChangeComplete', handleComplete);

//     return () => {
//       // Unsubscribe from route changes when component unmounts
//       window.removeEventListener('routeChangeComplete', handleComplete);
//     };
//   }, [pathname]);

//   return (
//     <html lang="en">
//       <Head />
//       <body className={inter.className}>
//         <ReduxProviders>
//           <CustomProvider>
//             {/* Wrap the children with Suspense */}
//             <Suspense fallback={<div>Loading...</div>}>
//               {children}
//             </Suspense>
//           </CustomProvider>
//         </ReduxProviders>
//         <SpeedInsights />
//       </body>
//     </html>
//   );
// }
