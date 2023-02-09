import { useRouter } from "next/router";
import React from "react";
import { HomeModernIcon, MoonIcon } from "@heroicons/react/24/solid";
import { MdLibraryMusic } from "react-icons/md";
import { useRecoilState } from "recoil";
import { currentTrackState } from "../atoms/songAtom";
import { playingTrackState } from "../atoms/playingTrack";

const Sidebar = () => {
  const router = useRouter();

  const [playingTrack, setPlayingTrack] = useRecoilState(playingTrackState);

  return (
    <div
      className={`flex items-center ml-3 h-full pt-[4.5rem] ${
        playingTrack?.url?.length > 3 ? "pb-24" : "pb-5"
      } rounded-xl w-56 fixed select-none`}
    >
      <div className="bg-slate-100 dark:bg-slate-800 rounded-xl w-56 h-full flex flex-col justify-start items-start">
        <div className="px-2 pt-4 w-full flex flex-col gap-1">
          <div className="relative inline-flex w-full text-slate-700 dark:text-white hover:shadow-xl hover:text-white hover:shadow-sky-500/30 items-center hover:bg-sky-500 active:bg-sky-600 py-1 break-all rounded-md px-3 transition duration-300 ease-in-out hover:cursor-pointer">
            <span className="inline-flex gap-2 items-center">
              <HomeModernIcon className="w-4 h-4" />
              Home
            </span>
          </div>
          <div className="relative inline-flex w-full text-slate-700 dark:text-white hover:shadow-xl hover:text-white hover:shadow-sky-500/30 items-center hover:bg-sky-500 active:bg-sky-600 py-1 break-all rounded-md px-3 transition duration-300 ease-in-out hover:cursor-pointer">
            <span className="inline-flex gap-2 items-center">
              <MdLibraryMusic className="w-4 h-4" />
              Library
            </span>
          </div>
          <div className="relative inline-flex w-full text-slate-700 dark:text-white hover:shadow-xl hover:text-white hover:shadow-sky-500/30 items-center hover:bg-sky-500 active:bg-sky-600 py-1 break-all rounded-md px-3 transition duration-300 ease-in-out hover:cursor-pointer">
            <span className="inline-flex gap-2 items-center">
              <MdLibraryMusic className="w-4 h-4" />
              Library
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
