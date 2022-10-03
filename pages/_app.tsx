import "../styles/globals.scss";
import type { AppProps } from "next/app";
import Navbar from "../components/Navbar";
import Layout from "../components/Layout";
import { RecoilRoot, useRecoilState } from "recoil";
import { currentTrackState, isPlayingState } from "../atoms/songAtom";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <RecoilRoot>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </RecoilRoot>
    </div>
  );
}

export default MyApp;
