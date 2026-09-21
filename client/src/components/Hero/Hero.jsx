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
        console.error(
          "Failed to load hero section:",
          error
        );
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
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 pt-20 lg:px-8"
    >

      {/* Animated Background */}

      <div className="absolute inset-0 overflow-hidden">

        <div className="absolute left-10 top-20 h-96 w-96 animate-pulse rounded-full bg-white/5 blur-3xl" />

        <div className="absolute bottom-20 right-10 h-96 w-96 animate-pulse rounded-full bg-white/5 blur-3xl [animation-delay:1000ms]" />

        <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-white/5 to-transparent blur-3xl" />

      </div>

      {/* Grid */}

      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />

      <div className="relative z-10 mx-auto w-full max-w-7xl">

        <div className="grid items-center gap-12 lg:grid-cols-2">

          {/* Left */}

          <motion.div
            initial={{
              opacity: 0,
              x: -50,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.8,
            }}
            className="space-y-8"
          >

            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.2,
                duration: 0.8,
              }}
              className="space-y-4"
            >

              <div className="flex items-center gap-2 text-gray-400">

                <AutoAwesomeIcon
                  className="text-white"
                  fontSize="small"
                />

                <span className="text-sm uppercase tracking-wider">
                  {data.welcomeText}
                </span>

              </div>

              <h1 className="text-5xl font-bold leading-tight text-white lg:text-7xl">

                Hello, I'm
                <br />

                <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                  {data.name}
                </span>

              </h1>

              <div className="space-y-2">

                <div className="flex min-h-[40px] items-center text-xl font-semibold text-white lg:text-2xl">

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

                <p className="text-lg text-gray-400">
                  {data.subtitle}
                </p>

              </div>

            </motion.div>

            <motion.p
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.4,
                duration: 0.8,
              }}
              className="max-w-xl text-lg leading-relaxed text-gray-400"
            >
              {data.description}
            </motion.p>

            {/* Buttons */}

            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.6,
                duration: 0.8,
              }}
              className="flex flex-wrap gap-4"
            >

              <a
                href="#projects"
                className="rounded-lg bg-white px-8 py-3 font-medium text-black transition-all duration-300 hover:scale-105 hover:bg-gray-200"
              >
                View Projects
              </a>

              <a
                href="#contact"
                className="rounded-lg border border-white/20 bg-white/10 px-8 py-3 font-medium text-white backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-white/20"
              >
                Contact Me
              </a>

            </motion.div>

            {/* Social Links */}

            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                delay: 0.8,
                duration: 0.8,
              }}
              className="flex flex-wrap gap-4"
            >

              {socialLinks.map((social, index) => {

                const Icon =
                  iconMap[social.icon];

                if (!Icon) return null;

                return (
                  <a
                    key={`${social.icon}-${social.label}-${index}`}
                    href={social.href}
                    target={
                      social.href.startsWith("mailto:")
                        ? undefined
                        : "_blank"
                    }
                    rel={
                      social.href.startsWith("mailto:")
                        ? undefined
                        : "noopener noreferrer"
                    }
                    title={social.label}
                    className="rounded-lg border border-white/10 bg-white/10 p-3 backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:bg-white/20"
                  >

                    <Icon className="text-white" />

                  </a>
                );
              })}

            </motion.div>

          </motion.div>

          {/* Right */}

          <motion.div
            initial={{
              opacity: 0,
              x: 50,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.8,
            }}
            className="relative hidden items-center justify-center lg:flex"
          >

            <div className="relative flex h-[500px] w-full items-center justify-center">

              <div className="absolute inset-0 flex items-center justify-center">

                <div className="h-96 w-96 animate-pulse rounded-full bg-gradient-to-r from-white/10 to-white/5 blur-2xl" />

              </div>

              <div className="relative z-10">

                <div className="absolute h-[430px] w-[430px] animate-pulse rounded-full bg-gradient-to-r from-white/20 via-white/5 to-transparent blur-3xl" />

                <div className="relative h-96 w-96 overflow-hidden rounded-full border-4 border-white/10 bg-white/5 shadow-2xl backdrop-blur-xl">

                  <img
                    src={data.profileImage}
                    alt={data.name || "Profile"}
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                  />

                </div>

              </div>

              {floatingTech.map((tech, index) => {

                const positions = [
                  "absolute right-4 top-12",
                  "absolute bottom-24 right-0",
                  "absolute bottom-16 left-0",
                ];

                const animations = [
                  [0, -20, 0],
                  [0, -15, 0],
                  [0, -18, 0],
                ];

                return (
                  <motion.div
                    key={tech}
                    animate={{
                      y: animations[index % animations.length],
                    }}
                    transition={{
                      duration: 2.5 + index * 0.3,
                      repeat: Infinity,
                      delay: index * 0.5,
                    }}
                    className={`${positions[index % positions.length]} rounded-xl border border-white/10 bg-white/10 p-4 backdrop-blur-xl`}
                  >

                    <span className="font-mono text-white">
                      {tech}
                    </span>

                  </motion.div>
                );
              })}

            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}