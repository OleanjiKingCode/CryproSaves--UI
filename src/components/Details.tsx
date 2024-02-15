import React from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
} from "@/components/ui/dialog";
import { FaLock } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ImCancelCircle } from "react-icons/im";
import { RiTimer2Fill } from "react-icons/ri";

export const Details = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  return (
    <Dialog open={isOpen} modal onOpenChange={onClose}>
      <DialogOverlay className="z-50 relative grid w-full max-w-lg gap-4 bg-white p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-lg md:w-full" />
      <DialogHeader>
        <DialogTitle>Save Details</DialogTitle>
      </DialogHeader>
      <DialogContent className="text-black bg-white outline-none">
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <div className="py-1 px-2 bg-gray-400 flex items-center rounded-md w-fit">
              <span className="font-semibold text-black text-sm">
                Name Of Save
              </span>
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Amount Locked
            </Label>
            <div className="py-1 px-2 bg-green-200 flex items-center rounded-md  w-fit">
              <ImCancelCircle className="mr-2 h-4 w-4 text-red-800 " />
              <span className="font-semibold text-black text-sm">300Eth</span>
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Lock Time
            </Label>
            <div className="py-1 px-2 bg-green-200 flex items-center rounded-md  w-fit">
              <RiTimer2Fill className="mr-2 h-4 w-4 text-red-800 " />
              <span className="font-semibold text-black text-sm">400 Days</span>
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Status
            </Label>
            <div className="py-1 px-2 bg-red-100 flex items-center rounded-md w-fit">
              <ImCancelCircle className="mr-2 h-4 w-4 text-red-800 " />
              <span className="font-semibold text-black text-sm">Locked</span>
            </div>
          </div>
        </div>
        <DialogFooter className="flex flex-row items-center " onClick={onClose}>
          <Button
            type="submit"
            className="bg-green-400 font-medium px-7"
            disabled
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
