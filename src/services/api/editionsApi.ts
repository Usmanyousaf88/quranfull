import { useQuery } from "@tanstack/react-query";
import { API_BASE_URL, Edition } from "./baseApi";

interface EditionLanguage {
  name: string;
  iso: string;
  direction: "ltr" | "rtl";
}

interface EditionType {
  name: string;
  identifier: string;
}

interface EditionFormat {
  name: string;
  identifier: "text" | "audio";
}

// Get all available editions with optional filters
export const useEditions = (format?: string, language?: string, type?: string) => {
  return useQuery({
    queryKey: ["editions", format, language, type],
    queryFn: async () => {
      let url = `${API_BASE_URL}/edition`;
      const params = new URLSearchParams();
      
      if (format) params.append("format", format);
      if (language) params.append("language", language);
      if (type) params.append("type", type);
      
      const queryString = params.toString();
      if (queryString) url += `?${queryString}`;

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch editions");
      }
      const data = await response.json();
      return data.data as Edition[];
    },
  });
};

// Get all available languages
export const useEditionLanguages = () => {
  return useQuery({
    queryKey: ["edition-languages"],
    queryFn: async () => {
      const response = await fetch(`${API_BASE_URL}/edition/language`);
      if (!response.ok) {
        throw new Error("Failed to fetch edition languages");
      }
      const data = await response.json();
      return data.data as EditionLanguage[];
    },
  });
};

// Get all editions for a specific language
export const useEditionsByLanguage = (language: string) => {
  return useQuery({
    queryKey: ["editions-by-language", language],
    queryFn: async () => {
      const response = await fetch(`${API_BASE_URL}/edition/language/${language}`);
      if (!response.ok) {
        throw new Error("Failed to fetch editions for language");
      }
      const data = await response.json();
      return data.data as Edition[];
    },
    enabled: !!language,
  });
};

// Get all edition types
export const useEditionTypes = () => {
  return useQuery({
    queryKey: ["edition-types"],
    queryFn: async () => {
      const response = await fetch(`${API_BASE_URL}/edition/type`);
      if (!response.ok) {
        throw new Error("Failed to fetch edition types");
      }
      const data = await response.json();
      return data.data as EditionType[];
    },
  });
};

// Get all editions for a specific type
export const useEditionsByType = (type: string) => {
  return useQuery({
    queryKey: ["editions-by-type", type],
    queryFn: async () => {
      const response = await fetch(`${API_BASE_URL}/edition/type/${type}`);
      if (!response.ok) {
        throw new Error("Failed to fetch editions for type");
      }
      const data = await response.json();
      return data.data as Edition[];
    },
    enabled: !!type,
  });
};

// Get all edition formats
export const useEditionFormats = () => {
  return useQuery({
    queryKey: ["edition-formats"],
    queryFn: async () => {
      const response = await fetch(`${API_BASE_URL}/edition/format`);
      if (!response.ok) {
        throw new Error("Failed to fetch edition formats");
      }
      const data = await response.json();
      return data.data as EditionFormat[];
    },
  });
};

// Get all editions for a specific format
export const useEditionsByFormat = (format: string) => {
  return useQuery({
    queryKey: ["editions-by-format", format],
    queryFn: async () => {
      const response = await fetch(`${API_BASE_URL}/edition/format/${format}`);
      if (!response.ok) {
        throw new Error("Failed to fetch editions for format");
      }
      const data = await response.json();
      return data.data as Edition[];
    },
    enabled: !!format,
  });
};

// Get multiple editions for a specific reference (surah, ayah, etc.)
export const useMultipleEditions = (reference: string, editions: string[]) => {
  return useQuery({
    queryKey: ["multiple-editions", reference, editions],
    queryFn: async () => {
      const editionsString = editions.join(",");
      const response = await fetch(`${API_BASE_URL}/${reference}/editions/${editionsString}`);
      if (!response.ok) {
        throw new Error("Failed to fetch multiple editions");
      }
      const data = await response.json();
      return data.data;
    },
    enabled: editions.length > 0 && !!reference,
  });
};