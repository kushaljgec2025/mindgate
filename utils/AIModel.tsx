import { GoogleGenAI, Type } from "@google/genai";

export const generateAIQuestions = async (config: {
  stream: string;
  topics: string[];
  difficulty: string;
  questionCount: number;
}) => {
  const ai = new GoogleGenAI({
    apiKey: "AIzaSyB10BE11wLqBmYy86BJTTm9jD1wouOynuQ",
  });

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `
You are an expert in generating GATE exam preparation content. 

Generate ${
      config.questionCount
    } high-quality multiple-choice questions based on **previous year GATE questions**. 

Focus on the following parameters:

- **Stream:** ${config.stream}
- **Topics:** ${config.topics.join(", ")}
- **Difficulty Level:** ${config.difficulty}
- **Format:** Each question should include:
  1. The question text
  2. Four options (clearly marked)
  3. The correct answer index (0-based)
  4. A clear and concise explanation
  5. Topic and difficulty level

Return the response as a **valid JSON array**.
Make sure the questions are original but inspired by the type and style of previous GATE exam questions.
Ensure the output is strictly in JSON format with no extra commentary.
`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            id: { type: Type.INTEGER },
            question: { type: Type.STRING },
            options: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
            correct: { type: Type.INTEGER },
            explanation: { type: Type.STRING },
            topic: { type: Type.STRING },
            difficulty: {
              type: Type.STRING,
              enum: ["Easy", "Medium", "Hard"],
            },
          },
          required: [
            "id",
            "question",
            "options",
            "correct",
            "explanation",
            "topic",
            "difficulty",
          ],
          propertyOrdering: [
            "id",
            "question",
            "options",
            "correct",
            "explanation",
            "topic",
            "difficulty",
          ],
        },
      },
    },
  });

  return response.text;
};
