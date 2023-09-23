import { authState } from "@/store/atoms/authState";
import { tokenState } from "@/store/atoms/tokenState";
import { getAccountAddress, getAccountVersion } from "@/web3/account";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useAsync } from "react-use";
import { useRecoilValue } from "recoil";

export interface UserInfo {
  address: string;
  handle: string;
  balance: number;
  idType: string;
  name: string;
  version: number;
}

export function useGetUserInfo() {
  const auth = useRecoilValue(authState);
  const tokens = useRecoilValue(tokenState);
  const [userInfo, setUserInfo] = useState<UserInfo>();
  const router = useRouter();

  useEffect(() => {
    (async () => {
      if (!auth) {
        router.push("/signin");
        return;
      }
      const name = auth.idType + ":" + auth.handle;
      const address = await getAccountAddress(name);
      const version = await getAccountVersion(name);
      setUserInfo({
        address,
        handle: auth.handle,
        balance:
          tokens?.reduce(
            (acc, token) => acc + (Number(token.balancePrice) || 0),
            0,
          ) || 0,
        idType: auth.idType,
        name: name,
        version: version,
      });
    })();
  }, [auth, auth?.handle, auth?.idType, router, tokens]);

  return userInfo;
}
