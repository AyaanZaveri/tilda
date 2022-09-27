import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Track from "../components/Track";
import AudioPlayer from "../components/AudioPlayer";
import Artist from "../components/Artist";
import ReactAudioPlayer from "react-audio-player";
import "plyr-react/plyr.css";

const Search = () => {
  const { query } = useRouter();

  const [searchResults, setSearchResults] = useState<any>([]);
  const [topResults, setTopResults] = useState<any>([]);
  const [songs, setSongs] = useState<any>([]);
  const [artists, setArtists] = useState<any>([]);
  const [albums, setAlbums] = useState<any>([]);
  const [communityPlaylists, setCommunityPlaylists] = useState<any>([]);
  const [currentSong, setCurrentSong] = useState<string>("");

  const getSearchResults = () => {
    setTopResults([]);
    setSongs([]);
    setArtists([]);
    setAlbums([]);
    setCommunityPlaylists([]);

    if (query.q) {
      axios
        .get(`https://tilda-api.ayaanzaveri.repl.co/search/all/${query.q}`)
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
      <Navbar />
      <div className="pt-16">
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
          </div>
        </div>
        {currentSong ? (
          <div className="fixed bottom-0 w-full justify-center flex items-center border-t bg-white h-20">
            {/* <ReactAudioPlayer
            className="w-full bg-white/50 justify-center flex items-center font-['Inter'] plyr-react plyr"
            src={currentSong}
            controlsList="nodownload noplaybackrate"
            autoPlay
            controls
          /> */}
            <AudioPlayer url={currentSong} />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Search;
