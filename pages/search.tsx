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
import Video from "../components/Video";
import Marquee from "react-fast-marquee";
import TopResult from "../components/TopResult";
import { useRecoilState } from "recoil";
import { currentTrackIdState } from "../atoms/songAtom";

const Search = () => {
  const { query } = useRouter();

  const [searchResults, setSearchResults] = useState<any>([]);
  const [topResults, setTopResults] = useState<any>([]);
  const [songs, setSongs] = useState<any>([]);
  const [albums, setAlbums] = useState<any>([]);
  const [videos, setVideos] = useState<any>([]);
  const [artists, setArtists] = useState<any>([]);
  const [communityPlaylists, setCommunityPlaylists] = useState<any>([]);
  const [currentSong, setCurrentSong] = useState<any>({
    url: "",
    track: "",
  });

  const getSearchResults = () => {
    setTopResults([]);
    setSongs([]);
    setArtists([]);
    setVideos([]);
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

  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState);

  console.log(currentTrackId);

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
      <div className="pt-16 pb-8">
        <div className="flex justify-center pt-2">
          <div className="flex items-center flex-col gap-4 w-full pb-16">
            {topResults.length > 0 ? (
              <div className="w-3/4 flex justify-center flex-col gap-2">
                <span className="justify-start items-start font-semibold text-2xl text-white w-full">
                  Top Result
                </span>
                {topResults?.map((result: any, index: number) => (
                  <TopResult
                    result={result}
                    key={index}
                    setCurrentSong={setCurrentSong}
                  />
                ))}
              </div>
            ) : null}
            {songs.length > 0 ? (
              <div className="w-3/4 flex justify-center flex-col gap-2">
                <span className="justify-start items-start font-semibold text-2xl text-white w-min">
                  Tracks
                </span>
                {songs?.map((track: any, index: number) => (
                  <Track track={track} key={index} />
                ))}
              </div>
            ) : null}
            {albums.length > 0 ? (
              <div className="w-3/4 flex justify-center flex-col gap-2">
                <span className="justify-start items-start font-semibold text-2xl text-white w-min">
                  Albums
                </span>
                {albums?.map((album: any, index: number) => (
                  <Album album={album} key={index} />
                ))}
              </div>
            ) : null}
            {videos.length > 0 ? (
              <div className="w-3/4 flex justify-center flex-col gap-2">
                <span className="justify-start items-start font-semibold text-2xl text-white w-min">
                  Videos
                </span>
                {videos?.map((video: any, index: number) => (
                  <Video
                    video={video}
                    key={index}
                    setCurrentSong={setCurrentSong}
                  />
                ))}
              </div>
            ) : null}
            {artists.length > 0 ? (
              <div className="w-3/4 flex justify-center flex-col gap-2">
                <span className="justify-start items-start font-semibold text-2xl text-white w-min">
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
