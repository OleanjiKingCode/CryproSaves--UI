import { useGetSavesDetails } from '@/hooks/useGetSavesDetails';
import shortenAccount from '@/utils/shoternAddress';
import { IoCopy } from 'react-icons/io5';
import { useAccount } from 'wagmi';
import { useToast } from '@/components/ui/use-toast';
import copy from 'clipboard-copy';
import { Navbar } from '@/components/Navbar';
import { Sections } from '@/components/Sections';
import { Button } from '@/components/ui/button';
import { Stats } from '@/components/Stats';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';

export default function Main() {
  const { address, isConnected } = useAccount();
  const { toast } = useToast();
  const [hasLockContract, setHasLockContract] = useState(false);
  const { SavesNum, LockedSaves, UnlockedSaves, EthSaved } =
    useGetSavesDetails();
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
      {hasLockContract ? (
        <>
          <>
            <Stats
              SavesNum={SavesNum ?? 0}
              LockedSaves={LockedSaves ?? 0}
              UnlockedSaves={UnlockedSaves ?? 0}
              EthSaved={EthSaved ?? 0}
            />

            {isConnected && address && (
              <>
                <div className="px-10 md:px-16 w-full py-5">
                  <div className=" px-4 py-5 bg-white rounded-md flex flex-row items-center gap-2 w-full">
                    <span className="text-lg font-medium">
                      Owner&apos;s Address:{' '}
                      <span className="font-normal text-base">
                        {shortenAccount(address)}
                      </span>
                    </span>
                    <Button
                      className="bg-red-200 rounded-md shadow-md hover:bg-red-800"
                      onClick={() => handleCopyToClipboard(address)}
                      title="copy address"
                    >
                      <IoCopy className="md:mr-2 h-4 w-4 text-red-500" />
                      <span className="hidden md:block">Copy</span>
                    </Button>
                  </div>
                </div>
              </>
            )}
          </>
          <Sections />
        </>
      ) : (
        <div className="w-full flex flex-col min-h-[80vh] items-center justify-center px-20">
          <div className="w-[80%] bg-white px-5 py-10 text-center items-center flex flex-col gap-8 rounded-2xl">
            <h2 className="font-semibold text-lg">
              Connected your address to your Save Contract ?
            </h2>
            <ConnectButton />
            <h2 className="font-semibold text-lg">Did not connect them?</h2>
            <div className="w-full flex gap-10 items-center justify-center">
              <Label htmlFor="contract" className="w-[30%]">
                Contract Address:
              </Label>
              <Input
                id="contract"
                type="text"
                placeholder="Ex: 0x1234ABC"
                className="border-[2px] border-gray-500 outline-none focus-visible:ring-0"
              />
            </div>
            <Button
              className="bg-pink-200 hover:bg-pink-500 rounded-md shadow-md font-semibold text-black"
              onClick={() => setHasLockContract(true)}
            >
              Get Contract Details
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
