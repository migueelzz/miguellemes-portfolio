import { PortfolioHero } from "@/components/portfolio-hero";
import { ExperienceSection } from "@/components/experience-section";
import { ProjectsSection } from "@/components/projects-section";
import { GithubContributions } from "@/components/github-contributions";
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
      <GithubContributions />
      <BlogSection />
      <Footer />
    </div>
  );
};

export default Index;
