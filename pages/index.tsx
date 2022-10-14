import type { NextPage } from "next";
import ReactAudioPlayer from "react-audio-player";
import {
  HiFastForward,
  HiPause,
  HiPlay,
  HiRewind,
  HiVolumeOff,
  HiVolumeUp,
} from "react-icons/hi";
import Navbar from "../components/Navbar";
import AudioPlayer from "react-h5-audio-player";
import { MdExplicit } from "react-icons/md";
import { useRecoilState } from "recoil";
import { currentTrackState } from "../atoms/songAtom";

const Home: NextPage = () => {
  return <div></div>;
};

export default Home;
