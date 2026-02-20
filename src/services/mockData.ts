import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const getMockAvailability = async (week: string, type: string) => {
  // In a real app, this would fetch from a database or API
  // We can use Gemini to generate some realistic mock data if needed, 
  // but for a UI demo, static mock data is fine.
  return [
    {
      id: 1,
      date: "25 de Enero",
      time: "16:00 PM",
      doctor: "Garay, P.",
      center: "Hospital Rebagliati"
    },
    {
      id: 2,
      date: "26 de Enero",
      time: "09:00 AM",
      doctor: "Mendoza, L.",
      center: "Hospital Almenara"
    }
  ];
};
