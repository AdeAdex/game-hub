"use client";

import React, { useContext } from "react";
import Navbar from "@/app/components/navbar/Navbar";
import Footer from "@/app/components/footer/Footer";

const TermsAndConditions: React.FC = () => {
  return (
    <>
      <Navbar onSearch={() => {}} suggestions={[]} />
      <main
        className={`pt-[80px] px-4 py-8 dark:bg-dark-mode dark:text-gray-200 bg-white text-gray-900 `}
      >
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-center">
            Terms and Conditions
          </h1>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
            <p>
              Welcome to Adex GameHub. These terms and conditions outline the
              rules and regulations for the use of Adex GameHub's Website,
              located at:{" "}
              <a
                href="https://adex-game-hub.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                https://adex-game-hub.vercel.app
              </a>
              .
            </p>
            <p>
              By accessing this website we assume you accept these terms and
              conditions. Do not continue to use Adex GameHub if you do not
              agree to take all of the terms and conditions stated on this page.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-4">2. Cookies</h2>
            <p>
              We employ the use of cookies. By accessing Adex GameHub, you
              agreed to use cookies in agreement with the Adex GameHub's Privacy
              Policy.
            </p>
            <p>
              Most interactive websites use cookies to let us retrieve the
              user’s details for each visit. Cookies are used by our website to
              enable the functionality of certain areas to make it easier for
              people visiting our website. Some of our affiliate/advertising
              partners may also use cookies.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-4">3. License</h2>
            <p>
              Unless otherwise stated, Adex GameHub and/or its licensors own the
              intellectual property rights for all material on Adex GameHub. All
              intellectual property rights are reserved. You may access this
              from Adex GameHub for your own personal use subjected to
              restrictions set in these terms and conditions.
            </p>
            <p>You must not:</p>
            <ul className="list-disc list-inside ml-4">
              <li>Republish material from Adex GameHub</li>
              <li>Sell, rent, or sub-license material from Adex GameHub</li>
              <li>Reproduce, duplicate, or copy material from Adex GameHub</li>
              <li>Redistribute content from Adex GameHub</li>
            </ul>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-4">4. User Comments</h2>
            <p>
              Parts of this website offer an opportunity for users to post and
              exchange opinions and information in certain areas of the website.
              Adex GameHub does not filter, edit, publish or review Comments
              prior to their presence on the website. Comments do not reflect
              the views and opinions of Adex GameHub,its agents and/or
              affiliates. Comments reflect the views and opinions of the person
              who post their views and opinions. To the extent permitted by
              applicable laws, Adex GameHub shall not be liable for the Comments
              or for any liability, damages or expenses caused and/or suffered
              as a result of any use of and/or posting of and/or appearance of
              the Comments on this website.
            </p>
            <p>
              Adex GameHub reserves the right to monitor all Comments and to
              remove any Comments which can be considered inappropriate,
              offensive, or causes a breach of these Terms and Conditions.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-4">
              5. Hyperlinking to our Content
            </h2>
            <p>
              The following organizations may link to our Website without prior
              written approval:
            </p>
            <ul className="list-disc list-inside ml-4">
              <li>Government agencies</li>
              <li>Search engines</li>
              <li>News organizations</li>
              <li>
                Online directory distributors may link to our Website in the
                same manner as they hyperlink to the Websites of other listed
                businesses
              </li>
              <li>
                System wide Accredited Businesses except soliciting non-profit
                organizations, charity shopping malls, and charity fundraising
                groups which may not hyperlink to our Web site.
              </li>
            </ul>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-4">6. iFrames</h2>
            <p>
              Without prior approval and written permission, you may not create
              frames around our Webpages that alter in any way the visual
              presentation or appearance of our Website.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-4">
              7. Content Liability
            </h2>
            <p>
              We shall not be hold responsible for any content that appears on
              your Website. You agree to protect and defend us against all
              claims that is rising on your Website. No link(s) should appear on
              any Website that may be interpreted as libelous, obscene or
              criminal, or which infringes, otherwise violates, or advocates the
              infringement or other violation of, any third party rights.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-4">8. Your Privacy</h2>
            <p>Please read Privacy Policy</p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-4">
              9. Reservation of Rights
            </h2>
            <p>
              We reserve the right to request that you remove all links or any
              particular link to our Website. You approve to immediately remove
              all links to our Website upon request. We also reserve the right
              to amen these terms and conditions and it’s linking policy at any
              time. By continuously linking to our Website, you agree to be
              bound to and follow these linking terms and conditions.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-4">
              10. Removal of links from our website
            </h2>
            <p>
              If you find any link on our Website that is offensive for any
              reason, you are free to contact and inform us any moment. We will
              consider requests to remove links but we are not obligated to or
              so or to respond to you directly.
            </p>
            <p>
              We do not ensure that the information on this website is correct,
              we do not warrant its completeness or accuracy; nor do we promise
              to ensure that the website remains available or that the material
              on the website is kept up to date.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-4">11. Disclaimer</h2>
            <p>
              To the maximum extent permitted by applicable law, we exclude all
              representations, warranties and conditions relating to our website
              and the use of this website. Nothing in this disclaimer will:
            </p>
            <ul className="list-disc list-inside ml-4">
              <li>
                limit or exclude our or your liability for death or personal
                injury
              </li>
              <li>
                limit or exclude our or your liability for fraud or fraudulent
                misrepresentation
              </li>
              <li>
                limit any of our or your liabilities in any way that is not
                permitted under applicable law
              </li>
              <li>
                exclude any of our or your liabilities that may not be excluded
                under applicable law.
              </li>
            </ul>
            <p>
              The limitations and prohibitions of liability set in this Section
              and elsewhere in this disclaimer: (a) are subject to the preceding
              paragraph; and (b) govern all liabilities arising under the
              disclaimer, including liabilities arising in contract, in tort and
              for breach of statutory duty.
            </p>
            <p>
              As long as the website and the information and services on the
              website are provided free of charge, we will not be liable for any
              loss or damage of any nature.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default TermsAndConditions;
