import axios from "axios";
import { Router } from "next/router";
import React, { useEffect, useState } from "react";
import { FaPlay, FaPause } from "react-icons/fa";
import { HiHeart } from "react-icons/hi";

interface Props {
  track: any;
}

const Track = ({ track }: Props) => {
  const [playing, setPlaying] = useState<boolean>(false);
  const [albumData, setAlbumData] = useState<any>();

  function millisToMinutesAndSeconds(millis: number) {
    var minutes = Math.floor(millis / 60000);
    var seconds: any = ((millis % 60000) / 1000).toFixed(0);
    return seconds == 60
      ? minutes + 1 + ":00"
      : minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  }

  const getTracksSearch = () => {
    axios
      .get(`https://tilda-api.ayaanzaveri.repl.co/album/${track?.album?.id}`)
      .then((res: any) => {
        setAlbumData(res.data);
      })
      .catch((err: any) => console.log(err));
  };

  useEffect(() => {
    getTracksSearch();
  }, []);

  console.log(albumData);

  return (
    <div
      key={track.videoId}
      //   onClick={() => router.push(`/track/${}`)}
      className="flex h-16 w-full flex-row transition-all duration-300 items-center gap-3 rounded-md px-3 text-sm text-slate-700 hover:bg-indigo-50 hover:cursor-pointer"
    >
      <img
        className="w-[2.5rem] h-[2.5rem] rounded-md"
        src={track?.thumbnails[1]?.url}
        alt=""
      />
      <div className="flex flex-row items-center gap-3">
        {playing ? (
          <FaPause
            className="w-2 hover:cursor-pointer"
            onClick={() => setPlaying(!playing)}
          />
        ) : (
          <FaPlay
            className="w-2 hover:cursor-pointer"
            // onClick={() => console.log(track.preview_url)}
          />
        )}
        {track.isExplicit ? <span className="mr-[-0.325rem] ">🅴</span> : null}
        <span className="font-semibold ">{track.title}</span>
        <span className="font-normal">{track.artists[0].name}</span>
        <span className="flex justify-end font-normal">
          {millisToMinutesAndSeconds(track.duration_seconds)}
        </span>
      </div>
    </div>
  );
};

export default Track;
