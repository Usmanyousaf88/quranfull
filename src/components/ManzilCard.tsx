import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface ManzilCardProps {
  number: number;
  versesCount: number;
  startSurah: string;
  endSurah: string;
}

const ManzilCard: React.FC<ManzilCardProps> = ({
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
          <span>Manzil {number}</span>
          <span className="text-sm text-gray-500">{versesCount} verses</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 mb-4">
          {startSurah} - {endSurah}
        </p>
        <Button
          onClick={() => navigate(`/manzil/${number}`)}
          className="w-full"
          variant="outline"
        >
          Read Manzil
        </Button>
      </CardContent>
    </Card>
  );
};

export default ManzilCard;