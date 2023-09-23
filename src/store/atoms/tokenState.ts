import { Token } from "@/utils/getPopularTokens";
import { DefaultValue, atom } from "recoil";

export const tokenState = atom<
  | Array<
      Token & {
        balance: string;
        price: string;
        balancePrice: string;
      }
    >
  | undefined
>({
  key: "tokenState",
  default: undefined,
  effects_UNSTABLE: [
    ({ setSelf, onSet }) => {
      if (typeof window === "undefined") return;
      const savedValue = localStorage.getItem("tokenState");
      if (savedValue) {
        setSelf(JSON.parse(savedValue));
      }
      onSet((newValue) => {
        if (newValue instanceof DefaultValue) {
          localStorage.removeItem("tokenState");
        } else if (newValue) {
          localStorage.setItem("tokenState", JSON.stringify(newValue));
        }
      });
    },
  ],
});
