/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "i.postimg.cc",
      "polygonscan.com",
      "static.metaswap.codefi.network",
    ],
  },
  env: {
    VITE_DAUTH_VALIDATOR: process.env.VITE_DAUTH_VALIDATOR,
    VITE_PIMLICO_API_KEY: process.env.VITE_PIMLICO_API_KEY,
    VITE_HEXLINK_VALIDATOR: process.env.VITE_HEXLINK_VALIDATOR,
    VITE_FIREBASE_API_KEY: process.env.VITE_FIREBASE_API_KEY,
    VITE_FIREBASE_AUTH_DOMAIN: process.env.VITE_FIREBASE_AUTH_DOMAIN,
    VITE_FIREBASE_PROJECT_ID: process.env.VITE_FIREBASE_PROJECT_ID,
    VITE_FIREBASE_STORAGE_BUCKET: process.env.VITE_FIREBASE_STORAGE_BUCKET,
    VITE_FIREBASE_MESSAGING_SENDER_ID:
      process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    VITE_ZAN_API_KEY: process.env.VITE_ZAN_API_KEY,
    VITE_FIREBASE_APP_ID: process.env.VITE_FIREBASE_APP_ID,
    VITE_FIREBASE_MEASUREMENT_ID: process.env.VITE_FIREBASE_MEASUREMENT_ID,
    VITE_INFURA_API_KEY: process.env.VITE_INFURA_API_KEY,
    VITE_USE_FUNCTIONS_EMULATOR: process.env.VITE_USE_FUNCTIONS_EMULATOR,
    DAUTH_CLIENT_ID: process.env.DAUTH_CLIENT_ID,
    ACCOUNT_FACTORY: process.env.ACCOUNT_FACTORY,
    ACCOUNT_FACTORY_DEV: process.env.ACCOUNT_FACTORY_DEV,
    OPERATOR_PUB_ADDR: process.env.OPERATOR_PUB_ADDR,
    OPERATOR_TEST_PUB_ADDR: process.env.OPERATOR_TEST_PUB_ADDR,
    RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED: "false",
  },
};

module.exports = nextConfig;