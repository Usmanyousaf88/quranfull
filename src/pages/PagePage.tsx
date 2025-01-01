import React from "react";
import { useParams } from "react-router-dom";
import { usePage } from "@/services/api/pageApi";
import PageNavigation from "@/components/PageNavigation";
import { ScrollArea } from "@/components/ui/scroll-area";
import PageCompletionStatus from "@/components/PageCompletionStatus";
import { useReadingProgress } from "@/services/progressApi";

const PagePage = () => {
  const { id } = useParams();
  const pageNumber = parseInt(id || "1");
  const { data: page, isLoading, error } = usePage(pageNumber);
  const { data: progress } = useReadingProgress();
  const isCompleted = progress?.completedPages.includes(pageNumber) || false;

  if (isLoading) {
    return <div className="text-center py-8">Loading page...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">Error loading page</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Page {pageNumber}</h1>
        <PageCompletionStatus pageNumber={pageNumber} isCompleted={isCompleted} />
      </div>

      <ScrollArea className="h-[60vh] rounded-md border p-4">
        <div className="space-y-6">
          {page?.verses.map((verse) => (
            <div key={verse.number} className="verse-container">
              <div className="arabic-text text-right">{verse.text}</div>
              <div className="text-gray-600 mt-2">{verse.translation}</div>
            </div>
          ))}
        </div>
      </ScrollArea>

      <PageNavigation currentPage={pageNumber} />
    </div>
  );
};

export default PagePage;