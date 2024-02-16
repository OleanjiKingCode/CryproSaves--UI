import React from "react";

export const Stats = () => {
  return (
    <div className="w-full flex flex-row gap-5 items-center justify-center lg:justify-between pt-4 px-5 sm:px-12 md:px-16 flex-wrap md:flex-nowrap">
      <div className="rounded-2xl py-7 px-5 md:w-[200px] sm:w-[170px] w-[150px] h-[150px] flex flex-col items-center justify-center text-center gap-4 bg-white cursor-pointer">
        <span className="text-2xl font-bold text-green-300 ">145</span>
        <span className="text-sm font-bold">Total Number Of Saves</span>
      </div>
      <div className="rounded-2xl  py-7 px-5 md:w-[200px] sm:w-[170px] w-[150px] h-[150px] flex flex-col items-center  justify-center text-center gap-4 bg-white cursor-pointer">
        <span className="text-2xl font-bold text-green-300 ">#19</span>
        <span className="text-sm font-bold">Total ETH Saved</span>
      </div>
      <div className="rounded-2xl  py-7 px-5 md:w-[200px] sm:w-[170px] w-[150px] h-[150px] flex flex-col items-center  justify-center text-center gap-4 bg-white cursor-pointer">
        <span className="text-2xl font-bold text-green-300 ">40</span>
        <span className="text-sm font-bold">Total Number Unlocked</span>
      </div>
      <div className="rounded-2xl  py-7 px-5 md:w-[200px] sm:w-[170px] w-[150px] h-[150px] flex flex-col items-center  justify-center text-center gap-4 bg-white cursor-pointer">
        <span className="text-2xl font-bold text-red-500 ">100</span>
        <span className="text-sm font-bold">Total Number Locked</span>
      </div>
    </div>
  );
};
