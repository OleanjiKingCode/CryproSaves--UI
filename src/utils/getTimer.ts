import { useReadContract } from 'wagmi';
import { LockupABI, LockupAddress } from '@/constants/LockupData';

interface TimeLeftType {
  days?: number;
  hours?: number;
  minutes?: number;
  seconds?: number;
}

export const GetTimer = () => {
  const { data: emergencyTime } = useReadContract({
    abi: LockupABI,
    address: LockupAddress,
    functionName: 'emergencyUnlockTimestamp',
  });

  const calculateTimeLeft = (emergencyTime: number): TimeLeftType => {
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
    }
    return timeLeft;
  };

  return { result: calculateTimeLeft(Number(emergencyTime)) };
};


