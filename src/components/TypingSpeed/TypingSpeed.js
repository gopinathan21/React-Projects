import React, { useEffect, useRef, useState ,useLayoutEffect} from "react";
import TypingSpeedResetModal from "./ResetModal/TypingSpeedResetModal";
import { useDispatch, useSelector } from "react-redux";
import "./Styles.css";
import Timer from "./TimerComponent/TimerComponent";

const TypingSpeed = () => {
  const inputRef = useRef(null);
  const [time, setTime] = useState(0);
  const [timerStarted, setTimerStarted] = useState(false);
  const typingState = useSelector((state) => state.typingSpeed);
  const { reset, resetModal } = typingState;
  const [typedLetters, setTypedLetters] = useState("");
  const [toType, setToType] = useState("Can you write this");
  const dispatch = useDispatch();
  const [mistakeCount, setMistakeCount] = useState(0);
  const [cursorPosition, setCursorPosition] = useState(0);
  let localMistakeVariable = 0;

  const start = () => {
    setTimerStarted(true);
  };

  const fetchData = async () => {
    try {
      setTypedLetters("");
      const response = await fetch("http://localhost:3006/randomParagraph");
      const data = await response.json();
      const paragraph = await data.paragraph;
      setToType(paragraph);
    } catch (e) {
      console.log(e);
    }
  };
  const handleTextRender = (typedLetters) => {
    const textElement = document.getElementById("text-box-div");
    if (textElement !== null) {
      const spanElements = textElement.querySelectorAll("span");
      spanElements.forEach((span) => {
        span.remove();
      });
    }
    for (let i = 0; i <= typedLetters.length; i++) {
      console.log(inputRef.current.selectionStart,"from loop")
      const cursorPosition = inputRef.current.selectionStart;
      setCursorPosition(cursorPosition);
      let className = "spanText valid";
      if (typedLetters !== "" && typedLetters[i] !== toType[i]) {
        className = "spanText in-valid";
        localMistakeVariable++;
      }
      if (i === cursorPosition) {
        className = `${className} current-word`;
      }

      const childElement = document.createElement("span");
      childElement.className = className;
      childElement.textContent = typedLetters[i];
      textElement.appendChild(childElement);
    }
    if (localMistakeVariable > mistakeCount) {
      setMistakeCount(localMistakeVariable);
    }
  };

  useEffect(() => {
    fetchData();
    setCursorPosition(inputRef.current.selectionStart);
    setMistakeCount(0);
  }, []);

  useEffect(() => {
    dispatch({ type: "typingSpeed/toggleReset", payload: false });
    setTime(false);
    setTimerStarted(false);
    handleReset();
  }, [reset]);

  useEffect(() => {
    handleTextRender(typedLetters);
    if (typedLetters === toType) {
      setTimerStarted(false);
    }
  }, [typedLetters, toType]);

  useEffect(() => {
    if (!resetModal) {
      inputRef.current.selectionStart = cursorPosition;
      inputRef.current.focus()
      handleTextRender(typedLetters);
    }
  }, [resetModal]);
  
  const handleresetModal = () => {
    dispatch({ type: "typingSpeed/toggleResetModal", payload: true });
  };

  const handleReset = () => {
    setToType("");
    setTypedLetters("");
    fetchData();
  };

  const handleInput = (e) => {
    start();
    setTypedLetters(e.target.value);
  };
  const handleKeyDown = (e) => {
    if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
      handleTextRender(typedLetters);
    }
  };

  return (
    <div className="container">
      {resetModal ? (
        <TypingSpeedResetModal
          cursorPosition={cursorPosition}
          setCursorPosition={setCursorPosition}
        />
      ) : (
        <div>
          <Timer
            time={time}
            setTime={setTime}
            timerStarted={timerStarted}
            setTimerStarted={setTimerStarted}
          />
          <div className="Typing_Container">
            <h1 className="heading">{toType}</h1>
            <div
              className="text-box-div"
              onClick={() => inputRef.current.focus()}
              id="text-box-div"
            >
              <input
                className="input"
                ref={inputRef}
                onChange={handleInput}
                value={typedLetters}
                onKeyDown={handleKeyDown}
                maxLength={toType.length}
                onPaste={(e) => {
                  alert("Don't copy paste 👊");
                  e.preventDefault();
                }}
              />
            </div>
          </div>
          <div className="button-container">
            <button className="button" onClick={handleresetModal}>
              Reset Paragraph
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TypingSpeed;
