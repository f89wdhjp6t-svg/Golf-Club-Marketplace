import { NextRequest, NextResponse } from "next/server";
import { AnthropicConfigError, callClaudeForJSON } from "@/lib/anthropic";
import type { Club } from "@/lib/types";

interface OfferBody {
  club: Club;
  offerAmount: number;
}

interface OfferResult {
  status: "accepted" | "countered" | "rejected";
  counterPrice?: number;
  message: string;
  error?: string;
}

export async function POST(req: NextRequest) {
  let body: OfferBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { club, offerAmount } = body;
  if (!club || !offerAmount || offerAmount <= 0) {
    return NextResponse.json({ error: "Missing club or offer amount." }, { status: 400 });
  }

  const prompt = `You are roleplaying as "${club.seller}", a golf equipment seller on a marketplace, responding to a buyer's offer on your listing.

Listing: "${club.name}", condition: ${club.condition}, listed at $${club.price} (original retail $${club.originalPrice}).
Buyer's offer: $${offerAmount}

Negotiation rules to follow:
- If the offer is at or above 90% of the listed price, ACCEPT it.
- If the offer is between 65% and 90% of the listed price, COUNTER with a price between the offer and the listed price (closer to the listed price for higher offers, closer to the midpoint for lower ones). Never counter below 80% of the listed price.
- If the offer is below 65% of the listed price, REJECT it politely, and optionally suggest a price you'd consider.

Write a short, casual, in-character one-to-two sentence message as the seller — friendly but firm, like a real person texting back about a marketplace offer. Don't be robotic.

Respond ONLY with JSON (no markdown):
{"status": "accepted" | "countered" | "rejected", "counterPrice": <number, omit or null if not countering>, "message": "<seller's response>"}`;

  try {
    const result = await callClaudeForJSON<OfferResult>(prompt, 400);
    return NextResponse.json(result);
  } catch (err) {
    if (err instanceof AnthropicConfigError) {
      return NextResponse.json({ error: err.message }, { status: 500 });
    }
    return NextResponse.json(
      { error: "Could not reach the seller right now. Please try again." },
      { status: 502 }
    );
  }
}
