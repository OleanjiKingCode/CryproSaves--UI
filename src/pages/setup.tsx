import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Navbar } from '@/components/Navbar';
import {
  useAccount,
  useReadContract,
  useSwitchChain,
  useWriteContract,
} from 'wagmi';
import { useState } from 'react';
import axios, { AxiosRequestConfig } from 'axios';
import { ContractFactory } from 'ethers';
import { getEthersSigner } from '@/utils/getEthersSigner';
import { config } from '@/utils/wagmiConfig';
import { useForm, SubmitHandler } from 'react-hook-form';
import { customizeCryptoSaves } from '@/utils/updateContract';
import { RiLoader4Fill } from 'react-icons/ri';
import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/components/ui/use-toast';
import { toHex } from 'viem';
import { SwitchChain } from '@/utils/switchNetwork';
import { AccordionDetails } from '@/components/AccordionDetails';
import { ContractDetails, IFormInput } from '@/types/ContractSetup';
import {
  ConnectorABIPolygon,
  ConnectorAddress,
  ConnectorAddressPolygon,
} from '@/constants/LockupData';
import Link from 'next/link';

const Setup = () => {
  let InitialValues: ContractDetails = {
    name: '',
    address: '',
    abi: '',
    bytecode: '',
    sourceCode: '',
    args: '',
    txn: '',
  };

  const [pickedWithdraw, setPickedWithdraw] = useState(false);
  const { address, chainId, chain } = useAccount();
  const [data, setData] = useState<ContractDetails>(InitialValues);
  const { chains } = useSwitchChain({ config });
  const { toast } = useToast();
  const [isLoading, setisLoading] = useState(false);
  const [isLoadingDeploy, setisLoadingDeploy] = useState(false);
  const [gottenContractDetails, setGottenContractDetails] = useState(false);
  const [deployedContract, setDeployedContract] = useState(false);
  const [allowWithdraw, setAllowWithdraw] = useState(false);
  const [doneSetup, setDoneSetup] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const changeNetwork = async (e: string) => {
    if (e === 'Polygon Mumbai' && chainId !== 80001) {
      await SwitchChain({
        chainId: toHex(chains[0].id),
        chainName: chains[0].name,
        rpcUrls: [...chains[0].rpcUrls.default.http],
      });
    } else if (e === 'Polygon' && chainId !== 137) {
      await SwitchChain({
        chainId: toHex(chains[1].id),
        chainName: chains[1].name,
        rpcUrls: [...chains[1].rpcUrls.default.http],
      });
    }
  };

  const onSubmit: SubmitHandler<IFormInput> = async (info) => {
    try {
      setisLoading(true);

      if (!address) {
        toast({
          description: 'Connect your wallet',
          style: { backgroundColor: 'red', color: 'white' },
        });
        setisLoading(false);
      }
      setAllowWithdraw(info.withdraw);
      const contract = customizeCryptoSaves({
        author: address?.toString() ?? '',
        contractName: info.contractName,
        includeExtendedEvent: info.extendTime,
        includeEmergencyWithdraw: info.withdraw,
      });
      const config: AxiosRequestConfig = {
        params: {
          contract: contract,
          contractName: info.contractName,
        },
      };

      toast({
        description: 'Now compiling contract',
        style: { backgroundColor: 'green', color: 'white' },
        duration: 1000,
      });
      const response = await axios.get('/api/Contract', config);
      const result = await response.data.artifact;

      setData({
        ...data,
        abi: JSON.stringify(result?.abi),
        bytecode: result?.evm.bytecode.object,
        sourceCode: contract,
        name: info.contractName,
      });

      setGottenContractDetails(true);
      setisLoading(false);
    } catch (error) {
      setisLoading(false);
      console.error('Error fetching data:', error);
    }
  };

  const deployContract = async (includeEmergencyWithdraw: boolean) => {
    try {
      setisLoadingDeploy(true);

      if (!address) {
        toast({
          description: 'Connect your wallet',
          style: { backgroundColor: 'red', color: 'white' },
          duration: 1000,
        });
        setisLoadingDeploy(false);
      }

      toast({
        description: 'Now Deploying contract',
        style: { backgroundColor: 'green', color: 'white' },
        duration: 1000,
      });
      const signer = getEthersSigner(config);
      const factory = new ContractFactory(
        data.abi,
        data.bytecode,
        await signer
      );
      let contract;
      if (includeEmergencyWithdraw) {
        contract = await factory.deploy(10);
      } else {
        contract = await factory.deploy();
      }
      let CA = await contract.getAddress();

      setData({
        ...data,
        address: CA,
        args: '',
        txn: contract.deploymentTransaction()?.hash ?? '',
      });
      toast({
        description: 'You have successfully deployed your contract',
        style: { backgroundColor: 'green', color: 'white' },
        duration: 1000,
      });
      setisLoadingDeploy(false);
      setDeployedContract(true);
    } catch (error) {
      console.log('error:', error);
      setisLoadingDeploy(false);
    }
  };

  const { writeContractAsync } = useWriteContract();

  const { data: addressesData } = useReadContract({
    abi: ConnectorABIPolygon,
    address: chainId === 137 ? ConnectorAddressPolygon : ConnectorAddress,
    functionName: 'getAddresses',
    args: [address],
  });

  const connectContract = () => {
    try {
      setisLoading(true);
      if (Array.isArray(addressesData) && addressesData.length > 0) {
        writeContractAsync({
          abi: ConnectorABIPolygon,
          address: chainId === 137 ? ConnectorAddressPolygon : ConnectorAddress,
          functionName: 'updateAddress',
          args: [data.address],
        })
          .then(() => {
            toast({
              description:
                'Successfully linked your contract with your adddress',
              style: { backgroundColor: 'green', color: 'white' },
            });
            setisLoading(false);
          })
          .catch((error) => {
            console.error(`Error sending transaction: ${error}`);
            toast({
              description: 'Error sending transaction',
              style: { backgroundColor: 'red', color: 'white' },
            });
            setisLoading(false);
          });
      } else {
        writeContractAsync({
          abi: ConnectorABIPolygon,
          address: chainId === 137 ? ConnectorAddressPolygon : ConnectorAddress,
          functionName: 'addUser',
          args: [data.address],
        })
          .then(() => {
            toast({
              description:
                'Successfully linked your contract with your adddress',
              style: { backgroundColor: 'green', color: 'white' },
            });
            setDoneSetup(true);
            setisLoading(false);
          })
          .catch((error) => {
            console.error(`Error sending transaction: ${error}`);
            toast({
              description: 'Error sending transaction',
              style: { backgroundColor: 'red', color: 'white' },
            });
            setisLoading(false);
          });
      }
    } catch (error) {
      toast({
        description: 'An error occurred, try again',
        style: { backgroundColor: 'red', color: 'white' },
      });
    }
  };

  return (
    <div className="w-full flex flex-col min-h-screen bg-pink-100">
      <Navbar />
      <section className="w-full px-10 md:px-16 py-4 ">
        <div className=" w-full flex  px-10 md:px-16 py-6 item-center flex-col gap-3  bg-white rounded-lg">
          <h2 className="font-semibold w-full text-lg">
            Contract Setup{' '}
            <span className="font-italic ml-5">
              NOTE: Ticking all boxes makes the contract more functional{' '}
            </span>
          </h2>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-6"
          >
            <div className="grid grid-cols-3 gap-4 col-span-3 items-center">
              <Label htmlFor="name" className="col-span-1">
                Desired Chain
              </Label>
              <select
                value={chain?.name}
                {...register('chain', { required: true })}
                onChange={(e) => changeNetwork(e.target.value)}
                className=" col-span-2 md:col-span-2 bg-white border border-gray-400 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:border-gray-500 focus:bg-white focus:text-gray-900"
              >
                {chains.map((item, i) => (
                  <option key={i} value={item.name}>
                    {item.name}
                  </option>
                ))}
              </select>

              {errors.chain?.type === 'required' && (
                <p className="text-sm text-red-600 col-span-2">
                  Select the desired chain
                </p>
              )}
            </div>
            <div className="grid grid-cols-3 gap-4 col-span-3 items-center">
              <Label htmlFor="days" className="col-span-1">
                Contract Name
              </Label>
              <Input
                id="days"
                type="text"
                placeholder="My Crypto Savings"
                {...register('contractName', { required: true })}
                className="col-span-2 md:col-span-2 border-[2px] border-gray-500 outline-none focus-visible:ring-0"
              />
              {errors.contractName?.type === 'required' && (
                <p className="text-sm text-red-600 col-span-2">
                  Contract Name is required
                </p>
              )}
            </div>
            <div className="grid grid-cols-3 gap-4 col-span-3 items-center">
              <Label htmlFor="days" className=" col-span-3 md:col-span-1">
                Contract Properties
              </Label>
              <div className="flex flex-col gap-4 w-full col-span-3 md:col-span-2">
                <div className="flex flex-row items-center gap-3">
                  <Checkbox id="lock" checked disabled />
                  <Label
                    htmlFor="lock"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Lock Saves - (Ability to lock crypto in a save)
                  </Label>
                </div>
                <div className="flex flex-row items-center gap-3">
                  <Checkbox id="unlock" checked disabled />
                  <Label
                    htmlFor="unlock"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Unlock Saves - (Ability to unlock crypto in a save)
                  </Label>
                </div>
                <div className="flex flex-row items-center gap-3">
                  <input
                    type="checkbox"
                    className="w-4 h-4 col-span-1 accent-pink-600"
                    id="emergency"
                    {...register('withdraw')}
                    onChange={(e) => setPickedWithdraw(e.target.checked)}
                  />
                  <Label
                    htmlFor="emergency"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Emergency Withdraw - (Ability to withdraw before the set
                    date of a save)
                  </Label>
                </div>
                <div className="flex flex-row items-center gap-3">
                  <input
                    type="checkbox"
                    className="w-4 h-4 col-span-1 accent-pink-600"
                    id="extendTime"
                    {...register('extendTime')}
                  />
                  <Label
                    htmlFor="extendTime"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Extend Lock Time - (Ability to extend lock time of a save)
                  </Label>
                </div>
                <div className="flex flex-row items-center gap-3">
                  <Checkbox id="withdrawAllEther" checked disabled />

                  <Label
                    htmlFor="withdrawAllEther"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Wtihdraw All Ether - (Ability to withdraw all Ether from the
                    contract)
                  </Label>
                </div>
              </div>
            </div>
            {pickedWithdraw && (
              <div className="grid grid-cols-3 gap-4 col-span-3 items-center ease-in-out slide-in-from-top-20">
                <Label htmlFor="emergency" className="col-span-1">
                  Emergency Time Duration (In months)
                </Label>
                <Input
                  id="emergency"
                  type="number"
                  placeholder="10"
                  min={0}
                  {...register('emergencyTime', { required: true })}
                  className="col-span-1 border-[2px] border-gray-500 outline-none focus-visible:ring-0"
                />
                {errors.emergencyTime?.type === 'required' && (
                  <p className="text-sm text-red-600 col-span-2">
                    Enter a suitable duration for emergency withdrawal
                  </p>
                )}
              </div>
            )}
            <div className="flex gap-3 items-center mt-5">
              <input
                type="checkbox"
                id="terms"
                className="w-4 h-4 col-span-1 accent-pink-600"
                {...register('privacy', { required: true })}
              />
              <Label htmlFor="terms" className="col-span-1 ">
                I Agree with the Terms and Privacy policy
              </Label>
              {errors.privacy?.type === 'required' && (
                <p className="text-sm text-red-600 col-span-2">
                  Accept the privacy and policy rules
                </p>
              )}
            </div>
            {gottenContractDetails && (
              <AccordionDetails
                data={data}
                deployedContract={deployedContract}
              />
            )}

            <div className="w-full flex flex-row gap-5 items-center justify-between flex-wrap ">
              <Button
                type="submit"
                disabled={isLoading}
                className="bg-pink-200 hover:bg-pink-600 rounded-md shadow-md text-sm w-[30%] font-semibold text-black"
              >
                {isLoading ? (
                  <RiLoader4Fill className="animate-spin w-6 h-6" />
                ) : (
                  'Get Contract Details'
                )}
              </Button>
              <Button
                onClick={() => deployContract(allowWithdraw)}
                disabled={!gottenContractDetails}
                type="button"
                className="bg-pink-200 hover:bg-pink-600 rounded-md shadow-md text-sm w-[30%] font-semibold text-black"
              >
                {isLoadingDeploy && gottenContractDetails ? (
                  <RiLoader4Fill className="animate-spin w-6 h-6" />
                ) : (
                  'Compile and Deploy'
                )}
              </Button>
              <Button
                type="button"
                onClick={() => connectContract()}
                disabled={!deployedContract}
                className="bg-pink-200 hover:bg-pink-600 rounded-md shadow-md text-sm w-[30%] font-semibold text-black"
              >
                {isLoading && deployedContract ? (
                  <RiLoader4Fill className="animate-spin w-6 h-6" />
                ) : (
                  'Connect Contract to Wallet Address'
                )}
              </Button>
            </div>
            {doneSetup && (
              <Link
                href="/main"
                className="w-full flex flex-row gap-5 items-center justify-center flex-wrap "
              >
                <Button className="w-full bg-pink-200 hover:bg-pink-500 rounded-md shadow-md font-semibold text-black">
                  Go To Login
                </Button>
              </Link>
            )}
          </form>
        </div>
      </section>
      <Toaster />
    </div>
  );
};

export default Setup;
