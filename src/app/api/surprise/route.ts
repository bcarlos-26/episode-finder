import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function POST(req: NextRequest) {
  const { show } = await req.json();

  if (!show) {
    return NextResponse.json({ error: "show is required" }, { status: 400 });
  }

  const prompt = `You are an expert on children's TV. Pick one well-loved episode of "${show}" that toddlers tend to adore — something rewatchable and joyful.

Return exactly one episode as a JSON object with these fields:
- season (number)
- episode (number)
- name (string — episode title)
- overview (string — one sentence description of what happens)
- reason (string — one sentence explaining why kids tend to love this episode)

Return raw JSON only. No markdown, no preamble, no explanation. Just the JSON object.

Example:
{"season":2,"episode":7,"name":"Calypso","overview":"Bluey and her friends play a game of make-believe at school.","reason":"Kids love this episode for its imaginative gameplay and warm classroom scenes."}`;

  try {
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
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
