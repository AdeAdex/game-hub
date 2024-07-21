"use client";

import React, { useContext } from "react";
import Navbar from "@/app/components/navbar/Navbar";
import Footer from "@/app/components/footer/Footer";
import { useSearch } from "@/app/lib/SearchContext";

const AboutPage: React.FC = () => {
  const { handleSearch, suggestions } = useSearch();

  return (
    <div
      className={`min-h-screen py-[100px] dark:bg-dark-mode dark:text-white bg-gray-100 text-gray-900 `}
    >
      <Navbar onSearch={handleSearch} suggestions={suggestions} />

      <div
        className={`relative w-full lg:w-[60%] mx-auto rounded-sm border-2 py-[30px] px-[10px] md:px-[30px] dark:bg-gray-800 dark:border-gray-700 bg-white border-gray-300 `}
      >
        <h3
          className={`border-b md:text-[24px] pb-[20px] dark:border-gray-700 dark:text-white border-gray-300 text-[#434343] font-bold`}
        >
          About Us
        </h3>
        <div className="mt-4 text-lg leading-7 space-y-6">
          <p>
            Welcome to <strong>Adex GameHub</strong>, the ultimate destination
            for discovering and playing the latest and greatest games. Whether
            you are a casual gamer or a hardcore enthusiast, we aim to provide a
            platform that caters to all your gaming needs.
          </p>

          <section>
            <h4 className="text-xl font-semibold mb-2">Our Mission</h4>
            <p>
              At Adex GameHub, our mission is to unite gamers from all walks of
              life and deliver an unparalleled gaming experience. We believe in
              the power of games to bring joy, foster community, and inspire
              creativity.
            </p>
          </section>

          <section>
            <h4 className="text-xl font-semibold mb-2">Our Vision</h4>
            <p>
              Our vision is to become the leading gaming platform globally,
              known for its diverse library, user-friendly interface, and
              vibrant community. We strive to innovate continuously, staying
              ahead of trends and setting new standards in the gaming industry.
            </p>
          </section>

          <section>
            <h4 className="text-xl font-semibold mb-2">Our Values</h4>
            <ul className="list-disc list-inside space-y-2">
              <li>
                <strong>Passion for Gaming:</strong> We are passionate about
                games and committed to sharing that passion with our users.
              </li>
              <li>
                <strong>Community Focus:</strong> We prioritize building a
                strong, inclusive, and engaging community where gamers can
                connect and share experiences.
              </li>
              <li>
                <strong>Innovation:</strong> We embrace innovation, constantly
                seeking new ways to enhance the gaming experience.
              </li>
              <li>
                <strong>Integrity:</strong> We operate with integrity, ensuring
                a trustworthy and reliable platform for all users.
              </li>
              <li>
                <strong>Excellence:</strong> We strive for excellence in every
                aspect of our service, from game selection to customer support.
              </li>
            </ul>
          </section>

          <section>
            <h4 className="text-xl font-semibold mb-2">Our History</h4>
            <p>
              Adex GameHub was founded in <strong>2024</strong> by{" "}
              <a
                href="https://www.linkedin.com/in/adeolu-amole"
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-blue-500 hover:text-blue-700"
              >
                Adex
              </a>{" "}
              of passionate gamers who envisioned a platform that could bring
              the best of gaming to everyone. Over the years, we have grown from
              a small startup to a leading name in the gaming industry,
              continually evolving to meet the needs of our community.
            </p>
          </section>

          <section>
            <h4 className="text-xl font-semibold mb-2">Our Team</h4>
            <p>
              Our team is composed of dedicated professionals from diverse
              backgrounds, all united by a common passion for gaming. From
              developers and designers to customer support and community
              managers, each member of our team plays a crucial role in making
              Adex GameHub the success it is today.
            </p>
          </section>

          <section>
            <h4 className="text-xl font-semibold mb-2">Partnerships</h4>
            <p>
              We believe in the power of collaboration and are proud to partner
              with some of the best names in the industry. Our partnerships
              enable us to bring exclusive content, special events, and unique
              opportunities to our community. If you're interested in partnering
              with us, please get in touch.
            </p>
          </section>

          <section>
            <h4 className="text-xl font-semibold mb-2">Join Us</h4>
            <p>
              We invite you to join our community and explore the exciting world
              of Adex GameHub. Whether you're here to play, discover new games,
              or connect with fellow gamers, we are thrilled to have you with
              us.
            </p>
          </section>

          <section>
            <h4 className="text-xl font-semibold mb-2">Contact Us</h4>
            <p>
              Have questions or need assistance? Don't hesitate to contact us.
              Our dedicated team is here to help you every step of the way.
              Reach out to us via email, phone, or connect with us on social
              media for the latest updates and announcements.
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AboutPage;
