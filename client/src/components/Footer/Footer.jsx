import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { ArrowUp, Heart } from "lucide-react";

import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";
import YouTubeIcon from "@mui/icons-material/YouTube";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";

import { getFooter } from "../../services/assetService";

const iconMap = {
  GitHub: GitHubIcon,
  LinkedIn: LinkedInIcon,
  Email: EmailIcon,
  YouTube: YouTubeIcon,
  Instagram: InstagramIcon,
  Facebook: FacebookIcon,
};

export default function Footer() {
  const [content, setContent] = useState(null);

  useEffect(() => {
    const loadFooter = async () => {
      try {
        const data = await getFooter();
        setContent(data);
      } catch (error) {
        console.error(
          "Failed to load footer:",
          error
        );
      }
    };

    loadFooter();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!content) {
    return null;
  }

  const data = content.data || {};

  const footerLinks = data.quickLinks || [];
  const socialLinks = data.socialLinks || [];

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/10 px-6 py-12 lg:px-8">

      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />

      <div className="relative z-10 mx-auto max-w-7xl">

        <div className="mb-12 grid grid-cols-1 gap-12 md:grid-cols-3">

          {/* Brand */}

          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >

            <h3 className="mb-4 text-2xl font-bold text-white">
              {data.brandName}
            </h3>

            <p className="leading-relaxed text-gray-400">
              {data.brandDescription}
            </p>

          </motion.div>

          {/* Quick Links */}

          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{ once: true }}
            transition={{
              duration: 0.5,
              delay: 0.1,
            }}
            className="md:mx-auto"
          >

            <h4 className="mb-5 text-lg font-bold text-white">
              Quick Links
            </h4>

            <div className="grid grid-cols-2 gap-x-12 gap-y-2">

              {footerLinks.map((column, columnIndex) => (

                <ul
                  key={columnIndex}
                  className="space-y-3"
                >

                  {column.map((link) => (

                    <li key={link.name}>

                      <a
                        href={link.href}
                        className="text-gray-400 transition-colors duration-300 hover:text-white"
                      >
                        {link.name}
                      </a>

                    </li>

                  ))}

                </ul>

              ))}

            </div>

          </motion.div>

          {/* Social */}

          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{ once: true }}
            transition={{
              duration: 0.5,
              delay: 0.2,
            }}
            className="md:ml-auto"
          >

            <h4 className="mb-4 text-lg font-bold text-white">
              Connect
            </h4>

            <div className="grid w-fit grid-cols-3 gap-6">
              {socialLinks.map((social, index) => {

                const Icon =
                  iconMap[social.icon] || EmailIcon;

                return (
                  <a
                    key={`${social.icon}-${social.label}-${index}`}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="group transition-all duration-300 hover:-translate-y-1"
                  >

                    <Icon
                      sx={{
                        fontSize: 24,
                      }}
                      className="text-gray-400 transition-all duration-300"
                    />

                  </a>
                );
              })}

            </div>

          </motion.div>

        </div>

        {/* Divider */}

        <div className="border-t border-white/10 pt-8">

          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">

            <motion.p
              initial={{
                opacity: 0,
              }}
              whileInView={{
                opacity: 1,
              }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
              }}
              className="flex items-center gap-2 text-sm text-gray-400"
            >

              <span>
                &copy; {currentYear} {data.copyright}
              </span>

              <Heart
                size={16}
                className="fill-red-500 text-red-500"
              />

            </motion.p>

            <motion.button
              initial={{
                opacity: 0,
              }}
              whileInView={{
                opacity: 1,
              }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
              }}
              onClick={scrollToTop}
              className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/10 px-4 py-2 text-white transition-all duration-300 hover:bg-white/20"
            >

              <span className="text-sm">
                Back to Top
              </span>

              <ArrowUp size={16} />

            </motion.button>

          </div>

          <motion.p
            initial={{
              opacity: 0,
            }}
            whileInView={{
              opacity: 1,
            }}
            viewport={{ once: true }}
            transition={{
              duration: 0.5,
            }}
            className="mt-4 text-center text-xs text-gray-500"
          >
            {data.technologyText}
          </motion.p>

        </div>

      </div>
    </footer>
  );
}