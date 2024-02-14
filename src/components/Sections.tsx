import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { FaLock } from "react-icons/fa";
import { LockedSaves, UnlockedSaves } from "./Saves";
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

export const Sections = () => {
  const [active, setActive] = useState("saves");

  const invoices = [
    {
      "#": "1",
      TxnHash:
        "0x888166ebc4dfe361f323db776758a13917e2c555fb66be6b4b9421bb4139b173",
      time: "2 hrs ago",
      function: "Withdrawal",
    },
    {
      "#": "2",
      TxnHash:
        "0x7c6c99d3a174c1c27ee2eaa10aa8c935ad86d6a0daf472dd5b9acb5f41adb0d7",
      time: "30 days 20 hrs ago",
      function: "Create Save",
    },
    {
      "#": "3",
      TxnHash:
        "0x888166ebc4dfe361f323db776758a13917e2c555fb66be6b4b9421bb4139b173",
      time: "234days 11hrs ago",
      function: "Increased Lock Time",
    },
    {
      "#": "4",
      TxnHash:
        "0x7c6c99d3a174c1c27ee2eaa10aa8c935ad86d6a0daf472dd5b9acb5f41adb0d7",
      time: "344 days 1hr ago",
      function: "Emergency Withdrawal",
    },
    {
      "#": "5",
      TxnHash:
        "0x888166ebc4dfe361f323db776758a13917e2c555fb66be6b4b9421bb4139b173",
      time: "430 days 22 hrs ago",
      function: "Unlock Save",
    },
  ];
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
            <Button className="bg-green-200 rounded-md shadow-md">
              Create
            </Button>
          </div>
          <div className="w-full flex flex-row flex-wrap gap-10 items-center justify-evenly pt-5">
            {[0, 1, 2, 3, 4, 5, 6].map((item, i) => {
              if (i % 2 === 0) {
                return <LockedSaves key={i} />;
              } else return <UnlockedSaves key={i} />;
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
                        className="ml-2 h-4 w-4 text-gray-400 cursor-pointer"
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
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </TabsContent>
    </Tabs>
  );
};
