import { useCallback, useState } from "react";
import HeroSection from "@/sections/Hero/HeroSection";
import AboutSection from "@/sections/About/AboutSection";
import ExpertiseSection from "@/sections/Expertise/ExpertiseSection";
import TechStackSection from "@/sections/TechStack/TechStackSection";
import ProjectsSection from "@/sections/Projects/ProjectsSection";
import ContactSection from "@/sections/Contact/ContactSection";
import ScrollProgress from "@/components/ScrollProgress";
import SceneVeil from "@/components/SceneVeil";
import Loader from "@/components/Loader";
import { ScrollProvider } from "@/lib/scroll";

export default function App() {
  const [appReady, setAppReady] = useState(false);

  // Loader 슬라이드 완료 시 호출 — Hero 인트로 트리거 신호
  const handleLoaderDone = useCallback(() => {
    document.documentElement.dataset.appReady = "true";
    window.dispatchEvent(new CustomEvent("app:ready"));
    setAppReady(true);
  }, []);

  return (
    <ScrollProvider>
      <Loader onDone={handleLoaderDone} />
      {/* 로더가 떠있는 동안에도 main DOM은 마운트 — 로더가 위 z-index로 가림 */}
      <ScrollProgress />
      <SceneVeil />
      <main
        className="relative"
        data-app-ready={appReady ? "true" : "false"}
      >
        <HeroSection />
        <AboutSection />
        <ExpertiseSection />
        <TechStackSection />
        <ProjectsSection />
        <ContactSection />
      </main>
    </ScrollProvider>
  );
}
