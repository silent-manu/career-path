import { useEffect, useState } from "react";

export default function QuestionTimer({ timer, onTimeout, mode }) {
  const [remainingTime, setRemainingTime] = useState(timer);

  useEffect(() => {
    const timeout = setTimeout(onTimeout, timer);

    return () => {
      clearTimeout(timeout);
    };
  }, [timer, onTimeout]);

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime((prevRemainingTime) => prevRemainingTime - 100);
    }, 100);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <progress
      id="question-time"
      max={timer}
      value={remainingTime}
      className={mode}
    />
  );
}
