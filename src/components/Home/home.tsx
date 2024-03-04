import React from 'react';
import { Button } from '../ui/button';

export default function home() {
  return (
    <div className="w-full flex flex-col gap-5 items-center justify-center">
      <h2 className="text-xl bg-white p-5 text-pink-400 font-semibold">
        Crypto Saves
      </h2>
      <span className="text-white italic font-medium">
        personal savings dapp
      </span>
      <div>
        <Button>Login</Button>
        <Button>Create Account</Button>
      </div>
    </div>
  );
}
