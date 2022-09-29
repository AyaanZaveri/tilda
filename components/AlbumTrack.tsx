import axios from "axios";
import { Router, useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { FaPlay, FaPause } from "react-icons/fa";
import { MdExplicit } from "react-icons/md";
import { HiHeart } from "react-icons/hi";
import { fancyTimeFormat } from "../utils/fancyTimeFormat";
import { titleCase } from "title-case";

interface Props {
  track: any;
  index: number;
}

const AlbumTrack = ({ track, index }: Props) => {
  const router = useRouter();

  return (
    <div
      key={track.videoId}
      className="flex h-16 w-full flex-row transition-all ease-in-out justify-between duration-300 items-center gap-3 rounded-md px-3 text-sm text-slate-700 hover:bg-indigo-50 active:bg-indigo-100 hover:cursor-pointer"
    >
      <div className="flex flex-row gap-5 items-center">
        <span className="text-slate-400">{index + 1}</span>
        <div className="flex flex-col justify-center">
          <div className="flex flex-row gap-3">
            {/* {playing ? (
          <FaPause
          className="w-2 hover:cursor-pointer"
          onClick={() => setPlaying(!playing)}
          />
          ) : (
              <FaPlay
            className="w-2 hover:cursor-pointer"
            // onClick={() => console.log(track.preview_url)}
          />
        )} */}
            <span className="font-semibold inline-flex gap-1 items-center">
              {track.title} {track.isExplicit ? <MdExplicit /> : null}
            </span>
          </div>
          <div>
            <span className="font-normal">
              {track?.artists[0]?.name}
              {track?.album?.name}
            </span>
          </div>
        </div>
      </div>
      <span className="flex font-medium">
        {fancyTimeFormat(track.duration_seconds)}
      </span>
    </div>
  );
};

export default AlbumTrack;
