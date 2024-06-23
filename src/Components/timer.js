import { useEffect, useState } from "react";

export default function Timer({ setTimerExpired }) {
  const [seconds, setSeconds] = useState(15);

  useEffect(() => {
    const intervalSeconds = setInterval(() => {
      console.log(seconds);
      setSeconds(seconds - 1);
    }, 1000);
    return () => clearInterval(intervalSeconds);
  }, [seconds]);
  return (
    <div>
      {seconds >= 0 ? (
        <p className={seconds > 5 ? "text-white" : "text-danger"}>
          00:{seconds > 9 ? seconds : "0" + seconds}
        </p>
      ) : (
        setTimerExpired(false)
      )}
    </div>
  );
}
