import { NextRequest, NextResponse } from "next/server";
import { AnthropicConfigError, callClaudeForJSON } from "@/lib/anthropic";
import type { AIResult, Club } from "@/lib/types";

interface AnalyzePhotoBody {
  club: Club;
  imageBase64: string;
  mediaType: string;
}

const ALLOWED_MEDIA_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);

export async function POST(req: NextRequest) {
  let body: AnalyzePhotoBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { club, imageBase64, mediaType } = body;
  if (!club || !imageBase64) {
    return NextResponse.json({ error: "Missing club or photo." }, { status: 400 });
  }
  if (!ALLOWED_MEDIA_TYPES.has(mediaType)) {
    return NextResponse.json({ error: "Unsupported image type." }, { status: 400 });
  }

  const prompt = `You are an expert golf equipment analyst. User uploaded a photo of their club. Identify it and compare to: "${club.name}" — ${club.year} ${club.type}, $${club.price} used (orig $${club.originalPrice}), condition: ${club.condition}. Specs: Loft ${club.loft}, Shaft: ${club.shaft}, Forgiveness: ${club.specs.forgiveness}, Distance: ${club.specs.distance}, Spin: ${club.specs.spin}. Respond ONLY with JSON (no markdown): {"identifiedClub":"<brand model type>","confidence":"High"|"Medium"|"Low","verdict":"Great Buy"|"Good Buy"|"Fair Deal"|"Skip It","verdictColor":"#16a34a"|"#84cc16"|"#eab308"|"#ef4444","valueScore":<1-10>,"upgradeScore":<1-10>,"conditionNote":"<visible condition>","summary":"<2-3 sentences>","prosForBuyer":["<p1>","<p2>","<p3>"],"consForBuyer":["<c1>","<c2>"],"comparisonInsight":"<2-3 sentences>","buyRecommendation":"<1 sentence>"}`;

  try {
    const result = await callClaudeForJSON<AIResult>(
      [
        { type: "image", source: { type: "base64", media_type: mediaType, data: imageBase64 } },
        { type: "text", text: prompt },
      ],
      1000
    );
    return NextResponse.json(result);
  } catch (err) {
    if (err instanceof AnthropicConfigError) {
      return NextResponse.json({ error: err.message }, { status: 500 });
    }
    return NextResponse.json(
      { error: "Could not analyze the photo. Please try a clearer image." },
      { status: 502 }
    );
  }
}
