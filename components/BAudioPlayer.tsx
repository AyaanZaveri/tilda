import React, { useEffect } from "react";
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

const BAudioPlayer = () => {
  const [currentTrack, setCurrentTrack] = useRecoilState(currentTrackState);
  console.log(currentTrack.track);

  return (
    <div className="z-20 select-none">
      {currentTrack?.url?.length > 0 ? (
        <div className="fixed bottom-0 w-full justify-center flex items-center bg-gradient-to-b from-slate-900/75 to-sky-900/40 backdrop-blur-md h-20">
          <div className="flex flex-row gap-3 items-center text-sm text-white w-full justify-center">
            <div className="absolute left-0 flex flex-row gap-3 pl-4">
              <div className="relative flex justify-center items-center overflow-hidden rounded-md group transition-all">
                <img
                  draggable={false}
                  className="w-[3rem]"
                  src={
                    currentTrack?.track?.thumbnails
                      ? currentTrack?.track?.thumbnails[0]?.url
                      : currentTrack?.thumbnails
                      ? currentTrack?.thumbnails[0]?.url
                      : ""
                  }
                  alt=""
                />
              </div>
              <div className="flex flex-col justify-center">
                <div className="flex flex-row gap-3">
                  <span className="font-semibold inline-flex gap-1 items-center">
                    {currentTrack?.track?.title}{" "}
                    {currentTrack?.track?.isExplicit ? <MdExplicit /> : null}
                  </span>
                </div>
                <div>
                  <span className="font-normal">
                    {currentTrack?.track?.artists.map(
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
                src={currentTrack?.url}
                className="outline-none"
                customIcons={{
                  forward: <FastForward24Filled />,
                  rewind: <Rewind24Filled />,
                  play: <Play24Filled />,
                  pause: <Pause24Filled />,
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
