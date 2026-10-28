
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { ExternalLink } from "lucide-react";

import GitHubIcon from "@mui/icons-material/GitHub";
import CodeIcon from "@mui/icons-material/Code";

import { GitHubCalendar } from "react-github-calendar";
import { getCodingProfiles } from "../../services/assetService";

const iconMap = {
  GitHub: GitHubIcon,
  Code: CodeIcon,
};

export default function CodingProfiles() {
  const [content, setContent] = useState(null);

  useEffect(() => {
    const loadProfiles = async () => {
      try {
        const data = await getCodingProfiles();
        setContent(data);
      } catch (error) {
        console.error("Failed to load coding profiles:", error);
      }
    };

    loadProfiles();
  }, []);

  if (!content) {
    return null;
  }

  const profiles = content.data?.profiles || [];

  const githubUsername =
    content.data?.githubUsername || "tanisha971";

  const githubUrl =
    content.data?.githubUrl ||
    `https://github.com/${githubUsername}`;

  return (
    <section
      id="coding-profiles"
      className="relative overflow-hidden px-6 py-24 lg:px-8"
    >
      {/* BACKGROUND */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* HEADING */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="heading-reflection mb-4 text-4xl font-bold uppercase text-white lg:text-5xl">
            {content.data?.heading}
          </h2>
        </motion.div>

        {/* PROFILE CARDS */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {profiles.map((profile, index) => {
            const Icon = iconMap[profile.icon] || CodeIcon;

            return (
              <motion.div
                key={profile.platform}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover="hover"
                style={{
                  position: "relative",
                  height: "100%",
                  minHeight: "270px",
                  padding: "1.75rem",
                  borderRadius: "1.25rem",
                  border: "1px solid rgba(255,255,255,0.1)",
                  background: "rgba(255,255,255,0.045)",
                  backdropFilter: "blur(18px)",
                  WebkitBackdropFilter: "blur(18px)",
                  overflow: "hidden",
                  transition: "border-color 0.3s ease",
                }}
              >
                {/* INLINE HOVER GLOW */}
                <motion.div
                  initial={{ opacity: 0 }}
                  variants={{
                    hover: { opacity: 1 },
                  }}
                  style={{
                    position: "absolute",
                    inset: 0,
                    borderRadius: "inherit",
                    background:
                      "linear-gradient(to bottom right, transparent 0%, transparent 55%, rgba(255,255,255,0.05) 100%)",
                    pointerEvents: "none",
                    zIndex: 0,
                  }}
                />

                {/* CARD CONTENT */}
                <div
                  style={{
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  {/* TOP ROW */}
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex min-w-0 items-center gap-3">
                      <Icon
                        sx={{ fontSize: 28 }}
                        className="shrink-0 text-white"
                      />

                      <h3 className="truncate text-xl font-bold text-white">
                        {profile.platform}
                      </h3>
                    </div>

                    {/* VISIT PROFILE */}
                    <a
                      href={profile.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Visit ${profile.platform} profile`}
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/10 text-white transition-colors duration-300 hover:border-white hover:bg-white hover:text-black"
                    >
                      <ExternalLink size={18} />
                    </a>
                  </div>

                  {/* USERNAME */}
                  <p className="mt-5 text-sm font-medium text-gray-400">
                    {profile.username}
                  </p>

                  {/* STATS */}
                  <div className="mt-10">
                    <div className="text-2xl font-bold text-white">
                      {profile.stats}
                    </div>

                    <p className="mt-3 text-sm leading-6 text-gray-300">
                      {profile.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* SECTION DESCRIPTION */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-12 text-center"
        >
          <p className="mx-auto mt-6 max-w-2xl text-gray-400">
            {content.data?.description}
          </p>
        </motion.div>

        {/* GITHUB CONTRIBUTION GRAPH */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-10 backdrop-blur-xl"
        >
          <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h3 className="text-2xl font-bold text-white">
                GitHub Contribution Activity
              </h3>

              <p className="mt-2 text-sm text-gray-400">
                My open-source contributions and coding consistency over the past year.
              </p>
            </div>
          </div>

          {/* GITHUB CALENDAR */}
          <div className="overflow-x-auto rounded-2xl border border-white/10 bg-black/30 p-6">
            <div className="flex justify-center">
              <div className="w-fit">
                <GitHubCalendar
                  username={githubUsername}
                  blockSize={14}
                  blockMargin={3}
                  fontSize={12}
                  hideColorLegend={false}
                  hideMonthLabels={false}
                  hideTotalCount={true}
                  style={{
                    color: "#d1d5db",
                  }}
                />
              </div>
            </div>
          </div>

          {/* GITHUB PROFILE LINK */}
          <div className="mt-6 flex flex-col items-center gap-3 text-center">
            <p className="text-sm text-gray-400">
              Visit my GitHub profile to explore projects and contributions.
            </p>

            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-6 py-3 text-sm font-medium text-white transition hover:bg-white/20"
            >
              <GitHubIcon fontSize="small" />
              View GitHub Profile
              <ExternalLink size={16} />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
