import { useEffect, useState } from "react";

export default function Timer({ setTimerExpired, seconds, setSeconds }) {
  useEffect(() => {
    const intervalSeconds = setInterval(() => {
      //console.log(seconds);
      setSeconds(seconds - 1);
    }, 1000);
    return () => clearInterval(intervalSeconds);
  }, [seconds]);
  return (
    <div className="">
      {seconds >= 0 ? (
        <h6
          className={seconds > 5 ? "p-3  " : "text-danger p-3"}
          style={{ textAlign: "right" }}
        >
          00:{seconds > 9 ? seconds : "0" + seconds}
        </h6>
      ) : (
        setTimerExpired("off")
      )}
    </div>
  );
}
