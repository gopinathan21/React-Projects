import OpenAI from "openai";

const OPENAI_API_KEY = "";

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

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