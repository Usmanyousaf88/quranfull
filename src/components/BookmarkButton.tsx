import React from "react";
import { Bookmark, BookmarkCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAddBookmark } from "@/services/progressApi";
import { toast } from "sonner";

interface BookmarkButtonProps {
  verseId: string;
  isBookmarked: boolean;
}

const BookmarkButton: React.FC<BookmarkButtonProps> = ({ verseId, isBookmarked }) => {
  const { mutate: toggleBookmark } = useAddBookmark();

  const handleToggleBookmark = () => {
    toggleBookmark(verseId, {
      onSuccess: () => {
        toast.success(
          isBookmarked ? "Bookmark removed" : "Verse bookmarked",
          {
            description: isBookmarked 
              ? "The verse has been removed from your bookmarks" 
              : "You can find this verse in your bookmarks"
          }
        );
      }
    });
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleToggleBookmark}
      className="hover:bg-primary/10"
    >
      {isBookmarked ? (
        <BookmarkCheck className="h-5 w-5 text-primary" />
      ) : (
        <Bookmark className="h-5 w-5" />
      )}
    </Button>
  );
};

export default BookmarkButton;