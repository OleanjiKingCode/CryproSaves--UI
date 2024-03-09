import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Navbar } from '@/components/Navbar';
import { useAccount } from 'wagmi';
import { useState } from 'react';
import axios from 'axios';
import { ContractFactory } from 'ethers';
import { getEthersSigner } from '@/utils/getEthersSigner';
import { config } from '@/utils/wagmiConfig';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useChainId } from 'wagmi';
import { switchChain } from '@wagmi/core';
import { customizeCryptoSaves } from '@/utils/updateContract';

interface ContractDetails {
  name: string;
  address: string;
  abi: any;
  bytecode: any;
  sourceCode: string;
  args: any;
  txn: string;
}

interface IFormInput {
  contractName: string;
  chain: string;
  withdraw: boolean;
  privacy: boolean;
  extendTime: boolean;
}

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
  const { address } = useAccount();
  const [data, setData] = useState<ContractDetails>(InitialValues);
  // const { chains, switchChain } = useSwitchChain();
  const chainId = useChainId();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data);

  const changeNetwork = async (e: string) => {
    if (e === 'mumbai' && chainId !== 80001) {
      await switchChain(config, { chainId: 137 });
      // switchChain({ chainId: 137 });
    } else if (e === 'mainnet' && chainId !== 137) {
      // switchChain({ chainId: 80001 });
      await switchChain(config, { chainId: 80001 });
      console.log('here');
    }
  };

  const fetchData = async () => {
    try {
      const contract = customizeCryptoSaves({
        author: address?.toString() ?? '',
        contractName: 'CustomCryptoSaves',
        includeExtendedEvent: false,
        includeEmergencyWithdraw: false,
      });
      const response = await axios.get('/api/Contract');
      const result = await response.data.artifact;
      setData({
        ...data,
        abi: result?.abi,
        bytecode: result?.evm.bytecode.object,
        sourceCode: response.data.sourceCode,
        name: response.data.contractName,
      });

      console.log(contract);
      //await deployContract(response);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const deployContract = async (response: any) => {
    const signer = getEthersSigner(config);
    const factory = new ContractFactory(
      response.data.artifact.abi,
      response.data.artifact.evm.bytecode.object,
      await signer
    );
    const contract = await factory.deploy('string');
    let address = await contract.getAddress();
    setData({
      abi: response.data.artifact.abi,
      bytecode: response.data.artifact.evm.bytecode.object,
      sourceCode: response.data.sourceCode,
      name: response.data.contractName,
      address: address,
      args: '',
      txn: contract.deploymentTransaction()?.hash ?? '',
    });
  };

  return (
    <div className="w-full flex flex-col min-h-screen  bg-pink-100">
      <Navbar />
      <section className="w-full px-10 md:px-16 py-4 ">
        <div className=" w-full flex  px-10 md:px-16 py-10 item-center flex-col gap-4  bg-white rounded-lg">
          <h2 className="font-semibold w-full text-lg">Contract Setup</h2>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <div className="grid grid-cols-3 gap-4 col-span-3 items-center">
              <Label htmlFor="name" className="col-span-1">
                Desired Chain
              </Label>
              <Select
                onValueChange={(e) => changeNetwork(e)}
                {...register('chain', { required: true })}
              >
                <SelectTrigger className="col-span-1">
                  <SelectValue placeholder="Desired chain for contract" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mainnet" defaultChecked>
                    Polygon Mainnet{' '}
                  </SelectItem>
                  <SelectItem value="mumbai">Polygin Mumbai</SelectItem>
                </SelectContent>
              </Select>

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
                className="col-span-1 border-[2px] border-gray-500 outline-none focus-visible:ring-0"
              />
              {errors.contractName?.type === 'required' && (
                <p className="text-sm text-red-600 col-span-2">
                  Contract Name is required
                </p>
              )}
            </div>
            <div className="grid grid-cols-3 gap-4 col-span-3 items-center">
              <Label htmlFor="days" className="col-span-1">
                Contract Properties
              </Label>
              <div className="flex flex-col gap-4 w-full col-span-2">
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
                  <Checkbox id="emergency" {...register('withdraw')} />
                  <Label
                    htmlFor="emergency"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Emergency Withdraw - (Ability to withdraw before the set
                    date of a save)
                  </Label>
                </div>
                <div className="flex flex-row items-center gap-3">
                  <Checkbox id="extendTime" {...register('extendTime')} />
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
            <div className="w-full flex items-center  gap-5 py-7">
              <Checkbox
                id="terms"
                {...register('privacy', { required: true })}
              />
              <Label htmlFor="terms">
                I Agree with the Terms and Privacy policy
              </Label>
              {errors.privacy?.type === 'required' && (
                <p role="alert">Contract Name is required</p>
              )}
            </div>
            <Button
              onClick={fetchData}
              type="submit"
              className="bg-pink-200 hover:bg-pink-600 rounded-md shadow-md text-sm w-full font-semibold text-black"
            >
              Compile and Deploy
            </Button>
          </form>
          {/* <Button
            onClick={verifyContract}
            className="bg-pink-200 hover:bg-pink-600 rounded-md shadow-md text-sm w-full font-semibold text-black"
          >
            Verify
          </Button> */}
        </div>
      </section>
    </div>
  );
};

export default Setup;
