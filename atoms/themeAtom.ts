import { atom } from "recoil";

export const currentThemeState = atom({
  key: "currentThemeState",
  default: "light" as string,
});
