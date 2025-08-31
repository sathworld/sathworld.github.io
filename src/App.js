//import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./utils/theme";
import { Navbar } from "./components/Navbar";
import { HomeSection } from "./sections/HomeSection";
import { PortfolioSection } from "./sections/PortfolioSection";
import { ContactSection } from "./sections/ContactSection";
import { ResumeSection } from './sections/ResumeSection';
import { SkillsSection } from './sections/SkillsSection';
import ThreeBackground from './components/ThreeBackground';

export const App = () => {
  return (
    <ThemeProvider>
      <div className="relative min-h-screen bg-purple-light dark:bg-purple-dark text-purple-dark dark:text-purple-light overflow-hidden">
        <ThreeBackground />
        <div className="relative z-10">
          <Navbar />
          <HomeSection />
          <PortfolioSection />
          <ResumeSection />
          <SkillsSection />
          <ContactSection />
        </div>
      </div>
    </ThemeProvider>
  );
};

export default App;


// TODO: Add a Footer
// TODO: Add a 404 Page
// TODO: Add a blog section
// TODO: Add a resume section
// TODO: Add a skills section
// TODO: Add an inteests/hobbies section (LOW PRIORITY)
// TODO: Add pictures to project backgrounds
// TODO: Add project information, description, tags, links, and pictures
// TODO: Design Team involvement
