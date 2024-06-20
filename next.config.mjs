/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'api.mineatar.io',
            port: '',
            pathname: '/body/full/**',
          },
        ],
      },
};

export default nextConfig;
