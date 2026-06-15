import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow phone/other devices on your LAN to load dev assets (e.g. http://192.168.1.64:3000)
  allowedDevOrigins: ["192.168.1.64", "192.168.1.64:3000"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
