import React from "react";
import { useNavigate } from "react-router-dom";
import { Book } from "lucide-react";
import { useReadingProgress } from "@/services/progressApi";
import PageCompletionStatus from "./PageCompletionStatus";

interface PageCardProps {
  number: number;
  surahName: string;
  versesCount: number;
}

const PageCard: React.FC<PageCardProps> = ({ number, surahName, versesCount }) => {
  const navigate = useNavigate();
  const { data: progress } = useReadingProgress();
  const isCompleted = progress?.completedPages.includes(number) || false;

  return (
    <div 
      className="p-6 rounded-lg border border-gray-200 hover:border-primary transition-colors cursor-pointer bg-white shadow-sm hover:shadow-md"
    >
      <div className="flex justify-between items-start">
        <div 
          className="flex items-center gap-4"
          onClick={() => navigate(`/page/${number}`)}
        >
          <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center text-xl">
            {number}
          </div>
          <div>
            <h3 className="text-xl font-semibold">Page {number}</h3>
            <p className="text-gray-600 text-lg">{surahName}</p>
          </div>
        </div>
        <div className="flex flex-col gap-2 items-end">
          <Book className="text-primary h-6 w-6" />
          <PageCompletionStatus pageNumber={number} isCompleted={isCompleted} />
        </div>
      </div>
      <p className="mt-4 text-gray-500 text-lg">{versesCount} verses</p>
    </div>
  );
};

export default PageCard;