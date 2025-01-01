import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Book, BookOpen, Bookmark } from "lucide-react";
import ReadingGoalDialog from "./ReadingGoalDialog";

interface QuranStatsProps {
  dailyProgress?: {
    pagesRead: number;
    dailyGoal: number;
  };
  totalProgress?: number;
  bookmarks?: number;
}

const QuranStats = ({ 
  dailyProgress = { pagesRead: 0, dailyGoal: 6 },
  totalProgress = 0,
  bookmarks = 0 
}: QuranStatsProps) => {
  const dailyProgressPercentage = (dailyProgress.pagesRead / dailyProgress.dailyGoal) * 100;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Daily Progress</CardTitle>
          <div className="flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-muted-foreground" />
            <ReadingGoalDialog currentGoal={dailyProgress.dailyGoal} />
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Progress value={dailyProgressPercentage} className="h-2" />
            <p className="text-xs text-muted-foreground">
              {dailyProgress.pagesRead} of {dailyProgress.dailyGoal} pages read
            </p>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Progress</CardTitle>
          <Book className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Progress value={totalProgress} className="h-2" />
            <p className="text-xs text-muted-foreground">{totalProgress}% completed</p>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Bookmarks</CardTitle>
          <Bookmark className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <p className="text-2xl font-bold">{bookmarks}</p>
            <p className="text-xs text-muted-foreground">Saved locations</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuranStats;