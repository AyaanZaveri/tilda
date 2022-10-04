import { useRouter } from "next/router";
import React from "react";
import { HomeIcon } from '@heroicons/react/24/solid'

const Sidebar = () => {
  const router = useRouter();

  return (
    <div className="flex items-center ml-3 h-full rounded-xl w-56 fixed">
      <div className="bg-slate-800 rounded-xl w-56 h-[97vh] flex flex-col justify-start items-start">
        <img
          src="/TildaLogo.svg"
          className="p-4 h-16 hover:cursor-pointer select-none"
          alt=""
          onClick={() => router.push("/")}
        />
        <div className="px-2 pt-2 w-full">
          <div className="relative inline-flex w-full items-center justify-between break-all rounded-md hover:bg-sky-800 p-1 px-3 transition duration-500 ease-in-out hover:cursor-pointer active:bg-sky-900">
            <span className="text-white inline-flex gap-2 items-center">
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
