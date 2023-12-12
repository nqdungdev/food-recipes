/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "spoonacular.com",
        port: "",
      },
    ],
  },
};

module.exports = nextConfig;
