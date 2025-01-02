import React from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen } from "lucide-react";
import { useQuranMetadata } from "@/services/api/metadataApi";

interface HizbQuarterCardProps {
  number: number;
}

const HizbQuarterCard: React.FC<HizbQuarterCardProps> = ({ number }) => {
  const navigate = useNavigate();
  const { data: metadata } = useQuranMetadata();

  const hizbData = metadata?.juzs.references.find(
    (juz) => Math.ceil(number / 8) === juz.number
  );

  return (
    <div 
      className="p-6 rounded-lg border border-gray-200 hover:border-primary transition-colors cursor-pointer bg-white shadow-sm hover:shadow-md"
      onClick={() => navigate(`/hizb-quarter/${number}`)}
    >
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center text-xl">
            {number}
          </div>
          <div>
            <h3 className="text-xl font-semibold">Hizb Quarter {number}</h3>
            <p className="text-gray-600 text-lg">
              {hizbData ? `${Math.ceil(hizbData.versesCount / 8)} verses` : 'Loading...'}
            </p>
          </div>
        </div>
        <BookOpen className="text-primary h-6 w-6" />
      </div>
    </div>
  );
};

export default HizbQuarterCard;