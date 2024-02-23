import { Dialog, DialogContent, DialogOverlay } from '@/components/ui/dialog';
import { GetTimer } from '@/utils/getTimer';
import { FaLock } from 'react-icons/fa';

export const Emergency = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const { result } = GetTimer();

  return (
    <Dialog open={isOpen} modal onOpenChange={onClose}>
      <DialogOverlay className="z-50 relative grid w-full max-w-lg gap-4 bg-white p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-lg md:w-full" />
      <DialogContent className="text-black bg-white outline-none">
        <div className="flex flex-row items-center justify-center gap-5 py-4">
          <span className="text-red-400 font-medium">
            The emergency withdrawal for this platform would be unlocked in{' '}
            {result.days}days {result.hours}hrs {result.minutes}mins{' '}
            {result.seconds}secs.
          </span>
          <div className="bg-red-200 backdrop-blur-md rounded-md items-center w-full flex justify-center shadow-md py-10 col-span-2 ">
            <FaLock className="mr-2 h-14 w-14 text-red-600 " />
          </div>
        </div>
        {/* <DialogFooter className="flex flex-row items-center " onClick={onClose}>
          <Button
            type="submit"
            className="bg-green-400 font-medium px-7"
            disabled
          >
            Withdraw
          </Button>
        </DialogFooter> */}
      </DialogContent>
    </Dialog>
  );
};
