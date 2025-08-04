//import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./utils/theme";
import { Navbar } from "./components/Navbar";
import { HomeSection } from "./sections/HomeSection";
import { PortfolioSection } from "./sections/PortfolioSection";
import { ModelsSection } from "./sections/ModelsSection";
import { ContactSection } from "./sections/ContactSection";
import { ResumeSection } from './sections/ResumeSection';
import { SkillsSection } from './sections/SkillsSection';

export const App = () => {
  return (
    <ThemeProvider>
      <div className="bg-purple-light dark:bg-purple-dark text-purple-dark dark:text-purple-light">
          <Navbar />
          <HomeSection />
          <PortfolioSection />
          <ResumeSection />
          <SkillsSection />
          <ModelsSection />
          <ContactSection />
      </div>
    </ThemeProvider>
  );
};

export default App;


// TODO: Change Fonts
// TODO: Add a Favicon
// TODO: Add a Footer
// TODO: Add a 404 Page
// TODO: Add an animated background
// TODO: Loading spinner (no)
// TODO: Add a blog section
// TODO: Add a resume section
// TODO: Add a skills section
// TODO: Add a timeline section (no)
// TODO: Add a testimonials section (no)
// TODO: Add a pricing section (no)
// TODO: Add a FAQ section (no)
// TODO: Add a newsletter section (no)
// TODO: Add an inteests/hobbies section (LOW PRIORITY)
// TODO: Add a social media section (LOW PRIORITY)
// TODO: Add pictures to project backgrounds
// TODO: Add project information, description, tags, links, and pictures
// TODO: Design Team involvement
// TODO: Play around with background colors
