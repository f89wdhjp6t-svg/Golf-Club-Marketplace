import { NextRequest, NextResponse } from "next/server";
import { AnthropicConfigError, callClaudeForJSON } from "@/lib/anthropic";
import type { SellForm, ValuationResult } from "@/lib/types";

export async function POST(req: NextRequest) {
  let form: SellForm;
  try {
    form = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (!form.clubName?.trim() && !form.brand?.trim()) {
    return NextResponse.json(
      { error: "Enter at least a club name or brand." },
      { status: 400 }
    );
  }

  const prompt = `You are a golf equipment pricing expert with deep knowledge of the used club market (eBay, 2nd Swing, GlobalGolf, etc.).

A seller wants to list this club:
- Club: ${form.clubName || `${form.brand} ${form.type}`}
- Brand: ${form.brand}
- Type: ${form.type}
- Year: ${form.year}
- Loft: ${form.loft || "Not specified"}
- Shaft: ${form.shaft || "Not specified"}
- Condition: ${form.condition}
- Extra notes: ${form.extraNotes || "None"}

Provide a realistic market valuation and full spec writeup. Respond ONLY with a JSON object (no markdown, no extra text):
{
  "priceLow": <number - low end of realistic used market price>,
  "priceHigh": <number - high end of realistic used market price>,
  "priceSuggested": <number - optimal listing price for a quick sale>,
  "originalMSRP": <number - approximate original retail price>,
  "marketDemand": "High" | "Medium" | "Low",
  "demandColor": "#16a34a" | "#eab308" | "#ef4444",
  "pricingRationale": "<2 sentence explanation of the pricing based on condition and market>",
  "sellingTips": ["<tip1>", "<tip2>", "<tip3>"],
  "specs": {
    "headSize": "<value or N/A>",
    "loft": "<value>",
    "shaft": "<value or Unknown>",
    "flex": "<Regular|Stiff|X-Stiff|Senior|Ladies|Wedge|Unknown>",
    "adjustable": <true|false>,
    "forgiveness": "<Very High|High|Mid|Low>",
    "distance": "<Very Long|Long|Mid|Short Game|N/A>",
    "spin": "<Very High|High|Mid|Low-Mid|Low|N/A>",
    "material": "<face/head material>"
  },
  "generatedTitle": "<compelling 6-10 word listing title>",
  "generatedDescription": "<3-4 sentence seller description that highlights the key selling points of this club in this condition. Honest and compelling.>"
}`;

  try {
    const result = await callClaudeForJSON<ValuationResult>(prompt);
    return NextResponse.json(result);
  } catch (err) {
    if (err instanceof AnthropicConfigError) {
      return NextResponse.json({ error: err.message }, { status: 500 });
    }
    return NextResponse.json(
      { error: "Could not get valuation. Please try again." },
      { status: 502 }
    );
  }
}
