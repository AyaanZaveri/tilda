import { atom } from "recoil";

export const currentTrackIdState = atom({
  key: "currentTrackIdState",
  default: {} as any,
});

export const isPlayingState = atom({
  key: "isPlayingState",
  default: false,
});
