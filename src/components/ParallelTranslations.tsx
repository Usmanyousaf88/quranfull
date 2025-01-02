import React from "react";
import { Card } from "@/components/ui/card";
import { useAyahEditions } from "@/services/api/ayahApi";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

interface ParallelTranslationsProps {
  reference: string | number;
  editions: string[];
}

const ParallelTranslations: React.FC<ParallelTranslationsProps> = ({
  reference,
  editions,
}) => {
  const { data: translations, isLoading, error } = useAyahEditions(reference, editions);

  if (error) {
    toast.error("Failed to load translations");
    return null;
  }

  if (isLoading) {
    return (
      <Card className="p-4 space-y-4">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-full" />
      </Card>
    );
  }

  return (
    <Card className="p-4">
      <div className="space-y-6">
        {translations?.map((translation, index) => (
          <div key={translation.edition.identifier} className="space-y-2">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-lg">
                {translation.edition.englishName}
              </h3>
              <span className="text-sm text-muted-foreground">
                {translation.edition.language}
              </span>
            </div>
            <p className={`text-lg ${
              translation.edition.language === 'ar' ? 'text-right arabic-text' : ''
            }`}>
              {translation.text}
            </p>
            {index < translations.length - 1 && (
              <hr className="my-4 border-gray-200" />
            )}
          </div>
        ))}
      </div>
    </Card>
  );
};

export default ParallelTranslations;