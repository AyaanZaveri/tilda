import React from "react";
import Album from "./Album";
import Artist from "./Artist";
import Track from "./Track";
import Video from "./Video";

const TopResult = ({ result }: { result: any }) => {
  return (
    <div>
      {result?.resultType == "album" ? (
        <Album album={result} />
      ) : result?.resultType == "song" ? (
        <Track track={result} />
      ) : result?.resultType == "video" ? (
        <Video video={result} />
      ) : result?.resultType == "artist" ? (
        <Artist artist={result} />
      ) : null}
    </div>
  );
};

export default TopResult;
