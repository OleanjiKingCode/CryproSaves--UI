import { Navbar } from '@/components/Navbar';
import { Sections } from '@/components/Sections';
import { Stats } from '@/components/Stats';
import copy from 'clipboard-copy';
import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/components/ui/use-toast';
import { IoCopy } from 'react-icons/io5';
import { Button } from '@/components/ui/button';
import { useAccount } from 'wagmi';


export default function Home() {
  const { toast } = useToast();
  const { address, isConnected } = useAccount();

  const handleCopyToClipboard = async (textToCopy: string) => {
    try {
      await copy(textToCopy);
      toast({
        description: 'Successfully Copied Address',
        style: { backgroundColor: 'green', color: 'white' },
      });
    } catch (error) {
      console.error('Error copying to clipboard', error);
    }
  };

  return (
    <div className="w-full flex flex-col min-h-screen bg-pink-100">
      <Navbar />
      <Stats />
      {isConnected && address && (
        <div className="px-10 md:px-16 w-full py-5">
          <div className=" px-4 py-5 bg-white rounded-md flex flex-row items-center gap-2 w-full">
            <span className="text-lg font-medium">
              Owner&apos;s Address:{' '}
              <span className="font-normal text-base">{address}</span>{' '}
            </span>
            <Button
              className="bg-red-200 rounded-md shadow-md"
              onClick={() => handleCopyToClipboard(address)}
              title="copy address"
            >
              <IoCopy className="md:mr-2 h-4 w-4 text-red-500" />
              <span className="hidden md:block">Copy</span>
            </Button>
          </div>
        </div>
      )}
      <Sections />
      <Toaster />
    </div>
  );
}
