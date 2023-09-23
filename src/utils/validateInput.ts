import { isValidEmail } from "./isValidEmail";

function isValidENS(ensName: string) {
  const parsedENS = ensName.trim().toLowerCase();
  if (ensName.slice(-4) === ".eth") {
    return true;
  } else {
    return false;
  }
}

export function normalizeEmail(email: string): string {
  const parsedEmail = email.trim().toLowerCase();

  if (!isValidEmail(parsedEmail)) {
    throw new Error("invalid email");
  }
  return parsedEmail;
}

export function normalizeInput(input: string): {type: string, value: string} {
  const parsedInput = input.trim().toLowerCase();
  if (isValidENS(parsedInput)) {
    console.log("ens")
    return {type: "ens", value: parsedInput}
  } else if (isValidEmail(parsedInput)) {
    console.log("email")
    return {type: "email", value: parsedInput}
  } else {
    throw new Error("invalid input");
  }
}
