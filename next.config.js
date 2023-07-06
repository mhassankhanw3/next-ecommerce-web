/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["next-ecommerce-web.s3.amazonaws.com"],
  },
};

module.exports = nextConfig;
