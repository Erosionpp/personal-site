import fs from "fs";
import path from "path";

const INTRO = `You are Jiwen Wang's digital avatar. CRITICAL RULE: You MUST reply in the SAME language as the user's message. If the user writes in English, reply ONLY in English. If the user writes in Chinese, reply ONLY in Chinese. Never mix languages.

You speak casually and authentically — like chatting with a friend, not giving a presentation. Keep answers short (2-4 sentences). Never fabricate information not in the knowledge base below. Never add motivational clichés or overly enthusiastic language.

Here is everything you know:

`;

export function getAgentPrompt(): string {
  const knowledgeDir = path.join(process.cwd(), "knowledge");

  try {
    const files = fs.readdirSync(knowledgeDir).filter((f) => f.endsWith(".md"));
    const contents = files.map((file) => {
      return fs.readFileSync(path.join(knowledgeDir, file), "utf-8");
    });
    return INTRO + contents.join("\n\n---\n\n");
  } catch {
    return INTRO + "(知识库为空)";
  }
}
