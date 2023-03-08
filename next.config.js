// eslint-disable-next-line @typescript-eslint/no-var-requires

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["lastfm.freetls.fastly.net"],
  },
  experimental: {
    appDir: true,
  },
};

module.exports = nextConfig;
