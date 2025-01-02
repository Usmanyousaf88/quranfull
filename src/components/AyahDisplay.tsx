import React from "react";
import { useAyah, useAyahEditions } from "@/services/api/ayahApi";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

interface AyahDisplayProps {
  reference: string | number;
  editions?: string[];
}

const AyahDisplay = ({ reference, editions = ['quran-uthmani', 'en.asad'] }: AyahDisplayProps) => {
  const { data: singleAyah, isLoading: singleLoading, error: singleError } = useAyah(reference);
  const { data: multipleEditions, isLoading: multipleLoading, error: multipleError } = 
    useAyahEditions(reference, editions);

  if (singleError || multipleError) {
    toast.error("Failed to load ayah");
    return null;
  }

  if (singleLoading || multipleLoading) {
    return (
      <Card className="p-4 space-y-4">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </Card>
    );
  }

  return (
    <Card className="p-4 space-y-4">
      {singleAyah && (
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">
            Ayah {singleAyah.numberInSurah} - Surah {singleAyah.surah.englishName}
          </h3>
          <p className="text-xl arabic-text text-right">{singleAyah.text}</p>
        </div>
      )}
      
      {multipleEditions && (
        <div className="space-y-4 mt-4 border-t pt-4">
          <h4 className="font-medium text-muted-foreground">Translations</h4>
          {multipleEditions.map((edition, index) => (
            <div key={edition.edition.identifier} className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">
                {edition.edition.englishName}
              </p>
              <p>{edition.text}</p>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};

export default AyahDisplay;