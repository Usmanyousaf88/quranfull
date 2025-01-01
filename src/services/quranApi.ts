import { useQuery } from "@tanstack/react-query";

interface Surah {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
}

interface Verse {
  number: number;
  text: string;
  numberInSurah: number;
  audio: string;
  translation: string;
}

interface SurahDetail {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  verses: Verse[];
}

interface JuzDetail {
  number: number;
  versesCount: number;
  startSurah: string;
  endSurah: string;
  verses: Verse[];
}

interface SearchResult {
  verse: Verse;
  surah: {
    number: number;
    name: string;
    englishName: string;
  };
}

const API_BASE_URL = "https://api.alquran.cloud/v1";

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

export const useSearchVerses = (query: string, language: string = 'en.sahih') => {
  return useQuery({
    queryKey: ["search", query, language],
    queryFn: async () => {
      if (!query || query.length < 3) {
        return [];
      }

      try {
        const response = await fetch(
          `${API_BASE_URL}/search/${encodeURIComponent(query)}/${language}`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch search results');
        }

        const data = await response.json();
        return data.data.matches as SearchResult[];
      } catch (error) {
        console.error('Error searching verses:', error);
        throw error;
      }
    },
    enabled: query.length >= 3,
  });
};
