import React from "react";
import { useDispatch } from "react-redux";
import './Styles.css'

const TypingSpeedResetModal = (props) => {
  const {cursorPosition , setCursorPosition} = props;
  const dispatch = useDispatch();
  const handleYesButton = () => {
    dispatch({ type: "typingSpeed/toggleReset", payload: true });
    dispatch({ type: "typingSpeed/toggleResetModal", payload: false });
  };
  const handleNoButton = () => {
    dispatch({ type: "typingSpeed/toggleResetModal", payload: false });  
    setCursorPosition(cursorPosition)
  };

  return (
    <div className="reset-modal">
      <h1>Are you sure you want to reset?</h1>
      <div className="button-container">
        <button className="button" onClick={handleYesButton}>
          Yes
        </button>
        <button className="button" onClick={handleNoButton}>
          No
        </button>
      </div>
    </div>
  );
};

export default TypingSpeedResetModal;
