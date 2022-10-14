import React, { useEffect, useState } from "react";
import {
  HiFastForward,
  HiPause,
  HiPlay,
  HiRewind,
  HiVolumeOff,
  HiVolumeUp,
} from "react-icons/hi";
import { MdExplicit } from "react-icons/md";
import AudioPlayer from "react-h5-audio-player";
import { currentTrackState } from "../atoms/songAtom";
import { useRecoilState } from "recoil";
import {
  FastForward20Filled,
  FastForward24Filled,
  Pause20Filled,
  Pause24Filled,
  Play20Filled,
  Play24Filled,
  Rewind20Filled,
  Rewind24Filled,
} from "@fluentui/react-icons";
import Marquee from "react-fast-marquee";
import { currentPlaylistState } from "../atoms/playlistAtom";
import { BsSkipEndFill, BsSkipStartFill } from "react-icons/bs";
import { playingTrackState } from "../atoms/playingTrack";

const BAudioPlayer = () => {
  const [currentTrack, setCurrentTrack] = useRecoilState(currentTrackState);
  const [currentPlaylist, setCurrentPlaylist] =
    useRecoilState(currentPlaylistState);
  const [playingTrack, setPlayingTrack] = useRecoilState(playingTrackState);

  const [currentTrackIndex, setCurrentTrackIndex] = useState<any>(0);
  const [playingSong, setPlayingSong] = useState<any>();

  useEffect(() => {
    setPlayingSong(currentTrack);
    currentTrack?.trackNum
      ? setCurrentTrackIndex(currentTrack?.trackNum)
      : null;
  }, [currentTrack]);

  const handlePlayButton = () => {
    setPlayingSong(currentPlaylist[0]);
    setCurrentTrackIndex(0);
  };

  useEffect(() => {
    currentPlaylist?.length >= 1 && currentPlaylist[0]?.play
      ? handlePlayButton()
      : null;
  }, [currentPlaylist]);

  useEffect(() => {
    currentPlaylist?.length >= 1
      ? setPlayingSong(currentPlaylist[currentTrackIndex])
      : null;
  }, [currentTrackIndex]);

  useEffect(() => {
    setPlayingTrack(playingSong);
  }, [playingSong]);


  const handleClickNext = () => {
    if (playingSong?.trackNum >= 0) {
      setCurrentTrackIndex((currentTrackIndex: any) =>
        currentTrackIndex < currentPlaylist?.length - 1
          ? currentTrackIndex + 1
          : 0
      );
    }
  };

  const handleClickPrevious = () => {
    if (playingSong?.trackNum >= 0) {
      setCurrentTrackIndex((currentTrackIndex: any) =>
        currentTrackIndex > 0 ? currentTrackIndex - 1 : 0
      );
    }
  };

  const handleEnd = () => {
    if (playingSong?.trackNum >= 0) {
      setCurrentTrackIndex((currentTrackIndex: any) =>
        currentTrackIndex < currentPlaylist?.length - 1
          ? currentTrackIndex + 1
          : 0
      );
    }
  };

  return (
    <div className="z-20 select-none">
      {playingSong?.url?.length > 0 ? (
        <div className="fixed bottom-0 w-full justify-center flex items-center bg-white/75 dark:bg-slate-900/75 backdrop-blur-md h-20">
          <div className="flex flex-row gap-3 items-center text-sm text-slate-700 dark:text-white w-full justify-center">
            <div className="absolute left-0 flex flex-row gap-3 pl-4">
              <div className="relative flex justify-center items-center overflow-hidden rounded-md group transition-all">
                <img
                  draggable={false}
                  className="w-[3rem]"
                  src={
                    playingSong?.track?.thumbnails
                      ? playingSong?.track?.thumbnails[0]?.url
                      : playingSong?.thumbnails
                      ? playingSong?.thumbnails[0]?.url
                      : ""
                  }
                  alt=""
                />
              </div>
              <div className="flex flex-col justify-center">
                <div className="flex flex-row gap-3">
                  <span className="font-semibold inline-flex gap-1 items-center">
                    {playingSong?.track?.title}{" "}
                    {playingSong?.track?.isExplicit ? <MdExplicit /> : null}
                  </span>
                </div>
                <div>
                  <span className="font-normal">
                    {playingSong?.track?.artists?.map(
                      (artist: any, index: number) => (
                        <span>{(index ? ", " : "") + artist?.name}</span>
                      )
                    )}
                  </span>
                </div>
              </div>
            </div>
            <div className="w-2/5">
              <AudioPlayer
                autoPlay
                showSkipControls
                src={playingSong?.url}
                onEnded={handleEnd}
                onClickNext={handleClickNext}
                onClickPrevious={handleClickPrevious}
                className="outline-none"
                customIcons={{
                  forward: <FastForward24Filled />,
                  rewind: <Rewind24Filled />,
                  play: <Play24Filled />,
                  pause: <Pause24Filled />,
                  next: <BsSkipEndFill className="w-7" />,
                  previous: <BsSkipStartFill className="w-7" />,
                  volume: (
                    <img
                      draggable={false}
                      src="/icons/fluent_speaker-2-24-filled.svg"
                    />
                  ),
                  volumeMute: (
                    <img
                      draggable={false}
                      src="/icons/fluent_speaker-mute-24-filled.svg"
                    />
                  ),
                  loop: (
                    <img
                      draggable={false}
                      src="/icons/fluent_arrow-repeat-all-24-filled.svg"
                    />
                  ),
                  loopOff: (
                    <img
                      draggable={false}
                      src="/icons/fluent_arrow-repeat-all-off-24-filled.svg"
                    />
                  ),
                }}
              />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default BAudioPlayer;
