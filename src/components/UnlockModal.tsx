import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { FaLockOpen } from 'react-icons/fa';
import { ImCancelCircle } from 'react-icons/im';
import {
  RiLoader4Fill,
  RiMoneyDollarCircleFill,
  RiTimer2Fill,
} from 'react-icons/ri';
import { formatTimestamp } from '@/utils/formatTimeStamp';
import { formatEther } from 'viem';
import { useState } from 'react';
import { useWriteContract } from 'wagmi';
import { useToast } from './ui/use-toast';
import { LockupABIFull } from '@/constants/LockupData';

export const UnlockModal = ({
  data,
  isOpen,
  onClose,
  CA,
}: {
  CA: string;
  data: any;
  isOpen: boolean;
  onClose: () => void;
}) => {
  const { writeContractAsync } = useWriteContract();
  const [isLoading, setisLoading] = useState(false);
  const { toast } = useToast();

  const unlockSave = () => {
    try {
      setisLoading(true);
      writeContractAsync({
        abi: LockupABIFull,
        address: CA as `0x${string}`,
        functionName: 'unlockEther',
        args: [data.lockId],
      })
        .then(() => {
          toast({
            description: 'Successfully unlock your save',
            style: { backgroundColor: 'green', color: 'white' },
          });
          setisLoading(false);
          onClose();
        })
        .catch((error) => {
          console.error(`Error sending transaction: ${error}`);
          toast({
            description: 'Error sending transaction',
            style: { backgroundColor: 'red', color: 'white' },
          });
          setisLoading(false);
        });
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
          <div className="bg-green-200 backdrop-blur-md rounded-md items-center flex justify-center shadow-md py-10 w-[30%] ">
            <FaLockOpen className="mr-2 h-14 w-14 text-green-600 " />
          </div>
          <span className="text-red-400 font-medium w-[60%]">
            <div className="flex flex-col gap-4 py-4">
              <div className="flex flex-row  items-center gap-4 justify-between ">
                <span className="text-sm">Name</span>
                <div className="py-1 px-2 bg-gray-400 flex items-center rounded-md w-[50%]  ">
                  <span className="font-semibold text-black text-sm">
                    {data.name}
                  </span>
                </div>
              </div>
              <div className="flex flex-row  items-center gap-4 justify-between">
                <span className="text-sm">Amount Locked</span>
                <div className="py-1 px-2 bg-green-200 flex items-center rounded-md  w-[50%]  ">
                  <RiMoneyDollarCircleFill className="mr-2 h-4 w-4 text-green-800 " />
                  <span className="font-semibold text-black text-sm">
                    {Number(formatEther(data.amount))}
                  </span>
                </div>
              </div>
              <div className="flex flex-row  items-center gap-4 justify-between">
                <span className="text-sm">Lock Time Left</span>
                <div className="py-1 px-2 bg-blue-200 flex items-center rounded-md w-[50%]  ">
                  <RiTimer2Fill className="mr-2 h-4 w-4 text-blue-800 " />
                  <span className="font-semibold text-black text-sm">
                    {formatTimestamp(Number(data.releaseTime))}
                  </span>
                </div>
              </div>
              <div className="flex flex-row  items-center gap-4 justify-between">
                <span className="text-sm">Status</span>
                <div className="py-1 px-2 bg-red-100 flex items-center rounded-md w-[50%]  ">
                  <ImCancelCircle className="mr-2 h-4 w-4 text-red-800 " />
                  <span className="font-semibold text-black text-sm">
                    Still locked
                  </span>
                </div>
              </div>
            </div>
          </span>
        </div>
        <DialogFooter className="flex flex-row items-center justify-between md:justify-end gap-3 w-full ">
          {/* <Button
            className="bg-blue-200 rounded-md shadow-md"
            onClick={() => {
              //open increase time modal
              onClose();
            }}
          >
            <RiTimerFlashFill className="mr-2 h-4 w-4 text-blue-500 text-sm" />
            Increase Time
          </Button> */}
          <Button
            type="submit"
            className="bg-green-400 font-medium px-7"
            onClick={unlockSave}
          >
            {isLoading ? (
              <RiLoader4Fill className="animate-spin w-6 h-6" />
            ) : (
              'Unlock'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
