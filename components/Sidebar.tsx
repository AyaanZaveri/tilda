import { useRouter } from "next/router";
import React from "react";
import { HomeIcon } from "@heroicons/react/24/solid";

const Sidebar = () => {
  const router = useRouter();

  return (
    <div className="flex items-center ml-3 h-full rounded-xl w-56 fixed">
      <div className="bg-slate-800 rounded-xl w-56 h-[97vh] flex flex-col justify-start items-start shadow-2xl shadow-sky-500/5">
        <img
          src="/TildaLogo.svg"
          className="p-4 h-16 hover:cursor-pointer select-none"
          alt=""
          onClick={() => router.push("/")}
        />
        <div className="px-2 pt-2 w-full">
          <div className="relative inline-flex w-full text-white items-center hover:text-sky-400 active:text-sky-500 justify-between break-all rounded-md px-2 transition duration-300 ease-in-out hover:cursor-pointer">
            <span className="inline-flex gap-2 items-center">
              Home
              <HomeIcon className="w-4 h-4" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
