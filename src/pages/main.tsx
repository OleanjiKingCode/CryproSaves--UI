import shortenAccount from '@/utils/shoternAddress';
import { IoCopy, IoLogOut } from 'react-icons/io5';
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
import {
  ConnectorABIPolygon,
  ConnectorAddress,
  ConnectorAddressPolygon,
  LockupABIFull,
} from '@/constants/LockupData';
import { formatEther, isAddress } from 'viem';
import { Toaster } from '@/components/ui/toaster';
import { FaLink, FaUnlink } from 'react-icons/fa';
import { RiLoader4Fill } from 'react-icons/ri';
import Link from 'next/link';

export default function Main() {
  const { address, isConnected, chainId } = useAccount();
  const { toast } = useToast();
  const [isLoading, setisLoading] = useState(false);
  const [hasLockContract, setHasLockContract] = useState(false);
  const [isLinked, setIsLinked] = useState(false);
  const [constractDetails, setContractDetails] = useState<any>({});
  const [userContractAddress, setUserContractAddress] = useState<
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

  const { data: addressesData } = useReadContract({
    abi: ConnectorABIPolygon,
    address: chainId === 137 ? ConnectorAddressPolygon : ConnectorAddress,
    functionName: 'getAddresses',
    args: [address],
  });

  const getContractDetails = async () => {
    try {
      setisLoading(true);
      toast({
        description: 'Getting your details ',
        style: { backgroundColor: 'green', color: 'white' },
      });
      if (
        isConnected &&
        userContractAddress &&
        isAddress(userContractAddress)
      ) {
        await OwnerRefetch();
        if (isOwner !== address) {
          toast({
            description: 'You are not the owner of this contract',
            style: { backgroundColor: 'red', color: 'white' },
          });
          setisLoading(false);
        } else {
          await refetch();
          if (
            Array.isArray(addressesData) &&
            addressesData.includes(userContractAddress)
          ) {
            setIsLinked(true);
          }
          setHasLockContract(true);
          setisLoading(false);
        }
      } else if (
        !isConnected ||
        (userContractAddress && !isAddress(userContractAddress))
      ) {
        toast({
          description: 'connect your wallet or enter valid contract address ',
          style: { backgroundColor: 'red', color: 'white' },
        });
        setisLoading(false);
      } else {
        if (Array.isArray(addressesData) && addressesData.length > 0) {
          setUserContractAddress(addressesData[0]);
          setIsLinked(true);
          await refetch();
          setisLoading(false);
        } else {
          toast({
            description: 'your address is not connected to any saving contract',
            style: { backgroundColor: 'red', color: 'white' },
          });
          setisLoading(false);
          return;
        }
        setHasLockContract(true);
      }
    } catch (error) {
      console.log(error);
      toast({
        description: 'Error ocurrred, Try again',
        style: { backgroundColor: 'red', color: 'white' },
      });
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
        SavesNum: allSaves.length - 1,
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
      {hasLockContract && AllData ? (
        <>
          <>
            <Stats
              SavesNum={constractDetails.SavesNum ?? 0}
              LockedSaves={constractDetails.lockedCount ?? 0}
              UnlockedSaves={constractDetails.unlockedCount ?? 0}
              EthSaved={constractDetails.totalEth ?? 0}
            />

            {isConnected && address && (
              <div className="px-10 md:px-16 w-full py-5 ">
                <div className=" flex flex-col md:flex-row justify-between items-center  bg-white rounded-md">
                  <div className=" px-4 py-5 flex flex-row items-center justify-center md:justify-normal  gap-2 w-full md:w-[45%]">
                    <span className="text-lg font-medium">
                      Owner&apos;s Address:{' '}
                      <span className="font-normal text-base">
                        {shortenAccount(address)}
                      </span>
                    </span>
                    <Button
                      className="bg-blue-200 rounded-md shadow-md hover:bg-blue-800"
                      onClick={() => handleCopyToClipboard(address)}
                      title="copy address"
                    >
                      <IoCopy className="md:mr-2 h-4 w-4 text-blue-500" />
                      <span className="hidden md:block">Copy Address</span>
                    </Button>
                  </div>
                  <div className=" px-4 py-5 flex flex-row items-center justify-center gap-2 w-[30%] min-w-fit">
                    {isLinked ? (
                      <>
                        <Button className=" rounded-md shadow-md bg-green-800 hover:bg-green-800">
                          <FaLink className="mr-2 h-4 w-4 text-green-500 text-sm" />
                          Linked to contract
                        </Button>
                        <Button
                          className="bg-blue-200 rounded-md shadow-md hover:bg-blue-800"
                          onClick={() =>
                            handleCopyToClipboard(userContractAddress as string)
                          }
                          title="copy address"
                        >
                          <IoCopy className="md:mr-2 h-4 w-4 text-blue-500" />
                          <span className="hidden md:block">Copy CA</span>
                        </Button>
                      </>
                    ) : (
                      <Button className="bg-red-200 rounded-md shadow-md hover:bg-red-800">
                        <FaUnlink className="mr-2 h-4 w-4 text-red-500 text-sm" />
                        Link to contract
                      </Button>
                    )}
                  </div>
                  <div className=" px-4 py-5  flex flex-row items-center justify-center gap-2 w-[20%]">
                    <Button
                      className="bg-red-200 rounded-md shadow-md hover:bg-red-800"
                      onClick={() => setHasLockContract(false)}
                      title="copy address"
                    >
                      <IoLogOut className="md:mr-2 h-4 w-4 text-red-500" />
                      <span className="ml-3">Logout</span>
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </>
          <Sections
            Saves={constractDetails.allSaves}
            CA={userContractAddress ?? ''}
            refetch={refetch}
          />
        </>
      ) : (
        <div className="w-full flex flex-col min-h-[80vh] items-center justify-center px-3 md:px-20">
          <div className="w-[90%] md:w-[80%] bg-white px-5 py-10 text-center items-center flex flex-col gap-8 rounded-2xl">
            <h2 className="font-semibold text-lg">
              Connected your address to your Save Contract ?
            </h2>
            <ConnectButton />
            <h2 className="font-semibold text-lg">Did not connect them?</h2>
            <div className="w-full flex gap-10 items-center justify-center">
              <Label htmlFor="contract" className="w-[50%] md:w-[30%]">
                Contract Address:
              </Label>
              <Input
                id="contract"
                onChange={(e) => setUserContractAddress(e.target.value)}
                type="text"
                placeholder="Ex: 0x1234ABC"
                className="border-[2px] border-gray-500 outline-none focus-visible:ring-0"
              />
            </div>
            <div className="flex flex-col md:flex-row items-center justify-between w-full pt-10 ">
              <Button
                className="w-[80%]  bg-pink-200 hover:bg-pink-500 rounded-md shadow-md font-semibold text-black"
                onClick={() => getContractDetails()}
              >
                {isLoading ? (
                  <RiLoader4Fill className="animate-spin w-6 h-6" />
                ) : (
                  'Get Contract Details'
                )}
              </Button>
              <Link href="/" className="w-full">
                <Button className="w-[80%] bg-pink-200 hover:bg-pink-500 rounded-md shadow-md font-semibold text-black">
                  Home
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
      <Toaster />
    </div>
  );
}
