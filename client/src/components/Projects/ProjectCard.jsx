import { motion } from "motion/react";
import { ExternalLink } from "lucide-react";
import GitHubIcon from "@mui/icons-material/GitHub";

export default function ProjectCard({
  project,
  index,
}) {
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

      {/* Category Badge */}
      <div className="absolute right-5 top-5 z-20 rounded-full border border-white/20 bg-black/40 px-4 py-1 backdrop-blur-xl">
        <span className="text-xs font-medium text-white">
          {project.category}
        </span>
      </div>

      <div className="relative z-10 p-6 space-y-6">

        {/* Carousel */}
        <div className="overflow-hidden rounded-2xl">

    <img
        src={project.image}
        alt={project.title}
        className="aspect-video w-full object-cover rounded-2xl transition duration-500 group-hover:scale-105"
    />

</div>

        {/* Title */}
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

        {/* Buttons */}

        <div className="flex gap-3 pt-2">

    <a
        href={project.github}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-white py-3 font-semibold text-black transition hover:bg-gray-200"
    >
        <GitHubIcon fontSize="small" />
        Code
    </a>

    {project.live && (

        <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/10 py-3 font-semibold text-white transition hover:bg-white/20"
        >
            <ExternalLink size={18} />
            Live
        </a>

    )}

</div>

      </div>
    </motion.div>
  );
}