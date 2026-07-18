const ANTHROPIC_API_URL = "https://api.anthropic.com/v1/messages";
const DEFAULT_MODEL = "claude-sonnet-4-5";

type ContentBlock =
  | { type: "text"; text: string }
  | { type: "image"; source: { type: "base64"; media_type: string; data: string } };

export class AnthropicConfigError extends Error {}

function getApiKey(): string {
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) {
    throw new AnthropicConfigError(
      "ANTHROPIC_API_KEY is not configured on the server. Add it to your .env file."
    );
  }
  return key;
}

/**
 * Calls the Claude Messages API server-side and parses a single JSON object
 * out of the response text. The prompts all instruct the model to respond
 * with JSON only, but we still strip stray markdown fences defensively.
 */
export async function callClaudeForJSON<T>(
  content: string | ContentBlock[],
  maxTokens = 1200
): Promise<T> {
  const apiKey = getApiKey();
  const model = process.env.ANTHROPIC_MODEL || DEFAULT_MODEL;

  const res = await fetch(ANTHROPIC_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model,
      max_tokens: maxTokens,
      messages: [{ role: "user", content }],
    }),
  });

  if (!res.ok) {
    const errBody = await res.text().catch(() => "");
    throw new Error(`Anthropic API error (${res.status}): ${errBody.slice(0, 500)}`);
  }

  const data = await res.json();
  const text = (data.content ?? [])
    .map((block: { text?: string }) => block.text || "")
    .join("")
    .trim();

  const cleaned = text.replace(/```json|```/g, "").trim();
  return JSON.parse(cleaned) as T;
}
