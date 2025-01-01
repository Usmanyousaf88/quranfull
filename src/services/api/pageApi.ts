import { useQuery } from "@tanstack/react-query";
import { API_BASE_URL, Verse } from "./baseApi";

export interface PageDetail {
  number: number;
  verses: Verse[];
  surahName: string;
  versesCount: number;
}

export const usePage = (pageNumber: number) => {
  const selectedLanguage = 'en.sahih';
  
  return useQuery({
    queryKey: ["page", pageNumber, selectedLanguage],
    queryFn: async () => {
      try {
        const [arabicResponse, translationResponse] = await Promise.all([
          fetch(`${API_BASE_URL}/page/${pageNumber}/ar.alafasy`),
          fetch(`${API_BASE_URL}/page/${pageNumber}/${selectedLanguage}`),
        ]);

        if (!arabicResponse.ok || !translationResponse.ok) {
          throw new Error('Failed to fetch page data');
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
          number: pageNumber,
          verses,
          surahName: arabicData.data.ayahs[0]?.surah?.name || "",
          versesCount: verses.length,
        } as PageDetail;
      } catch (error) {
        console.error('Error fetching page:', error);
        throw error;
      }
    },
  });
};

export const useAllPages = () => {
  return useQuery({
    queryKey: ["allPages"],
    queryFn: async () => {
      const response = await fetch(`${API_BASE_URL}/meta`);
      if (!response.ok) {
        throw new Error('Failed to fetch pages metadata');
      }
      const data = await response.json();
      
      return Array.from({ length: data.data.pages.count }, (_, i) => ({
        number: i + 1,
        surahName: data.data.pages.references[i]?.surah?.name || "",
        versesCount: data.data.pages.references[i]?.numberOfAyahs || 0,
      }));
    },
  });
};