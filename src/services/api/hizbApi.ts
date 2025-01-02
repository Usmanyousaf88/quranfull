import { useQuery } from "@tanstack/react-query";
import { API_BASE_URL } from "./baseApi";
import type { Verse } from "./baseApi";

interface HizbQuarterResponse {
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

export interface HizbDetail {
  number: number;
  verses: Verse[];
  startSurah: string;
  endSurah: string;
}

export const useHizbDetail = (
  hizbNumber: number,
  options?: { offset?: number; limit?: number }
) => {
  return useQuery({
    queryKey: ["hizb", hizbNumber, options?.offset, options?.limit],
    queryFn: async () => {
      let url = `${API_BASE_URL}/hizbQuarter/${hizbNumber}`;
      if (options?.offset !== undefined || options?.limit !== undefined) {
        const params = new URLSearchParams();
        if (options.offset !== undefined) params.append("offset", options.offset.toString());
        if (options.limit !== undefined) params.append("limit", options.limit.toString());
        url += `?${params.toString()}`;
      }

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch hizb quarter");
      }
      const data: HizbQuarterResponse = await response.json();
      
      // Transform the response to match our interface
      const result: HizbDetail = {
        number: data.data.number,
        verses: data.data.ayahs,
        startSurah: data.data.surahs[0]?.englishName || "",
        endSurah: data.data.surahs[data.data.surahs.length - 1]?.englishName || "",
      };
      
      return result;
    },
  });
};