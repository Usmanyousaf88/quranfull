import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const HizbPage = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const hizbNumber = parseInt(id || "1");

  const { data: hizbData, isLoading, error } = useQuery({
    queryKey: ["hizb", hizbNumber],
    queryFn: async () => {
      // Mock data for now - replace with actual API call later
      return {
        number: hizbNumber,
        verses: [
          { number: 1, text: "Sample verse 1", translation: "Translation 1" },
          { number: 2, text: "Sample verse 2", translation: "Translation 2" },
        ],
        totalVerses: 2,
      };
    },
  });

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
              <span className="bg-primary text-white px-3 py-1 rounded-full text-sm">
                {verse.number}
              </span>
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