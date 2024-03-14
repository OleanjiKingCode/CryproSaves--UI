import shortenAccount from '@/utils/shoternAddress';
import { IoCopy } from 'react-icons/io5';
import { useAccount, useReadContract } from 'wagmi';
import { useToast } from '@/components/ui/use-toast';
import copy from 'clipboard-copy';
import { Navbar } from '@/components/Navbar';
import { Sections } from '@/components/Sections';
import { Button } from '@/components/ui/button';
import { Stats } from '@/components/Stats';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useEffect, useState } from 'react';
import { LockupABIFull } from '@/constants/LockupData';
import { formatEther, isAddress } from 'viem';
import { Toaster } from '@/components/ui/toaster';

export default function Main() {
  const { address, isConnected } = useAccount();
  const { toast } = useToast();
  const [hasLockContract, setHasLockContract] = useState(false);
  const [constractDetails, setContractDetails] = useState<any>({});
  const [userContractAddress, setUserContracAddress] = useState<
    `0x${string}` | string
  >();

  const { data: AllData, refetch } = useReadContract({
    abi: LockupABIFull,
    address: userContractAddress as `0x${string}`,
    functionName: 'getAllLockUps',
  });

  const { data: isOwner, refetch: OwnerRefetch } = useReadContract({
    abi: LockupABIFull,
    address: userContractAddress as `0x${string}`,
    functionName: 'owner',
  });

  console.log(isOwner, AllData);
  const getContractDetails = async () => {
    console.log(isOwner, 'dcpkdjvj');
    if (userContractAddress && isAddress(userContractAddress)) {
      await OwnerRefetch();
      // console.log(isOwner, 'dcpkdjvj');
      if (!isOwner) {
        toast({
          description: 'You are not the owner of this contract',
          style: { backgroundColor: 'red', color: 'white' },
        });
      } else {
        await refetch();
        console.log(AllData, 'dkcosdnbij');
        setHasLockContract(true);
      }
    } else if (
      !isConnected ||
      (userContractAddress && !isAddress(userContractAddress))
    ) {
      toast({
        description: 'connect your wallet or enter valid contract address ',
        style: { backgroundColor: 'red', color: 'white' },
      });
    } else {
      console.log('logic remains');
      // check if the address has a contract connected
      // get from the the connector contract
    }
  };

  const fetchData = async () => {
    try {
      let allSaves: any = [];
      let lockedCount = 0;
      let unlockedCount = 0;
      let totalEth = 0;
      if (Array.isArray(AllData)) {
        allSaves = AllData;
        AllData.slice(1).forEach((save: any) => {
          save.locked === true ? (lockedCount += 1) : (unlockedCount += 1);
          totalEth += Number(formatEther(save.amount));
        });
      }
      setContractDetails({
        allSaves,
        SavesNum: allSaves.length,
        lockedCount,
        unlockedCount,
        totalEth,
      });
    } catch (err) {
      console.log('Error fetching data: ', err);
    }
  };

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

  useEffect(() => {
    fetchData();
  }, [AllData, hasLockContract]);

  return (
    <div className="w-full flex flex-col min-h-screen bg-pink-100">
      <Navbar />
      {hasLockContract ? (
        <>
          <>
            <Stats
              SavesNum={constractDetails.SavesNum ?? 0}
              LockedSaves={constractDetails.lockedCount ?? 0}
              UnlockedSaves={constractDetails.unlockedCount ?? 0}
              EthSaved={constractDetails.totalEth ?? 0}
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
          <Sections Saves={constractDetails.allSaves} />
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
                onChange={(e) => setUserContracAddress(e.target.value)}
                type="text"
                placeholder="Ex: 0x1234ABC"
                className="border-[2px] border-gray-500 outline-none focus-visible:ring-0"
              />
            </div>
            <Button
              className="bg-pink-200 hover:bg-pink-500 rounded-md shadow-md font-semibold text-black"
              onClick={() => getContractDetails()}
              //disabled={!isConnected || userContractAddress !== undefined}
            >
              Get Contract Details
            </Button>
          </div>
        </div>
      )}
      <Toaster />
    </div>
  );
}
