import React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";

interface QuranNavigationProps {
  activeView: string;
  onViewChange: (view: string) => void;
}

const QuranNavigation: React.FC<QuranNavigationProps> = ({
  activeView,
  onViewChange,
}) => {
  const { toast } = useToast();

  const handleViewChange = (view: string) => {
    if (view !== "surah") {
      toast({
        title: "Coming Soon",
        description: `The ${view} view will be available in the next update.`,
      });
      return;
    }
    onViewChange(view);
  };

  return (
    <div className="w-full overflow-x-auto pb-2">
      <Tabs defaultValue="surah" value={activeView} className="w-full">
        <TabsList className="w-full justify-start md:justify-center">
          <TabsTrigger
            value="surah"
            onClick={() => handleViewChange("surah")}
            className="text-lg"
          >
            Surahs
          </TabsTrigger>
          <TabsTrigger
            value="juz"
            onClick={() => handleViewChange("juz")}
            className="text-lg"
          >
            Juz
          </TabsTrigger>
          <TabsTrigger
            value="page"
            onClick={() => handleViewChange("page")}
            className="text-lg"
          >
            Pages
          </TabsTrigger>
          <TabsTrigger
            value="hizb"
            onClick={() => handleViewChange("hizb")}
            className="text-lg"
          >
            Hizb
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};

export default QuranNavigation;