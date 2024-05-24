// next.config.mjs

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["avatars.githubusercontent.com", 'res.cloudinary.com', 'gatherer.wizards.com'],
  },
};

export default nextConfig;
