import React from "react";
import { FaLock, FaUnlock } from "react-icons/fa";
import { RiTimer2Fill, RiTimerFlashFill } from "react-icons/ri";
import { TbListDetails } from "react-icons/tb";
import { Button } from "./ui/button";

export const LockedSaves = () => {
  return (
    <div className="bg-gray-50 flex flex-col items-center shadow-md justify-center gap-3 p-5 rounded-lg w-[300px]">
      <div className="bg-green-200 rounded-md items-center w-full flex justify-center shadow-md py-10 ">
        <FaLock className="mr-2 h-14 w-14 text-green-600 " />
      </div>
      <div className="w-full flex flex-col justify-center items-start gap-2">
        <span className="font-semibold">Name Of Save</span>
        <div className="py-1 px-1 bg-green-100 flex items-center rounded-md justify-end self-end">
          <RiTimer2Fill className="mr-2 h-4 w-4 text-green-800 " />
          <span className="font-semibold text-black text-sm">
            30d:16h:10m:34s
          </span>
        </div>
      </div>
      <div className="flex flex-row items-center justify-between w-full pt-5 ">
        <Button className="bg-blue-200 rounded-md shadow-md">
          <RiTimerFlashFill className="mr-2 h-4 w-4 text-blue-500 text-sm" />
          Increase Time
        </Button>
        <Button className="bg-green-200 rounded-md shadow-md text-sm">
          <TbListDetails className="mr-2 h-4 w-4 text-green-500 text-sm" />
          Details
        </Button>
      </div>
    </div>
  );
};

export const UnlockedSaves = () => {
  return (
    <div className="bg-gray-50 flex flex-col items-center justify-center gap-3 shadow-md p-5 rounded-lg w-[300px]">
      <div className="bg-red-200 rounded-md items-center w-full flex justify-center shadow-md py-10 ">
        <FaUnlock className="mr-2 h-14 w-14 text-red-600 " />
      </div>
      <div className="w-full flex flex-col justify-center items-start gap-2">
        <span className="font-semibold">Name Of Save</span>
        <div className="py-1 px-1 bg-green-100 flex items-center rounded-md justify-end self-end">
          <RiTimer2Fill className="mr-2 h-4 w-4 text-green-800 " />
          <span className="font-semibold text-black text-sm">Time Ended</span>
        </div>
      </div>
      <div className="flex flex-row items-center justify-between w-full pt-5 ">
        <Button className="bg-blue-200 rounded-md shadow-md text-sm">
          <TbListDetails className="mr-2 h-4 w-4 text-blue-500 text-sm" />
          Details
        </Button>
        <Button className="bg-green-200 rounded-md shadow-md">
          <FaUnlock className="mr-2 h-4 w-4 text-green-500 text-sm" />
          Unlock
        </Button>
      </div>
    </div>
  );
};