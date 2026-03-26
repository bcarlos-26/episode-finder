import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();

export async function POST(req: NextRequest) {
  const { show, query } = await req.json();

  if (!show || !query) {
    return NextResponse.json({ error: "show and query are required" }, { status: 400 });
  }

  const prompt = `You are an expert on TV shows. The user is looking for episodes of "${show}" that match this description: "${query}"

Return up to 3 matching episodes as a JSON array. Each episode must have:
- season (number)
- episode (number)
- title (string)
- description (string, 1-2 sentences)
- reason (string, why this episode matches — 1 sentence, italic-worthy)

Respond ONLY with valid JSON. Example format:
[
  {
    "season": 2,
    "episode": 11,
    "title": "Episode Title",
    "description": "Brief description of what happens.",
    "reason": "This episode directly deals with the theme you described."
  }
]

If no episodes match, return an empty array [].`;

  const message = await client.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 1024,
    messages: [{ role: "user", content: prompt }],
  });

  const text = message.content[0].type === "text" ? message.content[0].text : "";

  let episodes = [];
  try {
    episodes = JSON.parse(text);
  } catch {
    const match = text.match(/\[[\s\S]*\]/);
    if (match) {
      try {
        episodes = JSON.parse(match[0]);
      } catch {
        episodes = [];
      }
    }
  }

  return NextResponse.json({ episodes });
}
