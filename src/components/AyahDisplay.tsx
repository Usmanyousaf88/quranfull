import React from "react";
import { useAyah } from "@/services/api/ayahApi";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import ParallelTranslations from "./ParallelTranslations";

interface AyahDisplayProps {
  reference: string | number;
  editions?: string[];
}

const AyahDisplay = ({ 
  reference, 
  editions = ['quran-uthmani', 'en.asad', 'en.sahih'] 
}: AyahDisplayProps) => {
  const { data: singleAyah, isLoading: singleLoading, error: singleError } = useAyah(reference);

  if (singleError) {
    toast.error("Failed to load ayah");
    return null;
  }

  if (singleLoading) {
    return (
      <Card className="p-4 space-y-4">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {singleAyah && (
        <Card className="p-4">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">
              Ayah {singleAyah.numberInSurah} - Surah {singleAyah.surah.englishName}
            </h3>
            <p className="text-xl arabic-text text-right">{singleAyah.text}</p>
          </div>
        </Card>
      )}
      
      <ParallelTranslations reference={reference} editions={editions} />
    </div>
  );
};

export default AyahDisplay;