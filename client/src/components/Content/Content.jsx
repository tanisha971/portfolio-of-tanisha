import { useEffect, useState } from "react";
import { motion } from "motion/react";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";
import PeopleIcon from "@mui/icons-material/People";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

import { getContent } from "../../services/assetService";
import "../../styles/animations.css";

const platformIcons = {
  Instagram: InstagramIcon,
  Facebook: FacebookIcon,
  YouTube: YouTubeIcon,
};

export default function Content() {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadContent = async () => {
      try {
        const data = await getContent();
        setContent(data);
      } catch (error) {
        console.error("Failed to load content creation section:", error);
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, []);

  if (loading || !content) {
    return null;
  }

  const data = content.data || {};
  const platforms = data.platforms || [];

  return (
    <section
      id="content"
      className="relative overflow-hidden px-6 py-24 lg:px-8"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute left-10 top-1/4 h-96 w-96 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute bottom-1/4 right-10 h-96 w-96 rounded-full bg-white/5 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="heading-reflection mb-4 text-4xl font-bold uppercase text-white lg:text-5xl">
            {data.heading || "Content Creation"}
          </h2>

          <p className="mx-auto mt-8 max-w-2xl text-gray-400">
            {data.intro}
          </p>
        </motion.div>

        {/* Platform Sections */}
        <div className="space-y-10">

          {platforms.map((platform, index) => {
            const Icon = platformIcons[platform.name];

            return (
              <motion.div
                key={platform.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                }}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl transition-all duration-500 hover:border-white/30 lg:p-10"
              >
                {/* Subtle hover glow */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                <div className="relative z-10 grid items-center gap-8 lg:grid-cols-[1fr_auto]">

                  {/* Left */}
                  <div>

                    <div className="mb-5 flex items-center gap-4">

                      <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-white/10 bg-white/10">
                        {Icon && (
                          <Icon
                            sx={{ fontSize: 30 }}
                            className="text-white"
                          />
                        )}
                      </div>

                      <div>
                        <h3 className="text-2xl font-bold text-white">
                          {platform.name}
                        </h3>

                        <p className="text-sm text-gray-400">
                          {platform.handle}
                        </p>
                      </div>

                    </div>

                    <p className="max-w-3xl leading-7 text-gray-300">
                      {platform.description}
                    </p>

                    {/* Content Types */}
                    {platform.contentTypes?.length > 0 && (
                      <div className="mt-6 flex flex-wrap gap-3">
                        {platform.contentTypes.map((type) => (
                          <span
                            key={type}
                            className="rounded-lg border border-white/10 bg-white/10 px-4 py-2 text-sm text-gray-300"
                          >
                            {type}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Link */}
                    {platform.url && (
                      <a
                        href={platform.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-7 inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/10 px-5 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:bg-white hover:text-black"
                      >
                        {platform.name === "YouTube" ? (
                          <PlayArrowIcon sx={{ fontSize: 18 }} />
                        ) : (
                          <Icon sx={{ fontSize: 18 }} />
                        )}

                        Visit {platform.name}
                      </a>
                    )}
                  </div>

                  {/* Stats */}
                  <div className="flex min-w-[210px] flex-col gap-4">

                    <div className="rounded-xl border border-white/10 bg-black/20 p-5 text-center">
                      <PeopleIcon
                        sx={{ fontSize: 26 }}
                        className="mb-2 text-white"
                      />

                      <p className="text-3xl font-bold text-white">
                        {platform.followers || "—"}
                      </p>

                      <p className="mt-1 text-sm text-gray-400">
                        {platform.name === "YouTube"
                          ? "Subscribers"
                          : "Followers"}
                      </p>
                    </div>

                    {platform.extraStat && (
                      <div className="rounded-xl border border-white/10 bg-black/20 p-4 text-center">
                        <p className="text-sm text-gray-400">
                          {platform.extraStat.label}
                        </p>

                        <p className="mt-1 text-xl font-bold text-white">
                          {platform.extraStat.value}
                        </p>
                      </div>
                    )}

                  </div>

                </div>
              </motion.div>
            );
          })}

        </div>

        {/* Bottom */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-12 text-center text-gray-400"
        >
          {data.footerText}
        </motion.p>

      </div>
    </section>
  );
}