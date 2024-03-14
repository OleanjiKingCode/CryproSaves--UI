import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { FaLock } from 'react-icons/fa';
import { ImCancelCircle } from 'react-icons/im';
import { RiMoneyDollarCircleFill, RiTimer2Fill } from 'react-icons/ri';
import { Input } from '@/components/ui/input';
import { calculateTimeLeft } from '@/utils/getTimer';

export const IncreaseTimeModal = ({
  data,
  isOpen,
  onClose,
}: {
  data: any;
  isOpen: boolean;
  onClose: () => void;
}) => {
  return (
    <Dialog open={isOpen} modal onOpenChange={onClose}>
      <DialogContent className="text-black bg-white outline-none">
        <DialogHeader className="text-center flex items-center">
          <DialogTitle>Unlock Save</DialogTitle>
        </DialogHeader>
        <div className="flex flex-row items-center justify-center gap-5 py-4 w-full">
          <span className="text-red-400 font-medium w-[63%]">
            <div className="flex flex-col gap-4 py-4">
              <div className="flex flex-row  items-center gap-4 justify-between ">
                <span className="text-sm">Name</span>
                <div className="py-1 px-2 bg-gray-400 flex items-center rounded-md w-[63%]  ">
                  <span className="font-semibold text-black text-sm">
                    {data.name}
                  </span>
                </div>
              </div>
              <div className="flex flex-row  items-center gap-4 justify-between">
                <span className="text-sm">Amt Locked</span>
                <div className="py-1 px-2 bg-green-200 flex items-center rounded-md  w-[63%]  ">
                  <RiMoneyDollarCircleFill className="mr-2 h-4 w-4 text-green-800 " />
                  <span className="font-semibold text-black text-sm">
                    {Number(data.amount)}
                  </span>
                </div>
              </div>
              <div className="flex flex-row  items-center gap-4 justify-between">
                <span className="text-sm">Lock Time Left</span>
                <div className="py-1 px-2 bg-blue-200 flex items-center rounded-md w-[63%]  ">
                  <RiTimer2Fill className="mr-2 h-4 w-4 text-blue-800 " />
                  <span className=" flex flex-row items-center font-semibold text-black text-sm w-full">
                    {calculateTimeLeft(data.releaseTime, true).days} +{' '}
                    <Input
                      id="days"
                      type="number"
                      defaultValue="0"
                      placeholder="300"
                      className=" w-[45px] text-center py-0 px-0 border-[2px] mx-2 border-gray-500 outline-none focus-visible:ring-0"
                    />
                    Days
                  </span>
                </div>
              </div>
              <div className="flex flex-row  items-center gap-4 justify-between">
                <span className="text-sm">Status</span>
                <div className="py-1 px-2 bg-red-100 flex items-center rounded-md w-[63%]  ">
                  <ImCancelCircle className="mr-2 h-4 w-4 text-red-800 " />
                  <span className="font-semibold text-black text-sm">
                    {data.locked}
                  </span>
                </div>
              </div>
            </div>
          </span>

          <div className="bg-red-200 backdrop-blur-md rounded-md items-center flex justify-center shadow-md py-10 w-[30%] ">
            <FaLock className="mr-2 h-14 w-14 text-red-600 " />
          </div>
        </div>
        <DialogFooter className="flex flex-row items-center ">
          <Button
            type="submit"
            className="bg-green-400 font-medium px-7"
            disabled
          >
            Unlock
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
