import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";

const PagePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Temporary mock data until API integration
  const pageData = {
    number: Number(id),
    verses: [
      {
        number: 1,
        text: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
        translation: "In the name of Allah, the Entirely Merciful, the Especially Merciful.",
        numberInSurah: 1
      },
      // Add more verses as needed
    ]
  };

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
            <h1 className="text-4xl font-bold">Page {id}</h1>
          </div>

          <div className="grid gap-6">
            {pageData.verses.map((verse) => (
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

export default PagePage;