// // next.config.mjs

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   images: {
//     domains: ["avatars.githubusercontent.com", 'res.cloudinary.com', 'media.rawg.io', 'gatherer.wizards.com'],
//   },
// };

// export default nextConfig;

// next.config.mjs

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "avatars.githubusercontent.com",
      "res.cloudinary.com",
      "media.rawg.io",
      "gatherer.wizards.com",
      "source.unsplash.com",
      "news.cgtn.com",
      "www.sciencedaily.com"
    ],
  },
  async headers() {
    return [
      {
        source: "/api/(.*)",
        headers: [
          {
            key: "x-middleware-runtime",
            value: "nodejs", // Ensure Node.js runtime for API routes
          },
        ],
      },
    ];
  },
};

export default nextConfig;
