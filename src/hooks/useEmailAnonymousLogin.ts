import { useCallback } from "react";
import { useSetRecoilState } from "recoil";
import { normalizeInput } from "@/utils/validateInput";
import { authState } from "@/store/atoms/authState";

export function useEmailAnonymousLogin() {
  const setAuth = useSetRecoilState(authState);

  const emailAnonymousLogin = useCallback(
    (email: string) => {
      const normalizedEmail = normalizeInput(email);
      const user = {
        provider: "hexlink.io",
        idType: "mailto",
        email: normalizedEmail,
        handle: normalizedEmail,
        name: `mailto:${normalizedEmail}`,
        jwt: "",
      };
      setAuth(user)
    },
    [setAuth],
  );

  return emailAnonymousLogin;
}