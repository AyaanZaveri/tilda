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
import { currentTrackIdState, isPlayingState } from "../atoms/songAtom";
import { useRecoilState } from "recoil";

const BAudioPlayer = (currentSong?: any, thumbnail?: any) => {
  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState);

  return (
    <div>
      {currentTrackId?.url?.length > 0 ? (
        <div className="fixed bottom-0 w-full justify-center flex items-center bg-slate-900/75 backdrop-blur-md h-20">
          {/* <AudioPlayer currentTrackId={currentTrackId} /> */}
          <div className="flex flex-row gap-3 items-center text-sm text-white w-full justify-center">
            <div className="absolute left-0 flex flex-row gap-3 pl-4">
              <div className="relative flex justify-center items-center overflow-hidden rounded-md group transition-all">
                <img
                  className="w-[3rem]"
                  src={
                    thumbnail.length?.url > 3
                      ? thumbnail?.url
                      : currentTrackId?.track?.thumbnails[0]?.url
                  }
                  alt=""
                />
              </div>
              <div className="flex flex-col justify-center">
                <div className="flex flex-row gap-3">
                  {/* <Marquee gradient={false}> */}
                  <span className="font-semibold inline-flex gap-1 items-center">
                    {currentTrackId?.track?.title}{" "}
                    {currentTrackId?.track?.isExplicit ? <MdExplicit /> : null}
                  </span>
                  {/* </Marquee> */}
                </div>
                <div>
                  <span className="font-normal">
                    {currentTrackId?.track?.artists.map(
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
                src={currentTrackId?.url}
                customIcons={{
                  forward: <HiFastForward />,
                  rewind: <HiRewind />,
                  play: <HiPlay />,
                  pause: <HiPause />,
                  volume: <HiVolumeUp />,
                  volumeMute: <HiVolumeOff />,
                  loop: (
                    <img src="/icons/fluent_arrow-repeat-all-24-filled.svg" />
                  ),
                  loopOff: (
                    <img src="/icons/fluent_arrow-repeat-all-off-24-filled.svg" />
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
