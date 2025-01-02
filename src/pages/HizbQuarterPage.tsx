import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { useHizbQuarter } from "@/services/api/hizbApi";
import { toast } from "sonner";

const ITEMS_PER_PAGE = 10;

const HizbQuarterPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [offset, setOffset] = useState(0);
  
  const { data: hizbQuarter, isLoading, error } = useHizbQuarter(
    Number(id),
    offset,
    ITEMS_PER_PAGE
  );

  const handlePreviousPage = () => {
    if (offset >= ITEMS_PER_PAGE) {
      setOffset(offset - ITEMS_PER_PAGE);
    }
  };

  const handleNextPage = () => {
    if (hizbQuarter && hizbQuarter.ayahs.length === ITEMS_PER_PAGE) {
      setOffset(offset + ITEMS_PER_PAGE);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading Hizb Quarter {id}...</div>
      </div>
    );
  }

  if (error) {
    toast.error("Failed to load Hizb Quarter data");
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <div className="text-xl text-red-500">Error loading Hizb Quarter {id}</div>
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
            <h1 className="text-4xl font-bold">Hizb Quarter {id}</h1>
            {hizbQuarter && (
              <p className="text-xl text-gray-600">
                Showing verses {offset + 1} to {offset + hizbQuarter.ayahs.length}
              </p>
            )}
          </div>

          <div className="grid gap-6">
            {hizbQuarter?.ayahs.map((verse) => (
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

          <div className="flex justify-center gap-4 mt-6">
            <Button
              onClick={handlePreviousPage}
              variant="outline"
              className={offset === 0 ? "opacity-50" : ""}
              aria-disabled={offset === 0}
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              Previous
            </Button>
            <Button
              onClick={handleNextPage}
              variant="outline"
              className={!hizbQuarter || hizbQuarter.ayahs.length < ITEMS_PER_PAGE ? "opacity-50" : ""}
              aria-disabled={!hizbQuarter || hizbQuarter.ayahs.length < ITEMS_PER_PAGE}
            >
              Next
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HizbQuarterPage;