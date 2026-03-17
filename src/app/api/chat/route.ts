import OpenAI from "openai";
import { getAgentPrompt } from "@/lib/agent-prompt";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  const { messages, locale } = await req.json();
  const systemPrompt = getAgentPrompt();
  const langInstruction = locale === "zh"
    ? "IMPORTANT: The user's interface is in Chinese. Reply in Chinese (中文)."
    : "IMPORTANT: The user's interface is in English. Reply in English.";

  const stream = await openai.chat.completions.create({
    model: "gpt-4.1-nano",
    messages: [
      { role: "system", content: systemPrompt + "\n\n" + langInstruction },
      ...messages,
    ],
    stream: true,
    max_tokens: 500,
    temperature: 0.7,
  });

  const encoder = new TextEncoder();
  const readable = new ReadableStream({
    async start(controller) {
      for await (const chunk of stream) {
        const text = chunk.choices[0]?.delta?.content || "";
        if (text) {
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ text })}\n\n`));
        }
      }
      controller.enqueue(encoder.encode("data: [DONE]\n\n"));
      controller.close();
    },
  });

  return new Response(readable, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
