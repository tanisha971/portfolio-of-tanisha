
import { useEffect, useState } from "react";
import { motion } from "motion/react";

import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";
import YouTubeIcon from "@mui/icons-material/YouTube";
import InstagramIcon from "@mui/icons-material/Instagram";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";

import { Typewriter } from "react-simple-typewriter";

import { getHero } from "../../services/assetService";
import "../../styles/animations.css";
import "../../styles/portfolio-theme.css";

const iconMap = {
  GitHub: GitHubIcon,
  LinkedIn: LinkedInIcon,
  Email: EmailIcon,
  YouTube: YouTubeIcon,
  Instagram: InstagramIcon,
};

export default function Hero() {
  const [content, setContent] = useState(null);

  useEffect(() => {
    const loadHero = async () => {
      try {
        const data = await getHero();
        setContent(data);
      } catch (error) {
        console.error("Failed to load hero section:", error);
      }
    };

    loadHero();
  }, []);

  if (!content) {
    return null;
  }

  const data = content.data || {};
  const socialLinks = data.socialLinks || [];
  const roles = data.roles || [];
  const floatingTech = data.floatingTech || [];

  return (
    <section
      id="home"
      className="hero-section relative flex min-h-screen items-center justify-center overflow-hidden px-6 pt-20 lg:px-8"
    >
      {/* Theme-aware background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="hero-orb hero-orb-left absolute left-10 top-20 h-96 w-96 rounded-full blur-3xl" />

        <div className="hero-orb hero-orb-right absolute bottom-20 right-10 h-96 w-96 rounded-full blur-3xl" />

        <div className="hero-center-glow absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl" />
      </div>

      {/* Theme-aware grid */}
      <div className="hero-grid pointer-events-none absolute inset-0" />

      <div className="relative z-10 mx-auto w-full max-w-7xl">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="space-y-4"
            >
              <div className="hero-muted flex items-center gap-2">
                <AutoAwesomeIcon
                  className="hero-accent"
                  fontSize="small"
                />

                <span className="text-sm uppercase tracking-wider">
                  {data.welcomeText}
                </span>
              </div>

              <h1 className="hero-heading text-5xl font-bold leading-tight lg:text-7xl">
                Hello, I'm
                <br />

                <span className="hero-name">
                  {data.name}
                </span>
              </h1>

              <div className="space-y-2">
                <div className="hero-role flex min-h-[40px] items-center text-xl font-semibold lg:text-2xl">
                  <Typewriter
                    words={roles}
                    loop={0}
                    cursor
                    cursorStyle="|"
                    typeSpeed={80}
                    deleteSpeed={40}
                    delaySpeed={1800}
                  />
                </div>

                <p className="hero-muted text-lg">
                  {data.subtitle}
                </p>
              </div>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="hero-muted max-w-xl text-lg leading-relaxed"
            >
              {data.description}
            </motion.p>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex flex-wrap gap-4"
            >
              <a
                href="#projects"
                className="button-glow inline-flex items-center justify-center rounded-lg px-8 py-3 font-medium"
              >
                View Projects
              </a>

              <a
                href="#contact"
                className="hero-secondary-button inline-flex items-center justify-center rounded-lg px-8 py-3 font-medium"
              >
                Contact Me
              </a>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="flex flex-wrap gap-4"
            >
              {socialLinks.map((social, index) => {
                const Icon = iconMap[social.icon];

                if (!Icon) return null;

                const isEmail = social.href.startsWith("mailto:");

                return (
                  <a
                    key={`${social.icon}-${social.label}-${index}`}
                    href={social.href}
                    target={isEmail ? undefined : "_blank"}
                    rel={isEmail ? undefined : "noopener noreferrer"}
                    title={social.label}
                    aria-label={social.label}
                    className="hero-social-button rounded-lg p-3"
                  >
                    <Icon />
                  </a>
                );
              })}
            </motion.div>
          </motion.div>

          
          {/* Right — Professional Hero Portrait */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.15 }}
            className="hero-portrait-column relative flex items-end justify-center lg:min-h-[650px]"
          >
            <div className="hero-portrait-stage relative flex w-full items-end justify-center">

              {/* Blue ambient glow */}
              <div
                aria-hidden="true"
                className="hero-portrait-halo absolute bottom-8 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full blur-3xl sm:h-96 sm:w-96"
              />

              {/* Decorative light rings */}
              <div
                aria-hidden="true"
                className="hero-portrait-ring hero-portrait-ring-one absolute left-1/2 top-1/2"
              />

              <div
                aria-hidden="true"
                className="hero-portrait-ring hero-portrait-ring-two absolute left-1/2 top-1/2"
              />

              {/* Portrait */}
              <motion.div
                className="hero-portrait-image-wrap relative z-10"
                animate={{ y: [0, -8, 0] }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <img
                  src="/assets/Tanisha_hero.png"
                  alt={`${data.name || "Tanisha"} — professional portrait`}
                  className="hero-portrait-image"
                  fetchPriority="high"
                />
              </motion.div>

              {/* Floating technology badges */}
              {floatingTech.map((tech, index) => {
                const positions = [
                  "hero-portrait-badge-one",
                  "hero-portrait-badge-two",
                  "hero-portrait-badge-three",
                ];

                return (
                  <motion.div
                    key={tech}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                      y: [0, -10, 0],
                    }}
                    transition={{
                      opacity: { duration: 0.5, delay: 0.5 + index * 0.15 },
                      scale: { duration: 0.5, delay: 0.5 + index * 0.15 },
                      y: {
                        duration: 3 + index * 0.4,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: index * 0.3,
                      },
                    }}
                    className={`hero-tech-badge hero-portrait-tech-badge ${
                      positions[index % positions.length]
                    } rounded-xl px-4 py-3 backdrop-blur-xl`}
                  >
                    <span className="font-mono text-sm font-semibold">
                      {tech}
                    </span>
                  </motion.div>
                );
              })}

              {/* Bottom glow */}
              <div
                aria-hidden="true"
                className="hero-portrait-bottom-glow absolute bottom-0 left-1/2 h-20 w-4/5 -translate-x-1/2 rounded-full blur-2xl"
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
