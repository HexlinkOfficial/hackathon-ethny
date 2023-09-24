import { callFirebaseFunction } from "./firebase";
import DAuth from "@dauth/core";
import { DAUTH_BASE_URL, DAUTH_CLIENT_ID } from "@/const/constant";

const dauthClient = new DAuth({
  baseURL: DAUTH_BASE_URL,
  clientID: DAUTH_CLIENT_ID,
});

export async function authRegister(email: string, message: string, bearToken: string) {
  const result = await callFirebaseFunction("authRegister", {
    email: email,
    message: message
  },
  bearToken);
  return result.data;
}

export async function authSendOtp(account: string) {
  const result = await callFirebaseFunction("authSendOtp", {
    account: account
  });
  return result.data.success;
}

export async function authVerifyOtp(account: string, code: string) {
  const result = await callFirebaseFunction("authVerifyOtp", {
    account: account,
    code: code
  });
  return result.data.proof;
}

export async function authSign(account: string, message: string, bearToken: string) {
  const result = await callFirebaseFunction("authSign", {
    account: account,
    message: message
  },
  bearToken);
  return result.data.signature;
}

export async function genAndSendOtpForDAuth(
  email: string,
) {
  const result = await dauthClient.service.sendOtp({
    account: email,
    id_type: "mailto",
    request_id: "", // remove 0x
  });
  return { success: true };
}

export const validateOtpForDAuth = async (
  otp: string,
): Promise<{ jwt: string }> => {
  console.log("otp: ", otp)
  const result = await dauthClient.service.authOtpConfirm({
    code: otp,
    request_id: "",
    mode: "jwt",
    id_type: "mailto",
    withPlainAccount: false
  });
  return { jwt: result.data };
};