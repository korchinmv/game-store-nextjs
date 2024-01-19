/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    BASE_URL_GAMESTORE: process.env.BASE_URL_GAMESTORE,
    KEY_GAMESTORE: process.env.KEY_GAMESTORE,
  },
};

module.exports = nextConfig;
