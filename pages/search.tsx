import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Tracks from "../components/Tracks";

const Search = () => {
  const { query } = useRouter();

  const [tracksSearch, setTracksSearch] = useState<any>();

  const getTracksSearch = () => {
    if (query.q) {
      axios
        .get(`https://tilda-api.ayaanzaveri.repl.co/search/tracks/${query.q}`)
        .then((res: any) => {
          setTracksSearch(res.data);
        })
        .catch((err: any) => console.log(err));
    }
  };

  useEffect(() => {
    getTracksSearch();
  }, [query.q]);

  console.log(tracksSearch);

  return (
    <div>
      <Navbar />
      <div className="pt-16">
        <div className="flex justify-center pt-2">
          <Tracks tracks={tracksSearch} />
        </div>
      </div>
    </div>
  );
};

export default Search;
