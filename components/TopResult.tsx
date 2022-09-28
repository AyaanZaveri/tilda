import React from "react";
import Album from "./Album";
import Track from "./Track";
import Video from "./Video";

const TopResult = ({
  result,
  setCurrentSong,
}: {
  result: any;
  setCurrentSong: any;
}) => {
  return (
    <div>
      {result?.resultType == "album" ? (
        <Album album={result} />
      ) : result?.resultType == "song" ? (
        <Track setCurrentSong={setCurrentSong} track={result} />
      ) : result?.resultType == "video" ? (
        <Video video={result} setCurrentSong={setCurrentSong} />
      ) : null}
    </div>
  );
};

export default TopResult;
