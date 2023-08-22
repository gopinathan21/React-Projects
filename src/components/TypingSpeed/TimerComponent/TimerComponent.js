import react, { useEffect, useState } from "react";

const Timer = (props) => {
  const { time, setTime, timerStarted, setTimerStarted } = props;
  let timerInterval = null;
  const pause = () => {
    setTimerStarted(false);
    clearInterval(timerInterval);
  };
  const updateTimer = () => {
    setTime(time + 1);
  };

  useEffect(() => {
    if (timerStarted && timerStarted) {
      timerInterval = setInterval(updateTimer, 1000);
    }
    return () => {
      clearInterval(timerInterval);
    };
  }, [time, timerStarted]);

  const timeForamatter = () => {
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;
    return `${minutes < 10 ? "0" : ""}${minutes}: ${
      seconds < 10 ? "0" : ""
    }${seconds}`;
  };

  return (
    <div>
      {timeForamatter()}
    </div>
  );
};

export default Timer;
