import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import ProjectsTier1 from "@/components/sections/ProjectsTier1";
import ProjectsTier2 from "@/components/sections/ProjectsTier2";
import ContactSection from "@/components/sections/ContactSection";

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <AboutSection />
      <ProjectsTier1 />
      <ProjectsTier2 />
      <ContactSection />
    </main>
  );
}
