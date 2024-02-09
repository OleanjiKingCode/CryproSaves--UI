import React from "react";

export default function Details() {
  return (
    <div className="w-full flex flex-row gap-5 items-center justify-between pt-4 px-16 flex-wrap md:flex-nowrap">
      <div className="rounded-2xl py-7 px-5 w-[25%] flex flex-col items-center gap-4 bg-white">
        <span className="text-2xl font-semibold text-green-300 ">200,145</span>
        <span className="text-sm font-bold">Total Number Of Assets</span>
      </div>
      <div className="rounded-2xl  py-7 px-5 w-[25%] flex flex-col items-center gap-4 bg-white">
        <span className="text-2xl font-semibold text-green-300 ">
          #4,500,145
        </span>
        <span className="text-sm font-bold">Total Cost Of Assets</span>
      </div>
      <div className="rounded-2xl  py-7 px-5 w-[25%] flex flex-col items-center gap-4 bg-white">
        <span className="text-2xl font-semibold text-green-300 ">40,145</span>
        <span className="text-sm font-bold">
          Total Number Of Assets (In-use)
        </span>
      </div>
      <div className="rounded-2xl  py-7 px-5 w-[25%] flex flex-col items-center gap-4 bg-white">
        <span className="text-2xl font-semibold text-red-500 ">6,145</span>
        <span className="text-sm font-bold">
          Total Number Of Assets (Damaged)
        </span>
      </div>
    </div>
  );
}
