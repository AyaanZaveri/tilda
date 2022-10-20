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
import Tilt from "react-parallax-tilt";

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
      onClick={() =>
        router.push(`/playlist?list=${albumData?.audioPlaylistId}`)
      }
      key={album.videoId}
      className="group-one placeholder: flex w-48 flex-col items-center justify-between gap-3 rounded-xl bg-slate-100 p-4 pb-8 text-sm text-slate-700 transition-all duration-300 ease-in-out hover:cursor-pointer hover:bg-slate-200 active:bg-slate-200 active:ring-1 active:ring-slate-300 dark:text-white dark:hover:bg-slate-800 dark:active:bg-slate-800 dark:active:ring-1 dark:active:ring-slate-700"
    >
      <button className="flex flex-col gap-4">
        <Tilt
          glareEnable={true}
          glareMaxOpacity={0.8}
          glareColor="#ffffff"
          glarePosition="bottom"
          glareBorderRadius="12px"
        >
          <div className="group relative flex items-center justify-center overflow-hidden rounded-md transition-all">
            <img
              draggable={false}
              className="h-40 w-40 rounded-xl"
              src={album?.thumbnails[album?.thumbnails?.length - 1]?.url}
              alt=""
            />
          </div>
        </Tilt>
        <div className="flex flex-col justify-start">
          <button className="flex flex-row gap-3">
            <span className="inline-flex items-center gap-1 text-base font-semibold decoration-sky-500 decoration-2 transition-colors duration-300 ease-in-out hover:underline">
              {album.title} {album.isExplicit ? <MdExplicit /> : null}
            </span>
          </button>
          <div className="flex flex-col items-start gap-1.5 overflow-hidden text-ellipsis text-start">
            <span className="text-start font-normal">
              {album?.artists.map((artist: any, index: number) => (
                <span>{(index ? ", " : "") + artist?.name}</span>
              ))}
            </span>
            <div className="inline-flex items-center gap-1">
              <span className="rounded-full bg-slate-700 px-3 py-0.5 text-xs font-normal text-white">
                {titleCase(album?.resultType)}
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
        </div>
      </button>
    </div>
  );
};

export default Album;
