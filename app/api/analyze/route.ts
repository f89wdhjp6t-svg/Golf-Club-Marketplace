import { NextRequest, NextResponse } from "next/server";
import { AnthropicConfigError, callClaudeForJSON } from "@/lib/anthropic";
import type { AIResult, Club } from "@/lib/types";

interface AnalyzeBody {
  club: Club;
  myClubInput: string;
}

export async function POST(req: NextRequest) {
  let body: AnalyzeBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { club, myClubInput } = body;
  if (!club || !myClubInput?.trim()) {
    return NextResponse.json({ error: "Missing club or comparison input." }, { status: 400 });
  }

  const prompt = `You are a golf equipment expert. User considering buying: "${club.name}" for $${club.price} (orig $${club.originalPrice}, condition: ${club.condition}). Specs: Type ${club.type}, Year ${club.year}, Loft ${club.loft}, Shaft: ${club.shaft}, Forgiveness: ${club.specs.forgiveness}, Distance: ${club.specs.distance}, Spin: ${club.specs.spin}. Their current club: "${myClubInput}". Respond ONLY with JSON (no markdown): {"verdict":"Great Buy"|"Good Buy"|"Fair Deal"|"Skip It","verdictColor":"#16a34a"|"#84cc16"|"#eab308"|"#ef4444","valueScore":<1-10>,"upgradeScore":<1-10>,"summary":"<2-3 sentences>","prosForBuyer":["<p1>","<p2>","<p3>"],"consForBuyer":["<c1>","<c2>"],"comparisonInsight":"<2-3 sentences>","buyRecommendation":"<1 sentence>"}`;

  try {
    const result = await callClaudeForJSON<AIResult>(prompt, 1000);
    return NextResponse.json(result);
  } catch (err) {
    if (err instanceof AnthropicConfigError) {
      return NextResponse.json({ error: err.message }, { status: 500 });
    }
    return NextResponse.json(
      { error: "Could not analyze. Please try again." },
      { status: 502 }
    );
  }
}
