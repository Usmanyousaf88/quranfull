import React from "react";
import { useParams } from "react-router-dom";
import { useHizbDetail } from "@/services/api/hizbApi";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const HizbPage = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const hizbNumber = parseInt(id || "1");

  const { data: hizbData, isLoading, error } = useHizbDetail(hizbNumber);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading Hizb {hizbNumber}...</div>
      </div>
    );
  }

  if (error) {
    toast({
      variant: "destructive",
      title: "Error",
      description: "Failed to load Hizb data",
    });
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-red-500">Error loading Hizb {hizbNumber}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <Button
          variant="outline"
          onClick={() => window.history.back()}
          className="text-lg"
        >
          <ChevronLeft className="mr-2" />
          Back
        </Button>
        <h1 className="text-3xl font-bold">Hizb {hizbNumber}</h1>
        <div className="flex gap-2">
          {hizbNumber > 1 && (
            <Button
              variant="outline"
              onClick={() => window.location.href = `/hizb/${hizbNumber - 1}`}
            >
              <ChevronLeft />
              Previous
            </Button>
          )}
          {hizbNumber < 60 && (
            <Button
              variant="outline"
              onClick={() => window.location.href = `/hizb/${hizbNumber + 1}`}
            >
              Next
              <ChevronRight />
            </Button>
          )}
        </div>
      </div>

      <div className="space-y-6">
        {hizbData?.verses.map((verse) => (
          <div
            key={verse.number}
            className="p-6 bg-white rounded-lg shadow-sm border border-gray-200"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-2">
                <span className="bg-primary text-white px-3 py-1 rounded-full text-sm">
                  {verse.number}
                </span>
                {verse.sajda && (
                  <span className="bg-amber-500 text-white px-3 py-1 rounded-full text-sm">
                    Sajda
                  </span>
                )}
                {verse.ruku && (
                  <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm">
                    Ruku {verse.ruku}
                  </span>
                )}
                {verse.manzil && (
                  <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm">
                    Manzil {verse.manzil}
                  </span>
                )}
              </div>
            </div>
            <p className="text-2xl mb-4 font-arabic text-right leading-loose">
              {verse.text}
            </p>
            <p className="text-gray-600 text-lg">{verse.translation}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HizbPage;