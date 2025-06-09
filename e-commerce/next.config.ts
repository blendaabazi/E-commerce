import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // reactStrictMode: true,
  // env:{
  //   MONGODB_URI:"mongodb+srv://ba64884:ba64884@cluster0.gbnf1y2.mongodb.net/nextjs?appName=Cluster0",
  //   NEXTAUTH_SECRET: "z3GJvVhnftMRogZPmh47x0Cm3mKq1mQ8iKDpqsM8XkY=",
  // },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
};

export default nextConfig;