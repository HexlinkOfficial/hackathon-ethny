import { MUMBAI, NAUTILUS_TESTNET, SEPOLIA } from "./chain";

export const ENTRYPOINT = "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789";

// Secret key from doppler.
export const VITE_DAUTH_VALIDATOR = process.env[
  "VITE_DAUTH_VALIDATOR"
] as string;
export const VITE_PIMLICO_API_KEY = process.env[
  "VITE_PIMLICO_API_KEY"
] as string;
export const VITE_ZAN_API_KEY = process.env[
  "VITE_ZAN_API_KEY"
] as string;
export const VITE_FIREBASE_API_KEY = process.env[
  "VITE_FIREBASE_API_KEY"
] as string;
export const VITE_FIREBASE_AUTH_DOMAIN = process.env[
  "VITE_FIREBASE_AUTH_DOMAIN"
] as string;
export const VITE_FIREBASE_PROJECT_ID = process.env[
  "VITE_FIREBASE_PROJECT_ID"
] as string;
export const VITE_FIREBASE_STORAGE_BUCKET = process.env[
  "VITE_FIREBASE_STORAGE_BUCKET"
] as string;
export const VITE_FIREBASE_MESSAGING_SENDER_ID = process.env[
  "VITE_FIREBASE_MESSAGING_SENDER_ID"
] as string;
export const VITE_FIREBASE_APP_ID = process.env[
  "VITE_FIREBASE_APP_ID"
] as string;
export const VITE_FIREBASE_MEASUREMENT_ID = process.env[
  "VITE_FIREBASE_MEASUREMENT_ID"
] as string;
export const VITE_INFURA_API_KEY = process.env["VITE_INFURA_API_KEY"] as string;
export const VITE_USE_FUNCTIONS_EMULATOR = process.env[
  "VITE_USE_FUNCTIONS_EMULATOR"
] as string;
export const ACCOUNT_FACTORY = process.env["ACCOUNT_FACTORY"] as string;
export const ACCOUNT_FACTORY_DEV = process.env["ACCOUNT_FACTORY_DEV"] as string;
export const HEXLINK_VALIDATOR = process.env["OPERATOR_PUB_ADDR"] as string;
export const HEXLINK_VALIDATOR_DEV = process.env[
  "OPERATOR_TEST_PUB_ADDR"
] as string;

export const DAUTH_CLIENT_ID = process.env["DAUTH_CLIENT_ID"] as string;
export const DAUTH_BASE_URL = "https://demo-api.dauth.network/dauth/sdk/v1.1/";
export const DUMMY_SIGNATURE =
  "0xfffffffffffffffffffffffffffffff0000000000000000000000000000000007aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa1c";
export const SUPPORT_CHAINS = [SEPOLIA, MUMBAI];
