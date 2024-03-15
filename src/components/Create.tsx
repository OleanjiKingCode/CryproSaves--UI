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
import { LockupABIFull } from '@/constants/LockupData';
import { useState } from 'react';
import { useWriteContract } from 'wagmi';
import { useToast } from './ui/use-toast';
import { RiLoader4Fill } from 'react-icons/ri';
import { IFormCreateSave } from '@/types/ContractSetup';
import { useForm, SubmitHandler } from 'react-hook-form';
import { parseEther } from 'viem';
import { Toaster } from './ui/toaster';

export const Create = ({
  isOpen,
  onClose,
  CA,
}: {
  CA: string;
  isOpen: boolean;
  onClose: () => void;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormCreateSave>();

  const { writeContractAsync } = useWriteContract();
  const [isLoading, setisLoading] = useState(false);
  const { toast } = useToast();

  const onSubmit: SubmitHandler<IFormCreateSave> = async (info) => {
    try {
      setisLoading(true);
      writeContractAsync({
        abi: LockupABIFull,
        address: CA as `0x${string}`,
        functionName: 'lockEther',
        args: [info.months, info.name, info.type],
        value: parseEther(info.amount),
      })
        .then(() => {
          toast({
            description: 'Successfully created a new save',
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
        <DialogHeader>
          <DialogTitle>Create Save</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-5 gap-5 py-4">
            <div className="grid col-span-3 gap-3 ">
              <div className="grid grid-cols-3 gap-4 col-span-3 items-center">
                <Label htmlFor="name" className="col-span-1">
                  Name
                </Label>
                <Input
                  id="name"
                  placeholder="Oleanji"
                  {...register('name', { required: true })}
                  className="border-[2px] border-gray-500 col-span-2 focus-visible:ring-0"
                />
                {errors.name?.type === 'required' && (
                  <p className="text-sm text-red-600 col-span-2">
                    Save Name is required
                  </p>
                )}
              </div>
              <div className="grid grid-cols-3 gap-4 col-span-3 items-center">
                <Label htmlFor="days" className="col-span-1">
                  Lock Months
                </Label>
                <Input
                  id="days"
                  type="number"
                  placeholder="300"
                  {...register('months', { required: true })}
                  className="col-span-2 border-[2px] border-gray-500 outline-none focus-visible:ring-0"
                />
                {errors.months?.type === 'required' && (
                  <p className="text-sm text-red-600 col-span-2">
                    Months lock time is required
                  </p>
                )}
              </div>
              <div className="grid grid-cols-3 gap-4 col-span-3 items-center">
                <Label htmlFor="days" className="col-span-1">
                  Lock Type
                </Label>
                <Input
                  id="days"
                  type="text"
                  placeholder="Pet"
                  {...register('type', { required: true })}
                  className="col-span-2 border-[2px] border-gray-500 outline-none focus-visible:ring-0"
                />
                {errors.type?.type === 'required' && (
                  <p className="text-sm text-red-600 col-span-2">
                    lock type is required
                  </p>
                )}
              </div>
            </div>

            <div className="bg-green-200 rounded-md items-center w-full flex justify-center shadow-md py-10 col-span-2 ">
              <FaLock className="mr-2 h-14 w-14 text-green-600 " />
            </div>
          </div>

          <div className="grid grid-cols-5 items-center gap-4">
            <Label htmlFor="amount">Amount (In MATIC)</Label>
            <Input
              id="amount"
              placeholder="10.01"
              {...register('amount', { required: true })}
              className="col-span-3 border-[2px] border-gray-500 focus-visible:ring-0"
            />
            {errors.amount?.type === 'required' && (
              <p className="text-sm text-red-600 col-span-2">
                lock amount is required
              </p>
            )}
            {/* <Button className="bg-blue-400 font-medium px-7">max</Button> */}
          </div>

          <DialogFooter className="flex flex-row items-center justify-between md:justify-end pt-5 ">
            <Button className="bg-red-400 font-medium px-7" onClick={onClose}>
              Close
            </Button>
            <Button type="submit" className="bg-green-400 font-medium px-7">
              {isLoading ? (
                <RiLoader4Fill className="animate-spin w-6 h-6" />
              ) : (
                'Lock'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
      <Toaster />
    </Dialog>
  );
};
