import { useEffect, useState } from "react";

import Navbar from "../components/Navbar/Navbar";
import Loader from "../components/Loader/Loader";
import ScrollProgress from "../components/ScrollProgress/ScrollProgress";

import Hero from "../components/Hero/Hero";
import About from "../components/About/About";
import Skills from "../components/Skills/Skills";
import Experience from "../components/Experience/Experience";
import Projects from "../components/Projects/Projects";
import Achievements from "../components/Achievements/Achievements";
import Certificates from "../components/Certificates/Certificates";
import CodingProfiles from "../components/CodingProfiles/CodingProfiles";
import Content from "../components/Content/Content";
import Contact from "../components/Contact/Contact";
import Footer from "../components/Footer/Footer";

import api from "../services/api";

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializePortfolio = async () => {
      try {
        // Wake up Render and verify that the backend is reachable.
        await api.get("/projects");

        // Small delay so the loader doesn't disappear too abruptly.
        await new Promise((resolve) => setTimeout(resolve, 500));
      } catch (error) {
        console.error("Failed to initialize portfolio:", error);
      } finally {
        setLoading(false);
      }
    };

    initializePortfolio();
  }, []);

  if (loading) {
    return <Loader />;
  }

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
        <Content />
        <Contact />
        <Footer />
      </main>
    </>
  );
}