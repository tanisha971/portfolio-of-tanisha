
import { motion } from "motion/react";
import { ExternalLink, ArrowRight } from "lucide-react";
import GitHubIcon from "@mui/icons-material/GitHub";
import { Link } from "react-router-dom";

export default function ProjectCard({ project, index }) {
  // FORMAT PROJECT DATE RANGE
  const formatDateRange = () => {
    if (!project.startDate) return "";

    const startYear = new Date(project.startDate).getFullYear();

    if (!project.endDate) {
      return `${startYear}`;
    }

    const endYear = new Date(project.endDate).getFullYear();

    if (startYear === endYear) {
      return `${startYear}`;
    }

    return `${startYear} - ${endYear}`;
  };

  // SUPPORT MULTIPLE CATEGORIES
  const categories = Array.isArray(project.category)
    ? project.category
    : project.category
      ? [project.category]
      : [];

  // DISPLAY ONLY THREE TECHNOLOGIES
  const visibleTech = project.tech?.slice(0, 3) || [];
  const hasMoreTech = (project.tech?.length || 0) > 3;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      
      className="
        group relative mx-auto flex h-full w-full
        max-w-[420px] flex-col overflow-hidden rounded-2xl
        border border-white/10 bg-white/5 p-8
        backdrop-blur-xl transition-all duration-300
        hover:border-white/30
      "
    >
      {/* HOVER GLOW */}
      <div
        className="
          pointer-events-none absolute inset-0 rounded-2xl
          bg-gradient-to-br from-transparent via-transparent
          to-white/5 opacity-0 transition duration-500
          group-hover:opacity-100
        "
      />

      {/* TOP RIGHT ACTIONS */}
      <div className="absolute right-5 top-5 z-20 flex gap-2">
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            title="View Source Code"
            aria-label={`View ${project.title} source code`}
            className="
              flex h-10 w-10 items-center justify-center rounded-full
              border border-white/20 bg-black/50 text-white
              backdrop-blur-md transition-all duration-300
              hover:scale-105 hover:bg-white hover:text-black
            "
          >
            <GitHubIcon fontSize="small" />
          </a>
        )}

        {project.live && (
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            title="View Live Project"
            aria-label={`View ${project.title} live demo`}
            className="
              flex h-10 w-10 items-center justify-center rounded-full
              border border-white/20 bg-black/50 text-white
              backdrop-blur-md transition-all duration-300
              hover:scale-105 hover:bg-white hover:text-black
            "
          >
            <ExternalLink size={18} />
          </a>
        )}
      </div>

      {/* CATEGORIES */}
      <div
        className="
          absolute left-5 top-5 z-20 flex max-w-[60%]
          flex-wrap gap-2
        "
      >
        {categories.map((category) => (
          <span
            key={category}
            className="
              rounded-full border border-white/20 bg-black/50
              px-3 py-1.5 text-xs text-white backdrop-blur-md
            "
          >
            {category}
          </span>
        ))}
      </div>

      {/* PROJECT IMAGE */}
      <div
        className="
          relative mb-6 h-56 shrink-0 overflow-hidden rounded-xl
          border border-white/10 bg-white/10
        "
      >
        <img
          src={project.image}
          alt={project.title}
          className="
            h-full w-full object-cover
          "
        />
      </div>

      {/* PROJECT DETAILS */}
      <div className="relative z-10 space-y-3">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-xl font-bold text-white">
            {project.title}
          </h3>

          {project.startDate && (
            <span className="whitespace-nowrap pt-1 text-sm text-gray-400">
              {formatDateRange()}
            </span>
          )}
        </div>

        {/* DESCRIPTION - MAXIMUM TWO LINES */}
        <p
          className="text-sm leading-7 text-gray-300"
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {project.description}
        </p>
      </div>

      {/* TECH STACK - THREE ITEMS MAXIMUM */}
      {visibleTech.length > 0 && (
        <div className="relative z-10 mt-6 flex flex-wrap items-center gap-2">
          {visibleTech.map((tech) => (
            <span
              key={tech}
              className="
                rounded-lg border border-white/10 bg-white/10
                px-3 py-1.5 text-xs text-gray-300
              "
            >
              {tech}
            </span>
          ))}

          {hasMoreTech && (
            <span
              title={`${project.tech.length - 3} more technologies`}
              aria-label={`${project.tech.length - 3} more technologies`}
              className="
                rounded-lg border border-white/10 bg-white/10
                px-3 py-1.5 text-xs tracking-widest text-gray-400
              "
            >
              ...
            </span>
          )}
        </div>
      )}

      {/* BOTTOM-CENTER CTA */}
      <div className="relative z-10 mt-auto flex justify-center pt-8">
        <Link
          to={`/projects/${project._id}`}
          className="
            inline-flex items-center justify-center gap-2
            rounded-xl border border-white/15 bg-white/5
            px-5 py-3 text-sm font-semibold text-white
            transition-all duration-300
            hover:border-white/40 hover:bg-white hover:text-black
          "
        >
          View full project
          <ArrowRight
            size={16}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </Link>
      </div>
    </motion.div>
  );
}
