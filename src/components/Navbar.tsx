import React from "react";

export const Navbar = () => {
  return (
    <div className="w-full flex flex-row justify-between px-5 items-center pt-3 pb-2 text-black">
      <div className="w-full flex flex-row justify-between px-5 items-center py-3 bg-white rounded-lg">
        <span className="font-semibold text-lg">Crypto Saves</span>
        <span>Connect Wallet</span>
      </div>
    </div>
  );
};
