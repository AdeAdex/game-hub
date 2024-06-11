// components/cookies/CookieConsent.tsx

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import CloseIcon from './CloseIcon'; // Import your CloseIcon component

interface CookieConsentProps {
  onConsent: () => void;
}

const CookieConsent: React.FC<CookieConsentProps> = ({ onConsent }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookieConsent', 'true');
    setIsVisible(false);
    onConsent();
  };

  const closeBanner = () => {
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white px-5 md:p-4 z-50">
        <CloseIcon onClick={closeBanner} />
      <div className="container mx-auto relative px-[8px] md:px-[0px] md:text-center">
        <p className="text-sm md:text-base">
          We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.
          <Link href="/privacy-policy" className="underline ml-2">
            Learn more
          </Link>
        </p>
        <button
          onClick={acceptCookies}
          className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 mt-4 block mx-auto md:w-auto"
        >
          Accept Cookies
        </button>
      </div>
    </div>
  );
};

export default CookieConsent;
