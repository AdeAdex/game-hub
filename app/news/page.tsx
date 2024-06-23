"use client";

import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Navbar from "@/app/components/navbar/Navbar";
import Footer from "@/app/components/footer/Footer";
import { ThemeContext } from "@/app/lib/ThemeContext";

const NewsPage: React.FC = () => {
  const { theme } = useContext(ThemeContext);
  const [newsArticles, setNewsArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get("/api/news");
        setNewsArticles(response.data.articles);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

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
          className={`border-b md:text-[20px] pb-[30px] ${
            theme === "dark" ? "border-gray-700 text-white" : "border-gray-300 text-[#434343]"
          } font-bold`}
        >
          News
        </h3>
        <div className="mt-4">
          {loading ? (
            <p>Loading news...</p>
          ) : error ? (
            <p>Failed to load news: {error.message}</p>
          ) : (
            newsArticles.map((article, index) => (
              <div key={index} className={`bg-${theme === "dark" ? "gray-700" : "gray-200"} rounded-lg p-4 mb-4`}>
                <h4 className="font-bold">{article.title}</h4>
                <p>{article.description}</p>
                <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                  Read more
                </a>
              </div>
            ))
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NewsPage;
