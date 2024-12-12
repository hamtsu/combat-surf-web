/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'skins.mcstats.com',
            port: '',
            pathname: '/**',
          },
        ],
      },
};

export default nextConfig;
