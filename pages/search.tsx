import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Track from "../components/Track";
// import AudioPlayer from "../components/AudioPlayer";
import Artist from "../components/Artist";
import ReactAudioPlayer from "react-audio-player";
import "plyr-react/plyr.css";
import AudioPlayer from "react-h5-audio-player";
import {
  HiFastForward,
  HiPause,
  HiPlay,
  HiRewind,
  HiVolumeOff,
  HiVolumeUp,
} from "react-icons/hi";
import { MdExplicit } from "react-icons/md";
import { tildaApiUrl } from "../utils/apiUrl";
import Album from "../components/Album";
import Video from "../components/Video";
import Marquee from "react-fast-marquee";
import TopResult from "../components/TopResult";
import { useRecoilState } from "recoil";
import { currentTrackState } from "../atoms/songAtom";
import { currentPlaylistState } from "../atoms/playlistAtom";
import { playingTrackState } from "../atoms/playingTrack";

const Search = () => {
  const { query } = useRouter();

  const [searchResults, setSearchResults] = useState<any>([]);
  const [topResults, setTopResults] = useState<any>([]);
  const [songs, setSongs] = useState<any>([]);
  const [albums, setAlbums] = useState<any>([]);
  const [videos, setVideos] = useState<any>([]);
  const [artists, setArtists] = useState<any>([]);
  const [communityPlaylists, setCommunityPlaylists] = useState<any>([]);
  const [playingTrack, setPlayingTrack] = useRecoilState(playingTrackState);

  const getSearchResults = () => {
    setTopResults([]);
    setSongs([]);
    setArtists([]);
    setVideos([]);
    setAlbums([]);
    setCommunityPlaylists([]);

    if (query.q) {
      axios
        .get(`${tildaApiUrl}/search/all/${query.q}`)
        .then((res: any) => {
          setSearchResults(res.data);
        })
        .catch((err: any) => console.log(err));
    }
  };

  useEffect(() => {
    getSearchResults();
  }, [query.q]);

  const [currentTrack, setCurrentTrack] = useRecoilState(currentTrackState);
  const [currentPlaylist, setCurrentPlaylist] =
    useRecoilState(currentPlaylistState);

  console.log(currentPlaylist);

  useEffect(() => {
    if (searchResults) {
      searchResults?.map((result: any) => {
        if (result?.category == "Top result") {
          setTopResults((oldTopResults: any) => [...oldTopResults, result]);
        }
        if (result?.category == "Songs") {
          setSongs((oldSongs: any) => [...oldSongs, result]);
        }
        if (result?.category == "Albums") {
          setAlbums((oldAlbums: any) => [...oldAlbums, result]);
        }
        if (result?.category == "Videos") {
          setVideos((oldVideos: any) => [...oldVideos, result]);
        }
        if (result?.category == "Artists") {
          setArtists((oldArists: any) => [...oldArists, result]);
        }
        if (result?.category == "Community playlists") {
          setCommunityPlaylists((oldCommunityPlaylists: any) => [
            ...oldCommunityPlaylists,
            result,
          ]);
        }
      });
    }
  }, [searchResults]);

  return (
    <div>
      <div className="pt-[4.5rem] pb-8 select-none">
        <div className="flex pl-64 ml-3 justify-center pt-2">
          <div
            className={`flex flex-col gap-4 w-full ${
              playingTrack?.url?.length > 3 ? "pb-16" : ""
            }`}
          >
            {topResults.length > 0 ? (
              <div className="w-3/4 flex justify-center flex-col gap-2">
                <span className="justify-start items-start font-semibold text-2xl text-slate-700 dark:text-white w-full">
                  Top Result
                </span>
                {topResults?.map((result: any, index: number) => (
                  <TopResult result={result} key={index} />
                ))}
              </div>
            ) : null}
            {songs.length > 0 ? (
              <div className="w-3/4 flex justify-center flex-col gap-2">
                <span className="justify-start items-start font-semibold text-2xl text-slate-700 dark:text-white w-min">
                  Tracks
                </span>
                {songs?.map((track: any, index: number) => (
                  <Track track={track} key={index} />
                ))}
              </div>
            ) : null}
            {albums.length > 0 ? (
              <div className="w-3/4 flex justify-center flex-col gap-2">
                <span className="justify-start items-start font-semibold text-2xl text-slate-700 dark:text-white w-min">
                  Albums
                </span>
                {albums?.map((album: any, index: number) => (
                  <Album album={album} key={index} />
                ))}
              </div>
            ) : null}
            {videos.length > 0 ? (
              <div className="w-3/4 flex justify-center flex-col gap-2">
                <span className="justify-start items-start font-semibold text-2xl text-slate-700 dark:text-white w-min">
                  Videos
                </span>
                {videos?.map((video: any, index: number) => (
                  <Video video={video} key={index} />
                ))}
              </div>
            ) : null}
            {artists.length > 0 ? (
              <div className="w-3/4 flex justify-center flex-col gap-2">
                <span className="justify-start items-start font-semibold text-2xl text-slate-700 dark:text-white w-min">
                  Artists
                </span>
                {artists?.map((artist: any, index: number) => (
                  <Artist artist={artist} key={index} />
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
