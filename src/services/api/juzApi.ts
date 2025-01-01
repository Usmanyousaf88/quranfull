import { useQuery } from "@tanstack/react-query";
import { API_BASE_URL, Verse } from "./baseApi";

export interface JuzDetail {
  number: number;
  versesCount: number;
  startSurah: string;
  endSurah: string;
  verses: Verse[];
}

export const useJuzDetail = (juzNumber: number) => {
  const selectedLanguage = 'en.sahih';
  
  return useQuery({
    queryKey: ["juz", juzNumber, selectedLanguage],
    queryFn: async () => {
      try {
        const [arabicResponse, translationResponse] = await Promise.all([
          fetch(`${API_BASE_URL}/juz/${juzNumber}/ar.alafasy`),
          fetch(`${API_BASE_URL}/juz/${juzNumber}/${selectedLanguage}`),
        ]);

        if (!arabicResponse.ok || !translationResponse.ok) {
          throw new Error('Failed to fetch juz data');
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
          number: juzNumber,
          versesCount: verses.length,
          startSurah: verses[0]?.surah?.name || "",
          endSurah: verses[verses.length - 1]?.surah?.name || "",
          verses,
        } as JuzDetail;
      } catch (error) {
        console.error('Error fetching juz:', error);
        throw error;
      }
    },
  });
};