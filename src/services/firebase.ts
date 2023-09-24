import { initializeApp } from "@firebase/app";
import { getAuth } from "@firebase/auth";
import { getStorage, connectStorageEmulator } from "@firebase/storage";
import { getFunctions, connectFunctionsEmulator } from "@firebase/functions";
import { getAnalytics } from "@firebase/analytics";
import { connectAuthEmulator } from "@firebase/auth";
import {
  VITE_FIREBASE_API_KEY,
  VITE_FIREBASE_APP_ID,
  VITE_FIREBASE_AUTH_DOMAIN,
  VITE_FIREBASE_MEASUREMENT_ID,
  VITE_FIREBASE_MESSAGING_SENDER_ID,
  VITE_FIREBASE_PROJECT_ID,
  VITE_FIREBASE_STORAGE_BUCKET,
  VITE_USE_FUNCTIONS_EMULATOR,
} from "@/const/constant";
import axios from "axios";

const firebaseConfig = {
  apiKey: VITE_FIREBASE_API_KEY,
  authDomain: VITE_FIREBASE_AUTH_DOMAIN,
  projectId: VITE_FIREBASE_PROJECT_ID,
  storageBucket: VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: VITE_FIREBASE_APP_ID,
  measurementId: VITE_FIREBASE_MEASUREMENT_ID,
};

export const app = initializeApp(firebaseConfig);
export const googleAnalytics =
  typeof window !== "undefined" && getAnalytics(app);
export const functions = getFunctions(app);
export const storage = getStorage(app);
export const auth = getAuth(app);

export const callFirebaseFunction = async (
  func: string,
  data: any,
  token?: string,
) => {
  let urlPrefix;
  if (VITE_USE_FUNCTIONS_EMULATOR == "true") {
    urlPrefix = "http://127.0.0.1:5001/bridge23-27764/us-central1/";
  } else {
    urlPrefix = `https://us-central1-${VITE_FIREBASE_PROJECT_ID}.cloudfunctions.net/`;
  }
  const config = token ? { headers: { Authorization: "Bearer " + token } } : {};
  return await axios.post(`${urlPrefix}${func}`, data, config);
};

console.log("Using firebase: " + VITE_FIREBASE_AUTH_DOMAIN);
console.log("Use emulator: ", VITE_USE_FUNCTIONS_EMULATOR);

if (VITE_USE_FUNCTIONS_EMULATOR == "true") {
  connectFunctionsEmulator(functions, "localhost", 5001);
  connectStorageEmulator(storage, "localhost", 9199);
  connectAuthEmulator(auth, "http://localhost:9099");
}
