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
  dailyGoal: number;
}

const STORAGE_KEY = "quran-reading-progress";

// Helper to get initial progress from localStorage
const getStoredProgress = async (): Promise<ReadingProgress> => {
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
    dailyGoal: 6,
  };
};

// Save progress to localStorage
const saveProgress = async (progress: ReadingProgress): Promise<ReadingProgress> => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  return progress;
};

// Custom hooks for progress management
export const useReadingProgress = () => {
  return useQuery({
    queryKey: ["reading-progress"],
    queryFn: getStoredProgress,
  });
};

export const useUpdateProgress = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (newProgress: Partial<ReadingProgress>) => {
      const currentProgress = await getStoredProgress();
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
    mutationFn: async (verseId: string) => {
      const currentProgress = await getStoredProgress();
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
    mutationFn: async (pageNumber: number) => {
      const currentProgress = await getStoredProgress();
      const today = new Date().toISOString().split('T')[0];
      
      // Update completed pages
      const completedPages = currentProgress.completedPages.includes(pageNumber)
        ? currentProgress.completedPages
        : [...currentProgress.completedPages, pageNumber];
      
      // Update daily progress
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