import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '../ui/button';
import { Label } from '../ui/label';

export const Setup = () => {
  return (
    <section className="w-full px-10 md:px-16 py-10 ">
      <div className=" w-full flex  px-10 md:px-16 py-10 item-center flex-col gap-4  bg-white rounded-lg">
        <h2 className="font-semibold w-full text-lg">Contract Setup</h2>
        <div className="grid grid-cols-3 gap-4 col-span-3 items-center">
          <Label htmlFor="name" className="col-span-1">
            Desired Chain
          </Label>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Desired chain for contract" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="polygon">Polygon Mainnet </SelectItem>
              <SelectItem value="mainnet">Polygin Mumbai</SelectItem>
              <SelectItem value="eth" disabled>
                Ethereum
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid grid-cols-3 gap-4 col-span-3 items-center">
          <Label htmlFor="days" className="col-span-1">
            Contract Name
          </Label>
          <Input
            id="days"
            type="text"
            placeholder="My Crypto Savings"
            className="col-span-2 border-[2px] border-gray-500 outline-none focus-visible:ring-0"
          />
        </div>
        <div className="grid grid-cols-3 gap-4 col-span-3 items-center">
          <Label htmlFor="days" className="col-span-1">
            Contract Properties
          </Label>

          <div className="flex flex-col gap-4 w-full">
            <div className="flex flex-row items-center gap-3">
              <Checkbox id="lock" defaultChecked />
              <Label
                htmlFor="lock"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Lock Saves
              </Label>
            </div>
            <div className="flex flex-row items-center gap-3">
              <Checkbox id="unlock" defaultChecked />
              <Label
                htmlFor="unlock"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Unlock Saves
              </Label>
            </div>
            <div className="flex flex-row items-center gap-3">
              <Checkbox id="emergency" />
              <Label
                htmlFor="emergency"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Emergency Withdraw
              </Label>
            </div>
            <div className="flex flex-row items-center gap-3">
              <Checkbox id="extendTime" />
              <Label
                htmlFor="extendTime"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Extend Lock Time
              </Label>
            </div>
            <div className="flex flex-row items-center gap-3">
              <Checkbox id="withdrawAllEther" />
              <Label
                htmlFor="withdrawAllEther"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Wtihdraw All Ether
              </Label>
            </div>
          </div>
        </div>
        <div className="w-full flex items-center  gap-5 py-7">
          <Checkbox id="terms" />
          <Label htmlFor="terms">
            I Agree with the Terms and Privacy policy
          </Label>
        </div>
        <Button className="bg-pink-200 hover:bg-pink-600 rounded-md shadow-md text-sm w-full font-semibold text-black">
          Compile and Deploy
        </Button>
      </div>
    </section>
  );
};
