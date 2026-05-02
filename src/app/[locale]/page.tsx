import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import MarqueeStrip from "@/components/sections/MarqueeStrip";
import ServicesSection from "@/components/sections/ServicesSection";
import ProjectsTier1 from "@/components/sections/ProjectsTier1";
import ProjectsTier2 from "@/components/sections/ProjectsTier2";
import ExperienceSection from "@/components/sections/ExperienceSection";
import ContactSection from "@/components/sections/ContactSection";
import SectionDivider from "@/components/ui/SectionDivider";

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <SectionDivider />
      <AboutSection />
      <MarqueeStrip />
      <ServicesSection />
      <SectionDivider />
      <ProjectsTier1 />
      <ProjectsTier2 />
      <SectionDivider />
      <ExperienceSection />
      <SectionDivider />
      <ContactSection />
    </main>
  );
}
