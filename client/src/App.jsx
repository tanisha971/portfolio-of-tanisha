import { Routes, Route } from "react-router-dom";
import "./styles/index.css";

import Home from "./pages/Home";
import Login from "./pages/Login";
import SectionPage from "./pages/SectionPage";

import ProjectOverview from "./components/Projects/ProjectOverview";

function App() {
  return (
    <>
      <div className="min-h-screen bg-black text-white overflow-x-hidden">
        <Routes>
          {/* HOME */}

          <Route
            path="/"
            element={<Home />}
          />

          {/* SECTION PAGES */}

          <Route
            path="/home"
            element={<SectionPage sectionId="home" />}
          />

          <Route
            path="/about"
            element={<SectionPage sectionId="about" />}
          />

          <Route
            path="/skills"
            element={<SectionPage sectionId="skills" />}
          />

          <Route
            path="/experience"
            element={<SectionPage sectionId="experience" />}
          />

          <Route
            path="/projects"
            element={<SectionPage sectionId="projects" />}
          />

          {/* INDIVIDUAL PROJECT */}

          <Route
            path="/projects/:id"
            element={<ProjectOverview />}
          />

          <Route
            path="/achievements"
            element={<SectionPage sectionId="achievements" />}
          />

          <Route
            path="/certificates"
            element={<SectionPage sectionId="certificates" />}
          />

          <Route
            path="/coding-profiles"
            element={<SectionPage sectionId="coding-profiles" />}
          />

          <Route
            path="/content"
            element={<SectionPage sectionId="content" />}
          />

          <Route
            path="/contact"
            element={<SectionPage sectionId="contact" />}
          />

          {/* LOGIN */}

          <Route
            path="/login"
            element={<Login />}
          />
        </Routes>
      </div>
    </>
  );
}

export default App;