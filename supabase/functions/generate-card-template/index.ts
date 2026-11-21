import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS")
    return new Response(null, { headers: corsHeaders });

  try {
    const { prompt } = await req.json();
    if (!prompt || typeof prompt !== "string" || prompt.trim().length === 0) {
      return new Response(
        JSON.stringify({ error: "Prompt is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const response = await fetch(
      "https://ai.gateway.lovable.dev/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-3-flash-preview",
          messages: [
            {
              role: "system",
              content: `You are a card design AI. Given a user's description, generate a celebration card design.

Return a JSON object using tool calling with these fields:
- bgGradient: a CSS linear-gradient string for the card background (use rich, creative gradients)
- textColor: HSL color string for the main text
- accentColor: HSL color string for decorative accents
- decoration: a single Unicode character or emoji for corner decorations
- patternSvg: an SVG string (just the inner elements, no <svg> wrapper) for a decorative background pattern. Use creative shapes, lines, and designs. Keep opacity low (0.1-0.25). Use viewBox="0 0 400 560".
- name: a short 2-3 word name for this template style

Be creative and match the user's mood/theme. Use vibrant, beautiful color combinations.`,
            },
            { role: "user", content: prompt.slice(0, 300) },
          ],
          tools: [
            {
              type: "function",
              function: {
                name: "generate_card_design",
                description: "Generate a celebration card design based on user prompt",
                parameters: {
                  type: "object",
                  properties: {
                    bgGradient: {
                      type: "string",
                      description: "CSS linear-gradient for card background",
                    },
                    textColor: {
                      type: "string",
                      description: "HSL color for text, e.g. hsl(0,0%,100%)",
                    },
                    accentColor: {
                      type: "string",
                      description: "HSL color for accents",
                    },
                    decoration: {
                      type: "string",
                      description: "Single Unicode character or emoji for decorations",
                    },
                    patternSvg: {
                      type: "string",
                      description: "SVG inner elements for background pattern",
                    },
                    name: {
                      type: "string",
                      description: "Short 2-3 word template name",
                    },
                  },
                  required: [
                    "bgGradient",
                    "textColor",
                    "accentColor",
                    "decoration",
                    "patternSvg",
                    "name",
                  ],
                  additionalProperties: false,
                },
              },
            },
          ],
          tool_choice: {
            type: "function",
            function: { name: "generate_card_design" },
          },
        }),
      }
    );

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI credits exhausted. Please add funds in Settings → Workspace → Usage." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(
        JSON.stringify({ error: "AI generation failed" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const data = await response.json();
    const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];
    if (!toolCall?.function?.arguments) {
      return new Response(
        JSON.stringify({ error: "AI did not return a valid design" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const design = JSON.parse(toolCall.function.arguments);

    return new Response(JSON.stringify(design), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("generate-card-template error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
