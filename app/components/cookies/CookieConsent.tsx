// components/CookieConsent.tsx
import React, { useState, useEffect } from 'react';

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

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white p-4 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <p className="text-sm">
          We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.
          <a href="/privacy-policy" className="underline ml-2">
            Learn more
          </a>
        </p>
        <button
          onClick={acceptCookies}
          className="bg-blue-500 text-white px-4 py-2 rounded ml-4 hover:bg-blue-600"
        >
          Accept Cookies
        </button>
      </div>
    </div>
  );
};

export default CookieConsent;
