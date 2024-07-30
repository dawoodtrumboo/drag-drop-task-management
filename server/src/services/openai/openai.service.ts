import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_APU_KEY,
});

export const createSuggestion = async (prompt: string) => {
  try {
    const response = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: process.env.OPENAI_SYSTEM_TONE,
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      model: process.env.OPENAI_MODEL,
      temperature: 0.7,
      max_tokens: 500,
      stream: true,
    });
    return response;
    // return response.choices[0].message.content;
  } catch (error) {
    console.log("Error in generating the suggestion:", error);
    throw error;
  }
};
