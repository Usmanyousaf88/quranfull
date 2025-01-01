import React from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMarkPageComplete } from "@/services/progressApi";
import { toast } from "sonner";

interface PageCompletionStatusProps {
  pageNumber: number;
  isCompleted: boolean;
}

const PageCompletionStatus: React.FC<PageCompletionStatusProps> = ({
  pageNumber,
  isCompleted,
}) => {
  const { mutate: markComplete } = useMarkPageComplete();

  const handleMarkComplete = () => {
    markComplete(pageNumber, {
      onSuccess: () => {
        toast.success("Page marked as complete", {
          description: "Your progress has been updated",
        });
      },
    });
  };

  return (
    <Button
      variant={isCompleted ? "default" : "outline"}
      size="sm"
      onClick={handleMarkComplete}
      className="gap-2"
    >
      <Check className={`h-4 w-4 ${isCompleted ? "text-white" : "text-primary"}`} />
      {isCompleted ? "Completed" : "Mark as Complete"}
    </Button>
  );
};

export default PageCompletionStatus;