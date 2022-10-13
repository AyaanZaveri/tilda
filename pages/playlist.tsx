import { PlayIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { MdExplicit } from "react-icons/md";
import { useRecoilState } from "recoil";
import { titleCase } from "title-case";
import { currentPlaylistState } from "../atoms/playlistAtom";
import { currentTrackState } from "../atoms/songAtom";
import AlbumTrack from "../components/AlbumTrack";
import Navbar from "../components/Navbar";
import { pipedApiUrl, tildaApiUrl } from "../utils/apiUrl";
import { fancyTimeFormat } from "../utils/fancyTimeFormat";
import { axiosReq } from "../utils/axiosReq";
import { playingTrackState } from "../atoms/playingTrack";

const Playlist: NextPage = () => {
  const { query } = useRouter();
  const listId = query.list;
  const [albumBrowseId, setAlbumBrowseId] = useState<number>();
  const [albumData, setAlbumData] = useState<any>();
  const [isExplicit, setIsExplicit] = useState<boolean>();
  const [showMore, setShowMore] = useState<boolean>(false);

  const [currentTrack, setCurrentTrack] = useRecoilState(currentTrackState);
  const [currentPlaylist, setCurrentPlaylist] =
    useRecoilState(currentPlaylistState);
  const [playingTrack, setPlayingTrack] = useRecoilState(playingTrackState);

  const [curPlay, setCurPlay] = useState<any>();

  const getAlbumBrowseId = () => {
    axios
      .get(`${tildaApiUrl}/albumBrowse/${listId}`)
      .then((res: any) => {
        setAlbumBrowseId(res.data);
      })
      .catch(
        (err: any) => {}
        // console.log(err)
      );
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

  const getAudioFromSong = async (videoId: string) => {
    const response = await axios.get(`${pipedApiUrl}/streams/${videoId}`);
    const data = response.data;
    return data?.audioStreams
      .filter((stream: any) => stream?.mimeType == "audio/mp4")
      .sort((a: any, b: any) =>
        a.bitrate < b.bitrate ? 1 : b.bitrate < a.bitrate ? -1 : 0
      )[0]?.url;
  };

  const getPlaylistSongs = async (playSong: boolean) => {
    setCurPlay([]);
    if (albumData?.tracks?.length >= 1) {
      await albumData?.tracks?.map(async (track: any, idx: number) => {
        const songUrl = await getAudioFromSong(track?.videoId);
        // await setCurPlay((oldCurPlay: any) => [...oldCurPlay, idx]);
        await setCurPlay((oldPlaylist: any) => [
          ...oldPlaylist,
          {
            ...track,
            track: {
              title: track?.title,
              thumbnails: albumData?.thumbnails,
              isExplicit: track?.isExplicit,
              artists: track?.artists,
            },
            trackNum: idx,
            url: songUrl,
            play: playSong,
          },
        ]);
      });
    }
  };

  const setPlaylistSongs = () => {
    getPlaylistSongs(true);
    try {
      setCurrentPlaylist(
        curPlay?.sort((a: any, b: any) =>
          a.trackNum > b.trackNum ? 1 : b.trackNum > a.trackNum ? -1 : 0
        )
      );
    } catch (error) {}
  };

  useEffect(() => {
    getPlaylistSongs(false);
  }, [albumData]);

  useEffect(() => {
    if (curPlay && curPlay != "undefined") {
      try {
        setCurrentPlaylist(
          curPlay?.sort((a: any, b: any) =>
            a.trackNum > b.trackNum ? 1 : b.trackNum > a.trackNum ? -1 : 0
          )
        );
      } catch (error) {}
    }
  }, [curPlay]);

  console.log();

  // curPlay?.sort((a: any, b: any) =>
  // a.duration_seconds > b.duration_seconds
  //   ? 1
  //   : b.duration_seconds > a.duration_seconds
  //   ? -1
  //   : 0

  // console.log(curPlay);

  return (
    <div
      className={`pl-64 ml-3 pr-12 ${
        playingTrack?.url?.length > 3 ? "pb-16" : ""
      }`}
    >
      <div className="pt-[4.5rem] pb-8">
        <div className="pt-8">
          <div className="flex flex-row items-start gap-12">
            {albumData?.thumbnails ? (
              <img
                draggable={false}
                className="w-[16.5rem] h-[16.5rem] rounded-xl select-none shadow-2xl shadow-sky-500/20 hover:scale-[1.03]"
                style={{
                  transition:
                    "transform 2s cubic-bezier(0.34, 1.56, 0.64, 1.8)",
                }}
                src={
                  albumData?.thumbnails[albumData?.thumbnails.length - 1]?.url
                }
                alt=""
              />
            ) : null}
            <div className="flex flex-col pt-3 gap-4 text-slate-700 dark:text-white">
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
                          className="mt-3 text-slate-700 dark:text-white"
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
                          className="mt-3 text-slate-700 dark:text-white line-clamp-2"
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
                    <button
                      onClick={setPlaylistSongs}
                      className="px-5 py-1.5 text-sm text-white shadow-lg shadow-sky-500/20 hover:shadow-xl hover:shadow-sky-500/30 bg-sky-500 inline-flex gap-2 items-center active:bg-sky-600 rounded-md transition ease-in-out duration-300"
                    >
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
