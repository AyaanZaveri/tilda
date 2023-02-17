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
import { useEffect } from "react";
// Jellyfin SDK
import { Jellyfin } from '@jellyfin/sdk';
import { getItemsApi } from '@jellyfin/sdk/lib/utils/api/items-api.js';
import { ItemFields } from '@jellyfin/sdk/lib/generated-client/models/item-fields.js';

const Home: NextPage = () => {

  (async () => {
    const jellyfin = new Jellyfin({
      clientInfo: {
        name: "My Client Application",
        version: "1.0.0",
      },
      deviceInfo: {
        name: "Device Name",
        id: "unique-device-id",
      },
    });
    const api = jellyfin.createApi('https://revised-tribunal-telephony-arise.trycloudflare.com');
    const auth = await api.authenticateUserByName('abc', 'abc');
    const user: any = auth.data.User;
  
    const items: any = await getItemsApi(api).getItemsByUserId({
      userId: user?.Id,
      fields: [ ItemFields.Path ],
      recursive: true
    });
  
    items.data.Items.forEach((item: any) => {
      console.log(item)
      // console.log(`${item.Id}\t${item.Name}\t${item.Path}`);
    });

    console.log(items)
  })();

  return <div></div>;
};

export default Home;
