//import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//import { ThemeProvider } from "./utils/theme";
import { Navbar } from "./components/Navbar";
import { HomeSection } from "./sections/HomeSection";
import { PortfolioSection } from "./sections/PortfolioSection";
import { ModelsSection } from "./sections/ModelsSection";
import { ContactSection } from "./sections/ContactSection";

export const App = () => {
  return (
      <div className="bg-purple-light dark:bg-purple-dark text-purple-dark dark:text-purple-light">
          <Navbar />
          <HomeSection />
          <PortfolioSection />
          <ModelsSection />
          <ContactSection />
      </div>
  );
};

export default App;
