import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { useManzil } from "../services/api/manzilApi";

const ManzilPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: manzil, isLoading, error } = useManzil(Number(id));

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading Manzil {id}...</div>
      </div>
    );
  }

  if (error) {
    toast.error("Failed to load Manzil data");
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <div className="text-xl text-red-500">Error loading Manzil {id}</div>
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
            <h1 className="text-4xl font-bold">Manzil {id}</h1>
            {manzil && (
              <p className="text-xl text-gray-600">
                {manzil.surahs[0].englishName} -{" "}
                {manzil.surahs[manzil.surahs.length - 1].englishName}
              </p>
            )}
          </div>

          <div className="grid gap-6">
            {manzil?.ayahs.map((verse) => (
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

export default ManzilPage;