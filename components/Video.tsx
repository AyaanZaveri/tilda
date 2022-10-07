import axios from "axios";
import { Router, useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { FaPlay, FaPause } from "react-icons/fa";
import { MdExplicit } from "react-icons/md";
import { HiHeart } from "react-icons/hi";
import { fancyTimeFormat } from "../utils/fancyTimeFormat";
import { titleCase } from "title-case";
import { pipedApiUrl, tildaApiUrl } from "../utils/apiUrl";
import { useRecoilState } from "recoil";
import { currentTrackState } from "../atoms/songAtom";

interface Props {
  video: any;
}

const Video = ({ video }: Props) => {
  const router = useRouter();
  const [currentTrack, setCurrentTrack] = useRecoilState(currentTrackState);

  const getCurrentSong = (query: string) => {
    if (query.length > 2) {
      axios
        .get(`${pipedApiUrl}/streams/${query}`)
        .then((res: any) => {
          setCurrentTrack({
            url: res?.data?.audioStreams.sort((a: any, b: any) =>
              a.bitrate < b.bitrate ? 1 : b.bitrate < a.bitrate ? -1 : 0
            )[0]?.url,
            track: video,
          });
        })
        .catch((err: any) => console.log(err));
    } else {
      setCurrentTrack({
        url: "",
        track: "",
      });
    }
  };

  return (
    <div
      key={video.videoId}
      className="flex h-16 w-full flex-row transition-all ease-in-out justify-between duration-300 items-center gap-3 rounded-md px-3 text-sm text-slate-700 hover:text-white dark:text-white hover:bg-sky-500 active:bg-sky-600 hover:shadow-xl hover:shadow-sky-500/10 hover:cursor-pointer"
      onClick={() => getCurrentSong(video.videoId)}
      id={video.videoId}
    >
      <div className="flex flex-row gap-3">
        <div className="relative flex justify-center items-center overflow-hidden group transition-all bg-slate-800 rounded-md">
          <img
            draggable={false}
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
              {titleCase(video?.resultType)} ·{" "}
              {video?.artists.map((artist: any, index: number) => (
                <span>{(index ? ", " : "") + artist?.name}</span>
              ))}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Video;
