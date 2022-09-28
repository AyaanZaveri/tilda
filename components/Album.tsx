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
  album: any;
}

const Album = ({ album }: Props) => {
  const [albumData, setAlbumData] = useState<any>();

  const getAlbumData = () => {
    axios
      .get(`${apiUrl}/album/${album?.browseId}`)
      .then((res: any) => {
        setAlbumData(res.data);
      })
      .catch((err: any) => console.log(err));
  };

  useEffect(() => {
    getAlbumData();
  }, []);

  const router = useRouter();

  return (
    <div
      key={album.videoId}
      onClick={() => router.push(`/playlist?list=${albumData?.audioPlaylistId}`)}
      className="flex h-16 w-full flex-row transition-all ease-in-out justify-between duration-300 items-center gap-3 rounded-md px-3 text-sm text-slate-700 hover:bg-indigo-50 active:bg-indigo-100 hover:cursor-pointer"
    >
      <div className="flex flex-row gap-3">
        <div className="relative flex justify-center items-center overflow-hidden rounded-md group transition-all">
          <img
            className="w-[2.5rem] h-[2.5rem]"
            src={album?.thumbnails[1]?.url}
            alt=""
          />
        </div>
        <div className="flex flex-col justify-center">
          <div className="flex flex-row gap-3">
            <span className="font-semibold inline-flex gap-1 items-center">
              {album.title} {album.isExplicit ? <MdExplicit /> : null}
            </span>
          </div>
          <div>
            <span className="font-normal">
              {titleCase(album?.resultType)} · {album?.artists[0]?.name}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Album;