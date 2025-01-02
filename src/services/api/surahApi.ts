import { useQuery } from "@tanstack/react-query";
import { API_BASE_URL, Verse } from "./baseApi";

export interface Surah {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
}

export interface SurahDetail {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  verses: Verse[];
}

export const useSurahs = () => {
  return useQuery({
    queryKey: ["surahs"],
    queryFn: async () => {
      const response = await fetch(`${API_BASE_URL}/surah`);
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      const data = await response.json();
      return data.data as Surah[];
    },
  });
};

export const useSurahDetail = (surahNumber: number) => {
  const selectedLanguage = 'en.sahih';
  
  return useQuery({
    queryKey: ["surah", surahNumber, selectedLanguage],
    queryFn: async () => {
      try {
        const [arabicResponse, translationResponse] = await Promise.all([
          fetch(`${API_BASE_URL}/surah/${surahNumber}/ar.alafasy`),
          fetch(`${API_BASE_URL}/surah/${surahNumber}/${selectedLanguage}`),
        ]);

        if (!arabicResponse.ok || !translationResponse.ok) {
          throw new Error('Failed to fetch surah data');
        }

        const arabicData = await arabicResponse.json();
        const translationData = await translationResponse.json();

        const verses = arabicData.data.ayahs.map((verse: any, index: number) => ({
          number: verse.number,
          text: verse.text,
          numberInSurah: verse.numberInSurah,
          translation: translationData.data.ayahs[index]?.text || "Translation unavailable",
          audio: `https://cdn.islamic.network/quran/audio/128/ar.alafasy/${verse.number}.mp3`,
        }));

        return {
          ...arabicData.data,
          verses,
        } as SurahDetail;
      } catch (error) {
        console.error('Error fetching surah:', error);
        throw error;
      }
    },
  });
};