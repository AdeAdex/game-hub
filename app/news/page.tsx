"use client";

import React, { useContext, useEffect, useState } from "react";
import Navbar from "@/app/components/navbar/Navbar";
import Footer from "@/app/components/footer/Footer";
import axios from "axios";
import { NewsArticle } from "@/app/types/news";
import NewsSkeleton from "@/app/components/news/NewsSkeleton";
import Image from "next/image";

const NewsPage: React.FC = () => {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get("/api/news");
        setArticles(response.data.articles);
        console.log(response.data.articles);
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
      className={`min-h-screen py-[100px] dark:bg-dark-mode dark:text-white bg-gray-100 text-gray-900 `}
    >
      <Navbar onSearch={(query) => {}} suggestions={[]} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`relative w-full mx-auto rounded-sm border-2 py-[30px] px-[10px] md:px-[30px] dark:bg-gray-800 dark:border-gray-700 bg-white border-gray-300`}
        >
          <h3
            className={`border-b md:text-[20px] pb-[10px] dark:border-gray-700 dark:text-white border-gray-300 text-[#434343] font-bold`}
          >
            News
          </h3>
          <div className="mt-4">
            {loading ? (
              <NewsSkeleton />
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {articles.map((article, index) => (
                  <div
                    key={index}
                    className={`flex flex-col rounded-lg shadow-lg overflow-hidden dark:bg-gray-700 dark:text-white bg-white text-gray-900 `}
                  >
                    {/* {article.urlToImage && (
                      <Image
                        className="w-full h-auto"
                        src={article.urlToImage}
                        alt={article.title}
                        width={800} // Adjusted width
                        height={350} // Adjusted height
                        style={{ objectFit: 'cover' }}
                      />
                    )} */}
                    <div className="flex-1 p-6 flex flex-col justify-between">
                      <div className="flex-1">
                        <a
                          href={article.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block mt-2"
                        >
                          <p className="text-xl font-semibold">
                            {article.title}
                          </p>
                          <p className="mt-3 text-base">
                            {article.description}
                          </p>
                        </a>
                      </div>
                      <div className="mt-6 flex items-center">
                        <div className="flex-shrink-0">
                          <span className="sr-only">{article.author}</span>
                          <div className="h-10 w-10 rounded-full bg-gray-400 flex items-center justify-center">
                            <span className="text-white">
                              {article.author ? article.author[0] : "A"}
                            </span>
                          </div>
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium">
                            {article.author ? article.author : "Unknown Author"}
                          </p>
                          <div className="flex space-x-1 text-sm">
                            <time dateTime={article.publishedAt}>
                              {new Date(
                                article.publishedAt
                              ).toLocaleDateString()}
                            </time>
                            <span aria-hidden="true">&middot;</span>
                            <span>
                              {new Date(
                                article.publishedAt
                              ).toLocaleTimeString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NewsPage;
