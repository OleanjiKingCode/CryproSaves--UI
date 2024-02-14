import { RiFileCopyLine } from "react-icons/ri";
import { Navbar } from "@/components/Navbar";
import { Sections } from "@/components/Sections";
import { Details } from "@/components/Details";
import copy from "clipboard-copy";
import { Toaster } from "@/components/ui/toaster";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { IoCopy, IoCopyOutline } from "react-icons/io5";
import { Button } from "@/components/ui/button";
import { FaLock } from "react-icons/fa";
import {
  AlertDialogHeader,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from "@radix-ui/react-alert-dialog";

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
      <Details />

      <div className="px-16 w-full py-5">
        <div className=" px-4 py-5 bg-white rounded-md flex flex-row items-center gap-2 w-full">
          <span className="text-lg font-medium">
            Owner's Address:{" "}
            <span className="font-normal text-base">
              0x000000000000000000000000000000
            </span>{" "}
          </span>
          <Button
            className="bg-red-200 rounded-md shadow-md"
            onClick={() => handleCopyToClipboard("djdj")}
            title="copy address"
          >
            <IoCopy className="mr-2 h-4 w-4 text-red-500" />
            Copy
          </Button>
        </div>
      </div>

      <Sections />

      <Toaster />
    </div>
  );
}
