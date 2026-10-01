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

  /* =========================================================
     3D CARD MOUSE EFFECT
     ========================================================= */

  const handleMouseMove = (event) => {
    const card = event.currentTarget;

    const rect = card.getBoundingClientRect();

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const xPercent = x / rect.width;
    const yPercent = y / rect.height;

    /*
      Cursor position controls the direction of the tilt.

      Left side  → card tilts toward left
      Right side → card tilts toward right
      Top        → card tilts toward top
      Bottom     → card tilts toward bottom
    */

    const rotateY = (xPercent - 0.5) * 8;
    const rotateX = (0.5 - yPercent) * 8;

    card.style.setProperty(
      "--rotate-x",
      `${rotateX}deg`
    );

    card.style.setProperty(
      "--rotate-y",
      `${rotateY}deg`
    );

    /*
      Soft light follows the cursor.
    */

    card.style.setProperty(
      "--glow-x",
      `${xPercent * 100}%`
    );

    card.style.setProperty(
      "--glow-y",
      `${yPercent * 100}%`
    );
  };

  const handleMouseLeave = (event) => {
    const card = event.currentTarget;

    card.style.setProperty("--rotate-x", "0deg");
    card.style.setProperty("--rotate-y", "0deg");

    card.style.setProperty("--glow-x", "50%");
    card.style.setProperty("--glow-y", "50%");
  };

  return (
    <section
      id="content"
      className="relative overflow-hidden px-6 py-24 lg:px-8"
    >
      {/* =====================================================
          BACKGROUND
      ====================================================== */}

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-10 top-1/4 h-96 w-96 rounded-full bg-white/5 blur-3xl" />

        <div className="absolute bottom-1/4 right-10 h-96 w-96 rounded-full bg-white/5 blur-3xl" />
      </div>

      {/* =====================================================
          MAIN CONTENT
      ====================================================== */}

      <div className="relative z-10 mx-auto max-w-7xl">

        {/* ===================================================
            HEADING
        ==================================================== */}

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
            duration: 0.6,
          }}
          className="mb-16 text-center"
        >
          <h2 className="heading-reflection mb-4 text-4xl font-bold uppercase text-white lg:text-5xl">
            {data.heading || "Content Creation"}
          </h2>

          <p className="mx-auto mt-8 max-w-2xl text-gray-400">
            {data.intro}
          </p>
        </motion.div>

        {/* ===================================================
            PLATFORM CARDS
        ==================================================== */}

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">

          {platforms.map((platform, index) => {
            const Icon = platformIcons[platform.name];

            return (
              <motion.div
                key={platform.name}
                initial={{
                  opacity: 0,
                  y: 40,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                }}
                className="content-card-wrapper"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              >
                <div className="content-card">

                  {/* =========================================
                      TOP ROW

                      [ Social Icon + Name ]
                      [ Followers ]
                      [ Visit Icon ]
                  ========================================== */}

                  <div className="content-card-top">

                    {/* ---------------------------------------
                        SOCIAL ICON + PLATFORM NAME
                    ---------------------------------------- */}

                    <div className="content-platform">

                      {Icon && (
                        <Icon
                          sx={{
                            fontSize: 28,
                          }}
                          className="text-white"
                        />
                      )}

                      <h3 className="truncate text-xl font-bold text-white">
                        {platform.name}
                      </h3>

                    </div>


                    {/* ---------------------------------------
                        FOLLOWERS / SUBSCRIBERS
                    ---------------------------------------- */}

                    <div className="content-followers">

                      <PeopleIcon
                        sx={{
                          fontSize: 18,
                        }}
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


                    {/* ---------------------------------------
                        VISIT BUTTON - ICON ONLY
                    ---------------------------------------- */}

                    {platform.url && (
                      <a
                        href={platform.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Visit ${platform.name}`}
                        className="content-visit-button"
                      >
                        {platform.name === "YouTube" ? (
                          <PlayArrowIcon
                            sx={{
                              fontSize: 20,
                            }}
                          />
                        ) : (
                          <Icon
                            sx={{
                              fontSize: 20,
                            }}
                          />
                        )}
                      </a>
                    )}

                  </div>


                  {/* =================================================
                      USERNAME
                  ================================================== */}

                  <p className="mt-6 text-sm font-medium text-gray-400">
                    {platform.handle}
                  </p>


                  {/* =================================================
                      DESCRIPTION
                  ================================================== */}

                  <p className="mt-5 text-sm leading-6 text-gray-300">
                    {platform.description}
                  </p>


                  {/* =================================================
                      CONTENT TYPES
                  ================================================== */}

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


        {/* =====================================================
            FOOTER TEXT
        ====================================================== */}

        <motion.p
          initial={{
            opacity: 0,
            y: 20,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.6,
          }}
          className="mt-12 text-center text-gray-400"
        >
          {data.footerText}
        </motion.p>

      </div>
    </section>
  );
}