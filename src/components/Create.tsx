import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { FaLock } from 'react-icons/fa';

export const Create = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  return (
    <Dialog open={isOpen} modal onOpenChange={onClose}>
      <DialogContent className="text-black bg-white outline-none">
        <DialogHeader>
          <DialogTitle>Create Save</DialogTitle>
        </DialogHeader>
        <div className="">
          <div className="grid grid-cols-5 gap-5 py-4">
            <div className="grid col-span-3 gap-3 ">
              <div className="grid grid-cols-3 gap-4 col-span-3 items-center">
                <Label htmlFor="name" className="col-span-1">
                  Name
                </Label>
                <Input
                  id="name"
                  placeholder="Oleanji"
                  className="border-[2px] border-gray-500 col-span-2 focus-visible:ring-0"
                />
              </div>
              <div className="grid grid-cols-3 gap-4 col-span-3 items-center">
                <Label htmlFor="days" className="col-span-1">
                  Lock Months
                </Label>
                <Input
                  id="days"
                  type="number"
                  placeholder="300"
                  className="col-span-2 border-[2px] border-gray-500 outline-none focus-visible:ring-0"
                />
              </div>
              <div className="grid grid-cols-3 gap-4 col-span-3 items-center">
                <Label htmlFor="days" className="col-span-1">
                  Lock Type
                </Label>
                <Input
                  id="days"
                  type="text"
                  placeholder="Pet"
                  className="col-span-2 border-[2px] border-gray-500 outline-none focus-visible:ring-0"
                />
              </div>
            </div>

            <div className="bg-green-200 rounded-md items-center w-full flex justify-center shadow-md py-10 col-span-2 ">
              <FaLock className="mr-2 h-14 w-14 text-green-600 " />
            </div>
          </div>

          <div className="grid grid-cols-5 items-center gap-4">
            <Label htmlFor="username">Amount</Label>
            <Input
              id="username"
              placeholder="10.01"
              className="col-span-3 border-[2px] border-gray-500 focus-visible:ring-0"
            />
            <Button className="bg-blue-400 font-medium px-7">max</Button>
          </div>
        </div>
        <DialogFooter
          className="flex flex-row items-center justify-between md:justify-end "
          onClick={onClose}
        >
          <Button className="bg-red-400 font-medium px-7">Close</Button>
          <Button type="submit" className="bg-green-400 font-medium px-7">
            Lock
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
