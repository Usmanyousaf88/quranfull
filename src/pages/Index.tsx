import React from "react";
import { useSurahs } from "../services/quranApi";
import SurahCard from "../components/SurahCard";
import JuzCard from "../components/JuzCard";
import PageCard from "../components/PageCard";
import HizbCard from "../components/HizbCard";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { reciters, DEFAULT_RECITER } from "../utils/reciters";
import { languages } from "../utils/languages";
import { useToast } from "@/components/ui/use-toast";
import SearchBar from "@/components/SearchBar";
import QuranNavigation from "@/components/QuranNavigation";
import QuranStats from "@/components/QuranStats";
import { useQuranProgress } from "../hooks/useQuranProgress";

// Mock data for Juz view
const juzData = Array.from({ length: 30 }, (_, i) => ({
  number: i + 1,
  versesCount: 200, // This is mock data
  startSurah: "Al-Fatiha", // This is mock data
  endSurah: "Al-Baqarah", // This is mock data
}));

// Mock data for Hizb view
const hizbData = Array.from({ length: 60 }, (_, i) => ({
  number: i + 1,
  versesCount: 100, // This is mock data
  startSurah: "Al-Fatiha", // This is mock data
  endSurah: "Al-Baqarah", // This is mock data
}));

const Index = () => {
  const { data: surahs, isLoading, error } = useSurahs();
  const { toast } = useToast();
  const { progress, setDailyGoal } = useQuranProgress();
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
    toast({
      title: "Reciter Changed",
      description: `Selected ${reciters.find(r => r.identifier === value)?.name}`,
    });
  };

  const handleLanguageChange = (value: string) => {
    setSelectedLanguage(value);
    localStorage.setItem('selectedLanguage', value);
    toast({
      title: "Translation Language Changed",
      description: `Selected ${languages.find(l => l.code === value)?.name}`,
    });
  };

  // Mock data for Page view (replace with actual API data later)
  const pageData = Array.from({ length: 604 }, (_, i) => ({
    number: i + 1,
    surahName: "Al-Fatiha", // Replace with actual surah
    versesCount: 7, // Replace with actual count
  }));

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
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 604 }, (_, i) => ({
              number: i + 1,
              surahName: "Al-Fatiha",
              versesCount: 7,
            })).map((page) => (
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
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {surahs?.map((surah) => (
              <SurahCard key={surah.number} {...surah} />
            ))}
          </div>
        );
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading Surahs...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-red-500">Error loading Surahs</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-gray-200">
        <div className="container mx-auto py-4">
          <div className="flex flex-col gap-4">
            <h1 className="text-4xl font-bold text-center">The Noble Quran</h1>
            <QuranNavigation 
              activeView={activeView}
              onViewChange={setActiveView}
            />
            <div className="max-w-md mx-auto space-y-4">
              <SearchBar surahs={surahs || []} />
              <Select value={selectedReciter} onValueChange={handleReciterChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a reciter" />
                </SelectTrigger>
                <SelectContent>
                  {reciters.map((reciter) => (
                    <SelectItem key={reciter.id} value={reciter.identifier}>
                      {reciter.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedLanguage} onValueChange={handleLanguageChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select translation language" />
                </SelectTrigger>
                <SelectContent>
                  {languages.map((language) => (
                    <SelectItem key={language.id} value={language.code}>
                      {language.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container pt-64 pb-16">
        <QuranStats 
          dailyProgress={progress.dailyProgress}
          totalProgress={progress.totalProgress}
          bookmarks={progress.bookmarks.length}
        />
        {renderContent()}
      </div>
    </div>
  );
};

export default Index;
