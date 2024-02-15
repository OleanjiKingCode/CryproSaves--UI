import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { FaLock } from "react-icons/fa";
import { LockedSaves, TimeEndedSaves, UnlockedSaves } from "./Saves";
import {
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  TableFooter,
  Table,
} from "./ui/table";
import { IoCopy } from "react-icons/io5";
import { TiExport } from "react-icons/ti";
import { Create } from "./Create";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export const Sections = () => {
  const [active, setActive] = useState("saves");
  const [isOpen, setIsOpen] = useState(false);
  const invoices = [
    {
      "#": "1",
      TxnHash:
        "0x888166ebc4dfe361f323db776758a13917e2c555fb66be6b4b9421bb4139b173",
      time: "2 hrs ago",
      function: "Withdrawal",
      value: "2.03",
    },
    {
      "#": "2",
      TxnHash:
        "0x7c6c99d3a174c1c27ee2eaa10aa8c935ad86d6a0daf472dd5b9acb5f41adb0d7",
      time: "30 days 20 hrs ago",
      function: "Create Save",
      value: "10",
    },
    {
      "#": "3",
      TxnHash:
        "0x888166ebc4dfe361f323db776758a13917e2c555fb66be6b4b9421bb4139b173",
      time: "234days 11hrs ago",
      function: "Increased Lock Time",
      value: "3.22",
    },
    {
      "#": "4",
      TxnHash:
        "0x7c6c99d3a174c1c27ee2eaa10aa8c935ad86d6a0daf472dd5b9acb5f41adb0d7",
      time: "344 days 1hr ago",
      function: "Emergency Withdrawal",
      value: "200.47",
    },
    {
      "#": "5",
      TxnHash:
        "0x888166ebc4dfe361f323db776758a13917e2c555fb66be6b4b9421bb4139b173",
      time: "430 days 22 hrs ago",
      function: "Unlock Save",
      value: "1.10",
    },
  ];

  const handleOpenDialog = () => {
    setIsOpen(true);
  };

  const handleCloseDialog = () => {
    setIsOpen(false);
  };

  return (
    <Tabs
      defaultValue="saves"
      className="w-full px-16 py-10"
      onValueChange={(val) => setActive(val)}
    >
      <TabsList className="grid w-full grid-cols-2 gap-2 bg-gray-100">
        <TabsTrigger
          value="saves"
          className={`${
            active === "saves" ? "bg-white" : "bg-none"
          } rounded-lg`}
        >
          Saves
        </TabsTrigger>
        <TabsTrigger
          value="txns"
          className={`${active === "txns" ? "bg-white" : "bg-none"} rounded-lg`}
        >
          Transactions
        </TabsTrigger>
      </TabsList>
      <TabsContent value="saves">
        <div className="bg-white flex flex-col gap-3 w-full p-4 ">
          <div className="flex flex-row items-center justify-end gap-3 w-full">
            <Button className="bg-red-200 rounded-md shadow-md">
              <FaLock className="mr-2 h-4 w-4 text-red-500" />
              Emergency Withdraw
            </Button>

            <Button
              className="bg-green-200 rounded-md shadow-md"
              onClick={handleOpenDialog}
            >
              New Save
            </Button>
          </div>
          <div className="w-full flex flex-row flex-wrap gap-10 items-center justify-evenly pt-5">
            {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((item, i) => {
              if (i % 3 === 0) {
                return <LockedSaves key={i} />;
              } else if (i % 2 === 0) {
                return <TimeEndedSaves key={i} />;
              } else {
                return <UnlockedSaves key={i} />;
              }
            })}
          </div>
        </div>
      </TabsContent>
      <TabsContent value="txns">
        <div className="bg-white flex flex-col gap-3 w-full p-4 ">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">#</TableHead>
                <TableHead className="w-[200px]">Transaction Hash</TableHead>
                <TableHead className="w-[200px]">Function</TableHead>
                <TableHead className="">Age</TableHead>
                <TableHead className="">Value (ETH)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((invoice) => (
                <TableRow key={invoice["#"]}>
                  <TableCell className="font-medium">{invoice["#"]}</TableCell>
                  <TableCell className="w-fit">
                    <div className="py-1 px-2 bg-gray-100 flex items-center rounded-md justify-start w-fit">
                      <span className="font-semibold text-black text-sm">
                        {invoice.TxnHash}
                      </span>
                      <IoCopy
                        className="ml-2 h-4 w-4 text-blue-400 cursor-pointer"
                        title="Copy"
                      />
                      <TiExport
                        className="ml-3 h-4 w-4 text-green-800 cursor-pointer"
                        title="explorer"
                      />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="p-1 text-gray-800 bg-gray-400 rounded-md font-medium text-center">
                      {invoice.function}
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{invoice.time}</TableCell>
                  <TableCell className="font-medium">{invoice.value}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </TabsContent>
      <Create isOpen={isOpen} onClose={handleCloseDialog} />
    </Tabs>
  );
};
