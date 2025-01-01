import React from "react";
import { useParams } from "react-router-dom";
import { useJuzDetail } from "../services/quranApi";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const JuzPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: juz, isLoading, error } = useJuzDetail(Number(id));

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading Juz {id}...</div>
      </div>
    );
  }

  if (error) {
    toast.error("Failed to load Juz data");
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <div className="text-xl text-red-500">Error loading Juz {id}</div>
        <Button onClick={() => navigate("/")} variant="outline">
          Return to Home
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8">
        <Button
          onClick={() => navigate("/")}
          variant="ghost"
          className="mb-6 text-lg"
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          Back to Index
        </Button>

        <div className="space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold">Juz {id}</h1>
            {juz && (
              <p className="text-xl text-gray-600">
                {juz.startSurah} - {juz.endSurah}
              </p>
            )}
          </div>

          <div className="grid gap-6">
            {juz?.verses.map((verse) => (
              <div
                key={verse.number}
                className="bg-white p-6 rounded-lg shadow-sm space-y-4"
              >
                <div className="flex justify-between items-start">
                  <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center">
                    {verse.numberInSurah}
                  </div>
                  <div className="text-2xl font-arabic text-primary text-right">
                    {verse.text}
                  </div>
                </div>
                <p className="text-gray-600 text-lg">{verse.translation}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JuzPage;