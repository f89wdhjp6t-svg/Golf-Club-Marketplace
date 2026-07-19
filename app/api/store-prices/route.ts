import { NextRequest, NextResponse } from "next/server";
import { AnthropicConfigError, callClaudeForJSON } from "@/lib/anthropic";
import { RETAILERS } from "@/lib/newClubs";
import type { NewClub, StorePricesResult } from "@/lib/types";

interface StorePricesBody {
  club: NewClub;
}

export async function POST(req: NextRequest) {
  let body: StorePricesBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { club } = body;
  if (!club) {
    return NextResponse.json({ error: "Missing club." }, { status: 400 });
  }

  const storeNames = RETAILERS.map((r) => r.name);

  const prompt = `You are a golf retail pricing expert familiar with how US golf retailers typically price current club models relative to MSRP.

Club: ${club.name}
Brand: ${club.brand}
Type: ${club.type}
Year: ${club.year}
MSRP: $${club.msrp}

For each of these retailers: ${storeNames.join(", ")} — give a realistic estimated current selling price for this exact club (accounting for typical pricing patterns at that specific chain — e.g. some run frequent promotions, some price-match, some hold at MSRP longer) and a short one-sentence note about that store's typical pricing/service angle for this kind of purchase.

Respond ONLY with a JSON object (no markdown, no extra text):
{
  "estimates": [
    { "store": "<exact store name from the list above>", "estimatedPrice": <number>, "note": "<short one-sentence note>" }
  ]
}
Include exactly one entry per store listed above, in the same order.`;

  try {
    const result = await callClaudeForJSON<StorePricesResult>(prompt, 800);
    return NextResponse.json(result);
  } catch (err) {
    if (err instanceof AnthropicConfigError) {
      return NextResponse.json({ error: err.message }, { status: 500 });
    }
    return NextResponse.json(
      { error: "Could not get price estimates. Please try again." },
      { status: 502 }
    );
  }
}
