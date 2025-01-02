import { useQuery } from "@tanstack/react-query";
import { API_BASE_URL } from "./baseApi";
import type { Verse } from "./baseApi";

interface SajdaResponse {
  code: number;
  status: string;
  data: {
    ayahs: Verse[];
    edition: {
      identifier: string;
      language: string;
      name: string;
      englishName: string;
    };
  };
}

export const useSajdaVerses = (edition: string = "quran-uthmani") => {
  return useQuery({
    queryKey: ["sajda", edition],
    queryFn: async () => {
      const response = await fetch(`${API_BASE_URL}/sajda/${edition}`);
      if (!response.ok) {
        throw new Error("Failed to fetch sajda verses");
      }
      const data: SajdaResponse = await response.json();
      return data.data;
    },
  });
};