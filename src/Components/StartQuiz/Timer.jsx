import React, { useState, useEffect } from "react";

const Timer = ({ time, submitHandler }) => {
  const [seconds, setSeconds] = useState(time * 60 * 60);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds - 1);
    }, 1000);

    return () => {
      clearInterval(intervalId);
      // submitHandler();
    };
  }, []);

  const formatTime = (timeInSeconds) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;

    const formatNumber = (num) => (num < 10 ? `0${num}` : num);

    return `${formatNumber(hours)}:${formatNumber(minutes)}:${formatNumber(
      seconds
    )}`;
  };

  return (
    <div>
      <h1>Timer</h1>
      <p>{formatTime(seconds)}</p>
    </div>
  );
};

export default Timer;
