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

export const Sections = () => {
  const [active, setActive] = useState("saves");

  const invoices = [
    {
      invoice: "1",
      paymentStatus: "Paid",
      totalAmount: "$250.00",
      paymentMethod: "Credit Card",
    },
    {
      invoice: "2",
      paymentStatus: "Pending",
      totalAmount: "$150.00",
      paymentMethod: "PayPal",
    },
    {
      invoice: "3",
      paymentStatus: "Unpaid",
      totalAmount: "$350.00",
      paymentMethod: "Bank Transfer",
    },
    {
      invoice: "4",
      paymentStatus: "Paid",
      totalAmount: "$450.00",
      paymentMethod: "Credit Card",
    },
    {
      invoice: "5",
      paymentStatus: "Paid",
      totalAmount: "$550.00",
      paymentMethod: "PayPal",
    },
    {
      invoice: "6",
      paymentStatus: "Pending",
      totalAmount: "$200.00",
      paymentMethod: "Bank Transfer",
    },
    {
      invoice: "7",
      paymentStatus: "Unpaid",
      totalAmount: "$300.00",
      paymentMethod: "Credit Card",
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
                <TableHead className="w-[100px]">Invoice</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Method</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((invoice) => (
                <TableRow key={invoice.invoice}>
                  <TableCell className="font-medium">
                    {invoice.invoice}
                  </TableCell>
                  <TableCell>{invoice.paymentStatus}</TableCell>
                  <TableCell>{invoice.paymentMethod}</TableCell>
                  <TableCell className="text-right">
                    {invoice.totalAmount}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </TabsContent>
    </Tabs>
  );
};
