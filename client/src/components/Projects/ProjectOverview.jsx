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

  // --------------------------------------------------
  // FETCH PROJECT
  // --------------------------------------------------

  useEffect(() => {
    const loadProject = async () => {
      try {
        setLoading(true);

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

  // --------------------------------------------------
  // FORMAT DATE
  // --------------------------------------------------

  const formatDate = (date) => {
    if (!date) return "Present";

    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
  };

  // --------------------------------------------------
  // LOADING
  // --------------------------------------------------

  if (loading) {
    return (
      <div
        className="
          flex
          min-h-screen
          items-center
          justify-center
          bg-black
          text-white
        "
      >
        Loading project...
      </div>
    );
  }

  // --------------------------------------------------
  // ERROR
  // --------------------------------------------------

  if (error || !project) {
    return (
      <div
        className="
          flex
          min-h-screen
          flex-col
          items-center
          justify-center
          gap-6
          bg-black
          text-white
        "
      >
        <h1 className="text-2xl font-bold">
          Project not found
        </h1>

        <Link
          to="/projects"
          className="
            rounded-xl
            bg-white
            px-6
            py-3
            font-semibold
            text-black
          "
        >
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
    <main
      className="
        min-h-screen
        bg-black
        px-6
        pb-24
        pt-28
        text-white
        lg:px-8
      "
    >
      <motion.div
        initial={{
          opacity: 0,
          y: 30,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.5,
        }}
        className="
          mx-auto
          max-w-6xl
        "
      >
        {/* BACK */}

        <Link
          to="/projects"
          className="
            mb-10
            inline-flex
            items-center
            gap-2
            text-sm
            font-semibold
            text-gray-400
            transition
            hover:text-white
          "
        >
          <ArrowLeft size={18} />

          Back to Projects
        </Link>

        {/* HERO IMAGE */}

        <div
          className="
            overflow-hidden
            rounded-3xl
            border
            border-white/10
            bg-white/5
          "
        >
          <img
            src={project.image}
            alt={project.title}
            className="
              h-[300px]
              w-full
              object-cover
              md:h-[480px]
            "
          />
        </div>

        {/* PROJECT HEADER */}

        <div className="mt-10">
          {/* CATEGORIES */}

          <div className="mb-5 flex flex-wrap gap-2">
            {categories.map((category) => (
              <span
                key={category}
                className="
                  rounded-full
                  border
                  border-white/10
                  bg-white/10
                  px-4
                  py-2
                  text-xs
                  text-gray-300
                "
              >
                {category}
              </span>
            ))}
          </div>

          <div
            className="
              flex
              flex-col
              justify-between
              gap-6
              md:flex-row
              md:items-start
            "
          >
            <div>
              <h1
                className="
                  text-4xl
                  font-bold
                  tracking-tight
                  md:text-5xl
                "
              >
                {project.title}
              </h1>

              {/* DATE */}

              <div
                className="
                  mt-4
                  flex
                  items-center
                  gap-2
                  text-gray-400
                "
              >
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
                  className="
                    inline-flex
                    items-center
                    gap-2
                    rounded-xl
                    border
                    border-white/20
                    bg-white/5
                    px-5
                    py-3
                    font-semibold
                    transition
                    hover:bg-white
                    hover:text-black
                  "
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
                  className="
                    inline-flex
                    items-center
                    gap-2
                    rounded-xl
                    bg-white
                    px-5
                    py-3
                    font-semibold
                    text-black
                    transition
                    hover:bg-gray-200
                  "
                >
                  <ExternalLink size={18} />

                  Live Demo
                </a>
              )}
            </div>
          </div>
        </div>

        {/* CONTENT */}

        <div
          className="
            mt-14
            grid
            gap-12
            lg:grid-cols-[1fr_300px]
          "
        >
          {/* LEFT */}

          <div>
            <h2
              className="
                mb-5
                text-2xl
                font-bold
              "
            >
              Project Overview
            </h2>

            <p
              className="
                text-base
                leading-8
                text-gray-300
              "
            >
              {project.description}
            </p>

            {/* DETAILED BULLETS */}

            {project.details?.length > 0 && (
              <ul
                className="
                  mt-8
                  space-y-5
                "
              >
                {project.details.map((detail, index) => (
                  <li
                    key={index}
                    className="
                      flex
                      gap-4
                      text-gray-300
                    "
                  >
                    <span
                      className="
                        mt-[10px]
                        h-2
                        w-2
                        shrink-0
                        rounded-full
                        bg-white
                      "
                    />

                    <span className="leading-7">
                      {detail}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* RIGHT */}

          <aside>
            <div
              className="
                rounded-2xl
                border
                border-white/10
                bg-white/5
                p-6
                backdrop-blur-xl
              "
            >
              <h2
                className="
                  mb-5
                  text-lg
                  font-bold
                "
              >
                Tech Stack
              </h2>

              <div className="flex flex-wrap gap-2">
                {project.tech?.map((tech) => (
                  <span
                    key={tech}
                    className="
                      rounded-lg
                      border
                      border-white/10
                      bg-white/10
                      px-3
                      py-2
                      text-sm
                      text-gray-300
                    "
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </motion.div>
    </main>
  );
}