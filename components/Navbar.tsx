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
        .get(`https://inv.riverside.rocks/api/v1/search/suggestions?q=${query}`)
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

  console.log(showSuggestions);

  return (
    <div className="fixed w-full z-10">
      <div className="flex items-center justify-center flex-col">
        <div className="bg-white/75 backdrop-blur-md relative w-full h-16 flex items-center justify-center flex-row">
          <img
            draggable="false"
            onClick={() => router.push("/")}
            src="/TildaLogo.svg"
            className="p-4 h-16 hover:cursor-pointer select-none absolute left-0"
            alt=""
          />
          <div className="relative rounded-md shadow-sm w-6/12">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <HiOutlineSearch className="text-gray-500 sm:text-sm" />
            </div>
            <form onSubmit={(e) => handleSearch(e)}>
              <input
                className="focus:ring-indigo-200 focus:ring focus:border-indigo-500 border active:bg-slate-50 w-full pl-8 pr-12 sm:text-sm border-slate-300 rounded-md transition ease-in-out duration-300"
                type="text"
                placeholder="Search"
                onChange={(e) => setSearch(e.target.value)}
              />
            </form>
          </div>
        </div>
        <div ref={searchSuggestionsRef} className={`w-6/12`}>
          {searchRes && showSuggestions ? (
            <div className="flex flex-col w-full py-2 gap-1 rounded-lg border border-slate-300 select-none bg-white shadow-sm shadow-slate-100 overflow-hidden">
              {searchRes?.suggestions
                ?.slice(0, 8)
                ?.map((track: any, index: any) => (
                  <div
                    onClick={() => {
                      setShowSuggestions(false);
                      router.push(`/search?q=${track}`);
                    }}
                    key={index}
                  >
                    <span className="inline-flex w-full text-sm hover:bg-indigo-50 py-2 px-4 cursor-pointer transition active:bg-indigo-100">
                      {track}
                    </span>
                  </div>
                ))}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
