/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "media-server-6jsk.onrender.com",
      "res.cloudinary.com",
      "acct-media-server.onrender.com",
    ],
  },
};

module.exports = nextConfig;
