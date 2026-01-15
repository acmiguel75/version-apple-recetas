
import { GoogleGenAI, Type } from "@google/genai";
import { Recipe, Difficulty } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

const recipeSchema = {
  type: Type.OBJECT,
  properties: {
    title: { type: Type.STRING, description: "Título de la receta" },
    category: { type: Type.STRING, description: "Categoría de la comida (ej: Postre, Principal)" },
    difficulty: { type: Type.STRING, description: "Dificultad: básico, intermedio o avanzado" },
    prepTime: { type: Type.NUMBER, description: "Tiempo de preparación en minutos" },
    cookTime: { type: Type.NUMBER, description: "Tiempo de cocción en minutos" },
    servings: { type: Type.NUMBER, description: "Número de raciones" },
    ingredients: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING },
          amount: { type: Type.STRING },
          unit: { type: Type.STRING }
        },
        required: ["name", "amount", "unit"]
      }
    },
    steps: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          instruction: { type: Type.STRING },
          timerMinutes: { type: Type.NUMBER }
        },
        required: ["instruction"]
      }
    },
    tips: { type: Type.ARRAY, items: { type: Type.STRING } },
    notes: { type: Type.STRING }
  },
  required: ["title", "category", "difficulty", "ingredients", "steps"]
};

export const parseRecipeFromUrl = async (url: string): Promise<Partial<Recipe>> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Analiza este enlace de receta y extrae la información detallada: ${url}. Si no puedes acceder al enlace, intenta inferir la receta basándote en la URL o proporciona una estructura vacía coherente.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: recipeSchema,
      },
    });

    const parsed = JSON.parse(response.text || "{}");
    
    // Add unique IDs
    return {
      ...parsed,
      id: Math.random().toString(36).substr(2, 9),
      sourceUrl: url,
      thumbnail: `https://picsum.photos/seed/${Math.random()}/600/400`,
      ingredients: (parsed.ingredients || []).map((ing: any) => ({
        ...ing,
        id: Math.random().toString(36).substr(2, 9),
        checked: false
      })),
      steps: (parsed.steps || []).map((step: any) => ({
        ...step,
        id: Math.random().toString(36).substr(2, 9),
        completed: false
      })),
      createdAt: Date.now(),
      tags: [parsed.category || "General"]
    };
  } catch (error) {
    console.error("Error parsing recipe:", error);
    throw error;
  }
};
