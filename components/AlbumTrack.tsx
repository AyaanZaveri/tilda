import axios from "axios";
import { Router, useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { FaPlay, FaPause } from "react-icons/fa";
import { MdExplicit } from "react-icons/md";
import { HiHeart } from "react-icons/hi";
import { fancyTimeFormat } from "../utils/fancyTimeFormat";
import { titleCase } from "title-case";
import { useRecoilState } from "recoil";
import { currentTrackState } from "../atoms/songAtom";

interface Props {
  track: any;
  index: number;
  thumbnails: string;
}

const AlbumTrack = ({ track, index, thumbnails }: Props) => {
  const router = useRouter();

  const [currentTrack, setCurrentTrack] = useRecoilState(currentTrackState);

  const getCurrentSong = (query: string) => {
    if (query.length > 2) {
      axios
        .get(`https://pipedapi.tokhmi.xyz/streams/${query}`)
        .then((res: any) => {
          setCurrentTrack({
            url: res?.data?.audioStreams
              .filter((stream: any) => stream?.mimeType == "audio/mp4")
              .sort((a: any, b: any) =>
                a.bitrate < b.bitrate ? 1 : b.bitrate < a.bitrate ? -1 : 0
              )[0]?.url,
            track: {
              ...track,
              thumbnails: thumbnails,
            },
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
      key={track.videoId}
      className="flex h-12 w-full flex-row transition-all ease-in-out justify-between duration-300 items-center group gap-3 rounded-md px-3 text-sm text-white hover:bg-sky-500 active:bg-sky-600 hover:shadow-xl hover:shadow-sky-500/10 hover:cursor-pointer"
      onClick={() => getCurrentSong(track.videoId)}
    >
      <div className="flex flex-row gap-5 items-center">
        <span className="text-slate-400 group-hover:text-white transition-all ease-in-out duration-300">
          {index + 1}
        </span>
        <div className="flex flex-col justify-center">
          <div className="flex flex-row gap-3">
            <span className="font-semibold inline-flex gap-1 items-center">
              {track.title} {track.isExplicit ? <MdExplicit /> : null}
            </span>
          </div>
          <div>
            <span className="font-normal">
              {/* {track?.artists.map((artist: any, index: number) => (
                <span>{(index ? ", " : "") + artist?.name}</span>
              ))} */}
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
