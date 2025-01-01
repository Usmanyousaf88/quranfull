import React from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen } from "lucide-react";

interface HizbCardProps {
  number: number;
  startSurah: string;
  endSurah: string;
  versesCount: number;
}

const HizbCard: React.FC<HizbCardProps> = ({ number, startSurah, endSurah, versesCount }) => {
  const navigate = useNavigate();

  return (
    <div 
      className="p-6 rounded-lg border border-gray-200 hover:border-primary transition-colors cursor-pointer bg-white shadow-sm hover:shadow-md"
      onClick={() => navigate(`/hizb/${number}`)}
    >
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center text-xl">
            {number}
          </div>
          <div>
            <h3 className="text-xl font-semibold">Hizb {number}</h3>
            <p className="text-gray-600 text-lg">{startSurah} - {endSurah}</p>
          </div>
        </div>
        <BookOpen className="text-primary h-6 w-6" />
      </div>
      <p className="mt-4 text-gray-500 text-lg">{versesCount} verses</p>
    </div>
  );
};

export default HizbCard;