
import { useEffect, useState } from "react";
import { motion } from "motion/react";

import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";
import PeopleIcon from "@mui/icons-material/People";

import { getContent } from "../../services/assetService";

import "../../styles/portfolio-theme.css";

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
      className="content-theme-section relative overflow-hidden px-6 py-24 lg:px-8"
    >
      {/* BACKGROUND DECORATION */}
      <div className="pointer-events-none absolute inset-0">
        <div className="content-theme-orb absolute left-10 top-1/4 h-96 w-96 rounded-full blur-3xl" />

        <div className="content-theme-orb absolute bottom-1/4 right-10 h-96 w-96 rounded-full blur-3xl" />
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
          <h2 className="content-theme-title heading-reflection mb-4 text-4xl font-bold uppercase lg:text-5xl">
            {data.heading || "Content Creation"}
          </h2>

          {data.intro && (
            <p className="content-theme-muted mx-auto mt-8 max-w-2xl">
              {data.intro}
            </p>
          )}
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
                whileHover={{ y: -4 }}
                className="content-theme-card group relative h-full min-h-[360px] overflow-hidden rounded-2xl border p-7 backdrop-blur-xl"
              >
                {/* HOVER GLOW */}
                <div className="content-card-glow pointer-events-none absolute inset-0 rounded-2xl" />

                {/* CARD CONTENT */}
                <div className="relative z-10">
                  {/* TOP ROW */}
                  <div className="flex w-full items-center justify-between gap-4">
                    {/* PLATFORM ICON + NAME */}
                    {platform.url ? (
                      <a
                        href={platform.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Visit ${platform.name}`}
                        className="content-platform-link flex min-w-0 flex-1 items-center gap-2.5"
                      >
                        {Icon && (
                          <Icon
                            sx={{ fontSize: 28 }}
                            className="content-platform-icon shrink-0"
                          />
                        )}

                        <h3 className="content-theme-title truncate text-xl font-bold">
                          {platform.name}
                        </h3>

                        <span className="content-link-arrow shrink-0 text-base transition-transform duration-300 group-hover:translate-x-0.5">
                          ↗
                        </span>
                      </a>
                    ) : (
                      <div className="flex min-w-0 flex-1 items-center gap-2.5">
                        {Icon && (
                          <Icon
                            sx={{ fontSize: 28 }}
                            className="content-platform-icon shrink-0"
                          />
                        )}

                        <h3 className="content-theme-title truncate text-xl font-bold">
                          {platform.name}
                        </h3>
                      </div>
                    )}

                    {/* FOLLOWER COUNT */}
                    <div className="flex shrink-0 items-center gap-1.5">
                      <PeopleIcon
                        sx={{ fontSize: 18 }}
                        className="content-follower-icon"
                      />

                      <div>
                        <p className="content-theme-title text-lg font-bold leading-none">
                          {platform.followers || "—"}
                        </p>

                        <p className="content-theme-subtle mt-1 text-[10px]">
                          {platform.name === "YouTube"
                            ? "Subscribers"
                            : "Followers"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* USERNAME */}
                  {platform.handle && (
                    <p className="content-theme-muted mt-6 text-sm font-medium">
                      {platform.handle}
                    </p>
                  )}

                  {/* DESCRIPTION */}
                  {platform.description && (
                    <p className="content-theme-description mt-5 text-sm leading-6">
                      {platform.description}
                    </p>
                  )}

                  {/* CONTENT TYPES */}
                  {platform.contentTypes?.length > 0 && (
                    <div className="mt-6 flex flex-wrap gap-2">
                      {platform.contentTypes.map((type) => (
                        <span
                          key={type}
                          className="content-type-tag rounded-lg border px-3 py-1.5 text-xs"
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
        {data.footerText && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="content-theme-muted mt-12 text-center"
          >
            {data.footerText}
          </motion.p>
        )}
      </div>
    </section>
  );
}
