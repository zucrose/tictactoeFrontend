import { useEffect, useState } from "react";

export default function Timer(timerExpired, setTimerExpired) {
  const [seconds, setSeconds] = useState(30);

  useEffect(() => {
    const intervalSeconds = setInterval(() => {
      setSeconds(seconds - 1);
      return () => clearInterval(seconds);
    }, 1000);
  }, [seconds]);
  return (
    <div>{timerExpired ? <p>00:{seconds}</p> : setTimerExpired(false)}</div>
  );
}
