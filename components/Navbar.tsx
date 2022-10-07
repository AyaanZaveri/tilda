import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { HiOutlineSearch } from "react-icons/hi";
import { pipedApiUrl, tildaApiUrl } from "../utils/apiUrl";
import { useRouter } from "next/router";
import {
  ComputerDesktopIcon,
  MoonIcon,
  SunIcon,
} from "@heroicons/react/24/solid";
import { useRecoilState } from "recoil";
import { currentThemeState } from "../atoms/themeAtom";
import { useTheme } from "next-themes";

const Navbar = () => {
  const [search, setSearch] = useState<string>("");
  const [searchRes, setSearchRes] = useState<any>();
  const [showSuggestions, setShowSuggestions] = useState<any>(false);
  const [mounted, setMounted] = useState(false);
  // const [theme, setTheme] = useRecoilState(currentThemeState);

  const searchSuggestionsRef = useRef<any>();

  // useEffect(() => {
  //   window
  //     .matchMedia("(prefers-color-scheme: dark)")
  //     .addEventListener("change", (event) => {
  //       const colorScheme = event.matches ? "dark" : "light";
  //       setColorTheme(colorScheme);
  //     });
  // }, []);

  const getSearchSuggestions = (query: string) => {
    if (query.length > 2) {
      axios
        .get(`${pipedApiUrl}/suggestions/?query=${query}`)
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

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const { theme, setTheme, resolvedTheme } = useTheme();

  console.log(resolvedTheme);

  return (
    <div className="fixed w-full z-10 px-3">
      <div className="flex flex-col">
        <div className="bg-white/75 relative dark:bg-slate-900/50 backdrop-blur-md w-full h-[4.5rem] flex items-center flex-row pl-64">
          <img
            draggable="false"
            onClick={() => router.push("/")}
            src={`${
              resolvedTheme == "dark"
                ? "/TildaLogoDark.svg"
                : resolvedTheme == "light"
                ? "/TildaLogoLight.svg"
                : "/TildaLogoLight.svg"
            }`}
            className="h-16 py-4 block pl-2 hover:cursor-pointer select-none absolute left-0"
            alt=""
          />
          <div className="relative rounded-md shadow-sm w-6/12">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <HiOutlineSearch className="text-gray-500 dark:text-slate-100 sm:text-sm" />
            </div>
            <form onSubmit={(e) => handleSearch(e)}>
              <input
                className="focus:ring-sky-200 border-none bg-slate-100 active:bg-slate-100 focus:ring focus:border-sky-500 dark:focus:ring-sky-400/90 hover:shadow-sky-500/50 shadow-2xl shadow-sky-500/30 dark:text-white dark:bg-slate-800 dark:placeholder:text-slate-100 dark:focus:border-sky-700 dark:active:bg-slate-900 w-full pl-8 pr-12 sm:text-sm rounded-md transition ease-in-out duration-300"
                type="text"
                placeholder="Search"
                onChange={(e) => setSearch(e.target.value)}
              />
            </form>
          </div>
          <button
            onClick={() =>
              theme == "light"
                ? setTheme("dark")
                : theme == "dark"
                ? setTheme("system")
                : theme == "system"
                ? setTheme("light")
                : ""
            }
            className={`absolute right-0 m-3 mr-4 w-10 h-10 ${
              resolvedTheme == "light"
                ? "bg-slate-100 hover:bg-slate-200 active:bg-slate-300"
                : resolvedTheme == "dark"
                ? "bg-slate-800 hover:bg-slate-700 active:bg-slate-600"
                : "bg-slate-100 hover:bg-slate-200 active:bg-slate-300"
            } transition ease-in-out duration-300 rounded-full`}
          >
            {theme == "light" ? (
              <SunIcon className="h-full p-2 w-full text-slate-700" />
            ) : theme == "dark" ? (
              <MoonIcon className="h-full p-3 w-full text-white" />
            ) : theme == "system" ? (
              <ComputerDesktopIcon
                className={`h-full p-2 w-full ${
                  resolvedTheme == "light"
                    ? "text-slate-700"
                    : resolvedTheme == "dark"
                    ? "text-white"
                    : "text-slate-700"
                }`}
              />
            ) : (
              ""
            )}
          </button>
        </div>
        <div className="pl-64">
          <div ref={searchSuggestionsRef} className="w-6/12">
            {searchRes && showSuggestions ? (
              <div className="flex flex-col shadow-2xl shadow-sky-500/5 w-full py-2 gap-1 rounded-lg select-none bg-slate-800/90 backdrop-blur-md text-white overflow-hidden">
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
