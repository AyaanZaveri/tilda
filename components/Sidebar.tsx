import { useRouter } from "next/router";
import React from "react";

const Sidebar = () => {
  const router = useRouter();

  return (
    <div className="flex items-center justify-center ml-3 h-full rounded-xl w-56 fixed">
      <div className="bg-slate-800 rounded-xl w-56 h-[97vh]">
        <img
          src="/TildaLogo.svg"
          className="p-4 h-16 hover:cursor-pointer select-none"
          alt=""
          onClick={() => router.push("/")}
        />
      </div>
    </div>
  );
};

export default Sidebar;
