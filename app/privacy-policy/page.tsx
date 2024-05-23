// /app/privacy-policy/page.tsx

import React from "react";

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      <p className="mb-4">
        Your privacy is important to us. This privacy policy explains the types
        of personal information we collect and how we use, disclose, and protect
        that information.
      </p>
      <h2 className="text-2xl font-bold mb-4">Information We Collect</h2>
      <p className="mb-4">We collect the following types of information:</p>
      <ul className="list-disc pl-5 mb-4">
        <li>Referrer</li>
        <li>UTM Source</li>
        <li>UTM Medium</li>
        <li>UTM Campaign</li>
        <li>URL</li>
        <li>User Agent</li>
        <li>IP Address</li>
        <li>Screen Resolution</li>
        <li>Language</li>
        <li>Date of Visit</li>
      </ul>
      <h2 className="text-2xl font-bold mb-4">How We Use the Information</h2>
      <p className="mb-4">
        We use the information we collect to improve our website, understand
        visitor behavior, and provide better services. We do not sell or share
        your personal information with third parties except as required by law.
      </p>
      <h2 className="text-2xl font-bold mb-4">Your Consent</h2>
      <p className="mb-4">
        By using our website, you consent to our privacy policy and the
        collection and use of your information as described.
      </p>
      <h2 className="text-2xl font-bold mb-4">Changes to Our Privacy Policy</h2>
      <p className="mb-4">
        We may update our privacy policy from time to time. Any changes will be
        posted on this page, and we encourage you to review our policy
        periodically.
      </p>
    </div>
  );
};

export default PrivacyPolicy;
