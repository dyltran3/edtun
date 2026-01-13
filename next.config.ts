import type { NextConfig } from "next";
import os from "os";

const turbopackConfig: any = {
  // Enable Turbopack when available and cache to .turbo
  enabled: true,
  cacheDir: ".turbo",
  // Use (cpuCount - 1) workers where possible
  maxWorkers: Math.max(1, os.cpus().length - 1),
};

const nextConfig: NextConfig = {
  turbopack: turbopackConfig,
  // Bỏ qua lỗi TypeScript/ESLint khi build để tránh crash deploy (tùy chọn)
  typescript: {
    ignoreBuildErrors: true,
  },
  // Cấu hình Webpack để sửa lỗi "Module not found: Can't resolve 'fs'"
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        os: false,
        child_process: false,
        net: false,
        tls: false,
      };
    }
    return config;
  },
};

export default nextConfig;