import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { HiOutlineSearch } from "react-icons/hi";
import { apiUrl } from "../utils/apiUrl";
import { useRouter } from "next/router";

const Navbar = () => {
  const [search, setSearch] = useState<string>("");
  const [searchRes, setSearchRes] = useState<any>();
  const [showSuggestions, setShowSuggestions] = useState<any>(false);

  const searchSuggestionsRef = useRef<any>();

  // console.log(search);

  const getSearchSuggestions = (query: string) => {
    if (query.length > 2) {
      axios
        .get(`https://pipedapi.kavin.rocks/suggestions/?query=${query}`)
        .then((res: any) => {
          setSearchRes(res.data);
        })
        .catch((err: any) => console.log(err));
    } else {
      setSearchRes("");
    }
  };

  const router = useRouter();

  const handleSearch = (e: any) => {
    e.preventDefault();
    setShowSuggestions(false);
    router.push(`/search?q=${search}`);
  };

  useEffect(() => {
    if (search) {
      getSearchSuggestions(search);
      setShowSuggestions(true);
    }
  }, [search]);

  useEffect(() => {
    document.addEventListener("mousedown", (event) => {
      if (!searchSuggestionsRef?.current?.contains(event.target)) {
        setShowSuggestions(false);
      }
    });
  }, []);

  // console.log(showSuggestions);

  return (
    <div className="fixed w-full z-10 ml-3">
      <div className="flex flex-col">
        <div className="bg-slate-900/50 backdrop-blur-md relative w-full h-[4.5rem] flex items-center flex-row pl-64">
          <img
            draggable="false"
            onClick={() => router.push("/")}
            src="/TildaLogo.svg"
            className="h-16 py-4 pl-2 hover:cursor-pointer select-none absolute left-0"
            alt=""
          />
          <div className="relative rounded-md shadow-sm w-6/12">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <HiOutlineSearch className="text-slate-100 sm:text-sm" />
            </div>
            <form onSubmit={(e) => handleSearch(e)}>
              <input
                className="focus:ring-sky-400/90 hover:shadow-sky-500/20 shadow-2xl shadow-sky-500/10 text-white bg-slate-800 placeholder:text-slate-100 focus:ring focus:border-sky-700 border active:bg-slate-900 w-full pl-8 pr-12 sm:text-sm border-slate-700 rounded-md transition ease-in-out duration-300"
                type="text"
                placeholder="Search"
                onChange={(e) => setSearch(e.target.value)}
              />
            </form>
          </div>
        </div>
        <div className="pl-64">
          <div ref={searchSuggestionsRef} className="w-6/12">
            {searchRes && showSuggestions ? (
              <div className="flex flex-col shadow-2xl shadow-sky-500/5 w-full py-2 gap-1 rounded-lg border border-slate-700/50 select-none bg-slate-800/90 backdrop-blur-md text-white overflow-hidden">
                {searchRes?.slice(0, 8)?.map((track: any, index: any) => (
                  <div
                    onClick={() => {
                      setShowSuggestions(false);
                      router.push(`/search?q=${track}`);
                    }}
                    key={index}
                  >
                    <span className="inline-flex w-full text-sm hover:bg-sky-500 active:bg-sky-600 hover:shadow-xl hover:shadow-sky-500/10 py-2 px-4 cursor-pointer transition">
                      {track}
                    </span>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
