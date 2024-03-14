export const formatTimestamp = (timestamp: number) => {
  const now = Math.floor(Date.now() / 1000); // Current Unix timestamp in seconds
  const difference = timestamp - now;

  const days = Math.floor(difference / (60 * 60 * 24));
  const hours = Math.floor((difference % (60 * 60 * 24)) / (60 * 60));
  const minutes = Math.floor((difference % (60 * 60)) / 60);
  const seconds = difference % 60;

  return `${days}d:${hours}h:${minutes}m:${seconds}s`;
};
