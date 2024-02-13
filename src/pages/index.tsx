import { RiFileCopyLine } from "react-icons/ri";
import { Navbar } from "@/components/Navbar";
import { Sections } from "@/components/Sections";
import Details from "@/components/Details";
import copy from "clipboard-copy";
import { Toaster } from "@/components/ui/toaster";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

export default function Home() {
  const { toast } = useToast();

  const handleCopyToClipboard = async (textToCopy: string) => {
    try {
      await copy(textToCopy);
      toast({
        description: "Successfully Copied Address",
        style: { backgroundColor: "green", color: "white" },
      });
    } catch (error) {
      console.error("Error copying to clipboard", error);
    }
  };

  return (
    <div className="w-full flex flex-col min-h-screen bg-pink-50">
      <Navbar />
      <div className="px-16 w-full">
        <div className=" px-4 py-5 bg-white rounded-md flex flex-row gap-2 w-full">
          <span className="text-lg font-medium">
            Owner's Address:{" "}
            <span className="font-normal text-base">
              0x000000000000000000000000000000
            </span>{" "}
          </span>
          <div
            className="bg-pink-200 p-2 rounded-md cursor-pointer hover:text-white hover:bg-pink-400"
            title="copy address"
            onClick={() => handleCopyToClipboard("djdj")}
          >
            <RiFileCopyLine />
          </div>
        </div>
      </div>
      <Details />
      <Sections />
      <Toaster />
    </div>
  );
}
