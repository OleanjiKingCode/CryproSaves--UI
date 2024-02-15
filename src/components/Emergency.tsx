import React from "react";
import { Popover, PopoverContent } from "./ui/popover";

export const Emergency = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  return (
    <Popover open={isOpen} modal onOpenChange={onClose}>
      <PopoverContent>The emergency withdrawal for this platform is due in 40days 21hrs 10mins.</PopoverContent>
    </Popover>
  );
};
