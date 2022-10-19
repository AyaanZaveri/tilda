import axios from "axios";
import { Router, useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { FaPlay, FaPause } from "react-icons/fa";
import { MdExplicit } from "react-icons/md";
import { HiHeart } from "react-icons/hi";
import { fancyTimeFormat } from "../utils/fancyTimeFormat";
import { titleCase } from "title-case";
import { addDoc, collection, deleteDoc, doc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { pipedApiUrl, tildaApiUrl } from "../utils/apiUrl";

interface Props {
  album: any;
}

const Album = ({ album }: Props) => {
  const [albumData, setAlbumData] = useState<any>();

  const getAlbumData = () => {
    axios
      .get(`${tildaApiUrl}/album/${album?.browseId}`)
      .then((res: any) => {
        setAlbumData(res.data);
      })
      .catch((err: any) => {});
  };

  useEffect(() => {
    getAlbumData();
  }, []);

  const router = useRouter();

  const [user] = useAuthState(auth);

  const usersRef = collection(db, "users");

  // get uid of user from firebase
  const userRef = doc(usersRef, user?.uid);
  const userCollectionRef = collection(userRef, "user");
  const favoritesRef = doc(userCollectionRef, "favorites");
  const favoriteAlbumsRef = collection(favoritesRef, "albums");

  const [favoriteAlbumsSnapshot] = useCollection(favoriteAlbumsRef);

  const checkIfFavoriteExists = (browseId: string) => {
    return favoriteAlbumsSnapshot?.docs.find(
      (doc) => doc.data().browseId === browseId
    );
  };

  const addFavorite = async () => {
    if (!checkIfFavoriteExists(album?.browseId)) {
      await addDoc(favoriteAlbumsRef, album);
    }
  };

  const deleteFavorite = async () => {
    const favoriteDoc = favoriteAlbumsSnapshot?.docs.find(
      (doc) => doc.data().browseId === album?.browseId
    )?.id;
    await deleteDoc(doc(favoriteAlbumsRef, favoriteDoc));
  };

  const handleFavorited = () => {
    if (checkIfFavoriteExists(album?.browseId)) {
      deleteFavorite();
    } else {
      addFavorite();
    }
  };

  return (
    <div
      key={album.videoId}
      className="group-one flex flex-col items-center justify-between gap-3 rounded-xl p-4 pb-8 text-sm text-slate-700 transition-all duration-300 ease-in-out hover:scale-105 hover:cursor-pointer hover:bg-slate-100 active:bg-slate-200 dark:text-white dark:hover:bg-slate-800 dark:active:bg-slate-800 dark:active:ring-1 dark:active:ring-slate-700"
    >
      <button
        onClick={() =>
          router.push(`/playlist?list=${albumData?.audioPlaylistId}`)
        }
        className="flex flex-col gap-4"
      >
        <div className="group relative flex items-center justify-center overflow-hidden rounded-md transition-all">
          <img
            draggable={false}
            className="h-40 w-40 rounded-xl"
            src={album?.thumbnails[album?.thumbnails?.length - 1]?.url}
            alt=""
          />
        </div>
        <div className="flex flex-col justify-center">
          <button className="flex flex-row gap-3">
            <span className="inline-flex items-center gap-1 text-base font-semibold decoration-sky-500 decoration-2 transition-colors duration-300 ease-in-out hover:underline">
              {album.title} {album.isExplicit ? <MdExplicit /> : null}
            </span>
          </button>
          <div className="inline-flex items-center gap-1 overflow-hidden text-ellipsis">
            <span className="font-normal">
              {titleCase(album?.resultType)} ·{" "}
              {album?.artists.map((artist: any, index: number) => (
                <span>{(index ? ", " : "") + artist?.name}</span>
              ))}
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleFavorited();
              }}
            >
              <HiHeart
                className={`w-50 h-4 ${
                  checkIfFavoriteExists(album?.browseId as string)
                    ? "text-sky-500 hover:text-sky-600 active:text-sky-700"
                    : "text-slate-700 opacity-0 hover:text-rose-500 active:text-rose-600 group-one-hover:opacity-100 group-one-active:opacity-100 dark:text-white dark:hover:text-rose-500 dark:active:text-rose-600"
                } mb-0.5 transition duration-300 ease-in-out hover:cursor-pointer`}
              />
            </button>
          </div>
        </div>
      </button>
    </div>
  );
};

export default Album;
