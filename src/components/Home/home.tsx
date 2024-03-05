import React from 'react';
import { Button } from '../ui/button';

export default function HomePage() {
  return (
    <div className="w-full flex flex-col min-h-screen gap-5 items-center justify-center px-20">
      <div className="w-[50rem] bg-white px-5 py-20 text-center rounded-2xl">
        <h2 className="text-2xl w-full bg-white text-pink-400 text-center font-semibold rounded-lg">
          Crypto Saves
        </h2>
        <span className="text-black italic font-medium">
          your personal crypto savings dapp
        </span>
        <div className="w-full flex flex-col items-center pt-10 justify-center gap-5">
          <Button className="w-[25rem]">Login</Button>
          <Button className="w-[25rem]">Create Account</Button>
        </div>
      </div>
    </div>
  );
}
