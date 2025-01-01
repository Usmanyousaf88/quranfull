import { useState, useEffect } from 'react';

interface QuranProgress {
  dailyProgress: {
    pagesRead: number;
    dailyGoal: number;
  };
  totalProgress: number;
  bookmarks: string[];
}

export const useQuranProgress = () => {
  const [progress, setProgress] = useState<QuranProgress>(() => {
    const savedProgress = localStorage.getItem('quranProgress');
    return savedProgress ? JSON.parse(savedProgress) : {
      dailyProgress: {
        pagesRead: 0,
        dailyGoal: 6,
      },
      totalProgress: 0,
      bookmarks: [],
    };
  });

  useEffect(() => {
    localStorage.setItem('quranProgress', JSON.stringify(progress));
  }, [progress]);

  const updateDailyProgress = (pagesRead: number) => {
    setProgress(prev => ({
      ...prev,
      dailyProgress: {
        ...prev.dailyProgress,
        pagesRead,
      },
    }));
  };

  const updateTotalProgress = (totalProgress: number) => {
    setProgress(prev => ({
      ...prev,
      totalProgress,
    }));
  };

  const toggleBookmark = (verseId: string) => {
    setProgress(prev => {
      const bookmarks = prev.bookmarks.includes(verseId)
        ? prev.bookmarks.filter(id => id !== verseId)
        : [...prev.bookmarks, verseId];
      
      return {
        ...prev,
        bookmarks,
      };
    });
  };

  const setDailyGoal = (goal: number) => {
    setProgress(prev => ({
      ...prev,
      dailyProgress: {
        ...prev.dailyProgress,
        dailyGoal: goal,
      },
    }));
  };

  return {
    progress,
    updateDailyProgress,
    updateTotalProgress,
    toggleBookmark,
    setDailyGoal,
  };
};