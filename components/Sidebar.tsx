import { useRouter } from "next/router";
import React from "react";
import { HomeIcon } from "@heroicons/react/24/solid";

const Sidebar = () => {
  const router = useRouter();

  return (
    <div className="flex items-center ml-3 h-full pt-[4.5rem] pb-3 rounded-xl w-56 fixed select-none">
      <div className="bg-slate-800 rounded-xl w-56 h-full flex flex-col justify-start items-start shadow-2xl shadow-sky-500/5">
        <div className="px-2 pt-4 w-full">
          <div className="relative inline-flex w-full text-white items-center hover:text-sky-300 active:text-sky-400 justify-between break-all rounded-md px-2 transition duration-300 ease-in-out hover:cursor-pointer">
            <span className="inline-flex gap-2 items-center">
              <HomeIcon className="w-4 h-4" />
              Home
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
