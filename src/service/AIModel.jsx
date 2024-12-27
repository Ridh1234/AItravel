import { GoogleGenerativeAI } from "@google/generative-ai";

// Use your API key (be cautious with exposing it in the frontend)
const apiKey = "AIzaSyC9m5Ohep026AWaV_l7oqbm2aj4SJV3xEI";
const genAI = new GoogleGenerativeAI(apiKey);

// Set up the generative model
const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash-exp",
});

// Define generation configuration
const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

// Start a new chat session
export const chatSession = model.startChat({
  generationConfig,
  history: [
    // Add initial conversation history if needed
  ],
});
