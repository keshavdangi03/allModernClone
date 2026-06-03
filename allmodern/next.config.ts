import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: [
    "@prisma/client",
    "@prisma/adapter-better-sqlite3",
    "better-sqlite3",
  ],
  experimental: {
    workerThreads: false,
    cpus: 1
  }
};

export default nextConfig;
