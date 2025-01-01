import { useQuery } from "@tanstack/react-query";
import { fetchWithEdition, Verse } from "./baseApi";

export interface HizbDetail {
  number: number;
  verses: Verse[];
  versesCount: number;
  startSurah: string;
  endSurah: string;
}

export const useHizbDetail = (hizbNumber: number, edition: string = "en.sahih") => {
  return useQuery({
    queryKey: ["hizb", hizbNumber, edition],
    queryFn: async () => {
      // Convert hizb number to hizbQuarter (each hizb has 4 quarters)
      const quarterNumber = (hizbNumber - 1) * 4 + 1;
      
      const [arabicData, translationData] = await Promise.all([
        fetchWithEdition(`/hizbQuarter/${quarterNumber}`, "ar.alafasy"),
        fetchWithEdition(`/hizbQuarter/${quarterNumber}`, edition),
      ]);

      const verses = arabicData.data.ayahs.map((verse: any, index: number) => ({
        number: verse.number,
        text: verse.text,
        numberInSurah: verse.numberInSurah,
        translation: translationData.data.ayahs[index]?.text || "Translation unavailable",
        audio: `https://cdn.islamic.network/quran/audio/128/ar.alafasy/${verse.number}.mp3`,
        sajda: verse.sajda || false,
        ruku: verse.ruku,
        manzil: verse.manzil,
      }));

      return {
        number: hizbNumber,
        verses,
        versesCount: verses.length,
        startSurah: arabicData.data.ayahs[0]?.surah?.name || "",
        endSurah: arabicData.data.ayahs[arabicData.data.ayahs.length - 1]?.surah?.name || "",
      } as HizbDetail;
    },
  });
};