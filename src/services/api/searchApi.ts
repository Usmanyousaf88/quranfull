import { useQuery } from "@tanstack/react-query";
import { API_BASE_URL, Verse } from "./baseApi";

export interface SearchResult {
  verse: Verse;
  surah: {
    number: number;
    name: string;
    englishName: string;
  };
}

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