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
  const [selectedPlatform, setSelectedPlatform] = useState("GitHub");

  useEffect(() => {
    const loadProfiles = async () => {
      try {
        const data = await getCodingProfiles();
        setContent(data);
      } catch (error) {
        console.error(
          "Failed to load coding profiles:",
          error
        );
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

      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />

      <div className="relative z-10 mx-auto max-w-7xl">

        {/* Heading */}

        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >

          <h2 className="mb-4 text-4xl font-bold text-white lg:text-5xl">
            {content.data?.heading}
          </h2>

          <div className="mx-auto h-1 w-24 bg-white" />

          <p className="mx-auto mt-6 max-w-2xl text-gray-400">
            {content.data?.description}
          </p>

        </motion.div>

        {/* Profiles */}

        <div className="grid gap-8 md:grid-cols-3">

          {profiles.map((profile, index) => {

            const Icon = iconMap[profile.icon] || CodeIcon;

            return (
              <motion.div
                key={profile.platform}
                initial={{
                  opacity: 0,
                  y: 30,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                }}
                whileHover={{
                  scale: 1.05,
                }}
                className="group relative rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl transition-all duration-300 hover:border-white/30"
              >

                <div
                  className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${profile.color} opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
                />

                <div className="relative z-10 space-y-6">

                  {/* Icon */}

                  <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-white/10 transition-all group-hover:bg-white/20">

                    <Icon
                      fontSize="large"
                      className="text-white"
                    />

                  </div>

                  {/* Content */}

                  <div className="space-y-3">

                    <h3 className="text-2xl font-bold text-white">
                      {profile.platform}
                    </h3>

                    <p className="text-sm text-gray-400">
                      {profile.username}
                    </p>

                    <div className="pb-2 pt-2">

                      <div className="mb-1 text-xl font-bold text-white">
                        {profile.stats}
                      </div>

                      <p className="text-sm text-gray-300">
                        {profile.description}
                      </p>

                    </div>

                  </div>

                  {/* Visit */}

                  <a
                    href={profile.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex w-full items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/10 px-4 py-3 font-medium text-white transition-all duration-300 hover:bg-white/20"
                  >
                    <span>Visit Profile</span>
                    <ExternalLink size={16} />
                  </a>

                </div>

              </motion.div>
            );
          })}

        </div>

        {/* GitHub Contribution Graph */}

        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
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