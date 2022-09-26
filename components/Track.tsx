import axios from "axios";
import { Router, useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { FaPlay, FaPause } from "react-icons/fa";
import { HiHeart } from "react-icons/hi";
import { fancyTimeFormat } from "../utils/fancyTimeFormat";

interface Props {
  track: any;
}

const Track = ({ track }: Props) => {
  const [playing, setPlaying] = useState<boolean>(false);
  const [albumData, setAlbumData] = useState<any>();

  const getAlbumData = () => {
    axios
      .get(`https://tilda-api.ayaanzaveri.repl.co/album/${track?.album?.id}`)
      .then((res: any) => {
        setAlbumData(res.data);
      })
      .catch((err: any) => console.log(err));
  };

  useEffect(() => {
    getAlbumData();
  }, []);

  //   console.log(albumData);

  const router = useRouter();

  return (
    <div
      key={track.videoId}
      onClick={() =>
        router.push(`/playlist?list=${albumData?.audioPlaylistId}`)
      }
      className="flex h-16 w-full flex-row transition-all ease-in-out justify-between duration-300 items-center gap-3 rounded-md px-3 text-sm text-slate-700 hover:bg-indigo-50 active:bg-indigo-100 hover:cursor-pointer"
    >
      <div className="flex flex-row gap-3">
        <div className="relative flex justify-center items-center overflow-hidden rounded-md group transition-all">
          <img
            className="w-[2.5rem] h-[2.5rem]"
            src={track?.thumbnails[1]?.url}
            alt=""
          />
        </div>
        <div className="flex flex-row items-center gap-3">
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
          <span className="font-semibold ">{track.title}</span>
          {track.isExplicit ? <span>🅴</span> : null}
          <span className="font-normal">{track.artists[0].name}</span>
        </div>
      </div>
      <span className="flex font-medium">
        {fancyTimeFormat(track.duration_seconds)}
      </span>
    </div>
  );
};

export default Track;
