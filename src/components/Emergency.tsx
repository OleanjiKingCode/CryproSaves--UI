import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogOverlay,
} from '@/components/ui/dialog';
import { GetTimer } from '@/utils/getTimer';
import { FaLock } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { RiLoader4Fill } from 'react-icons/ri';
import { useWriteContract, useAccount } from 'wagmi';
import { useToast } from './ui/use-toast';
import { LockupABIFull } from '@/constants/LockupData';

export const Emergency = ({
  isOpen,
  onClose,
  CA,
}: {
  CA: string;
  isOpen: boolean;
  onClose: () => void;
}) => {
  const { result, status } = GetTimer();
  const { writeContractAsync } = useWriteContract();
  const [isLoading, setisLoading] = useState(false);
  const { toast } = useToast();

  const emergencyWithdrawl = () => {
    try {
      setisLoading(true);
      writeContractAsync({
        abi: LockupABIFull,
        address: CA as `0x${string}`,
        functionName: 'emergencyWithdraw',
      })
        .then((receipt) => {
          toast({
            description: 'Successfully withdrawn your locked MATIC',
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
      <DialogOverlay className="z-50 relative grid w-full max-w-lg gap-4 bg-white p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-lg md:w-full" />
      <DialogContent className="text-black bg-white outline-none">
        <div className="flex flex-row items-center justify-center gap-5 py-4">
          <span className="text-red-400 font-medium">
            The emergency withdrawal for this platform would be unlocked in{' '}
            {result.days} days {result.hours} hrs {result.minutes} mins{' '}
            {result.seconds} secs.
          </span>
          <div className="bg-red-200 backdrop-blur-md rounded-md items-center w-full flex justify-center shadow-md py-10 col-span-2 ">
            <FaLock className="mr-2 h-14 w-14 text-red-600 " />
          </div>
        </div>
        {status && (
          <DialogFooter className="flex flex-row items-center ">
            <Button
              type="submit"
              className="bg-green-400 font-medium px-7"
              onClick={emergencyWithdrawl}
            >
              {isLoading ? (
                <RiLoader4Fill className="animate-spin w-6 h-6" />
              ) : (
                'Withdraw'
              )}
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
};
