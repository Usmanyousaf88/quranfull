export const API_BASE_URL = "https://api.alquran.cloud/v1";

export interface Verse {
  number: number;
  text: string;
  numberInSurah: number;
  audio: string;
  translation: string;
  sajda?: boolean;
  ruku?: number;
  manzil?: number;
}

export interface Edition {
  identifier: string;
  language: string;
  name: string;
  englishName: string;
  format: "text" | "audio";
  type: "translation" | "tafsir" | "quran";
}

export const fetchWithEdition = async (endpoint: string, edition: string = "en.sahih") => {
  const response = await fetch(`${API_BASE_URL}${endpoint}/${edition}`);
  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }
  return response.json();
};