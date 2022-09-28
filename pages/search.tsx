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
import { apiUrl } from "../utils/apiUrl";
import Album from "../components/Album";

const Search = () => {
  const { query } = useRouter();

  const [searchResults, setSearchResults] = useState<any>([]);
  const [topResults, setTopResults] = useState<any>([]);
  const [songs, setSongs] = useState<any>([]);
  const [artists, setArtists] = useState<any>([]);
  const [albums, setAlbums] = useState<any>([]);
  const [communityPlaylists, setCommunityPlaylists] = useState<any>([]);
  const [currentSong, setCurrentSong] = useState<any>({
    url: "",
    track: "",
  });

  const getSearchResults = () => {
    setTopResults([]);
    setSongs([]);
    setArtists([]);
    setAlbums([]);
    setCommunityPlaylists([]);

    if (query.q) {
      axios
        .get(`${apiUrl}/search/all/${query.q}`)
        .then((res: any) => {
          setSearchResults(res.data);
        })
        .catch((err: any) => console.log(err));
    }
  };

  useEffect(() => {
    getSearchResults();
  }, [query.q]);

  useEffect(() => {
    if (searchResults) {
      searchResults?.map((result: any) => {
        if (result?.category == "Top result") {
          setTopResults((oldTopResults: any) => [...oldTopResults, result]);
        }
        if (result?.category == "Songs") {
          setSongs((oldSongs: any) => [...oldSongs, result]);
        }
        if (result?.category == "Artists") {
          setArtists((oldArists: any) => [...oldArists, result]);
        }
        if (result?.category == "Albums") {
          setAlbums((oldAlbums: any) => [...oldAlbums, result]);
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

  console.log(currentSong);

  return (
    <div>
      <div className="pt-16 pb-8">
        <div className="flex justify-center pt-2">
          <div className="flex items-center flex-col gap-4 w-full">
            <div className="w-3/4 flex justify-center flex-col gap-2">
              <span className="justify-start items-start font-semibold text-2xl text-slate-800 w-min">
                Tracks
              </span>
              {songs?.map((track: any, index: number) => (
                <Track
                  setCurrentSong={setCurrentSong}
                  track={track}
                  key={index}
                />
              ))}
            </div>
            <div className="w-3/4 flex justify-center flex-col gap-2">
              <span className="justify-start items-start font-semibold text-2xl text-slate-800 w-min">
                Artists
              </span>
              {artists?.map((artist: any, index: number) => (
                <Artist artist={artist} key={index} />
              ))}
            </div>
            <div className="w-3/4 flex justify-center flex-col gap-2">
              <span className="justify-start items-start font-semibold text-2xl text-slate-800 w-min">
                Albums
              </span>
              {albums?.map((album: any, index: number) => (
                <Album album={album} key={index} />
              ))}
            </div>
          </div>
        </div>
        {currentSong?.url?.length > 0 ? (
          <div className="fixed bottom-0 w-full justify-center flex items-center bg-white/75 backdrop-blur-md h-20">
            {/* <AudioPlayer currentSong={currentSong} /> */}
            <div className="flex flex-row gap-3 items-center text-sm text-slate-700 w-full justify-center">
              <div className="absolute left-0 flex flex-row gap-3 pl-4">
                <div className="relative flex justify-center items-center overflow-hidden rounded-md group transition-all">
                  <img
                    className="w-[3rem] h-[3rem]"
                    src={currentSong?.track?.thumbnails[1]?.url}
                    alt=""
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <div className="flex flex-row gap-3">
                    <span className="font-semibold inline-flex gap-1 items-center">
                      {currentSong?.track?.title}{" "}
                      {currentSong?.track?.isExplicit ? <MdExplicit /> : null}
                    </span>
                  </div>
                  <div>
                    <span className="font-normal">
                      {currentSong?.track?.artists[0]?.name}
                    </span>
                  </div>
                </div>
              </div>
              <div className="w-2/5">
                <AudioPlayer
                  autoPlay
                  src={currentSong?.url}
                  customIcons={{
                    forward: <HiFastForward />,
                    rewind: <HiRewind />,
                    play: <HiPlay />,
                    pause: <HiPause />,
                    volume: <HiVolumeUp />,
                    volumeMute: <HiVolumeOff />,
                  }}
                />
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Search;
