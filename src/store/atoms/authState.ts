import { DefaultValue, atom } from "recoil";

interface AuthState {
  provider: string;
  idType: string;
  email: string;
  handle: string;
  name: string;
  jwt: string;
  secondFactor?: string;
}

export const authState = atom<AuthState | undefined>({
  key: "authState",
  default: undefined,
  effects_UNSTABLE: [
    ({ setSelf, onSet }) => {
      if (typeof window === "undefined") return;
      const savedValue = localStorage.getItem("authState");
      if (savedValue) {
        const jsonValue = JSON.parse(savedValue);
        setSelf(jsonValue);
      }
      onSet((newValue) => {
        if (newValue instanceof DefaultValue) {
          localStorage.removeItem("authState");
        } else if (newValue) {
          localStorage.setItem("authState", JSON.stringify(newValue));
        }
      });
    },
  ],
});
