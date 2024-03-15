import { Button } from '../ui/button';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="w-full flex flex-col min-h-screen gap-5 items-center justify-center px-3 md:px-20">
      <div className="w-[80%] bg-white px-5 py-20 text-center rounded-2xl">
        <h2 className="text-2xl w-full bg-white text-pink-400 text-center font-semibold rounded-lg">
          Crypto Saves
        </h2>
        <span className="text-black italic font-medium">
          your personal crypto savings dapp
        </span>
        <div className="w-full flex flex-col items-center pt-10 justify-center gap-5">
          <Link href="/main" className="w-full">
            <Button className="w-[80%] md:w-[25rem]  bg-pink-200 hover:bg-pink-500 rounded-md shadow-md font-semibold text-black">
              Login
            </Button>
          </Link>
          <Link href="/setup" className="w-full">
            <Button className="w-[80%] md:w-[25rem]  bg-pink-200 hover:bg-pink-500 rounded-md shadow-md font-semibold text-black">
              Create Account
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
