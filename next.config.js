/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["res.cloudinary.com", "scontent.fsgn2-4.fna.fbcdn.net"],
  },
  plugins: ["macros"],
  "fontawesome-svg-core": {
    license: "free",
  },
  webpack5: true,
  webpack(config) {
    config.resolve.fallback = {
      ...config.resolve.fallback, // if you miss it, all the other options in fallback, specified
      // by next.js will be dropped. Doesn't make much sense, but how it is
      fs: false, // the solution
    };

    return config;
  },
};

module.exports = nextConfig;
