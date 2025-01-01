import { useQuery } from "@tanstack/react-query";
import { API_BASE_URL, Edition } from "./baseApi";

export const useEditions = () => {
  return useQuery({
    queryKey: ["editions"],
    queryFn: async () => {
      const response = await fetch(`${API_BASE_URL}/edition`);
      if (!response.ok) {
        throw new Error("Failed to fetch editions");
      }
      const data = await response.json();
      return data.data as Edition[];
    },
  });
};