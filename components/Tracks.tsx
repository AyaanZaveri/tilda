import React from "react";
import Track from "../components/Track";

interface Props {
  tracks: Object[];
}

const Tracks = ({ tracks }: Props) => {
  //   console.log(tracks)
  return (
    <div className="w-3/4 flex justify-center flex-col gap-2">
      {tracks?.map((track: any, index: number) => (
        <Track track={track} key={index} />
      ))}
    </div>
  );
};

export default Tracks;
