import React from "react";
import Track from "../components/Track";

interface Props {
  tracks: Object[];
}

const Tracks = ({ tracks }: Props) => {
  // console.log(tracks)
  return (
    <div className="w-3/4 flex justify-center flex-col gap-2">
      {tracks?.map((item: any) => (
        <Track track={item} />
      ))}
    </div>
  );
};

export default Tracks;
