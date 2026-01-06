import { GoogleGenAI, Type } from "@google/genai";
import { QuizQuestion, Slide, ContentInput, FileData, GeneratedSlides } from "../types";

// Always use named parameter for API key and obtain it from process.env.API_KEY
const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY });
// Use gemini-3-flash-preview for general text and reasoning tasks
const modelName = "gemini-3-flash-preview";

const createPromptParts = (content: ContentInput) => {
  const parts: any[] = [];
  if (content.files) {
    content.files.forEach(file => {
      parts.push({
        inlineData: { mimeType: file.mimeType, data: file.data }
      });
    });
  }

  let textPart = "";
  if (content.text && content.text.trim()) {
    textPart += `\n\n[Reference Text]:\n${content.text}\n`;
  }
  if (content.url && content.url.trim()) {
    textPart += `\n\n[Reference URL]:\n${content.url}\n`;
    textPart += "\nPlease access the content of the URL above using Google Search to use as source material.\n";
  }
  if (content.userPrompt && content.userPrompt.trim()) {
     textPart += `\n\n[USER INSTRUCTIONS]:\n${content.userPrompt}\n`;
  }

  if (textPart) parts.push({ text: textPart });
  return parts;
};

const parseJsonFromText = (text: string): any => {
  try {
    return JSON.parse(text);
  } catch (e) {
    const jsonMatch = text.match(/```json\n?([\s\S]*?)\n?```/) || text.match(/```\n?([\s\S]*?)\n?```/);
    if (jsonMatch && jsonMatch[1]) {
      try { return JSON.parse(jsonMatch[1]); } catch (e2) {}
    }
    const firstBrace = text.indexOf('{');
    const lastBrace = text.lastIndexOf('}');
    if (firstBrace !== -1 && lastBrace !== -1) {
      try { return JSON.parse(text.substring(firstBrace, lastBrace + 1)); } catch (e3) {}
    }
    return null;
  }
};

/**
 * Generates a quiz based on input material
 */
export const generateQuiz = async (content: ContentInput): Promise<QuizQuestion[]> => {
  const ai = getAI();
  const parts = createPromptParts(content);
  const mcCount = content.multipleChoiceCount ?? 5;
  const subjectiveCount = content.subjectiveCount ?? 0;
  const difficulty = content.difficulty || 'Medium';

  parts.push({ 
    text: `\n\nTask: Generate a quiz based on the provided material. 
    Count: MC ${mcCount}, Subjective ${subjectiveCount}. 
    Difficulty: ${difficulty}. 
    Language: English.` 
  });

  const config: any = {
    temperature: 0.5,
    systemInstruction: `You are an expert educator. Generate a quiz in JSON format. 
    Each object in the array must follow this structure:
    {
      "id": number,
      "type": "multiple-choice",
      "question": "string",
      "options": ["string", "string", "string", "string"],
      "correctAnswerIndex": number,
      "explanation": "string"
    }
    If subjectiveCount > 0, use type "subjective" and "correctAnswer" field instead of options.
    Output ONLY a valid JSON array.`,
    responseMimeType: "application/json"
  };

  try {
    // Calling generateContent with model name and content as required
    const response = await ai.models.generateContent({ model: modelName, contents: { parts }, config });
    // Use .text property directly
    return parseJsonFromText(response.text) as QuizQuestion[];
  } catch (e) {
    console.error("Gemini API Error:", e);
    throw new Error("Error analyzing materials for quiz generation.");
  }
};

/**
 * Generates presentation slides based on input material
 */
export const generateSlides = async (content: ContentInput): Promise<GeneratedSlides> => {
  const ai = getAI();
  const parts = createPromptParts(content);
  const slideCount = content.slideCount || 10;

  parts.push({ text: `\n\nTask: Create approximately ${slideCount} slides based on the materials. Language: English.` });

  const config: any = {
    temperature: 0.4,
    systemInstruction: "You are a top-tier presentation designer. Create slide content in English. Output a JSON object: { subject: string, slides: [{ id, title, layout, content: [{type, value, table, chart}], speakerNotes }] }.",
    responseMimeType: "application/json"
  };

  try {
    // Calling generateContent with model name and content as required
    const response = await ai.models.generateContent({ model: modelName, contents: { parts }, config });
    // Use .text property directly
    return parseJsonFromText(response.text) as GeneratedSlides;
  } catch (e) {
    console.error("Gemini API Error:", e);
    throw new Error("Error creating presentation slides.");
  }
};