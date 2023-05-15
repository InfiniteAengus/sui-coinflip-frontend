export const shortenAddress = (addr: string) => {
  return addr.slice(0, 4) + "..." + addr.slice(-4);
};

export const getTimeHistoryString = (time: number) => {
  time = (Date.now() - time);
  const ONE_MINUTE = 1000 * 60;
  const ONE_HOUR = ONE_MINUTE * 60;
  const ONE_DAY = ONE_HOUR * 24;
  if (time >= ONE_DAY * 5) return "few days ago";
  if (time >= ONE_DAY * 2) return `${Math.floor(time / ONE_DAY)} days ago`;
  if (time > ONE_DAY) return `1 day ago`;
  if (time >= ONE_HOUR) {
    let t = Math.floor(time / ONE_HOUR);
    return `${t} hour${t != 1 ? "s" : ""} ago`;
  }
  if (time >= ONE_MINUTE) {
    let t = Math.floor(time / ONE_MINUTE);
    return `${t} minute${t != 1 ? "s" : ""} ago`;
  }
  let t = Math.floor(time / 1000);
  return `${t} second${t != 1 ? "s" : ""} ago`;
};
