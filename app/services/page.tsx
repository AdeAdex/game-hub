"use client";

import React, { useContext } from "react";
import Navbar from "@/app/components/navbar/Navbar";
import Footer from "@/app/components/footer/Footer";
import { ThemeContext } from "@/app/lib/ThemeContext";

const ServicesPage: React.FC = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div
      className={`min-h-screen py-[100px] ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      <Navbar onSearch={(query) => {}} suggestions={[]} />
      <div
        className={`relative w-full lg:w-[60%] mx-auto rounded-sm border-2 py-[30px] px-[10px] md:px-[30px] ${
          theme === "dark"
            ? "bg-gray-800 border-gray-700"
            : "bg-white border-gray-300"
        }`}
      >
        <h3
          className={`border-b md:text-[24px] pb-[20px] ${
            theme === "dark" ? "border-gray-700 text-white" : "border-gray-300 text-[#434343]"
          } font-bold`}
        >
          Our Services
        </h3>
        <div className="mt-4 text-lg leading-7 space-y-6">
          <p>
            Welcome to Adex GameHub! We are dedicated to providing a range of services tailored to enhance your gaming journey. Whether you're a player, developer, or enthusiast, our offerings are designed to meet your needs and elevate your gaming experience.
          </p>
          
          <section>
            <h4 className="text-xl font-semibold mb-2">Game Hosting</h4>
            <p>
              We offer reliable and secure game hosting solutions for multiplayer and online games. Whether you're hosting a small private server or managing large-scale gameplay, our hosting services ensure smooth performance and uninterrupted gaming sessions.
            </p>
          </section>
          
          <section>
            <h4 className="text-xl font-semibold mb-2">Game Development Support</h4>
            <p>
              Our team of experienced developers provides comprehensive support for game development projects. From initial concept design to final release, we offer guidance, tools, and resources to help developers bring their game ideas to life.
            </p>
          </section>
          
          <section>
            <h4 className="text-xl font-semibold mb-2">Community Events</h4>
            <p>
              At Adex GameHub, community engagement is a priority. We organize and host a variety of events, including tournaments, workshops, and gaming conventions. These events foster camaraderie among gamers and provide opportunities for players to showcase their skills and connect with like-minded individuals.
            </p>
          </section>
          
          <section>
            <h4 className="text-xl font-semibold mb-2">Customer Support</h4>
            <p>
              We are committed to providing exceptional customer support to ensure your satisfaction. Our support team is available around the clock to assist you with any questions, technical issues, or feedback you may have.
            </p>
          </section>
          
          <section>
            <h4 className="text-xl font-semibold mb-2">Partnerships</h4>
            <p>
              Collaborating with industry leaders, we forge partnerships that enrich our services and bring added value to our community. If you're interested in partnering with us or exploring sponsorship opportunities, please reach out to our partnership team.
            </p>
          </section>
          
          <section>
            <h4 className="text-xl font-semibold mb-2">Join Us</h4>
            <p>
              Join the Adex GameHub community today and discover a world of gaming excellence. Whether you're a gamer looking for new adventures or a developer seeking support, we invite you to explore our services and be part of our growing community.
            </p>
          </section>
          
          <section>
            <h4 className="text-xl font-semibold mb-2">Contact Us</h4>
            <p>
              Have questions or need assistance? Don't hesitate to contact us. Our dedicated team is here to help you every step of the way. Reach out to us via email, phone, or connect with us on social media for the latest updates and announcements.
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ServicesPage;
