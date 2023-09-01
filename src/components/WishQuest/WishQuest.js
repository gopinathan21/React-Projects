import React, { useEffect, useState } from "react";
import "./WishQuest.css";
import axios from "axios";
import ReactPlayer from "react-player";
import API from "./D-id.json";

const WishQuest = () => {
  // const [secretNumber, setSecretNumber] = useState();
  const [guessedNumber, setGuessedNumber] = useState(null);
  const [invalidNumber, setInvalidNumber] = useState(false);
  const [generatedText, setGeneratedText] = useState(null);
  const [wish, setWish] = useState("");
  const [videoID, setVideoID] = useState(null);
  const [resultUrl, setResultUrl] = useState(null);
  const [Loading, setLoading] = useState(false);

  let timeOut;

  const createClip = async () => {
    const data = {
      driver_id: "uM00QMwJ9x",
      script: {
        type: "text",
        provider: {
          type: "microsoft",
          voice_id: "en-US-JennyNeural",
        },
        ssml: "false",
        input: `${generatedText}`,
      },
      config: {
        result_format: "mp4",
      },
      presenter_id: "amy-jcwCkr1grs",
    };

    try {
      const response = await axios.post("https://api.d-id.com/clips", data, {
        headers: {
          Authorization: API.key,
          accept: "application/json",
          "content-type": "application/json",
        },
      });

      console.log(response.data);
      setVideoID(response.data.id);
    } catch (error) {
      console.error(error);
      alert(error);
      return;
    }
  };

  const getClips = async () => {
    console.log("getcalled");
    try {
      const response = await axios.get(
        `https://api.d-id.com/clips/${videoID}`,
        {
          headers: {
            Authorization: API.key,
            accept: "application/json",
            "content-type": "application/json",
          },
        }
      );
      console.log(response.data.result_url);
      if (response.data.result_url !== undefined) {
        setResultUrl(response.data.result_url);
        setLoading(false);
        console.log(response.data.result_url, "got it");
        clearTimeout(timeOut);
        return;
      } else {
        console.log("else called");
        timeOut = setTimeout(() => {
          getClips();
        }, 10000);
      }
    } catch (error) {
      console.error(error);
      return;
    }
  };

  const Loader = () => {
    return (
      <div className="loader-container">
        <div className="loader"></div>
        <p>Video generation takes a minute please wait</p>
      </div>
    );
  };

  useEffect(() => {
    return () => {
      clearTimeout(timeOut);
    };
  }, [resultUrl]);

  const generateSecretNumber = () => {
    return Math.floor(Math.random() * 10) + 1; 
  };

  const handleInput = (e) => {
    setGuessedNumber(e.target.value);
  };

  const handleGuess = () => {
    if (!wish || !guessedNumber) {
      alert("Please enter all the fields.");
      return;
    }

    setInvalidNumber(false);
    if (!(guessedNumber >= 1 && guessedNumber <= 10)) {
      setInvalidNumber(true);
      return;
    }

    let secretNumber =  generateSecretNumber();
    setLoading(true);
    console.log(secretNumber)
    if (secretNumber === parseInt(guessedNumber, 10)) {
      setGeneratedText(
        `Great job! You nailed it! ${wish} is just around the corner. Keep that positivity going and get ready to celebrate!`
      );
    } else {
      setGeneratedText(
        `Hey you lose but, keep your spirits high! Your wish, ${wish}, will find its way to fruition. Stay hopeful and keep pushing forward. Good luck!`
      );
    }
  };

  const handleReset = () => {
    window.location.reload();
  };

  useEffect(() => {
    if (generatedText) {
      createClip();
    }
  }, [generatedText]);

  const captureWish = (e) => {
    setWish(e.target.value);
  };

  useEffect(() => {
    if (videoID !== null) {
      getClips();
    }
  }, [videoID]);

  return (
    <div className="main-container">
      <div className="wish-quest-form-container">
        <h1>
          Enter a wish, choose a number, and unlock the future. Guess right,
          watch wishes come true; guess wrong {":)"}, keep the spirit alive.
          It's all about numbers and dreams.
        </h1>
        {Loading ? (
          <Loader />
        ) : resultUrl ? (
          <>
            <ReactPlayer url={resultUrl} playing={true} controls={true} />
            <button className="btn" onClick={handleReset}>
              Reset
            </button>
          </>
        ) : (
          <>
            <div className="textarea-container">
              <textarea
                onChange={captureWish}
                className="textarea"
                placeholder="Enter your wish here..."
              ></textarea>
            </div>
            <div className="input-field">
              <input
                id="email"
                type="number"
                max={10}
                min={0}
                onChange={handleInput}
                required
              />
              <span id="email-span">Enter the secretNumber</span>
              <h3>
                Number Range is 1 to 10 : later harder level and probability
                will be introduced
              </h3>
              {invalidNumber && (
                <p
                  style={{
                    color: "red",
                    fontSize: "12px",
                    margin: "0",
                    padding: "0",
                  }}
                >
                  Please Enter a valid Email
                </p>
              )}
            </div>
            <button onClick={handleGuess} className="btn">
              Guess
            </button>
            {invalidNumber && <p>Enter a number from 1 to 10</p>}
          </>
        )}
      </div>
    </div>
  );
};

export default WishQuest;
