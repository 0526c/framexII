/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  distDir: 'dist',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,  // 确保启用，生成 /identity/index.html
};

module.exports = nextConfig;
