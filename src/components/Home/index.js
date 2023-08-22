import React, { useEffect } from "react";
import Stopwatch from "../stopwatch/index";
import ResumeModal from "../ResumeModal/resume";
import { useSelector, useDispatch } from "react-redux";
import { selectTotalTimeInSeconds } from "../../features/Timer";
import {useTheme} from "../../CustomHooks/Theme"

const Home = () => {
  const dispatch = useDispatch();
  const timer = useSelector((state) => state.timer);
  const totalTimeInSeconds = useSelector(selectTotalTimeInSeconds);
  const [toggle] = useTheme();
  const {
    inputMinutes,
    valueError,
    timerStarted,
    Success,
    pauseModal,
  } = timer;
 
 

  useEffect(() => {
    // console.log(inputMinutes)
    // Setting the initial value of totalTimeInSeconds after the component has mounted
    dispatch({ type: 'timer/totalTimeInSeconds', payload: inputMinutes * 60 });
  }, [inputMinutes,dispatch]);

  useEffect(() => {
    const updateTotalTime = () => {
      const updatedTotalTimeInSeconds = totalTimeInSeconds > 0 ? totalTimeInSeconds - 1 : 0;
      dispatch({ type: 'timer/totalTimeInSeconds', payload: updatedTotalTimeInSeconds });
      if (totalTimeInSeconds === 0) {
        stopTimer();
      }
    };

    let timerInterval = null;
    if (timerStarted) {
      timerInterval = setInterval(updateTotalTime, 1000);
    }

    return () => {
      clearInterval(timerInterval);
    };
  }, [timerStarted, totalTimeInSeconds, dispatch]);

  const handleInputChange = (e) => {
    let value = e.target.value;
    const newInputMinutes = value > 60 || value === "0"  ? 60 : value;
    dispatch({ type: 'timer/valueError', payload: value > 60 || value === "0" });
    dispatch({ type: 'timer/inputMinutes', payload: newInputMinutes });
    console.log(valueError)
  };

  const startTimer = () => {
    if (!timerStarted) {
      dispatch({ type: 'timer/timerStarted', payload: true });
      dispatch({ type: 'timer/pauseModal', payload: false });
    }
  };
  

  const pauseTimer = () => {
    if (timerStarted) {
      dispatch({ type: 'timer/timerStarted', payload: false });
      dispatch({ type: 'timer/pauseModal', payload: true });
    }
    setTimeout(()=>{
      dispatch({ type: 'timer/timerStarted', payload: true });
      dispatch({ type: 'timer/pauseModal', payload: false });
    },10000)
  };

  const stopTimer = () => {
    dispatch({ type: 'timer/timerStarted', payload: false });
    dispatch({ type: 'timer/inputMinutes', payload: 25 });
    dispatch({ type: 'timer/totalTimeInSeconds', payload: 1500 });
  };

  const timeInFormat = () => {
    const minutes = Math.floor(totalTimeInSeconds / 60);
    const seconds = totalTimeInSeconds % 60;
    return `${minutes < 10 ? "0" : ""}${minutes} : ${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div className="container">
      <div className="home-container">
        <div className="stopwatch-card">
          <button onClick={toggle}> Toggle Theme </button>
          <h1>
            Stay Focused for
            <input
              className="input-box"
              type="number"
              min="1"
              max="60"
              value={inputMinutes}
              onChange={handleInputChange}
              inputMode="numeric"
              disabled={timerStarted}
            />
            {inputMinutes === "1" ? "Minute" : "Minutes"}
          </h1>
          {valueError && <div className="error-dialog">Time is limited to 60 Minutes</div>}
          {pauseModal && <ResumeModal startTimer={startTimer} />}
          <Stopwatch
            initialMinutes={inputMinutes}
            timerStarted={timerStarted}
            timeInFormat={timeInFormat}
            startTimer={startTimer}
            stopTimer={stopTimer}
            pauseTimer={pauseTimer}
            Success={Success}
            pauseModal={pauseModal}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
