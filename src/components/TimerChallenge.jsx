import { useRef, useState } from "react";
import ResultModal from "./ResultModal";

const TimerChallenge = ({ title, targetTime }) => {
  const [timerStarted, setTimerStarted] = useState(false);
  const [timerExpired, setTimerExpired] = useState(false);

  const timer = useRef();
  const dialog = useRef();

  const handleStart = () => {
    setTimerStarted(true);

    timer.current = setTimeout(() => {
      setTimerExpired(true);
      dialog.current.open();
    }, targetTime * 1000);
  };

  const handleStop = () => {
    clearTimeout(timer.current);
  };

  return (
    <>
      <ResultModal ref={dialog} targetTime={targetTime} result="lost" />

      <section className="challenge">
        <h2>{title}</h2>
        <p className="challenge-time">
          {targetTime} second{targetTime > 1 ? "s" : ""}
        </p>
        <p>
          <button onClick={timerStarted ? handleStop : handleStart}>
            {timerStarted ? "Stop" : "Start"} Challenge
          </button>
        </p>
        <p className={timerStarted ? "active" : null}>
          {timerStarted ? "Time is running..." : "Timer inactive "}
        </p>
      </section>
    </>
  );
};

export default TimerChallenge;
