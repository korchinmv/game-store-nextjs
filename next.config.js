/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    BASE_URL_GAMESTORE: process.env.BASE_URL_GAMESTORE,
    KEY_GAMESTORE: process.env.KEY_GAMESTORE,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "media.rawg.io",
        port: "",
        pathname: "/media/screenshots/**",
      },
    ],
  },
};

module.exports = nextConfig;
