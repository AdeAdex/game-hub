// /app/news.tsx
"use client";

import React, { useContext, useEffect, useState } from "react";
import Navbar from "@/app/components/navbar/Navbar";
import Footer from "@/app/components/footer/Footer";
import { ThemeContext } from "@/app/lib/ThemeContext";
import axios from "axios";
import { NewsArticle } from "@/app/types/news";

const NewsPage: React.FC = () => {
  const { theme } = useContext(ThemeContext);
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get("/api/news");
        setArticles(response.data.articles);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching news:", error);
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
            theme === "dark"
              ? "border-gray-700 text-white"
              : "border-gray-300 text-[#434343]"
          } font-bold`}
        >
          News
        </h3>
        <div className="mt-4">
          {loading ? (
            <p>Loading...</p>
          ) : (
            articles.map((article, index) => (
              <div key={index} className="bg-gray-200 rounded-lg p-4 mb-4">
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
