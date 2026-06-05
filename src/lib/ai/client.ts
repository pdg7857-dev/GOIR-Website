import Anthropic from "@anthropic-ai/sdk";

let _client: Anthropic | null = null;

export function aiClient() {
  if (_client) return _client;
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) return null;
  _client = new Anthropic({ apiKey: key });
  return _client;
}

export const DEFAULT_MODEL = "claude-sonnet-4-6";

/**
 * Single-shot text completion. Returns null when the API key is missing so
 * callers can fall back to the deterministic engine output.
 */
export async function complete(opts: {
  system: string;
  prompt: string;
  model?: string;
  maxTokens?: number;
}): Promise<string | null> {
  const client = aiClient();
  if (!client) return null;
  const res = await client.messages.create({
    model: opts.model ?? DEFAULT_MODEL,
    max_tokens: opts.maxTokens ?? 1024,
    system: opts.system,
    messages: [{ role: "user", content: opts.prompt }],
  });
  const block = res.content.find((b) => b.type === "text");
  return block && "text" in block ? block.text : null;
}
