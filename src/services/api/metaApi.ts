import { useQuery } from "@tanstack/react-query";
import { API_BASE_URL } from "./baseApi";

export interface QuranMetadata {
  surahs: {
    count: number;
    references: Array<{
      number: number;
      name: string;
      englishName: string;
      englishNameTranslation: string;
      numberOfAyahs: number;
      revelationType: string;
    }>;
  };
  juzs: {
    count: number;
    references: Array<{
      number: number;
      juzNumber: number;
      versesCount: number;
      surahNumber: number;
      ayahNumber: number;
    }>;
  };
  pages: {
    count: number;
    references: Array<{
      number: number;
      surahNumber: number;
      ayahNumber: number;
    }>;
  };
  hizbs: {
    count: number;
    references: Array<{
      number: number;
      surahNumber: number;
      ayahNumber: number;
    }>;
  };
}

export const useQuranMetadata = () => {
  return useQuery({
    queryKey: ["quranMetadata"],
    queryFn: async () => {
      const response = await fetch(`${API_BASE_URL}/meta`);
      if (!response.ok) {
        throw new Error("Failed to fetch Quran metadata");
      }
      const data = await response.json();
      return data.data as QuranMetadata;
    },
  });
};