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
import { useEffect, useState } from "react";
// Jellyfin SDK
import { Jellyfin } from "@jellyfin/sdk";
import { getItemsApi } from "@jellyfin/sdk/lib/utils/api/items-api";
import { getArtistsApi } from "@jellyfin/sdk/lib/utils/api/artists-api";
import { ItemFields } from "@jellyfin/sdk/lib/generated-client/models/item-fields.js";
import Artist from "../components/Jellyfin/Artist";
import Album from "../components/Jellyfin/Album";

const Home: NextPage = () => {
  const [serverUrl, setServerUrl] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [api, setApi] = useState<any>();
  const [user, setUser] = useState<any>(null);

  const [artists, setArtists] = useState<any>(null);
  const [albums, setAlbums] = useState<any>(null);

  const handleJellyfin = async () => {
    if (!serverUrl && !userName && !password) return;
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
    const capi = jellyfin.createApi(serverUrl);
    const auth = await capi.authenticateUserByName(userName, password);
    setUser(auth.data.User);

    setApi(capi);
  };

  useEffect(() => {
    handleJellyfin();
  }, [serverUrl]);

  const getJellyfinData = async () => {
    if (api) {
      const artistsData: any = await getArtistsApi(api).getArtists({
        userId: user?.Id,
      });

      setArtists(artistsData.data.Items);

      const items: any = await getItemsApi(api).getItemsByUserId({
        userId: user.Id,
        sortBy: "SortName" as any,
        sortOrder: "Ascending" as any,
        recursive: true,
        excludeLocationTypes: "Virtual" as any,
        includeItemTypes: "MusicAlbum" as any,
      });

      setAlbums(items.data.Items);
    } else {
      console.log("no api, haha you suck lol");
    }
  };

  useEffect(() => {
    getJellyfinData();
  }, [user]);

  console.log(serverUrl);

  return (
    <div className="ml-3 pl-64 pr-12">
      <div className="pt-[4.5rem] pb-8">
        <div className="pt-6">
          {/* create an input that changes the serverUrl */}
          <input
            type="text"
            className="text-black bg-gray-200 rounded-md p-2 w-96"
            value={serverUrl}
            placeholder="Server URL"
            onChange={(e) => setServerUrl(e.target.value)}
          />
          <input
            type="text"
            className="text-black bg-gray-200 rounded-md p-2 w-96"
            value={userName}
            placeholder="Username"
            onChange={(e) => setUserName(e.target.value)}
          />
          <input
            type="text"
            className="text-black bg-gray-200 rounded-md p-2 w-96"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <h1 className="text-3xl font-semibold">Artists & Albums</h1>
          {/* <div className="flex flex-row flex-wrap gap-x-8 gap-y-2 pt-4">
            {artists?.map((artist: any) => (
              <Artist artist={artist} />
            ))}
          </div> */}
          <div className="flex flex-row flex-wrap gap-x-8 gap-y-2 pt-4">
            {albums?.map((album: any) => (
              <Album album={album} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
