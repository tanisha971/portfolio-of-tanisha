
import { motion } from "motion/react";
import { ExternalLink, ArrowRight } from "lucide-react";
import GitHubIcon from "@mui/icons-material/GitHub";
import { Link } from "react-router-dom";
import "../../styles/portfolio-theme.css";

export default function ProjectCard({ project, index }) {
  const formatDateRange = () => {
    if (!project.startDate) return "";

    const startYear = new Date(project.startDate).getFullYear();

    if (!project.endDate) return `${startYear}`;

    const endYear = new Date(project.endDate).getFullYear();

    return startYear === endYear
      ? `${startYear}`
      : `${startYear} - ${endYear}`;
  };

  const categories = Array.isArray(project.category)
    ? project.category
    : project.category
      ? [project.category]
      : [];

  const visibleTech = project.tech?.slice(0, 3) || [];
  const hasMoreTech = (project.tech?.length || 0) > 3;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="project-theme-card group relative mx-auto flex h-full w-full max-w-[420px] flex-col overflow-hidden rounded-2xl p-6 pt-5 sm:p-8 sm:pt-6 backdrop-blur-xl"
    >
      {/* BACKGROUND GLOW */}
      <div className="project-card-glow pointer-events-none absolute inset-0 rounded-2xl" />

      {/* TOP ROW: CATEGORIES + ACTION ICONS */}
      <div className="relative z-10 mb-5 flex min-h-10 items-start justify-between gap-3">
        {/* CATEGORIES */}
        <div className="flex min-w-0 flex-wrap gap-2">
          {categories.map((category) => (
            <span
              key={category}
              className="project-category-badge rounded-full px-3 py-1.5 text-xs"
            >
              {category}
            </span>
          ))}
        </div>

        {/* ACTION ICONS */}
        <div className="flex shrink-0 gap-2">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              title="View Source Code"
              aria-label={`View ${project.title} source code`}
              className="project-icon-button flex h-10 w-10 items-center justify-center rounded-full"
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
              className="project-icon-button flex h-10 w-10 items-center justify-center rounded-full"
            >
              <ExternalLink size={18} />
            </a>
          )}
        </div>
      </div>

      {/* PROJECT IMAGE */}
      <div className="project-image-frame relative z-10 mb-6 h-48 shrink-0 overflow-hidden rounded-xl sm:h-52">
        {project.image ? (
          <img
            src={project.image}
            alt={`${project.title} project preview`}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="project-overview-image-placeholder flex h-full items-center justify-center">
            <span className="project-muted text-sm">
              No preview available
            </span>
          </div>
        )}
      </div>

      {/* PROJECT DETAILS */}
      <div className="relative z-10 space-y-3">
        <div className="flex items-start justify-between gap-3">
          <h3 className="project-heading min-w-0 text-xl font-bold">
            {project.title}
          </h3>

          {project.startDate && (
            <span className="project-muted whitespace-nowrap pt-1 text-sm">
              {formatDateRange()}
            </span>
          )}
        </div>

        <p
          className="project-description text-sm leading-7"
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

      {/* TECH STACK */}
      {visibleTech.length > 0 && (
        <div className="relative z-10 mt-6 flex flex-wrap items-center gap-2">
          {visibleTech.map((tech) => (
            <span
              key={tech}
              className="project-tech-tag rounded-lg px-3 py-1.5 text-xs"
            >
              {tech}
            </span>
          ))}

          {hasMoreTech && (
            <span
              title={`${project.tech.length - 3} more technologies`}
              aria-label={`${project.tech.length - 3} more technologies`}
              className="project-tech-tag project-more-tech rounded-lg px-3 py-1.5 text-xs tracking-widest"
            >
              ...
            </span>
          )}
        </div>
      )}

      {/* BOTTOM CTA */}
      <div className="relative z-10 mt-auto flex justify-center pt-8">
        <Link
          to={`/projects/${project._id}`}
          className="button-glow project-view-button inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold"
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
