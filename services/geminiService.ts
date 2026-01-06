
import { GoogleGenAI, Type } from "@google/genai";
import { UserInfo } from "../types";

const getSystemInstruction = (userInfo: UserInfo) => `
You are a professional **AI Transformation (AX) Consultant** for AX-ONE. 
Your goal is to assess the user's "AI Competency" and "Workplace Readiness" to recommend the optimal AI tools and strategic learning paths.
Conduct a deep-dive **7-question interview** that feels like a high-level strategic session—sophisticated, yet encouraging and professional.

**User Profile** (For context only; do NOT explicitly mention these in the opening):
- Industry: ${userInfo.industry}
- Job Role: ${userInfo.job}
- Experience: ${userInfo.years}
- Gender: ${userInfo.gender}
- Birth Year: Born in ${userInfo.birthYear}

**[IMPORTANT] Step Protocol**
- **Progress Tracking**: Prefix every main diagnostic question with the tag \`[[STEP:n]]\` (where n is 1~8).
- **Rules**:
  1. Only use \`[[STEP:n]]\` when asking a **new primary diagnostic question**.
  2. **NEVER** use the tag for follow-up questions or when the user's answer needs more detail.
  3. If the user asks a question, provide a professional answer and then append the \`___RESUME_BTN___\` tag to guide them back.
  4. Always use \`[[STEP:8]]\` for the final wrap-up before the quiz.

**[Tone & Style]**
- **SaaS Professional**: Use clean, modern business English with a "Purple/Dark" premium aesthetic in mind (e.g., "Insightful perspective," "Strategic integration").
- **Concise & Visual**: Keep introductions brief and use line breaks to make questions stand out.
- **Emphasis**: Always **bold the main question content (e.g., **...**)**.
- **Interactivity**: For every main question, provide 3~4 curated response options after the \`___OPTIONS___\` tag.

**[Diagnostic Roadmap]**

1. **[[STEP:1]] Current Status (Opening)**: 
   - **Opening**: "Hello! It's a pleasure to partner with you today. This assessment consists of **7 strategic questions and takes about 3 minutes**. Let's begin!"
   - **Question**: "**Have you integrated Generative AI into your daily workflow? If so, which specific tools (e.g., ChatGPT, Claude, Midjourney) have you explored?**"
2. **[[STEP:2]] Frequency & Depth**: 
   - "**How frequently do you engage with these systems, and which core tasks (e.g., strategic drafting, data analysis, coding) do they assist with?**"
3. **[[STEP:3]] Attitude & Sentiment**: 
   - "**Honestly, how do you perceive the impact of AI on your professional field?** (e.g., A powerful co-pilot for innovation vs. A source of job security concerns)"
4. **[[STEP:4]] Strategic Needs**: 
   - "**Is there a specific professional process that feels so redundant or taxing that you wish an AI agent could manage it entirely?**"
5. **[[STEP:5]] Human-Centric Boundaries**: 
   - "**Conversely, which areas of your work do you believe must remain 'Strictly Human' and should never be delegated to an AI?**"
6. **[[STEP:6]] Tech Awareness**: 
   - "**Do you actively track the latest AI breakthroughs and trends, or do you find the current pace of innovation overwhelming?**"
7. **[[STEP:7]] Vision for Growth**: 
   - "**What is your ultimate objective for mastering AI in the future?** (e.g., Achieving peak efficiency, leading creative breakthroughs, or career advancement)"

**Closing**
8. **[[STEP:8]] Wrap-up**: 
   - "I've gained some truly valuable insights from our session! Finally, let's complete a **brief AI Competency Quiz** to finalize your personalized AX Report. Ready? 🎉"
`;

const getDiagnosisPrompt = (quizScore: number) => `
[SYSTEM COMMAND: GENERATE AX DIAGNOSIS REPORT]
Generate a comprehensive AX analysis report based on the preceding interview and the user's AI Knowledge Quiz Score (${quizScore}/8).

**[Analysis Tasks]**
1. **AI Literacy**: Calculate \`literacy_score\` (0-100) and determine levels (Novice to Expert).
2. **AX Level**: Assign an \`ax_one_level\` (Planet, Star, Cluster, Galaxy, Universe).
3. **Mindset Metrics**: Score 8 metrics (1-5 scale) including aiAttitude, aiFear (Inverted: 5 is No Fear), aiValue, etc.

**[Feedback Formatting Rules - CRITICAL]**
The 'feedback' field MUST be a single string containing well-structured Markdown.
- Use \`## 1. Diagnosis Summary\`, \`## 2. Recommended AI Stack\`, \`## 3. Optimal Learning Path\`, and \`## 4. Strategic Advice\` as headers.
- Use bullet points (\`- \`) for lists.
- Use bold (\`**\`) for key terms.
- DO NOT use literal \`\\n\` strings; use actual newline characters.

**[Output JSON Schema]**
Return raw JSON only.
{
    "literacy_score": number,
    "literacy_level": "Novice" | "Intermediate" | "Advanced" | "Expert",
    "ax_one_level": "AX Planet" | "AX Star" | "AX Cluster" | "AX Galaxy" | "AX Universe",
    "mindset_scores": {
        "aiAttitude": number,
        "aiFear": number,
        "aiValue": number,
        "easeOfUse": number,
        "perceivedUtility": number,
        "selfEfficacy": number,
        "aiAcceptance": number,
        "axParticipation": number
    },
    "feedback": "string (Markdown format)"
}
`;

class GeminiService {
  private ai: GoogleGenAI | null = null;
  private chatSession: any = null;

  private getAI() {
    if (!this.ai) {
      this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    }
    return this.ai;
  }

  public initializeChat(userInfo: UserInfo) {
    const ai = this.getAI();
    this.chatSession = ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: getSystemInstruction(userInfo),
        temperature: 0.7,
      },
    });
  }

  public async *sendMessageStream(message: string): AsyncGenerator<string, void, unknown> {
    if (!this.chatSession) throw new Error("Chat session not initialized");
    try {
      const result = await this.chatSession.sendMessageStream({ message });
      for await (const chunk of result) {
        if (chunk.text) yield chunk.text;
      }
    } catch (error) {
      console.error("Gemini stream error:", error);
      throw error;
    }
  }

  public async generateFinalDiagnosis(quizScore: number): Promise<string> {
    if (!this.chatSession) throw new Error("No active chat session found.");
    try {
      const response = await this.chatSession.sendMessage({ 
        message: getDiagnosisPrompt(quizScore),
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              literacy_score: { type: Type.INTEGER },
              literacy_level: { type: Type.STRING },
              ax_one_level: { 
                type: Type.STRING,
                enum: ['AX Planet', 'AX Star', 'AX Cluster', 'AX Galaxy', 'AX Universe']
              },
              mindset_scores: {
                type: Type.OBJECT,
                properties: {
                    aiAttitude: { type: Type.NUMBER },
                    aiFear: { type: Type.NUMBER },
                    aiValue: { type: Type.NUMBER },
                    easeOfUse: { type: Type.NUMBER },
                    perceivedUtility: { type: Type.NUMBER },
                    selfEfficacy: { type: Type.NUMBER },
                    aiAcceptance: { type: Type.NUMBER },
                    axParticipation: { type: Type.NUMBER },
                },
                required: ["aiAttitude", "aiFear", "aiValue", "easeOfUse", "perceivedUtility", "selfEfficacy", "aiAcceptance", "axParticipation"]
              },
              feedback: { type: Type.STRING }
            },
            required: ["literacy_score", "literacy_level", "ax_one_level", "mindset_scores", "feedback"]
          }
        }
      });
      return response.text || "";
    } catch (error) {
      console.error("Final diagnosis error:", error);
      throw error;
    }
  }
}

export const geminiService = new GeminiService();
