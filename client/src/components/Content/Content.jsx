
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";
import PeopleIcon from "@mui/icons-material/People";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

import { getContent } from "../../services/assetService";

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
        console.error(
          "Failed to load content creation section:",
          error
        );
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
      {/* BACKGROUND */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-10 top-1/4 h-96 w-96 rounded-full bg-white/5 blur-3xl" />

        <div className="absolute bottom-1/4 right-10 h-96 w-96 rounded-full bg-white/5 blur-3xl" />
      </div>

      {/* MAIN CONTENT */}
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
            {data.heading || "Content Creation"}
          </h2>

          <p className="mx-auto mt-8 max-w-2xl text-gray-400">
            {data.intro}
          </p>
        </motion.div>

        {/* PLATFORM CARDS */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
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
                whileHover="hover"
                style={{
                  position: "relative",
                  height: "100%",
                  minHeight: "360px",
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
                  <div className="flex w-full items-center justify-between gap-4">
                    {/* CLICKABLE PLATFORM ICON + NAME */}
                    <a
                      href={platform.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Visit ${platform.name}`}
                      className="flex min-w-0 flex-1 items-center gap-2.5 text-white transition-colors duration-300 hover:text-gray-300"
                    >
                      {Icon && (
                        <Icon
                          sx={{ fontSize: 28 }}
                          className="shrink-0"
                        />
                      )}

                      <h3 className="truncate text-xl font-bold">
                        {platform.name}
                      </h3>

                      {platform.url && (
                        <span className="shrink-0 text-base text-gray-400 transition-transform duration-300 group-hover:translate-x-0.5">
                          ↗
                        </span>
                      )}
                    </a>

                    {/* FOLLOWER COUNT */}
                    <div className="flex shrink-0 items-center gap-1.5">
                      <PeopleIcon
                        sx={{ fontSize: 18 }}
                        className="text-gray-300"
                      />

                      <div>
                        <p className="text-lg font-bold leading-none text-white">
                          {platform.followers || "—"}
                        </p>

                        <p className="mt-1 text-[10px] text-gray-500">
                          {platform.name === "YouTube"
                            ? "Subscribers"
                            : "Followers"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* USERNAME */}
                  <p className="mt-6 text-sm font-medium text-gray-400">
                    {platform.handle}
                  </p>

                  {/* DESCRIPTION */}
                  <p className="mt-5 text-sm leading-6 text-gray-300">
                    {platform.description}
                  </p>

                  {/* CONTENT TYPES */}
                  {platform.contentTypes?.length > 0 && (
                    <div className="mt-6 flex flex-wrap gap-2">
                      {platform.contentTypes.map((type) => (
                        <span
                          key={type}
                          className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-gray-300"
                        >
                          {type}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* FOOTER TEXT */}
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
