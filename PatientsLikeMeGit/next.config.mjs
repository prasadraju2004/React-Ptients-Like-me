/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'source.unsplash.com',
          pathname: '/**',
        },
      ],
    },
    reactStrictMode: true,
  };
  
  export default nextConfig;
  