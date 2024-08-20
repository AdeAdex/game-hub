"use client";

import React from "react";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import { useSearch } from "@/app/lib/SearchContext";

const CookiesPage: React.FC = () => {
  const { handleSearch, suggestions } = useSearch();

  return (
    <div
      className={`min-h-screen flex flex-col dark:bg-dark-mode dark:text-white bg-gray-50 text-black `}
    >
      <Navbar onSearch={handleSearch} suggestions={suggestions} />
      
      <div className="container mx-auto py-20 md:py-24 max-w-[65.25rem] px-5">
        <h1 className="text-3xl font-bold mb-6">Cookies Policy</h1>
        <p className="mb-4">
          Welcome to Adex GameHub! This Cookies Policy explains what cookies are, how we use them on our website, and your choices regarding cookies. By using Adex GameHub, you agree to the use of cookies in accordance with this policy.
        </p>

        <h2 className="text-2xl font-bold mb-4">What Are Cookies?</h2>
        <p className="mb-4">
          Cookies are small text files stored on your device when you visit a website. They help the website remember your actions and preferences (such as login, language, and other display preferences) over a period of time, so you don’t have to keep re-entering them whenever you come back to the site or browse from one page to another.
        </p>

        <h2 className="text-2xl font-bold mb-4">How We Use Cookies</h2>
        <p className="mb-4">
          Adex GameHub uses cookies to enhance your experience on our platform. These cookies help us:
        </p>
        <ul className="list-disc pl-5 mb-4">
          <li>Remember your login status</li>
          <li>Understand and save your preferences for future visits</li>
          <li>Keep track of advertisements and measure their effectiveness</li>
          <li>Analyze site traffic and interactions to improve our services</li>
        </ul>

        <h2 className="text-2xl font-bold mb-4">Types of Cookies We Use</h2>
        <p className="mb-4">
          We use different types of cookies on our site:
        </p>
        <ul className="list-disc pl-5 mb-4">
          <li>
            <strong>Essential Cookies:</strong> These cookies are necessary for the operation of the website. They enable you to navigate through the site and use its features.
          </li>
          <li>
            <strong>Performance Cookies:</strong> These cookies collect information about how you use our website, such as which pages you visit most often, to improve the overall performance of the site.
          </li>
          <li>
            <strong>Functional Cookies:</strong> These cookies allow the website to remember your choices, providing a more personalized experience.
          </li>
          <li>
            <strong>Targeting/Advertising Cookies:</strong> These cookies are used to deliver ads more relevant to you and your interests.
          </li>
        </ul>

        <h2 className="text-2xl font-bold mb-4">Managing Cookies</h2>
        <p className="mb-4">
          Most web browsers allow you to control cookies through your browser settings. You can choose to block or delete cookies, but please note that this may impact your experience on our website.
        </p>
        <p className="mb-4">
          For more information on how to manage cookies in your browser, visit the browser's official support page:
        </p>
        <ul className="list-disc pl-5 mb-4">
          <li><a href="https://support.google.com/chrome/answer/95647" className="text-blue-600 hover:underline">Google Chrome</a></li>
          <li><a href="https://support.mozilla.org/en-US/kb/enable-and-disable-cookies-website-preferences" className="text-blue-600 hover:underline">Mozilla Firefox</a></li>
          <li><a href="https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac" className="text-blue-600 hover:underline">Safari</a></li>
          <li><a href="https://support.microsoft.com/en-us/help/17442/windows-internet-explorer-delete-manage-cookies" className="text-blue-600 hover:underline">Internet Explorer</a></li>
        </ul>

        <h2 className="text-2xl font-bold mb-4">Changes to This Cookies Policy</h2>
        <p className="mb-4">
          We may update this Cookies Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We encourage you to review this page periodically to stay informed about our use of cookies.
        </p>

        <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
        <p className="mb-4">
          If you have any questions about this Cookies Policy, please contact us at adeoluamole@gmail.com.
        </p>
      </div>

      <Footer />
    </div>
  );
};

export default CookiesPage;
