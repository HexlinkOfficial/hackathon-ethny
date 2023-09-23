import { useCallback } from "react";
import { useSetRecoilState } from "recoil";
import { normalizeInput } from "@/utils/validateInput";
import { authState } from "@/store/atoms/authState";

export function useENSAnnoymousLogin() {
  const setAuth = useSetRecoilState(authState);

  const ensAnonymousLogin = useCallback(
    (ens: string) => {
      const normalizedEns = normalizeInput(ens).value;
      const user = {
        provider: "ens",
        idType: "ens",
        email: "",
        handle: normalizedEns,
        name: `ens:${normalizedEns}`,
        jwt: "",
      };
      setAuth(user)
    },
    [setAuth],
  );

  return ensAnonymousLogin;
}