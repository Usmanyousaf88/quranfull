import React from "react";
import { useNavigate } from "react-router-dom";
import { Star } from "lucide-react";

interface SurahCardProps {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  sajdaAyahs?: number[];
}

const SurahCard: React.FC<SurahCardProps> = ({
  number,
  name,
  englishName,
  englishNameTranslation,
  numberOfAyahs,
  sajdaAyahs = [],
}) => {
  const navigate = useNavigate();

  return (
    <div className="surah-card" onClick={() => navigate(`/surah/${number}`)}>
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center">
            {number}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-semibold">{englishName}</h3>
              {sajdaAyahs.length > 0 && (
                <div className="flex items-center text-amber-500" title="Contains Sajda verse(s)">
                  <Star className="h-4 w-4" />
                  <span className="text-sm ml-1">{sajdaAyahs.length}</span>
                </div>
              )}
            </div>
            <p className="text-gray-600">{englishNameTranslation}</p>
          </div>
        </div>
        <div className="arabic-text text-primary">{name}</div>
      </div>
      <p className="mt-2 text-sm text-gray-500">{numberOfAyahs} verses</p>
    </div>
  );
};

export default SurahCard;