import { PlayIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { MdExplicit } from "react-icons/md";
import { useRecoilState } from "recoil";
import { titleCase } from "title-case";
import { currentTrackState } from "../atoms/songAtom";
import { currentThemeState } from "../atoms/themeAtom";
import AlbumTrack from "../components/AlbumTrack";
import Navbar from "../components/Navbar";
import { tildaApiUrl } from "../utils/apiUrl";

const Playlist: NextPage = () => {
  const { query } = useRouter();
  const listId = query.list;
  const [albumBrowseId, setAlbumBrowseId] = useState<number>();
  const [albumData, setAlbumData] = useState<any>();
  const [isExplicit, setIsExplicit] = useState<boolean>();
  const [showMore, setShowMore] = useState<boolean>(false);

  const [currentTrack, setCurrentTrack] = useRecoilState(currentTrackState);
  const [currentTheme, setCurrentTheme] = useRecoilState(currentThemeState);

  const getAlbumBrowseId = () => {
    axios
      .get(`${tildaApiUrl}/albumBrowse/${listId}`)
      .then((res: any) => {
        setAlbumBrowseId(res.data);
      })
      .catch((err: any) => console.log(err));
  };

  const getAlbumData = () => {
    axios
      .get(`${tildaApiUrl}/album/${albumBrowseId}`)
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

  return (
    <div
      className={`pl-64 ml-3 pr-12 ${
        currentTrack?.url?.length > 3 ? "pb-16" : ""
      } ${currentTheme == "dark" ? "dark" : null}`}
    >
      <div className="pt-[4.5rem] pb-8">
        <div className="pt-8">
          <div className="flex flex-row items-start gap-12">
            {albumData?.thumbnails ? (
              <img
                draggable={false}
                className="w-[16.5rem] h-[16.5rem] rounded-md select-none shadow-2xl shadow-sky-500/20 hover:shadow-sky-900 hover:scale-[1.03] ease-in-out duration-1000"
                style={{
                  transition:
                    "transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1.8)",
                }}
                src={
                  albumData?.thumbnails[albumData?.thumbnails.length - 1]?.url
                }
                alt=""
              />
            ) : null}
            <div className="flex flex-col pt-3 gap-4 text-white">
              <span className="text-4xl font-semibold">{albumData?.title}</span>
              <div className="flex flex-col">
                <div className="inline-flex gap-2 items-center">
                  {isExplicit ? <MdExplicit /> : null}
                  {albumData ? (
                    <span>
                      {albumData?.type.trim()} ·{" "}
                      {albumData?.artists.map((artist: any, index: number) => (
                        <span>{(index ? ", " : "") + artist?.name}</span>
                      ))}{" "}
                      · {albumData?.year}
                    </span>
                  ) : null}
                </div>
                <div className="inline-flex gap-2 items-center">
                  {albumData ? (
                    <span className="text-sky-400">
                      {albumData?.trackCount} Tracks ·{" "}
                      {albumData?.duration
                        ? titleCase(albumData?.duration)
                        : null}
                    </span>
                  ) : null}
                </div>
                {showMore && albumData ? (
                  <div>
                    {albumData?.description ? (
                      <div>
                        <div
                          className="mt-3 text-white"
                          dangerouslySetInnerHTML={{
                            __html: albumData?.description?.replaceAll(
                              /\n/g,
                              "<br />"
                            ),
                          }}
                        />
                        <button
                          onClick={() => setShowMore(false)}
                          className="text-sky-400 hover:text-sky-500 transition-colors duration-300 text-sm"
                        >
                          Show Less
                        </button>
                      </div>
                    ) : null}
                  </div>
                ) : (
                  <div>
                    {albumData?.description ? (
                      <div>
                        <div
                          className="mt-3 text-white line-clamp-2"
                          dangerouslySetInnerHTML={{
                            __html: albumData?.description?.replaceAll(
                              /\n/g,
                              "<br />"
                            ),
                          }}
                        />
                        <button
                          onClick={() => setShowMore(true)}
                          className="text-sky-400 hover:text-sky-500 transition-colors ease-in-out duration-300 text-sm"
                        >
                          Show More
                        </button>
                      </div>
                    ) : null}
                  </div>
                )}
                {albumData?.tracks ? (
                  <div className="mt-3">
                    <button className="px-6 py-1 shadow-lg shadow-sky-500/20 hover:shadow-xl hover:shadow-sky-500/30 bg-sky-500 inline-flex gap-2 items-center active:bg-sky-600 rounded transition ease-in-out duration-300">
                      <PlayIcon className="w-4 h-4" />
                      Play
                    </button>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
          <div className="mt-6 flex flex-col gap-1">
            {albumData?.tracks.map((track: any, index: number) => (
              <AlbumTrack
                thumbnails={albumData?.thumbnails}
                track={track}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Playlist;
