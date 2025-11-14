import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "wordforwordquran.com",
        port: "",
        pathname: "/assets/q/mainbanner.png",
      },
    ],
  },
};

export default nextConfig;
