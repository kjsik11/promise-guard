// @ts-check

/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/signin/:slug*',
        destination: '/api/oauth/provider/:slug*',
      },
    ];
  },
};

module.exports = nextConfig;
