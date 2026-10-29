
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "motion/react";
import {
  ArrowLeft,
  ExternalLink,
  CalendarDays,
} from "lucide-react";

import GitHubIcon from "@mui/icons-material/GitHub";

import { getProjectById } from "../../services/projectService";

export default function ProjectOverview() {
  const { id } = useParams();

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProject = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getProjectById(id);
        setProject(response.data);
      } catch (error) {
        console.error("Failed to load project:", error);
        setError("Project could not be found.");
      } finally {
        setLoading(false);
      }
    };

    loadProject();
  }, [id]);

  const formatDate = (date) => {
    if (!date) return "Present";

    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
  };

  // LOADING
  if (loading) {
    return (
      <div className="project-overview-page flex min-h-screen items-center justify-center">
        <p className="project-overview-muted">Loading project...</p>
      </div>
    );
  }

  // ERROR
  if (error || !project) {
    return (
      <div className="project-overview-page flex min-h-screen flex-col items-center justify-center gap-6 px-6">
        <h1 className="project-overview-title text-2xl font-bold">
          Project not found
        </h1>

        <p className="project-overview-muted">
          {error || "This project is unavailable."}
        </p>

        <Link
          to="/projects"
          className="button-glow inline-flex items-center gap-2 rounded-xl px-6 py-3 font-semibold"
        >
          <ArrowLeft size={18} />
          Back to Projects
        </Link>
      </div>
    );
  }

  const categories = Array.isArray(project.category)
    ? project.category
    : project.category
      ? [project.category]
      : [];

  return (
    <main className="project-overview-page min-h-screen px-6 pb-24 pt-28 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-6xl"
      >
        {/* BACK */}

        <Link
          to="/projects"
          className="project-overview-back mb-10 inline-flex items-center gap-2 text-sm font-semibold"
        >
          <ArrowLeft size={18} />
          Back to Projects
        </Link>

        {/* HERO IMAGE */}

        <div className="project-overview-image overflow-hidden rounded-3xl border">
          {project.image ? (
            <img
              src={project.image}
              alt={project.title || "Project preview"}
              className="h-[300px] w-full object-cover md:h-[480px]"
            />
          ) : (
            <div className="project-overview-image-placeholder flex h-[300px] items-center justify-center md:h-[480px]">
              <span className="project-overview-muted">
                No project preview available
              </span>
            </div>
          )}
        </div>

        {/* PROJECT HEADER */}

        <div className="mt-10">
          {/* CATEGORIES */}

          {categories.length > 0 && (
            <div className="mb-5 flex flex-wrap gap-2">
              {categories.map((category) => (
                <span
                  key={category}
                  className="project-overview-category rounded-full border px-4 py-2 text-xs"
                >
                  {category}
                </span>
              ))}
            </div>
          )}

          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-start">
            <div>
              <h1 className="project-overview-title text-4xl font-bold tracking-tight md:text-5xl">
                {project.title}
              </h1>

              {/* DATE */}

              <div className="project-overview-muted mt-4 flex items-center gap-2">
                <CalendarDays size={18} />

                <span>
                  {formatDate(project.startDate)}
                  {" — "}
                  {formatDate(project.endDate)}
                </span>
              </div>
            </div>

            {/* ACTION BUTTONS */}

            <div className="flex flex-wrap gap-3">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-overview-action inline-flex items-center gap-2 rounded-xl border px-5 py-3 font-semibold"
                >
                  <GitHubIcon fontSize="small" />
                  GitHub
                </a>
              )}

              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="button-glow inline-flex items-center gap-2 rounded-xl px-5 py-3 font-semibold"
                >
                  <ExternalLink size={18} />
                  Live Demo
                </a>
              )}
            </div>
          </div>
        </div>

        {/* CONTENT */}

        <div className="mt-14 grid gap-12 lg:grid-cols-[1fr_300px]">
          {/* LEFT */}

          <div>
            <h2 className="project-overview-title mb-5 text-2xl font-bold">
              Project Overview
            </h2>

            <p className="project-overview-description text-base leading-8">
              {project.description}
            </p>

            {/* DETAILED BULLETS */}

            {project.details?.length > 0 && (
              <ul className="mt-8 space-y-5">
                {project.details.map((detail, index) => (
                  <li
                    key={index}
                    className="project-overview-description flex gap-4"
                  >
                    <span className="project-overview-bullet mt-[10px] h-2 w-2 shrink-0 rounded-full" />

                    <span className="leading-7">{detail}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* RIGHT */}

          <aside>
            <div className="project-overview-panel rounded-2xl border p-6 backdrop-blur-xl">
              <h2 className="project-overview-title mb-5 text-lg font-bold">
                Tech Stack
              </h2>

              {project.tech?.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="project-overview-tech rounded-lg border px-3 py-2 text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="project-overview-muted text-sm">
                  Tech stack not specified.
                </p>
              )}
            </div>
          </aside>
        </div>
      </motion.div>
    </main>
  );
}
