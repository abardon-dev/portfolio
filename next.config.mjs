/** @type {import('next').NextConfig} */
const nextConfig = {
  /**TODO: Remove this before merging */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "assets.aceternity.com"
      }
    ]
  }
};

export default nextConfig;
