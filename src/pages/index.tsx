import Image from "next/image";
import { Inter } from "next/font/google";
import { Navbar } from "@/components/Navbar";
import { Sections } from "@/components/Sections";
import Details from "@/components/Details";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className="w-full flex flex-col min-h-screen bg-pink-50">
      <Navbar />
      <div className="px-10 py-5 ">
        <span>Owner: 0x000000000000000000000000000000 </span>
      </div>
      <Details />
      <Sections />
    </div>
  );
}
