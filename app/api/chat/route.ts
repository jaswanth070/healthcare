import { openai } from "@ai-sdk/openai"
import { streamText } from "ai"
import type { NextRequest } from "next/server"

export const maxDuration = 30

export async function POST(req: NextRequest) {
  try {
    const { message, language = "en" } = await req.json()

    // Healthcare-specific system prompt
    const systemPrompt = `You are a healthcare education assistant for rural and semi-urban populations. 
    Provide accurate, simple, and culturally sensitive health information. 
    Focus on preventive care, disease symptoms, vaccination schedules, and when to seek medical help.
    Always recommend consulting healthcare professionals for serious concerns.
    Respond in ${language === "en" ? "English" : "the requested local language"}.
    Keep responses clear and accessible for people with limited medical knowledge.`

    const result = await streamText({
      model: openai("gpt-4o-mini"),
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message },
      ],
      maxTokens: 500,
      temperature: 0.7,
    })

    let fullResponse = ""
    for await (const chunk of result.textStream) {
      fullResponse += chunk
    }

    return Response.json({
      message: fullResponse || "I apologize, but I cannot provide a response at this time. Please try again.",
      language,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Chat API error:", error)
    return Response.json(
      {
        error: "Failed to process your request. Please try again.",
        message: "I'm sorry, there was an error processing your request. Please try again later.",
      },
      { status: 500 },
    )
  }
}
