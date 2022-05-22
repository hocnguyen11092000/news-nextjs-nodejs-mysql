/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["res.cloudinary.com"],
  },
  plugins: ["macros"],
  "fontawesome-svg-core": {
    license: "free",
  },
};

module.exports = nextConfig;
