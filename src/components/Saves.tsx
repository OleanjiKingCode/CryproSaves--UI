import { useState } from 'react';
import { FaLock, FaUnlock } from 'react-icons/fa';
import { RiTimer2Fill, RiTimerFlashFill } from 'react-icons/ri';
import { TbListDetails } from 'react-icons/tb';
import { Button } from './ui/button';
import { ImCancelCircle, ImCheckboxChecked } from 'react-icons/im';
import { Details } from './Details';
import { UnlockModal } from './UnlockModal';
import { IncreaseTimeModal } from './IncreaseTime';

export const LockedSaves = () => {
  const [detailsOpen, setDetailsOpen] = useState(false);

  const handleDetailsModal = () => {
    setDetailsOpen(true);
  };

  const handleCloseDetailsModal = () => {
    setDetailsOpen(false);
  };

  const [timeOpen, setTimeOpen] = useState(false);

  const handleTimeModal = () => {
    setTimeOpen(true);
  };

  const handleCloseTimeModal = () => {
    setTimeOpen(false);
  };

  return (
    <div className="bg-gray-50 flex flex-col items-center shadow-md justify-center gap-3 p-3 md:p-5 rounded-lg w-[300px] text-black">
      <div className="bg-red-200 rounded-md items-center w-full flex justify-center shadow-md py-10 ">
        <FaLock className="mr-2 h-14 w-14 text-red-600 " />
      </div>
      <div className="w-full flex flex-col justify-center items-start gap-4">
        <span className="font-semibold">Name Of Save</span>
        <div className="w-full flex-row flex items-center justify-between">
          <div className="py-1 px-2 bg-red-100 flex items-center rounded-md justify-end self-end">
            <ImCancelCircle className="mr-2 h-4 w-4 text-red-800 " />
            <span className="font-semibold text-black text-sm">Locked</span>
          </div>
          <div className="py-1 px-2 bg-green-100 flex items-center rounded-md justify-end self-end">
            <RiTimer2Fill className="mr-2 h-4 w-4 text-green-800 " />
            <span className="font-semibold text-black text-sm">
              30d:16h:10m:34s
            </span>
          </div>
        </div>
      </div>
      <div className="flex flex-row items-center justify-between w-full pt-3 text-black ">
        <Button
          className="bg-blue-200 hover:bg-blue-600 rounded-md shadow-md font-semibold text-black"
          onClick={handleTimeModal}
        >
          <RiTimerFlashFill className="mr-2 h-4 w-4 text-blue-500 text-sm" />
          Increase Time
        </Button>
        <Button
          className="bg-green-200  hover:bg-green-600 rounded-md shadow-md text-sm font-semibold text-black"
          onClick={handleDetailsModal}
        >
          <TbListDetails className="mr-2 h-4 w-4 text-green-800 text-sm" />
          Details
        </Button>
      </div>
      <Details onClose={handleCloseDetailsModal} isOpen={detailsOpen} />
      <IncreaseTimeModal onClose={handleCloseTimeModal} isOpen={timeOpen} />
    </div>
  );
};

export const UnlockedSaves = () => {
  const [detailsOpen, setDetailsOpen] = useState(false);

  const handleDetailsModal = () => {
    setDetailsOpen(true);
  };

  const handleCloseDetailsModal = () => {
    setDetailsOpen(false);
  };

  const [unlockModalOpen, setUnlockModalOpen] = useState(false);

  const handleUnlockModal = () => {
    setUnlockModalOpen(true);
  };

  const handleCloseUnlockModal = () => {
    setUnlockModalOpen(false);
  };

  return (
    <div className="bg-gray-50 flex flex-col items-center justify-center gap-3 shadow-md p-5 rounded-lg w-[300px]">
      <div className="bg-green-200 rounded-md items-center w-full flex justify-center shadow-md py-10 ">
        <FaUnlock className="mr-2 h-14 w-14 text-green-600 " />
      </div>
      <div className="w-full flex flex-col justify-center items-start gap-2">
        <span className="font-semibold">Name Of Save</span>
        <div className="w-full flex-row flex items-center justify-between">
          <div className="py-1 px-2 bg-red-100 flex items-center rounded-md justify-end self-end">
            <ImCancelCircle className="mr-2 h-4 w-4 text-red-800 " />
            <span className="font-semibold text-black text-sm">Locked</span>
          </div>
          <div className="py-1 px-2 bg-green-100 flex items-center rounded-md justify-end self-end">
            <RiTimer2Fill className="mr-2 h-4 w-4 text-green-800 " />
            <span className="font-semibold text-black text-sm">Time Ended</span>
          </div>
        </div>
      </div>
      <div className="flex flex-row items-center justify-between w-full pt-5 ">
        <Button
          className="bg-blue-200 hover:bg-blue-600 rounded-md shadow-md text-sm font-semibold text-black"
          onClick={handleDetailsModal}
        >
          <TbListDetails className="mr-2 h-4 w-4 text-blue-500 text-sm" />
          Details
        </Button>
        <Button
          className="bg-green-200 hover:bg-green-600 rounded-md shadow-md font-semibold text-black"
          onClick={handleUnlockModal}
        >
          <FaUnlock className="mr-2 h-4 w-4 text-green-500 text-sm" />
          Unlock
        </Button>
        {/* <Button className="bg-blue-200 rounded-md shadow-md">
          <RiTimerFlashFill className="mr-2 h-4 w-4 text-blue-500 text-sm" />
          Increase Time
        </Button> */}
      </div>
      <UnlockModal onClose={handleCloseUnlockModal} isOpen={unlockModalOpen} />
      <Details onClose={handleCloseDetailsModal} isOpen={detailsOpen} />
    </div>
  );
};

export const TimeEndedSaves = () => {
  const [detailsOpen, setDetailsOpen] = useState(false);

  const handleDetailsModal = () => {
    setDetailsOpen(true);
  };

  const handleCloseDetailsModal = () => {
    setDetailsOpen(false);
  };
  return (
    <div className="bg-gray-50 flex flex-col items-center justify-center gap-3 shadow-md p-5 rounded-lg w-[300px]">
      <div className="bg-green-200 rounded-md items-center w-full flex justify-center shadow-md py-10 ">
        <FaUnlock className="mr-2 h-14 w-14 text-green-600 " />
      </div>
      <div className="w-full flex flex-col justify-center items-start gap-4">
        <span className="font-semibold">Name Of Save</span>
        <div className="w-full flex-row flex items-center justify-between">
          <div className="py-1 px-2 bg-green-100 flex items-center rounded-md justify-end self-end">
            <ImCheckboxChecked className="mr-2 h-4 w-4 text-green-800 " />
            <span className="font-semibold text-black text-sm">Unlocked</span>
          </div>
          <div className="py-1 px-2 bg-green-100 flex items-center rounded-md justify-end self-end">
            <RiTimer2Fill className="mr-2 h-4 w-4 text-green-800 " />
            <span className="font-semibold text-black text-sm">Time Ended</span>
          </div>
        </div>
      </div>
      <div className="flex flex-row items-center justify-between w-full pt-3 ">
        <Button
          className="bg-blue-200 hover:bg-blue-600 rounded-md shadow-md text-sm w-full font-semibold text-black"
          onClick={handleDetailsModal}
        >
          <TbListDetails className="mr-2 h-4 w-4 text-blue-500 text-sm" />
          Details
        </Button>
      </div>
      <Details onClose={handleCloseDetailsModal} isOpen={detailsOpen} />
    </div>
  );
};
