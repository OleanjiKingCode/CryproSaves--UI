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
import { RiMoneyDollarCircleFill, RiTimer2Fill } from "react-icons/ri";

export const Details = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  return (
    <Dialog open={isOpen} modal onOpenChange={onClose}>
      <DialogContent className="text-black bg-white outline-none">
        <DialogHeader className="text-center flex items-center">
          <DialogTitle>Save Details</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4 py-4 items-center justify-center">
          <div className="flex flex-row w-[80%] justify-between items-center gap-4">
            <Label htmlFor="name" className="">
              Name
            </Label>
            <div className="py-1 px-2 bg-gray-400 flex items-center w-[50%] rounded-md  col-span-3">
              <span className="font-semibold text-black text-sm">
                Name Of Save
              </span>
            </div>
          </div>
          <div className="flex flex-row w-[80%] justify-between items-center gap-4">
            <Label htmlFor="name" className="">
              Amount Locked
            </Label>
            <div className="py-1 px-2 bg-green-200 flex items-center w-[50%] rounded-md   col-span-3">
              <RiMoneyDollarCircleFill className="mr-2 h-4 w-4 text-green-800 " />
              <span className="font-semibold text-black text-sm">300Eth</span>
            </div>
          </div>
          <div className="flex flex-row w-[80%] justify-between items-center gap-4">
            <Label htmlFor="name" className="">
              Lock Time
            </Label>
            <div className="py-1 px-2 bg-blue-200 flex items-center w-[50%] rounded-md  col-span-3">
              <RiTimer2Fill className="mr-2 h-4 w-4 text-blue-800 " />
              <span className="font-semibold text-black text-sm">400 Days</span>
            </div>
          </div>
          <div className="flex flex-row w-[80%] justify-between items-center gap-4">
            <Label htmlFor="name" className="">
              Status
            </Label>
            <div className="py-1 px-2 bg-red-100 flex items-center  w-[50%] rounded-md  col-span-3">
              <ImCancelCircle className="mr-2 h-4 w-4 text-red-800 " />
              <span className="font-semibold text-black text-sm">Locked</span>
            </div>
          </div>
        </div>
        <DialogFooter className="flex flex-row items-center " onClick={onClose}>
          <Button
            type="submit"
            className="bg-red-400 font-medium px-7"
            disabled
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
