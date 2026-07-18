import Navbar from "../components/Navbar/Navbar";
import Hero from "../components/Hero/Hero";
import ScrollProgress from "../components/ScrollProgress/ScrollProgress";
import About from "../components/About/About";
import Skills from "../components/Skills/Skills";
import Experience from "../components/Experience/Experience";
import Projects from "../components/Projects/Projects";
import Achievements from "../components/Achievements/Achievements";
import Certificates from "../components/Certificates/Certificates";
import CodingProfiles from "../components/CodingProfiles/CodingProfiles";
import Contact from "../components/Contact/Contact";
import Footer from "../components/Footer/Footer";

export default function Home() {
  return (
    <>
      <ScrollProgress />

      <Navbar />

      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Achievements />
        <Certificates />
        <CodingProfiles />
        <Contact />
        <Footer />
      </main>
      
    </>
  );
}