import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();

export async function POST(req: NextRequest) {
  const { show } = await req.json();

  if (!show) {
    return NextResponse.json({ error: "show is required" }, { status: 400 });
  }

  const prompt = `You are an expert on TV shows. Pick one well-loved, highly rewatchable episode of "${show}" — something a fan would treasure.

Return exactly one episode as a JSON object with:
- season (number)
- episode (number)
- title (string)
- description (string, 1-2 sentences)
- reason (string, why this episode is special — 1 sentence)

Respond ONLY with valid JSON. Example:
{
  "season": 3,
  "episode": 7,
  "title": "Episode Title",
  "description": "What happens in this episode.",
  "reason": "A fan-favourite moment that defines the whole series."
}`;

  const message = await client.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 512,
    messages: [{ role: "user", content: prompt }],
  });

  const text = message.content[0].type === "text" ? message.content[0].text : "";

  let episode = null;
  try {
    episode = JSON.parse(text);
  } catch {
    const match = text.match(/\{[\s\S]*\}/);
    if (match) {
      try {
        episode = JSON.parse(match[0]);
      } catch {
        episode = null;
      }
    }
  }

  return NextResponse.json({ episode });
}
