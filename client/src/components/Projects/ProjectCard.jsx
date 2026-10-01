import { motion } from "motion/react";
import { ExternalLink } from "lucide-react";
import GitHubIcon from "@mui/icons-material/GitHub";
import { Link } from "react-router-dom";

export default function ProjectCard({ project, index }) {
  // --------------------------------------------------
  // FORMAT PROJECT DATE RANGE
  // --------------------------------------------------

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

  // --------------------------------------------------
  // SUPPORT MULTIPLE CATEGORIES
  // --------------------------------------------------

  const categories = Array.isArray(project.category)
    ? project.category
    : project.category
    ? [project.category]
    : [];

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 30,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
      }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
      }}
      whileHover={{
        y: -8,
      }}
      className="
        group
        relative
        mx-auto
        w-full
        max-w-[420px]
        overflow-hidden
        rounded-2xl
        border
        border-white/10
        bg-white/5
        p-8
        backdrop-blur-xl
        transition-all
        duration-300
        hover:border-white/30
      "
    >
      {/* HOVER GLOW */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          rounded-2xl
          bg-gradient-to-br
          from-transparent
          via-transparent
          to-white/5
          opacity-0
          transition
          duration-500
          group-hover:opacity-100
        "
      />

      {/* TOP RIGHT ACTIONS */}

      <div
        className="
          absolute
          top-5
          right-5
          z-20
          flex
          gap-2
        "
      >
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            title="View Source Code"
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-full
              border
              border-white/20
              bg-black/50
              text-white
              backdrop-blur-md
              transition-all
              duration-300
              hover:scale-105
              hover:bg-white
              hover:text-black
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
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-full
              border
              border-white/20
              bg-black/50
              text-white
              backdrop-blur-md
              transition-all
              duration-300
              hover:scale-105
              hover:bg-white
              hover:text-black
            "
          >
            <ExternalLink size={18} />
          </a>
        )}
      </div>

      {/* CATEGORY */}

      <div
        className="
          absolute
          top-5
          left-5
          z-20
          flex
          max-w-[60%]
          flex-wrap
          gap-2
        "
      >
        {categories.map((category) => (
          <span
            key={category}
            className="
              rounded-full
              border
              border-white/20
              bg-black/50
              px-3
              py-1.5
              text-xs
              text-white
              backdrop-blur-md
            "
          >
            {category}
          </span>
        ))}
      </div>

      {/* PROJECT IMAGE */}

      <div
        className="
          mb-6
          h-56
          overflow-hidden
          rounded-xl
          border
          border-white/10
          bg-white/10
        "
      >
        <img
          src={project.image}
          alt={project.title}
          className="
            h-full
            w-full
            object-cover
            transition
            duration-500
            group-hover:scale-105
          "
        />
      </div>

      {/* PROJECT DETAILS */}

      <div className="space-y-3">
        <div
          className="
            flex
            items-center
            justify-between
            gap-4
          "
        >
          <h3 className="text-xl font-bold text-white">
            {project.title}
          </h3>

          {project.startDate && (
            <span
              className="
                whitespace-nowrap
                text-sm
                text-gray-400
              "
            >
              {formatDateRange()}
            </span>
          )}
        </div>

        {/* DESCRIPTION - ONLY 2 LINES */}

        <p
          className="
            text-sm
            leading-7
            text-gray-300
          "
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {project.description}
        </p>

        {/* SEE MORE */}

        <Link
          to={`/projects/${project._id}`}
          className="
            relative
            z-20
            inline-block
            text-sm
            font-bold
            text-white
            transition-all
            duration-300
            hover:underline
            hover:underline-offset-4
          "
        >
          See more
        </Link>
      </div>

      {/* TECH STACK */}

      {project.tech?.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-2">
          {project.tech.map((tech) => (
            <span
              key={tech}
              className="
                rounded-lg
                border
                border-white/10
                bg-white/10
                px-3
                py-1
                text-xs
                text-gray-300
              "
            >
              {tech}
            </span>
          ))}
        </div>
      )}
    </motion.div>
  );
}