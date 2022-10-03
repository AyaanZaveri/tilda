import React from "react";
import Album from "./Album";
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
      ) : null}
    </div>
  );
};

export default TopResult;
