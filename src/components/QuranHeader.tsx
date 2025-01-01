import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { reciters } from "../utils/reciters";
import { languages } from "../utils/languages";
import { useToast } from "@/components/ui/use-toast";
import SearchBar from "@/components/SearchBar";

interface QuranHeaderProps {
  selectedReciter: string;
  selectedLanguage: string;
  onReciterChange: (value: string) => void;
  onLanguageChange: (value: string) => void;
  surahs: any[];
}

const QuranHeader: React.FC<QuranHeaderProps> = ({
  selectedReciter,
  selectedLanguage,
  onReciterChange,
  onLanguageChange,
  surahs,
}) => {
  const { toast } = useToast();

  const handleReciterChange = (value: string) => {
    onReciterChange(value);
    toast({
      title: "Reciter Changed",
      description: `Selected ${reciters.find(r => r.identifier === value)?.name}`,
    });
  };

  const handleLanguageChange = (value: string) => {
    onLanguageChange(value);
    toast({
      title: "Translation Language Changed",
      description: `Selected ${languages.find(l => l.code === value)?.name}`,
    });
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-gray-200">
      <div className="container mx-auto py-4">
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl font-bold text-center">The Noble Quran</h1>
          <p className="text-center text-gray-600 italic">In loving memory of Muhammad Yousaf Mohd Rafi</p>
          <div className="max-w-md mx-auto space-y-4">
            <SearchBar surahs={surahs} />
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
  );
};

export default QuranHeader;