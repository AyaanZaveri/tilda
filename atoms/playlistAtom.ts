import { atom } from "recoil";

export const currentPlaylistState = atom({
  key: "currentPlaylistState",
  default: {
    priority: "",
  } as any,
});
