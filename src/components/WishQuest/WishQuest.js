import React, { useEffect, useState } from "react";
import OpenAI from "openai";

const WishQuest = () => {
  const OPENAI_API_KEY = "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";

  const openai = new OpenAI({
    apiKey: OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
  });

  const [secretNumber, setSecretNumber] = useState();
  const [guessedNumber, setGuessedNumber] = useState();
  const [invalidNumber, setInValidNumber] = useState(false);
  const [generatedText, setGeneratedText] = useState("");
  const [wish, setWish] = useState("");

  const generateSecretNumber = () => {
    const SN = Math.floor(Math.random() * 10);
    setSecretNumber(SN);
  };

  const generatePrompt = (success, wish) => {
    let prompt;
    switch (success) {
      case "Match":
        prompt = `Generate a text that conveys that the given wish "${wish}" will come true in the future.`;
        return prompt;
      case "Wrong":
        prompt = `Generate a text that offers consolation and suggests that the given wish "${wish}" may not happen in the future.`;
        return prompt;
      default:
        return "An error occurred";
    }
  };

  const getResponse = async (prompt) => {
    try {
      const completion = await openai.completions.create({
        model: "text-davinci-003",
        prompt: prompt,
        max_tokens: 30,
      });
      console.log(completion.choices[0].text);
      const generatedText = completion.choices[0].text;
      return generatedText;
    } catch (error) {
      console.error("Error generating text:", error);
      return "Error getting response from openAI";
    }
  };

  const getResponseFromOpenAI = (success, wish) => {
    let prompt;
    let response;
    switch (success) {
      case "Match":
        prompt = generatePrompt(success, wish);
        response = getResponse(prompt);
        return response;

      case "Wrong":
        prompt = generatePrompt(success, wish);
        response = getResponse(prompt);
        return response;
      default:
        return "An error occurred";
    }
  };

  const handleInput = (e) => {
    setGuessedNumber(e.target.value);
  };

  const handleGuess = (e) => {
    setInValidNumber(false);
    if (!(guessedNumber >= 1 && guessedNumber <= 10)) {
      return setInValidNumber(true);
    }
    generateSecretNumber();
    if (secretNumber === guessedNumber) {
      setGeneratedText(getResponseFromOpenAI("Match"));
      console.log(generatedText, "match")
    } else {
        setGeneratedText(getResponseFromOpenAI("Wrong"));
        console.log(generatedText, "match")
    }
  };

  const captureWish = (e) => {
    setWish(e.target.value);
  };

  useEffect(() => {}, []);

  return (
    <div className="main-container">
      <h1>
        Let me you wish and Guess the number If you correctly guess it , sure it
        will happen , otherwise{":)"}
      </h1>
      <textarea onChange={captureWish}></textarea>
      <div className="input-field">
        <input type="number" max={10} onChange={handleInput} />
      </div>
      <button onClick={handleGuess}>Guess</button>
      {invalidNumber && <p>Enter number from 1 to 10</p>}
    </div>
  );
};

export default WishQuest;
