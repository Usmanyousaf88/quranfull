import React from "react";
import { useSurahs, useAllPages } from "../services/quranApi";
import { useReadingProgress } from "../services/progressApi";
import SurahCard from "../components/SurahCard";
import JuzCard from "../components/JuzCard";
import PageCard from "../components/PageCard";
import HizbCard from "../components/HizbCard";
import QuranNavigation from "@/components/QuranNavigation";
import QuranStats from "@/components/QuranStats";
import QuranHeader from "@/components/QuranHeader";
import { DEFAULT_RECITER } from "../utils/reciters";
import { languages } from "../utils/languages";

// Mock data for Juz and Hizb views
const juzData = Array.from({ length: 30 }, (_, i) => ({
  number: i + 1,
  versesCount: 200,
  startSurah: "Al-Fatiha",
  endSurah: "Al-Baqarah",
}));

const hizbData = Array.from({ length: 60 }, (_, i) => ({
  number: i + 1,
  versesCount: 100,
  startSurah: "Al-Fatiha",
  endSurah: "Al-Baqarah",
}));

const Index = () => {
  const { data: surahs, isLoading: surahsLoading, error: surahsError } = useSurahs();
  const { data: pages, isLoading: pagesLoading, error: pagesError } = useAllPages();
  const { data: readingProgress } = useReadingProgress();
  
  const [selectedReciter, setSelectedReciter] = React.useState(() => 
    localStorage.getItem('selectedReciter') || DEFAULT_RECITER
  );
  const [selectedLanguage, setSelectedLanguage] = React.useState(() => 
    localStorage.getItem('selectedLanguage') || languages[1].code
  );
  const [activeView, setActiveView] = React.useState("surah");

  const handleReciterChange = (value: string) => {
    setSelectedReciter(value);
    localStorage.setItem('selectedReciter', value);
  };

  const handleLanguageChange = (value: string) => {
    setSelectedLanguage(value);
    localStorage.setItem('selectedLanguage', value);
  };

  const renderContent = () => {
    switch (activeView) {
      case "juz":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {juzData.map((juz) => (
              <JuzCard key={juz.number} {...juz} />
            ))}
          </div>
        );
      case "page":
        if (pagesLoading) {
          return <div className="text-xl text-center">Loading Pages...</div>;
        }
        if (pagesError) {
          return <div className="text-xl text-red-500 text-center">Error loading pages</div>;
        }
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pages?.map((page) => (
              <PageCard key={page.number} {...page} />
            ))}
          </div>
        );
      case "hizb":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hizbData.map((hizb) => (
              <HizbCard key={hizb.number} {...hizb} />
            ))}
          </div>
        );
      default:
        if (surahsLoading) {
          return <div className="text-xl text-center">Loading Surahs...</div>;
        }
        if (surahsError) {
          return <div className="text-xl text-red-500 text-center">Error loading surahs</div>;
        }
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {surahs?.map((surah) => (
              <SurahCard key={surah.number} {...surah} />
            ))}
          </div>
        );
    }
  };

  if (surahsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading Surahs...</div>
      </div>
    );
  }

  if (surahsError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-red-500">Error loading Surahs</div>
      </div>
    );
  }

  // Calculate today's progress
  const today = new Date().toISOString().split('T')[0];
  const todayProgress = readingProgress?.dailyProgress?.find(p => p.date === today);
  
  return (
    <div className="min-h-screen">
      <QuranHeader
        selectedReciter={selectedReciter}
        selectedLanguage={selectedLanguage}
        onReciterChange={handleReciterChange}
        onLanguageChange={handleLanguageChange}
        surahs={surahs || []}
      />
      
      <div className="container pt-64 pb-16">
        <QuranNavigation 
          activeView={activeView}
          onViewChange={setActiveView}
        />
        
        <QuranStats 
          dailyProgress={{
            pagesRead: todayProgress?.pagesRead || 0,
            dailyGoal: 6,
          }}
          totalProgress={Math.round((readingProgress?.completedPages?.length || 0) / 604 * 100)}
          bookmarks={readingProgress?.bookmarks?.length || 0}
        />
        
        {renderContent()}
      </div>
    </div>
  );
};

export default Index;
