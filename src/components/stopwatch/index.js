import React, { Component } from "react";
import "./index.css";

class Stopwatch extends Component {


  render() {

   const {timerStarted,
       timeInFormat,
        startTimer,
        stopTimer, 
        pauseTimer,Success}  = this.props

    return (
      <div className="watch-container">
        <div>
          <h1 className="Timer">{timeInFormat()}</h1>
        </div>
        <div className="button-container">
          {Success ? <p className="success-text"> Hey you've done it, Take a break</p> : ""}

          {timerStarted ? (
            <button className="pause-button" onClick={pauseTimer}>
              Pause
            </button>
          ) : (
            <button className="start-button" onClick={startTimer}>
              Start
            </button>
          )}

          <button className="stop-button" onClick={stopTimer}>
            Reset
          </button>
        </div>
      </div>
    );
  }
}

export default Stopwatch;
