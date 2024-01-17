import { useState, useEffect} from "react";

const Timer = ({ time, submitHandler }) => {
  const [seconds, setSeconds] = useState(time * 60);
  const [isTimeOut, setIsTimeOut] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSeconds((prevSeconds) => {
        if (prevSeconds > 0) {
          return prevSeconds - 1;
        } else {
          console.log("timer expired");
          clearInterval(intervalId);
          setIsTimeOut(true);
          // submitHandler();
          return 0;
        }
      });
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [time]);

  useEffect(() => {
    console.log("isTimeOut", isTimeOut);
    if (isTimeOut) {
      console.log("submitHandler called");
      submitHandler();
    }
    //eslint-disable-next-line
  }, [isTimeOut]);

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
    <div className="flex">
      <h1>Time remaining: &nbsp;</h1>
      <p>{formatTime(seconds)}</p>
    </div>
  );
};

export default Timer;

// import React, { useState, useEffect } from "react";

// const Timer = ({ time, submitHandler }) => {
//   const [seconds, setSeconds] = useState(time * 60);
//   const [timerExpired, setTimerExpired] = useState(false);

//   useEffect(() => {
//     if (seconds > 0 && !timerExpired) {
//       const intervalId = setInterval(() => {
//         if (seconds <= 0) {
//           console.log("timer expired");
//           setTimerExpired(true);
//           clearInterval(intervalId);
//         }
//         setSeconds((prevSeconds) => {
//           if (prevSeconds > 0) {
//             return prevSeconds - 1;
//           } else {
//             console.log("timer expired");
//             clearInterval(intervalId);
//             setTimerExpired(true);
//             return 0;
//           }
//         });
//       }, 1000);

//       return () => {
//         clearInterval(intervalId);
//       };
//     }
//   }, [seconds, timerExpired]);

//   useEffect(() => {
//     console.log("timerExpired", timerExpired);

//     if (timerExpired) {
//       submitHandler();
//     }
//   }, [timerExpired, submitHandler]);

//   const formatTime = (timeInSeconds) => {
//     const hours = Math.floor(timeInSeconds / 3600);
//     const minutes = Math.floor((timeInSeconds % 3600) / 60);
//     const seconds = timeInSeconds % 60;

//     const formatNumber = (num) => (num < 10 ? `0${num}` : num);

//     return `${formatNumber(hours)}:${formatNumber(minutes)}:${formatNumber(
//       seconds
//     )}`;
//   };

//   return (
//     <div className="flex">
//       <h1>Time remaining: &nbsp;</h1>
//       <p>{formatTime(seconds)}</p>
//     </div>
//   );
// };

// export default Timer;
