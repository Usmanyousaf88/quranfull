import { useQuery } from "@tanstack/react-query";
import { API_BASE_URL, Verse } from "./baseApi";

interface RukuResponse {
  code: number;
  status: string;
  data: {
    number: number;
    ayahs: Verse[];
    surahs: {
      number: number;
      name: string;
      englishName: string;
      englishNameTranslation: string;
      numberOfAyahs: number;
      revelationType: string;
    }[];
  };
}

export const useRukuDetail = (
  rukuNumber: number,
  edition: string = "quran-uthmani",
  offset?: number,
  limit?: number
) => {
  return useQuery({
    queryKey: ["ruku", rukuNumber, edition, offset, limit],
    queryFn: async () => {
      let url = `${API_BASE_URL}/ruku/${rukuNumber}/${edition}`;
      if (offset !== undefined || limit !== undefined) {
        url += `?${offset !== undefined ? `offset=${offset}` : ""}${
          limit !== undefined ? `&limit=${limit}` : ""
        }`;
      }
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch ruku");
      }
      const data: RukuResponse = await response.json();
      return data.data;
    },
    enabled: rukuNumber >= 1 && rukuNumber <= 556,
  });
};