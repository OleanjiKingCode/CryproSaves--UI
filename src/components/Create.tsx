import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogPortal,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
// import * as Dialog from '@radix-ui/react-dialog';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DialogClose } from "@radix-ui/react-dialog";
import { RiCloseLine } from "react-icons/ri";

export const Create = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  return (
    <Dialog open={isOpen} modal onOpenChange={onClose}>
      <DialogOverlay className="z-50 relative grid w-full max-w-lg gap-4 bg-white p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-lg md:w-full" />
      <DialogContent className="text-black bg-white outline-none">
        <DialogHeader>
          <DialogTitle>Create Save</DialogTitle>
        </DialogHeader>
        <div className="grid gap-5 py-4">
          <div className="grid grid-cols-5 items-center gap-4">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              placeholder="Oleanji"
              className="col-span-2 border-[2px] border-gray-500"
            />
          </div>
          <div className="grid grid-cols-5 items-center gap-4">
            <Label htmlFor="username">Amount</Label>
            <Input
              id="username"
              placeholder="10.01"
              className="col-span-3 border-[2px] border-gray-500"
            />
            <Button className="bg-blue-400 font-medium px-7">MAX</Button>
          </div>
          <div className="grid grid-cols-5 items-center gap-4">
            <Label htmlFor="days">Lock Days</Label>
            <Input
              id="days"
              type="number"
              placeholder="300"
              className="col-span-3 border-[2px] border-gray-500 outline-none focus:outline-none"
            />
          </div>
        </div>
        <DialogFooter className="flex flex-row items-center " onClick={onClose}>
          <Button className="bg-red-400 font-medium px-7">Close</Button>
          <Button type="submit" className="bg-green-400 font-medium px-7">
            Lock
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
