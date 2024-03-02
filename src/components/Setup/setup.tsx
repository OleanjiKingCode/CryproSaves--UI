import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';

export const Setup = () => {
  return (
    <section className="w-full flex item-center bg-white rounded-lg">
      <h2 clas>Contract Setup</h2>
      <div className="grid grid-cols-3 gap-4 col-span-3 items-center">
        <Label htmlFor="name" className="col-span-1">
          Chain
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
          placeholder="300"
          className="col-span-2 border-[2px] border-gray-500 outline-none focus-visible:ring-0"
        />
      </div>
      <div className="grid grid-cols-3 gap-4 col-span-3 items-center">
        <Label htmlFor="days" className="col-span-1">
          Contract Properties
        </Label>

        <Checkbox id="emergency" />
        <label
          htmlFor="emergency"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Emergency Withdraw
        </label>
      </div>
    </section>
  );
};
