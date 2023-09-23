import { Chain, SEPOLIA } from "@/const/chain";
import { DefaultValue, atom } from "recoil";

const DefaultChain = SEPOLIA;

let currentChain = DefaultChain;

export const currentChainAtom = atom<Chain>({
  key: "currentChainAtom",
  default: DefaultChain,
  effects_UNSTABLE: [
    ({ setSelf, onSet }) => {
      if (typeof window === "undefined") return;
      const savedValue = localStorage.getItem("currentChainAtom");
      if (savedValue) {
        const jsonValue = JSON.parse(savedValue);
        currentChain = jsonValue;
        setSelf(jsonValue);
      }
      onSet((newValue) => {
        if (newValue instanceof DefaultValue) {
          localStorage.removeItem("currentChainAtom");
        } else if (newValue) {
          currentChain = newValue;
          localStorage.setItem("currentChainAtom", JSON.stringify(newValue));
        }
      });
    },
  ],
});

export function getCurrentChain() {
  return currentChain;
}
