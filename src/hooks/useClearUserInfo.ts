import { authState } from "@/store/atoms/authState";
import { tokenState } from "@/store/atoms/tokenState";
import { useCallback } from "react";
import { useResetRecoilState } from "recoil";

export function useClearUserInfo() {
  const clearUserInfo = useResetRecoilState(authState);
  const clearTokenState = useResetRecoilState(tokenState);

  return useCallback(() => {
    clearUserInfo();
    clearTokenState();
  }, [clearTokenState, clearUserInfo]);
}
