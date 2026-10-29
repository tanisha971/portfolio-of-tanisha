
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { ExternalLink } from "lucide-react";

import GitHubIcon from "@mui/icons-material/GitHub";
import CodeIcon from "@mui/icons-material/Code";

import { GitHubCalendar } from "react-github-calendar";
import { getCodingProfiles } from "../../services/assetService";

import "../../styles/portfolio-theme.css";

const iconMap = {
  GitHub: GitHubIcon,
  Code: CodeIcon,
};

export default function CodingProfiles() {
  const [content, setContent] = useState(null);
  const [theme, setTheme] = useState(
    () => document.documentElement.dataset.theme || "dark"
  );

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

  // Keep the GitHub calendar in sync with the site theme.
  useEffect(() => {
    const root = document.documentElement;

    const observer = new MutationObserver(() => {
      setTheme(root.dataset.theme || "dark");
    });

    observer.observe(root, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => observer.disconnect();
  }, []);

  if (!content) return null;

  const profiles = content.data?.profiles || [];

  const githubUsername =
    content.data?.githubUsername || "tanisha971";

  const githubUrl =
    content.data?.githubUrl ||
    `https://github.com/${githubUsername}`;

  const isLight = theme === "light";

  const calendarTheme = {
    light: [
      isLight ? "#e5ecf5" : "#172337",
      "#b5d2ff",
      "#70a9ff",
      "#347ff0",
      "#126bff",
    ],
    dark: [
      isLight ? "#e5ecf5" : "#172337",
      "#b5d2ff",
      "#70a9ff",
      "#347ff0",
      "#126bff",
    ],
  };

  return (
    <section
      id="coding-profiles"
      className="coding-profiles-section relative overflow-hidden px-6 py-24 lg:px-8"
    >
      {/* BACKGROUND GRID */}
      <div className="coding-profiles-grid pointer-events-none absolute inset-0" />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* HEADING */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="coding-profiles-title heading-reflection mb-4 text-4xl font-bold uppercase lg:text-5xl">
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
                whileHover={{ y: -4 }}
                className="coding-profile-card group relative h-full min-h-[270px] overflow-hidden rounded-2xl border p-7 backdrop-blur-xl"
              >
                {/* HOVER GLOW */}
                <div className="coding-profile-glow pointer-events-none absolute inset-0 rounded-2xl" />

                {/* CARD CONTENT */}
                <div className="relative z-10">
                  {/* TOP ROW */}
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex min-w-0 items-center gap-3">
                      <Icon
                        sx={{ fontSize: 28 }}
                        className="coding-profile-icon shrink-0"
                      />

                      <h3 className="coding-profiles-title truncate text-xl font-bold">
                        {profile.platform}
                      </h3>
                    </div>

                    {profile.href && (
                      <a
                        href={profile.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Visit ${profile.platform} profile`}
                        className="coding-profile-action flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border"
                      >
                        <ExternalLink size={18} />
                      </a>
                    )}
                  </div>

                  {/* USERNAME */}
                  <p className="coding-profiles-muted mt-5 text-sm font-medium">
                    {profile.username}
                  </p>

                  {/* STATS */}
                  <div className="mt-10">
                    <div className="coding-profile-stat text-2xl font-bold">
                      {profile.stats}
                    </div>

                    <p className="coding-profiles-description mt-3 text-sm leading-6">
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
          <p className="coding-profiles-muted mx-auto mt-6 max-w-2xl">
            {content.data?.description}
          </p>
        </motion.div>

        {/* GITHUB CONTRIBUTION GRAPH */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="coding-github-panel mt-16 rounded-3xl border p-6 backdrop-blur-xl sm:p-10"
        >
          <div className="mb-6">
            <h3 className="coding-profiles-title text-2xl font-bold">
              GitHub Contribution Activity
            </h3>

            <p className="coding-profiles-muted mt-2 text-sm">
              My open-source contributions and coding consistency over the
              past year.
            </p>
          </div>

          {/* GITHUB CALENDAR */}
          <div className="coding-github-calendar overflow-x-auto rounded-2xl border p-4 sm:p-6">
            <div className="flex min-w-max justify-center">
              <GitHubCalendar
                username={githubUsername}
                blockSize={14}
                blockMargin={3}
                fontSize={12}
                hideColorLegend={false}
                hideMonthLabels={false}
                hideTotalCount
                theme={calendarTheme}
                colorScheme={isLight ? "light" : "dark"}
              />
            </div>
          </div>

          {/* GITHUB PROFILE LINK */}
          <div className="mt-6 flex flex-col items-center gap-3 text-center">
            <p className="coding-profiles-muted text-sm">
              Visit my GitHub profile to explore projects and contributions.
            </p>

            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="coding-github-link inline-flex items-center gap-2 rounded-full border px-6 py-3 text-sm font-semibold"
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
