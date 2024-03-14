import { useReadContract } from 'wagmi';
import {
  LockupABI,
  LockupABIFull,
  LockupAddress,
} from '@/constants/LockupData';

interface TimeLeftType {
  days?: number;
  hours?: number;
  minutes?: number;
  seconds?: number;
}

export const calculateTimeLeft = (
  emergencyTime: number,
  finishedStatus: boolean
): TimeLeftType => {
  const currentTime = Math.floor(new Date().getTime() / 1000);
  const difference = emergencyTime - currentTime;
  let timeLeft = {};

  if (difference > 0) {
    const numDaysLeft = Math.floor(difference / 86400);
    const remainderSecs = difference % 86400;
    const numHoursLeft = Math.floor(remainderSecs / 3600);
    const remainderMins = remainderSecs % 3600;
    const numMinsLeft = Math.floor(remainderMins / 60);
    const numSecsLeft = remainderSecs % 60;

    timeLeft = {
      days: numDaysLeft,
      hours: numHoursLeft,
      minutes: numMinsLeft,
      seconds: numSecsLeft,
    };
  } else {
    // Target time has passed; reset all values to zero
    timeLeft = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
    finishedStatus = true;
  }
  return timeLeft;
};
export const GetTimer = () => {
  let finishedStatus = false;
  const { data: emergencyTime } = useReadContract({
    abi: LockupABIFull,
    address: '0xf80ec3ffC2DB71E482e9B4A4032536d44ffb7CBf',
    functionName: 'emergencyUnlockTimestamp',
  });

  return {
    result: calculateTimeLeft(Number(emergencyTime), finishedStatus),
    status: finishedStatus,
  };
};
