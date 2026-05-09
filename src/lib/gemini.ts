import { GoogleGenAI, ThinkingLevel, Type } from "@google/genai";

let genAIInstance: GoogleGenAI | null = null;

/**
 * Lazy initialization of GoogleGenAI client to prevent module-load errors 
 * when the API key is missing.
 */
export function getGenAI() {
  if (!genAIInstance) {
    const key = process.env.API_KEY || process.env.GEMINI_API_KEY;
    if (!key) {
      throw new Error("Clé API manquante. Veuillez configurer GEMINI_API_KEY.");
    }
    genAIInstance = new GoogleGenAI({ apiKey: key });
  }
  return genAIInstance;
}

export interface ImageGenOptions {
  prompt: string;
  imageSize: "1K" | "2K" | "4K";
  aspectRatio?: "1:1" | "3:4" | "4:3" | "9:16" | "16:9";
  base64Image?: string; // Optional for image-to-image
}

/**
 * Advanced space analysis using Gemini.
 * Analyzes architectural style, lighting, and materials based on specific trade.
 */
export async function analyzeSpaceAdvanced(base64Image: string, trade: string) {
  try {
    const [mimeType, data] = base64Image.split(";base64,");
    const mime = mimeType.replace("data:", "");

    const tradeDescriptions: Record<string, string> = {
      "Flooring": "parqueteur expert en restauration de parquet et pose de bois massif",
      "Kitchen": "cuisiniste expert en rénovation de cuisine et agencement",
      "Bathroom": "rénovateur expert en salle de bain, carrelage et plomberie",
      "Painting": "peintre expert en rénovation intérieure et finitions murales",
      "Cleaning": "expert en nettoyage professionnel et remise en état"
    };

    const tradeDescTarget = tradeDescriptions[trade] || "expert en rénovation";

    const prompt = `You are a senior French renovation expert specialized in ${tradeDescTarget}. 
    CRITICAL: Your goal is NOT to redesign, but to identify the EXACT current state, materials, and structure to guide a PERFECT RESTORATION.
    
    Analyze this photo and return ONLY a valid JSON object:
    
    {
      "system_tags": [
        "Identité Visuelle: [type exact de matériau et mode de pose existant]",
        "État actuel: [diagnostique technique de dégradation spécifique à ${tradeDescTarget}]",
        "Structure: [fixitée des éléments architecturaux à préserver]",
        "Urgence: [Critique / Modérée / Cosmétique] — [dégradation observée]",
        "Actions de Restauration: [ponçage, nettoyage, vitrification, etc.]"
      ],
      "market_intel": [
        "Valorisation Restauration: +X% sur le bien après remise à neuf de l'existant",
        "Argument Patrimoine: [matériau] d'origine est un atout à conserver",
        "Économie vs Remplacement: Pourquoi restaurer est plus rentable ici",
        "Conseil technique: [produit spécifique] pour préserver le grain/l'éclat"
      ]
    }
    
    Rules:
    - Focus on PRESERVATION and RESTORATION, never replacement.
    - Be technically specific to ${tradeDescTarget}.
    - Use French.
    - No markdown, no explanation, ONLY the JSON`;

    const genAI = getGenAI();
    const response = await genAI.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [{
        role: "user",
        parts: [
          { inlineData: { data, mimeType: mime } },
          { text: prompt }
        ]
      }],
      config: {
        responseMimeType: "application/json"
      }
    });

    return JSON.parse(response.text);
  } catch (error) {
    console.error("Advanced Analysis error:", error);
    return {
      system_tags: ["Secteur identifié", "Surface standard", "Urgence modérée"],
      market_intel: ["Valorisation immobilière positive", "Gain de temps signature"]
    };
  }
}

/**
 * Uses Search Grounding to find local renovation trends and "models" for a specific area.
 */
export async function getLocalRenovationIntelligence(area: string, industry: string) {
  try {
    const genAI = getGenAI();
    const response = await genAI.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [{
        role: "user",
        parts: [{ text: `List 3 premium renovation trends for ${industry} in ${area}. Max 3 words per trend. No paragraphs.` }]
      }],
      config: {
        tools: [{ googleSearch: {} }]
      }
    });

    return response.text;
  } catch (error) {
    console.error("Grounding error:", error);
    return "Trends indicate a heavy shift towards natural, sustainable luxury materials in this region.";
  }
}

/**
 * Generates a cinematic 3D walkthrough video of the transformed space using Veo.
 */
export async function generateRenovationVideo(base64Image: string, style: string) {
  try {
    const [mimeType, data] = base64Image.split(";base64,");
    const mime = mimeType.replace("data:", "");

    // Use the lazy helper to ensure key is valid or throw a clear error
    const ai = getGenAI();

    let operation = await ai.models.generateVideos({
      model: "veo-3.1-lite-generate-preview",
      prompt: `Cinematic interior walkthrough video of a space with ${style} finishes. The camera moves slowly forward through the room. Photorealistic, architectural magazine quality.`,
      image: {
        imageBytes: data,
        mimeType: mime,
      },
      config: {
        numberOfVideos: 1,
        aspectRatio: "16:9",
        resolution: "1080p"
      }
    });

    // Polling for completion using the correct SDK method
    while (!operation.done) {
      await new Promise(r => setTimeout(r, 5000));
      operation = await ai.operations.getVideosOperation({ operation });
    }

    const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
    if (downloadLink) {
      // Fetch the video data using the API key in headers
      const response = await fetch(downloadLink, {
        method: 'GET',
        headers: {
          'x-goog-api-key': process.env.API_KEY || process.env.GEMINI_API_KEY!,
        },
      });
      
      const blob = await response.blob();
      return URL.createObjectURL(blob);
    }
    
    throw new Error("Video generation failed to return a valid URI.");
  } catch (error) {
    console.error("Video generation error:", error);
    throw error;
  }
}

export async function generateVisual(options: ImageGenOptions) {
  try {
    const contents: any = {
      parts: [{ text: options.prompt }]
    };

    if (options.base64Image) {
      const [mimeType, data] = options.base64Image.split(";base64,");
      const mime = mimeType.replace("data:", "");
      contents.parts.unshift({
        inlineData: { data, mimeType: mime }
      });
    }

    const genAI = getGenAI();
    const response = await genAI.models.generateContent({
      model: "gemini-2.5-flash-image",
      contents,
      config: {
        imageConfig: {
          aspectRatio: options.aspectRatio || "1:1",
        },
      },
    });

    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
      }
    }
    throw new Error("No image data found in response");
  } catch (error) {
    console.error("Error generating visual:", error);
    throw error;
  }
}
