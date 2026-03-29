import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { input, type, action, content, targetLanguages, channels } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    let systemPrompt = "";
    let userPrompt = "";

    switch (action) {
      case "create":
        systemPrompt = `You are an expert enterprise content creator. Generate high-quality, professional ${type || "content"} based on the given input. 
Use clear headings with markdown formatting. Be concise yet comprehensive. 
Match a professional brand voice — authoritative yet approachable.
Structure the output with: Title, Executive Summary (2-3 sentences), Key Points (bullet list), Main Body (2-3 paragraphs), and a Conclusion with call-to-action.`;
        userPrompt = `Create a ${type || "blog post"} based on: ${input}`;
        break;

      case "compliance":
        systemPrompt = `You are a brand compliance and regulatory expert. Analyze content for:
1. Brand tone consistency (professional, authoritative, approachable)
2. Legal/regulatory issues (GDPR, FTC guidelines, disclaimers)
3. Terminology correctness
4. Inclusive language

Return a JSON object with: { "score": number 0-100, "issues": [{ "type": "tone|legal|brand|regulatory", "severity": "low|medium|high", "message": string, "location": string, "suggestion": string }], "summary": string }`;
        userPrompt = `Review this content for compliance:\n\n${content}`;
        break;

      case "localize":
        systemPrompt = `You are an expert content localizer. Adapt content for the target market while maintaining meaning, tone, and cultural relevance. Don't just translate — localize idioms, references, and formatting conventions.`;
        userPrompt = `Localize the following content to ${(targetLanguages || ["Spanish"]).join(", ")}:\n\n${content}`;
        break;

      case "distribute":
        systemPrompt = `You are a multi-channel content distribution specialist. Adapt the given content for the specified channels, optimizing format, length, tone, and hashtags for each platform.
Return the adapted versions clearly labeled for each channel.`;
        userPrompt = `Adapt this content for: ${(channels || ["Twitter", "LinkedIn"]).join(", ")}\n\nOriginal content:\n${content}`;
        break;

      default:
        systemPrompt = "You are a helpful AI assistant for enterprise content operations.";
        userPrompt = input || content || "Hello";
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again shortly." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted. Please add funds in Settings → Workspace → Usage." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(JSON.stringify({ error: "AI service temporarily unavailable" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("content-agent error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
