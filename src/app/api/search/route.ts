import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

export async function POST(req: NextRequest) {
  const { show, query } = await req.json();

  if (!show || !query) {
    return NextResponse.json({ error: "show and query are required" }, { status: 400 });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "ANTHROPIC_API_KEY is not set on the server" }, { status: 500 });
  }

  const client = new Anthropic({ apiKey });

  const showContext = show === "Trash Truck"
    ? `"Trash Truck" is a Netflix original animated kids show about a boy named Hank and his best friend, a large trash truck. They go on adventures together in their neighbourhood. Your training data on this show may be limited — do your best to return plausible episode matches based on what you know, and note any uncertainty in the reason field rather than returning nothing.`
    : "";

  const prompt = `You are an expert on children's TV. A parent is trying to find an episode of "${show}" based on this description from their toddler: "${query}"
${showContext ? `\nContext about this show: ${showContext}\n` : ""}
Return up to 3 matching episodes as a JSON array. Each episode must have exactly these fields:
- season (number)
- episode (number)
- name (string — episode title)
- overview (string — one sentence description of what happens)
- reason (string — one sentence explaining why this matches what the parent described)

Return raw JSON only. No markdown, no preamble, no explanation. Just the JSON array.

Example:
[{"season":1,"episode":4,"name":"Pups Make a Splash","overview":"The pups rescue a beached whale.","reason":"This episode features a large sea creature, which matches the description."}]

If no episodes match, return [].`;

  try {
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
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
