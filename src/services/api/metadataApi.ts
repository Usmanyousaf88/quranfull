import { useQuery } from "@tanstack/react-query";
import { API_BASE_URL } from "./baseApi";

interface QuranMetadata {
  surahs: {
    count: number;
    references: Array<{
      number: number;
      name: string;
      englishName: string;
    }>;
  };
  juzs: {
    count: number;
    references: Array<{
      number: number;
      versesCount: number;
    }>;
  };
  rukus: {
    count: number;
    references: Array<{
      number: number;
      versesCount: number;
    }>;
  };
  manzils: {
    count: number;
    references: Array<{
      number: number;
      versesCount: number;
    }>;
  };
  sajdas: {
    count: number;
    references: Array<{
      number: number;
      surah: number;
      ayah: number;
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