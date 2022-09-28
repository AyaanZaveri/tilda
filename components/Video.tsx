import axios from "axios";
import { Router, useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { FaPlay, FaPause } from "react-icons/fa";
import { MdExplicit } from "react-icons/md";
import { HiHeart } from "react-icons/hi";
import { fancyTimeFormat } from "../utils/fancyTimeFormat";
import { titleCase } from "title-case";
import { apiUrl } from "../utils/apiUrl";

interface Props {
  video: any;
}

const Video = ({ video }: Props) => {
  const router = useRouter();

  return (
    <div
      key={video.videoId}
      className="flex h-16 w-full flex-row transition-all ease-in-out justify-between duration-300 items-center gap-3 rounded-md px-3 text-sm text-slate-700 hover:bg-indigo-50 active:bg-indigo-100 hover:cursor-pointer"
    >
      <div className="flex flex-row gap-3">
        <div className="relative flex justify-center items-center overflow-hidden group transition-all bg-slate-900 rounded-md">
          <img
            className="w-12 h-auto"
            src={video?.thumbnails[0]?.url}
            alt=""
          />
        </div>
        <div className="flex flex-col justify-center">
          <div className="flex flex-row gap-3">
            <span className="font-semibold inline-flex gap-1 items-center">
              {video.title} {video.isExplicit ? <MdExplicit /> : null}
            </span>
          </div>
          <div>
            <span className="font-normal">
              {titleCase(video?.resultType)} · {video?.artists[0]?.name}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Video;
