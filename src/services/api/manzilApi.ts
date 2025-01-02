import { useQuery } from "@tanstack/react-query";
import { API_BASE_URL, Verse } from "./baseApi";

interface ManzilResponse {
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

export const useManzil = (
  manzilNumber: number,
  edition: string = "quran-uthmani",
  offset?: number,
  limit?: number
) => {
  return useQuery({
    queryKey: ["manzil", manzilNumber, edition, offset, limit],
    queryFn: async () => {
      let url = `${API_BASE_URL}/manzil/${manzilNumber}/${edition}`;
      if (offset !== undefined || limit !== undefined) {
        url += `?${offset !== undefined ? `offset=${offset}` : ""}${
          limit !== undefined ? `&limit=${limit}` : ""
        }`;
      }
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch manzil");
      }
      const data: ManzilResponse = await response.json();
      return data.data;
    },
    enabled: manzilNumber >= 1 && manzilNumber <= 7,
  });
};