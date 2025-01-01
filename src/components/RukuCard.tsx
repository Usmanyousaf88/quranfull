import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface RukuCardProps {
  number: number;
  versesCount: number;
  startSurah: string;
  endSurah: string;
}

const RukuCard: React.FC<RukuCardProps> = ({
  number,
  versesCount,
  startSurah,
  endSurah,
}) => {
  const navigate = useNavigate();

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Ruku {number}</span>
          <span className="text-sm text-gray-500">{versesCount} verses</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 mb-4">
          {startSurah} - {endSurah}
        </p>
        <Button
          onClick={() => navigate(`/ruku/${number}`)}
          className="w-full"
          variant="outline"
        >
          Read Ruku
        </Button>
      </CardContent>
    </Card>
  );
};

export default RukuCard;