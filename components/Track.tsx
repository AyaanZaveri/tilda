import axios from "axios";
import { Router, useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { FaPlay, FaPause } from "react-icons/fa";
import { MdExplicit } from "react-icons/md";
import { HiHeart, HiStar } from "react-icons/hi";
import { fancyTimeFormat } from "../utils/fancyTimeFormat";
import { titleCase } from "title-case";
import { pipedApiUrl } from "../utils/apiUrl";
import { useRecoilState } from "recoil";
import { currentTrackState } from "../atoms/songAtom";
import { PlayIcon } from "@heroicons/react/24/solid";
import { addDoc, collection, deleteDoc, doc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";

interface Props {
  track: any;
}

const Track = ({ track }: Props) => {
  const [user] = useAuthState(auth);

  const [playing, setPlaying] = useState<boolean>(false);
  const [currentTrack, setCurrentTrack] = useRecoilState(currentTrackState);

  const getCurrentSong = (query: string) => {
    if (query.length > 2) {
      axios
        .get(`${pipedApiUrl}/streams/${query}`)
        .then((res: any) => {
          setCurrentTrack({
            url: res?.data?.audioStreams
              .filter((stream: any) => stream?.mimeType == "audio/mp4")
              .sort((a: any, b: any) =>
                a.bitrate < b.bitrate ? 1 : b.bitrate < a.bitrate ? -1 : 0
              )[0]?.url,
            track: track,
          });
        })
        .catch((err: any) => {});
    } else {
      setCurrentTrack({
        url: "",
        track: "",
      });
    }
  };

  const router = useRouter();

  const usersRef = collection(db, "users");

  // get uid of user from firebase
  const userRef = doc(usersRef, user?.uid);
  const favoritesRef = collection(userRef, "favorites");

  const [favoritesSnapshot] = useCollection(favoritesRef);

  const checkIfFavoriteExists = (videoId: string) => {
    return favoritesSnapshot?.docs.find(
      (doc) => doc.data().videoId === videoId
    );
  };

  const addFavorite = async () => {
    if (!checkIfFavoriteExists(track?.videoId)) {
      await addDoc(favoritesRef, track);
    }
  };

  const deleteFavorite = async () => {
    const favoriteDoc = favoritesSnapshot?.docs.find(
      (doc) => doc.data().videoId === track?.videoId
    )?.id;
    await deleteDoc(doc(favoritesRef, favoriteDoc));
  };

  const handleFavorited = () => {
    if (checkIfFavoriteExists(track?.videoId)) {
      deleteFavorite();
    } else {
      addFavorite();
    }
  };

  return (
    <div
      key={track.videoId}
      className="flex h-16 w-full flex-row items-center justify-between gap-3 rounded-md px-3 text-sm text-slate-700 transition-all duration-300 ease-in-out hover:shadow-sky-500/10"
    >
      <div className="flex flex-row gap-3">
        <div
          onClick={() => getCurrentSong(track.videoId)}
          className="group relative flex cursor-pointer items-center justify-center overflow-hidden rounded-md transition-all"
        >
          <PlayIcon className="absolute z-10 ml-0.5 h-5 w-5 text-white opacity-0 transition-all duration-300 ease-in-out group-hover:opacity-100 group-active:opacity-100 group-active:brightness-90" />
          <img
            draggable={false}
            className="h-[2.5rem] w-[2.5rem] transition duration-300 ease-in-out group-hover:scale-110 group-hover:blur-sm group-active:scale-110 group-active:blur-sm group-active:brightness-75"
            src={track?.thumbnails[1]?.url}
            alt=""
          />
        </div>
        <div className="flex flex-col justify-center">
          <div className="flex flex-row gap-3">
            <span className="inline-flex items-center gap-0.5">
              <span
                className="inline-flex cursor-pointer items-center gap-1 font-semibold transition duration-300 ease-in-out hover:text-sky-500 active:text-sky-600"
                onClick={() => getCurrentSong(track.videoId)}
              >
                {track.title} {track.isExplicit ? <MdExplicit /> : null}
              </span>
              <HiStar
                onClick={handleFavorited}
                className={`h-4 w-5 group-hover:text-white group-active:text-white ${
                  checkIfFavoriteExists(track?.videoId as string)
                    ? "text-sky-500 hover:text-sky-600 active:text-sky-700"
                    : "text-slate-700 hover:text-amber-500 active:text-amber-600"
                } transition duration-300 ease-in-out hover:cursor-pointer`}
              />
            </span>
          </div>
          <div>
            <span className="font-normal">
              {titleCase(track?.resultType)} ·{" "}
              {track?.artists.map((artist: any, index: number) => (
                <span>{(index ? ", " : "") + artist?.name}</span>
              ))}{" "}
              &nbsp;· {track?.album?.name}
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
