import { motion } from "motion/react";
import { ExternalLink } from "lucide-react";
import GitHubIcon from "@mui/icons-material/GitHub";

export default function ProjectCard({ project, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
      }}
      whileHover={{ y: -8 }}
      className="group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl transition-all duration-500 hover:border-white/25 hover:shadow-2xl hover:shadow-white/5"
    >
      {/* Hover Glow */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-transparent via-transparent to-white/5 opacity-0 transition duration-500 group-hover:opacity-100" />

      {/* Top Overlay */}
      <div className="absolute left-5 right-5 top-5 z-20 flex items-start justify-between">

        {/* Category Badge - Top Left */}
        <div className="rounded-full border border-white/20 bg-black/50 px-4 py-1.5 backdrop-blur-xl">
          <span className="text-xs font-medium text-white">
            {project.category}
          </span>
        </div>

        {/* Action Icons - Top Right */}
        <div className="flex gap-2">

          {/* GitHub */}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              title="View Source Code"
              className="flex h-10 w-10 items-center justify-center rounded-full
                border border-white/20
                bg-black/50
                text-white
                backdrop-blur-md
                transition-all duration-300
                hover:bg-white
                hover:text-black
                hover:border-white
                hover:scale-105"
            >
              <GitHubIcon fontSize="small" />
            </a>
          )}

          {/* Live */}
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              title="View Live Project"
              className="flex h-10 w-10 items-center justify-center rounded-full
                border border-white/20
                bg-black/50
                text-white
                backdrop-blur-md
                transition-all duration-300
                hover:bg-white
                hover:text-black
                hover:border-white
                hover:scale-105"
            >
              <ExternalLink size={18} />
            </a>
          )}

        </div>
      </div>

      <div className="relative z-10 p-6 space-y-6">

        {/* Project Image */}
        <div className="overflow-hidden rounded-2xl">
          <img
            src={project.image}
            alt={project.title}
            className="aspect-video w-full rounded-2xl object-cover transition duration-500 group-hover:scale-105"
          />
        </div>

        {/* Title & Description */}
        <div>
          <h3 className="text-2xl font-bold text-white">
            {project.title}
          </h3>

          <p className="mt-3 text-sm leading-7 text-gray-300">
            {project.description}
          </p>
        </div>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2">
          {project.tech.map((tech) => (
            <span
              key={tech}
              className="rounded-lg border border-white/10 bg-white/10 px-3 py-1 text-xs text-gray-300"
            >
              {tech}
            </span>
          ))}
        </div>

      </div>
    </motion.div>
  );
}