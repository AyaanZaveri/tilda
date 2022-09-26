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
  setCurrentSong: any;
}

const Track = ({ track, setCurrentSong }: Props) => {
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

  // console.log(track?.videoId);

  const router = useRouter();

  const getCurrentSong = (query: string) => {
    if (query.length > 2) {
      axios
        .get(`https://pipedapi.esmailelbob.xyz/streams/${query}`)
        .then((res: any) => {
          setCurrentSong(
            res?.data?.audioStreams.sort((a: any, b: any) =>
              a.bitrate < b.bitrate ? 1 : b.bitrate < a.bitrate ? -1 : 0
            )[0]?.url
          );
        })
        .catch((err: any) => console.log(err));
    } else {
      setCurrentSong("");
    }
  };

  return (
    <div
      key={track.videoId}
      onClick={() =>
        // router.push(`/playlist?list=${albumData?.audioPlaylistId}`)
        getCurrentSong(track.videoId)
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
              {titleCase(track?.resultType)} · {track?.artists[0]?.name} &nbsp;·{" "}
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

export default Track;
