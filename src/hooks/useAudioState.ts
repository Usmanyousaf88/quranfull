import { useState } from "react";
import { isMobileDevice } from "@/utils/deviceUtils";
import { stopSpeaking } from "@/utils/ttsUtils";
import { toast } from "sonner";
import { DEFAULT_RECITER } from "@/utils/reciters";

export const useAudioState = () => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [recitationLanguage, setRecitationLanguage] = useState(() => 
    localStorage.getItem("recitationLanguage") || DEFAULT_RECITER
  );
  const [selectedReciter, setSelectedReciter] = useState(() =>
    localStorage.getItem("selectedReciter") || DEFAULT_RECITER
  );

  const handleLanguageChange = (value: string, {
    audioRef,
    resetVerse,
    setIsPlaying,
    resetAudio
  }: {
    audioRef: React.RefObject<HTMLAudioElement>,
    resetVerse: () => void,
    setIsPlaying: (playing: boolean) => void,
    resetAudio: () => void
  }) => {
    setRecitationLanguage(value);
    localStorage.setItem("recitationLanguage", value);
    
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    stopSpeaking();
    setIsPlaying(false);
    resetVerse();
    
    if (value !== DEFAULT_RECITER) {
      toast.info(`Switched to ${value} recitation`);
      setSelectedReciter(DEFAULT_RECITER);
    } else {
      const savedReciter = localStorage.getItem("selectedReciter") || DEFAULT_RECITER;
      setSelectedReciter(savedReciter);
      resetAudio();
    }
  };

  const startTransition = (callback: () => void) => {
    setIsTransitioning(true);
    callback();
    setTimeout(() => setIsTransitioning(false), isMobileDevice() ? 1000 : 500);
  };

  return {
    isTransitioning,
    recitationLanguage,
    selectedReciter,
    setSelectedReciter,
    handleLanguageChange,
    startTransition
  };
};