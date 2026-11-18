import SmoothScroll from "@/components/SmoothScroll";
import Hero from "@/components/Hero";
import WorkSection from "@/components/WorkSection";
import ProjectsSection from "@/components/ProjectsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <SmoothScroll>
      <main className="relative w-full bg-[#F7F5F0] text-[#0A0A0A] overflow-x-clip">
        {/* Scroll-driven Hero with continuous IMAD transformation */}
        <Hero />

        {/* Horizontal scroll Work Experience chapters */}
        <WorkSection />

        {/* Horizontal scroll Projects chapters */}
        <ProjectsSection />

        {/* Vertical editorial Contact section */}
        <ContactSection />

        {/* Minimal Footer with reserved signature slot */}
        <Footer />
      </main>
    </SmoothScroll>
  );
}
