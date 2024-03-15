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
import {
  RiLoader4Fill,
  RiMoneyDollarCircleFill,
  RiTimer2Fill,
} from 'react-icons/ri';
import { Input } from '@/components/ui/input';
import { formatEther } from 'viem';
import { useToast } from './ui/use-toast';
import { LockupABIFull } from '@/constants/LockupData';
import {  useWriteContract } from 'wagmi';
import { useState } from 'react';
import { formatTimestamp } from '@/utils/formatTimeStamp';
import { Toaster } from './ui/toaster';

export const IncreaseTimeModal = ({
  data,
  isOpen,
  onClose,
  CA,
}: {
  data: any;
  CA: string;
  isOpen: boolean;
  onClose: () => void;
}) => {
  const { writeContractAsync } = useWriteContract();
  const [isLoading, setisLoading] = useState(false);
  const { toast } = useToast();
  const [addtionalMonths, setAdditionalMonths] = useState(0);

  const extendTime = () => {
    try {
      if (addtionalMonths > 0) {
        setisLoading(true);
        writeContractAsync({
          abi: LockupABIFull,
          address: CA as `0x${string}`,
          functionName: 'extendLockTime',
          args: [addtionalMonths, data.lockId],
        })
          .then(() => {
            toast({
              description: 'Successfully extended your save time',
              style: { backgroundColor: 'green', color: 'white' },
            });
            setisLoading(false);
            onClose();
          })
          .catch((error) => {
            console.error(`Error sending transaction: ${error}`);
            toast({
              description: 'Error sending transaction',
              style: { backgroundColor: 'green', color: 'white' },
            });
            setisLoading(false);
          });
      } else {
        toast({
          description: 'Extend months should be more than zero',
          style: { backgroundColor: 'red', color: 'white' },
        });
        setisLoading(false);
      }
    } catch (error) {
      console.log('error', error);
      setisLoading(false);
    }
  };
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
                    {Number(formatEther(data.amount))}
                  </span>
                </div>
              </div>
              <div className="flex flex-row  items-center gap-4 justify-between">
                <span className="text-sm"> Time Left</span>
                <div className="py-1 px-2 bg-blue-200 flex items-center rounded-md w-[63%]  ">
                  <RiTimer2Fill className="mr-2 h-4 w-4 text-blue-800 " />
                  <span className=" flex flex-row items-center font-semibold text-black text-sm w-full">
                    {formatTimestamp(Number(data.releaseTime))}
                  </span>
                </div>
              </div>

              <div className="flex flex-row  items-center gap-4 justify-between">
                <span className="text-sm">Extend Months</span>
                <div className="py-1 px-2 bg-blue-200 flex items-center rounded-md w-[63%]  ">
                  <span className=" flex flex-row items-center font-semibold text-black text-sm w-full">
                    <Input
                      id="days"
                      type="number"
                      min={0}
                      onChange={(e) =>
                        setAdditionalMonths(Number(e.target.value))
                      }
                      defaultValue="0"
                      placeholder="300"
                      className="min-w-[45px] text-center py-0 px-0 border-[2px] mx-2 border-gray-500 outline-none focus-visible:ring-0"
                    />
                    Months
                  </span>
                </div>
              </div>
              <div className="flex flex-row  items-center gap-4 justify-between">
                <span className="text-sm">Status</span>
                <div className="py-1 px-2 bg-red-100 flex items-center rounded-md w-[63%]  ">
                  <ImCancelCircle className="mr-2 h-4 w-4 text-red-800 " />
                  <span className="font-semibold text-black text-sm">
                    {data.locked ? 'Locked' : 'Unlocked'}
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
            onClick={extendTime}
          >
            {isLoading ? (
              <RiLoader4Fill className="animate-spin w-6 h-6" />
            ) : (
              'Increase Time'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
      <Toaster />
    </Dialog>
  );
};
