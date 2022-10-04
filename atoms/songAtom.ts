import { atom } from "recoil";

export const currentTrackState = atom({
  key: "currentTrackState",
  default: {} as any,
});
