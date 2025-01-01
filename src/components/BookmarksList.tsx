import React from "react";
import { useReadingProgress } from "@/services/progressApi";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const BookmarksList = () => {
  const { data: progress } = useReadingProgress();
  const navigate = useNavigate();

  if (!progress?.bookmarks.length) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Bookmarks</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">No bookmarks yet</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Bookmarks</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] pr-4">
          {progress.bookmarks.map((verseId) => {
            const [surahNumber, verseNumber] = verseId.split(':');
            return (
              <div
                key={verseId}
                className="flex items-center justify-between p-2 hover:bg-accent rounded-lg cursor-pointer mb-2"
                onClick={() => navigate(`/surah/${surahNumber}`)}
              >
                <span>Surah {surahNumber}, Verse {verseNumber}</span>
              </div>
            );
          })}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default BookmarksList;