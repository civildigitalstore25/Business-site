import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

// Ensure the API key exists
const apiKey = process.env.GEMINI_API_KEY;

// Initialize the Google Gen AI client with the API key from environment variables
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

interface Message {
  role: "user" | "model";
  content: string;
}

interface ChatRequestBody {
  message: string;
  history?: Message[];
}

export async function POST(request: Request) {
  try {
    if (!ai) {
      console.error("GEMINI_API_KEY is not defined in the environment variables.");
      return NextResponse.json(
        { error: "API Key not configured. Please check your .env file." },
        { status: 500 }
      );
    }

    const body = (await request.json()) as ChatRequestBody;
    const userMessage = body.message?.trim();
    const chatHistory = body.history || [];

    if (!userMessage) {
      return NextResponse.json({ error: "Message content is required." }, { status: 400 });
    }

    // Format chat history and the new message for the Gemini API
    const contents = [
      ...chatHistory.map((msg) => ({
        role: msg.role === "user" ? "user" : "model",
        parts: [{ text: msg.content }],
      })),
      {
        role: "user",
        parts: [{ text: userMessage }],
      },
    ];

    const systemInstruction = `You are the friendly, polite, and professional AI customer support assistant for the Tomscope website. 
Your goal is to answer visitor queries accurately and direct them to Tomscope's services.

Here is important context about Tomscope:
1. WHAT WE DO: Tomscope is an IT Consulting & Software Development agency.
2. SERVICES OFFERED:
   - IT & Consulting: Technical direction, technology assessment, solution architecture, stack recommendations.
   - Website Development: Fast, responsive websites and web applications built with Next.js, React, Vite, Astro, and TypeScript.
   - Mobile App Development: Polish Flutter and React Native mobile applications.
   - Hosting: Reliable setup and deployment on Hostinger, GoDaddy, and AWS (includes domains, SSL, backups, and monitoring).
   - SEO Optimization: Technical SEO audits, page speed/Core Web Vitals tuning, sitemaps.
   - DevOps: CI/CD automation, GitHub Actions, Jenkins, SonarQube, staging deploys, and PostHog analytics integration.
   - WhatsApp API: Order updates, automation, support chats, template messaging.
   - Email Notification: Transactional emails (SMTP, Nodemailer, custom HTML templates).
   - Mobile OTP Integration: Secure phone-based verification via SMS OTP with rate limiting.

3. OUR PHILOSOPHY:
   We build code with Agile practices, using DRY (Don't Repeat Yourself) principles, keeping solutions simple and purposeful (UNDOAT), writing clean/maintainable files under 250 lines, and using reusable components.

4. CONTACT INFO & SOCIAL LINKS:
   - Email: info@tomscope.com
   - Phone: +91 88074 23228
   - Address: Vadakkumangudi, Thanjavur, Tamil Nadu, India
   - Website: https://tomscope.com
   - Facebook: https://www.facebook.com/tommscope
   - Instagram: https://www.instagram.com/tom_scope/
   - Justdial: https://www.justdial.com/Thanjavur/Tom-Scope-Vadakkumangudi/9999P4362-4362-240127124430-T2K7_BZDET
   - YouTube: https://www.youtube.com/c/TomScope

GUIDELINES FOR YOUR RESPONSES:
- Respond in a professional, welcoming, and concise tone.
- Format your response cleanly using markdown (e.g. bolding, lists) when appropriate, keeping paragraphs brief so they fit well in a small chat widget screen.
- If a customer asks to schedule a consultation, direct them to our Consultation form on the website (usually found at the homepage or via the 'Schedule' CTAs).
- If you do not know the answer to a question, politely suggest that they contact our support team directly at info@tomscope.com or call +91 88074 23228.`;

    // Attempt generation with fallback models in case of 503 high demand or other server errors
    const models = ["gemini-3.5-flash", "gemini-2.0-flash", "gemini-3.1-flash-lite"];
    let response = null;
    let lastError = null;

    for (const model of models) {
      try {
        console.log(`Calling Gemini API using model: ${model}`);
        response = await ai.models.generateContent({
          model,
          contents: contents as any,
          config: {
            systemInstruction,
            temperature: 0.7,
          },
        });
        if (response) {
          console.log(`Successfully generated response using model: ${model}`);
          break;
        }
      } catch (err: any) {
        console.warn(`Model ${model} call failed:`, err.message || err);
        lastError = err;
      }
    }

    if (!response) {
      throw lastError || new Error("Failed to generate response with any Gemini model.");
    }

    const reply = response.text || "I apologize, but I couldn't generate a response. Please try again.";

    return NextResponse.json({ reply });
  } catch (error: any) {
    console.error("Gemini API error:", error);
    return NextResponse.json(
      { error: "An error occurred while processing your request. Please try again." },
      { status: 500 }
    );
  }
}
