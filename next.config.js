// @ts-check

/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
  experimental: {
    scrollRestoration: true,
  },
  async rewrites() {
    return [
      {
        source: '/signin/:slug*',
        destination: '/api/oauth/provider/:slug*',
      },
      {
        source: '/admin/:slug*',
        destination: '/api/admin-promise/:slug*',
      },
    ];
  },
};

module.exports = nextConfig;
