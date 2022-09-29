import axios from "axios";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { MdExplicit } from "react-icons/md";
import { titleCase } from "title-case";
import AlbumTrack from "../components/AlbumTrack";
import Navbar from "../components/Navbar";

const Home: NextPage = () => {
  const { query } = useRouter();
  const listId = query.list;
  const [albumBrowseId, setAlbumBrowseId] = useState<number>();
  const [albumData, setAlbumData] = useState<any>();
  const [isExplicit, setIsExplicit] = useState<boolean>();

  const getAlbumBrowseId = () => {
    axios
      .get(`https://tilda-api.ayaanzaveri.repl.co/albumBrowse/${listId}`)
      .then((res: any) => {
        setAlbumBrowseId(res.data);
      })
      .catch((err: any) => console.log(err));
  };

  const getAlbumData = () => {
    axios
      .get(`https://tilda-api.ayaanzaveri.repl.co/album/${albumBrowseId}`)
      .then((res: any) => {
        setAlbumData(res.data);
      })
      .catch((err: any) => console.log(err));
  };

  const checkIsExplicit = () => {
    albumData?.tracks?.map((track: any) => {
      if (track?.isExplicit) {
        setIsExplicit(true);
      }
    });
  };

  useEffect(() => {
    getAlbumBrowseId();
  }, [listId]);

  useEffect(() => {
    getAlbumData();
  }, [albumBrowseId]);

  useEffect(() => {
    if (albumData) {
      checkIsExplicit();
    }
  }, [albumData]);

  console.log(isExplicit);

  return (
    <div>
      <Navbar />
      <div className="pt-16 pb-8">
        <div className="px-20 pt-14">
          <div className="flex flex-row items-center gap-12">
            {albumData?.thumbnails ? (
              <img
                className="w-[16.5rem] h-[16.5rem] rounded-md shadow-md"
                src={
                  albumData?.thumbnails[albumData?.thumbnails.length - 1]?.url
                }
                alt=""
              />
            ) : null}
            <div className="flex flex-col gap-4 text-slate-800">
              <span className="text-3xl font-bold">{albumData?.title}</span>
              <div className="flex flex-col">
                <div className="inline-flex gap-2 items-center">
                  <span>{isExplicit ? <MdExplicit /> : null}</span>
                  <span>
                    {albumData?.type} · {albumData?.artists[0]?.name}
                  </span>
                </div>
                <div className="inline-flex gap-2 items-center">
                  <span className="text-indigo-600">
                    {albumData?.trackCount} Tracks ·{" "}
                    {albumData?.duration
                      ? titleCase(albumData?.duration)
                      : null}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6">
            {albumData?.tracks.map((track: any, index: number) => (
              <AlbumTrack track={track} index={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
