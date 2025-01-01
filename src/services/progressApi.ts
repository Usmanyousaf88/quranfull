import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

interface ReadingProgress {
  lastReadPage: number;
  lastReadSurah: number;
  lastReadAyah: number;
  bookmarks: string[];
  completedPages: number[];
  dailyProgress: {
    date: string;
    pagesRead: number;
  }[];
}

const STORAGE_KEY = "quran-reading-progress";

// Helper to get initial progress from localStorage
const getStoredProgress = (): ReadingProgress => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    return JSON.parse(stored);
  }
  return {
    lastReadPage: 1,
    lastReadSurah: 1,
    lastReadAyah: 1,
    bookmarks: [],
    completedPages: [],
    dailyProgress: [],
  };
};

// Save progress to localStorage
const saveProgress = (progress: ReadingProgress) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  return progress;
};

// Custom hooks for progress management
export const useReadingProgress = () => {
  return useQuery({
    queryKey: ["reading-progress"],
    queryFn: getStoredProgress,
    staleTime: Infinity,
  });
};

export const useUpdateProgress = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (newProgress: Partial<ReadingProgress>) => {
      const currentProgress = getStoredProgress();
      const updatedProgress = { ...currentProgress, ...newProgress };
      return saveProgress(updatedProgress);
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["reading-progress"], data);
    },
  });
};

export const useAddBookmark = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (verseId: string) => {
      const currentProgress = getStoredProgress();
      const bookmarks = currentProgress.bookmarks.includes(verseId)
        ? currentProgress.bookmarks.filter(id => id !== verseId)
        : [...currentProgress.bookmarks, verseId];
      
      return saveProgress({ ...currentProgress, bookmarks });
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["reading-progress"], data);
    },
  });
};

export const useMarkPageComplete = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (pageNumber: number) => {
      const currentProgress = getStoredProgress();
      const completedPages = currentProgress.completedPages.includes(pageNumber)
        ? currentProgress.completedPages
        : [...currentProgress.completedPages, pageNumber];
      
      // Update daily progress
      const today = new Date().toISOString().split('T')[0];
      const dailyProgress = [...currentProgress.dailyProgress];
      const todayProgress = dailyProgress.find(p => p.date === today);
      
      if (todayProgress) {
        todayProgress.pagesRead += 1;
      } else {
        dailyProgress.push({ date: today, pagesRead: 1 });
      }
      
      return saveProgress({ 
        ...currentProgress, 
        completedPages,
        dailyProgress,
      });
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["reading-progress"], data);
    },
  });
};