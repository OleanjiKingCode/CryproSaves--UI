import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RiTimer2Fill, RiTimerFlashFill } from "react-icons/ri";
import { useState } from "react";
import { FaLock } from "react-icons/fa";
import { TbListDetails } from "react-icons/tb";
import { LockedSaves, UnlockedSaves } from "./Saves";

export const Sections = () => {
  const [active, setActive] = useState("saves");
  return (
    <Tabs
      defaultValue="saves"
      className="w-full px-16 py-10"
      onValueChange={(val) => setActive(val)}
    >
      <TabsList className="grid w-full grid-cols-3 gap-2 bg-gray-100">
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
        <TabsTrigger
          value="stats"
          className={`${
            active === "stats" ? "bg-white" : "bg-none"
          } rounded-lg`}
        >
          Stats
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
        <Card className="bg-white">
          <CardHeader>
            <CardTitle>Password</CardTitle>
            <CardDescription>
              Change your password here. After saving, you'll be logged out.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="current">Current password</Label>
              <Input id="current" type="password" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="new">New password</Label>
              <Input id="new" type="password" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save password</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="stats">
        <Card className="bg-white">
          <CardHeader>
            <CardTitle>Password</CardTitle>
            <CardDescription>
              Change your password here. After saving, you'll be logged out.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="current">Current password</Label>
              <Input id="current" type="password" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="new">New password</Label>
              <Input id="new" type="password" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save password</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
};
