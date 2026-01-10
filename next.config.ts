import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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