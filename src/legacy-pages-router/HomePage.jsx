import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Accomplishments from "@/components/Accomplishments";
import NIHFunding from "@/components/NIHFunding";
import ProjectSpotlight from "@/components/ProjectSpotlight";
import InnovationHubPreview from "@/components/InnovationHubPreview";
import Contact from "@/components/Contact";

export default function HomePage() {
  return (
    <div className="bg-[#05050A] min-h-screen" data-testid="home-page">
      <Navbar />
      <Hero />
      <Accomplishments />
      <NIHFunding />
      <ProjectSpotlight />
      <InnovationHubPreview />
      <Contact />
    </div>
  );
}
