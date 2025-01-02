import { API_BASE_URL, fetchWithEdition } from './baseApi';

interface AyahResponse {
  code: number;
  status: string;
  data: {
    number: number;
    audio: string;
    audioSecondary: string[];
    text: string;
    edition: {
      identifier: string;
      language: string;
      name: string;
      englishName: string;
      format: string;
      type: string;
    };
    surah: {
      number: number;
      name: string;
      englishName: string;
      englishNameTranslation: string;
      numberOfAyahs: number;
      revelationType: string;
    };
    numberInSurah: number;
    juz: number;
    manzil: number;
    page: number;
    ruku: number;
    hizbQuarter: number;
    sajda: boolean;
  };
}

interface MultipleEditionsResponse {
  code: number;
  status: string;
  data: AyahResponse['data'][];
}

export const useAyah = (reference: string | number, edition: string = 'quran-uthmani') => {
  return useQuery({
    queryKey: ['ayah', reference, edition],
    queryFn: async () => {
      const response = await fetch(`${API_BASE_URL}/ayah/${reference}/${edition}`);
      if (!response.ok) {
        throw new Error('Failed to fetch ayah');
      }
      const data: AyahResponse = await response.json();
      return data.data;
    },
    enabled: !!reference,
  });
};

export const useAyahEditions = (reference: string | number, editions: string[]) => {
  return useQuery({
    queryKey: ['ayah', reference, editions],
    queryFn: async () => {
      const editionsString = editions.join(',');
      const response = await fetch(`${API_BASE_URL}/ayah/${reference}/editions/${editionsString}`);
      if (!response.ok) {
        throw new Error('Failed to fetch ayah editions');
      }
      const data: MultipleEditionsResponse = await response.json();
      return data.data;
    },
    enabled: !!reference && editions.length > 0,
  });
};