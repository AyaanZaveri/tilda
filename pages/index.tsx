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

const Home: NextPage = () => {
  let currentSong = {
    url: "https://pp.mint.lgbt/videoplayback?expire=1664522465&ei=gUQ2Y_ruM9nUxN8P57ST2AI&ip=149.102.157.145&id=o-AJC9my866wUjB6PYPw4wD_3dIbJ7-JpfoGylBw05zX65&itag=140&source=youtube&requiressl=yes&mh=qC&mm=31%2C29&mn=sn-q0c7rn76%2Csn-q0cedn7s&ms=au%2Crdu&mv=m&mvi=5&pl=25&gcr=gb&initcwndbps=363750&spc=yR2vp0WcGUBBUTkQeV-IlCD_E8YMvmw&vprv=1&svpuc=1&mime=audio%2Fmp4&gir=yes&clen=2234304&dur=137.875&lmt=1616836020230245&mt=1664500427&fvip=5&keepalive=yes&fexp=24001373%2C24007246&c=ANDROID&txp=5532434&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cgcr%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Cgir%2Cclen%2Cdur%2Clmt&sig=AOq0QJ8wRAIgR-tJQidrq82OH6AX2WTZNQsCThs7g7woP7GjZi5BHuMCIDIaorwouaKBReabrzDBUt7zaEIzUBreJ53Rd_6sA8BT&lsparams=mh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Cinitcwndbps&lsig=AG3C_xAwRgIhAL3pSLMQYJyYQOw-gFq8C8Ge2IL8o6K4a-rqtR1V_WPiAiEAid1ZUbGaocZLuBunHFoKbkeWRDOi8VDhVmFn3LxWz0M%3D&cpn=Fm5EITThkPRgDJbe&host=rr5---sn-q0c7rn76.googlevideo.com",
    track: {
      album: {
        id: "MPREb_3Spu51guqVn",
        name: "MONTERO (Call Me By Your Name)",
      },
      artists: [
        {
          id: "UCCF_6PwrZf1u70yghKms3Mw",
          name: "Lil Nas X",
        },
      ],
      category: "Songs",
      duration: "2:18",
      duration_seconds: 138,
      feedbackTokens: {
        add: null,
        remove: null,
      },
      isExplicit: true,
      resultType: "song",
      thumbnails: [
        {
          height: 60,
          url: "https://lh3.googleusercontent.com/HDtFfZof0_WeQDeit5TCD9V75I9uG1rgRvh0r7U2qrsReNaA9A6qSkE2av5Ywf8mJ5pKea79y2WP5z05=w60-h60-l90-rj",
          width: 60,
        },
        {
          height: 120,
          url: "https://lh3.googleusercontent.com/HDtFfZof0_WeQDeit5TCD9V75I9uG1rgRvh0r7U2qrsReNaA9A6qSkE2av5Ywf8mJ5pKea79y2WP5z05=w120-h120-l90-rj",
          width: 120,
        },
      ],
      title: "MONTERO (Call Me By Your Name)",
      videoId: "oz0Oz5tBOg8",
      videoType: "MUSIC_VIDEO_TYPE_ATV",
      year: null,
    },
  };
  return (
    <div>
      {currentSong?.url?.length > 0 ? (
        <div className="fixed bottom-0 w-full justify-center flex items-center bg-slate-900/75 backdrop-blur-md h-20">
          {/* <AudioPlayer currentSong={currentSong} /> */}
          <div className="flex flex-row gap-3 items-center text-sm text-white w-full justify-center">
            <div className="absolute left-0 flex flex-row gap-3 pl-4">
              <div className="relative flex justify-center items-center overflow-hidden rounded-md group transition-all">
                <img
                  className="w-[3rem] h-[3rem]"
                  src={currentSong?.track?.thumbnails[0]?.url}
                  alt=""
                />
              </div>
              <div className="flex flex-col justify-center">
                <div className="flex flex-row gap-3">
                  {/* <Marquee gradient={false}> */}
                  <span className="font-semibold inline-flex gap-1 items-center">
                    {currentSong?.track?.title}{" "}
                    {currentSong?.track?.isExplicit ? <MdExplicit /> : null}
                  </span>
                  {/* </Marquee> */}
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

export default Home;
