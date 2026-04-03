import { PortfolioHero } from "@/components/portfolio-hero";
import { ExperienceSection } from "@/components/experience-section";
import { ProjectsSection } from "@/components/projects-section";
import { BlogSection } from "@/components/blog-section";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <PortfolioHero />
      <ExperienceSection />
      <ProjectsSection />
      <BlogSection />
      <Footer />
    </div>
  );
};

export default Index;
