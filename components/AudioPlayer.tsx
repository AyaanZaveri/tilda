import React, { useState, useRef, useEffect } from "react";
import styles from "../styles/AudioPlayer.module.css";
import { BsArrowLeftShort } from "react-icons/bs";
import { BsArrowRightShort } from "react-icons/bs";
import { PlayIcon, PauseIcon } from "@heroicons/react/24/solid";
import { MdExplicit } from "react-icons/md";
import { CgSpinner } from "react-icons/cg";
import { titleCase } from "title-case";

const AudioPlayer = ({ currentSong }: { currentSong: any }) => {
  // state
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  // references
  const audioPlayer = useRef<any>(); // reference our audio component
  const progressBar = useRef<any>(); // reference our progress bar
  const animationRef = useRef<any>(); // reference the animation

  useEffect(() => {
    const seconds = Math.floor(audioPlayer.current.duration);
    setDuration(seconds);
    progressBar.current.max = seconds;
  }, [
    audioPlayer?.current?.loadedmetadata,
    audioPlayer?.current?.readyState,
    currentSong,
  ]);

  const calculateTime = (secs: number) => {
    const minutes = Math.floor(secs / 60);
    const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const seconds = Math.floor(secs % 60);
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${returnedMinutes}:${returnedSeconds}`;
  };

  const togglePlayPause = () => {
    const prevValue = isPlaying;
    setIsPlaying(!prevValue);
    if (!prevValue) {
      audioPlayer.current.play();
      animationRef.current = requestAnimationFrame(whilePlaying);
    } else {
      audioPlayer.current.pause();
      cancelAnimationFrame(animationRef.current);
    }
  };

  useEffect(() => {
    if (currentSong) {
      setIsPlaying(true);
      audioPlayer.current.play();
      whilePlaying();
    }
  }, [currentSong]);

  const whilePlaying = () => {
    progressBar.current.value = audioPlayer.current.currentTime;
    changePlayerCurrentTime();
    animationRef.current = requestAnimationFrame(whilePlaying);
  };

  const changeRange = () => {
    audioPlayer.current.currentTime = progressBar?.current.value;
    changePlayerCurrentTime();
  };

  const changePlayerCurrentTime = () => {
    progressBar.current.style.setProperty(
      "--seek-before-width",
      `${(progressBar?.current.value / duration) * 100}%`
    );
    setCurrentTime(progressBar?.current.value);
  };

  return (
    <div className={"flex flex-row justify-center items-center w-full p-5"}>
      <audio ref={audioPlayer} src={currentSong?.url}></audio>
      <div className="flex flex-row justify-center items-center w-full gap-5 relative">
        <div className="flex flex-row gap-3 text-sm text-slate-700 absolute left-0">
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
        <div className="flex flex-row items-center justify-center w-full">
          <button
            onClick={togglePlayPause}
            className="bg-indigo-500 outline-none hover:bg-indigo-600 active:bg-indigo-700 transition-all ease-in-out duration-300 w-10 h-max p-3 flex justify-center items-center text-white rounded-full"
          >
            {isPlaying ? <PauseIcon /> : <PlayIcon />}
          </button>

          <div className="currentTime">{calculateTime(currentTime)}</div>

          <div className="w-1/3 flex">
            <input
              type="range"
              className="progressBar"
              defaultValue="0"
              ref={progressBar}
              onChange={changeRange}
            />
          </div>

          <div className="duration">
            {duration && !isNaN(duration) ? (
              calculateTime(duration)
            ) : (
              <CgSpinner className="text-indigo-500 w-4 h-4 animate-spin" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
