import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import SurahPage from "./pages/SurahPage";
import JuzPage from "./pages/JuzPage";
import PagePage from "./pages/PagePage";
import HizbPage from "./pages/HizbPage";
import RukuPage from "./pages/RukuPage";
import HizbQuarterPage from "./pages/HizbQuarterPage";
import ComingSoon from "./components/ComingSoon";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/surah/:id" element={<SurahPage />} />
          <Route path="/juz/:id" element={<JuzPage />} />
          <Route path="/page/:id" element={<PagePage />} />
          <Route path="/hizb/:id" element={<HizbPage />} />
          <Route path="/hizb-quarter/:id" element={<HizbQuarterPage />} />
          <Route path="/ruku/:id" element={<RukuPage />} />
          <Route path="/coming-soon" element={<ComingSoon />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;