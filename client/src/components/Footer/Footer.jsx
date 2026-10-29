
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
import "../../styles/portfolio-theme.css";

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
        console.error("Failed to load footer:", error);
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

  if (!content) return null;

  const data = content.data || {};
  const footerLinks = data.quickLinks || [];
  const socialLinks = data.socialLinks || [];
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-theme-section relative overflow-hidden px-6 py-12 lg:px-8">
      {/* Decorative grid */}
      <div
        aria-hidden="true"
        className="footer-theme-grid pointer-events-none absolute inset-0"
      />

      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="footer-theme-glow pointer-events-none absolute -bottom-32 left-1/3 h-72 w-72 rounded-full blur-3xl"
      />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-12 grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="footer-theme-brand mb-4 text-2xl font-bold">
              {data.brandName}
            </h3>

            <p className="footer-theme-muted max-w-sm leading-relaxed">
              {data.brandDescription}
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="md:mx-auto"
          >
            <h4 className="footer-theme-heading mb-5 text-lg font-bold">
              Quick Links
            </h4>

            <div className="grid grid-cols-2 gap-x-8 gap-y-3 sm:gap-x-12">
              {footerLinks.map((column, columnIndex) => (
                <ul key={columnIndex} className="space-y-3">
                  {column.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        className="footer-theme-link"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="md:ml-auto"
          >
            <h4 className="footer-theme-heading mb-4 text-lg font-bold">
              Connect
            </h4>

            <div className="grid w-fit grid-cols-3 gap-4">
              {socialLinks.map((social, index) => {
                const Icon = iconMap[social.icon] || EmailIcon;

                return (
                  <a
                    key={`${social.icon}-${social.label}-${index}`}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    title={social.label}
                    className="footer-theme-social"
                  >
                    <Icon
                      sx={{ fontSize: 23 }}
                      className="footer-theme-social-icon"
                    />
                  </a>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-theme-divider border-t pt-8">
          <div className="flex flex-col items-center justify-between gap-5 md:flex-row">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="footer-theme-muted flex flex-wrap items-center justify-center gap-2 text-center text-sm"
            >
              <span>
                &copy; {currentYear} {data.copyright}
              </span>

              <Heart
                size={16}
                className="footer-theme-heart fill-current"
                aria-label="Made with love"
              />
            </motion.p>

            <motion.button
              type="button"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              onClick={scrollToTop}
              className="footer-theme-top-button"
            >
              <span className="text-sm">Back to Top</span>
              <ArrowUp
                size={16}
                className="transition-transform duration-300 group-hover:-translate-y-1"
              />
            </motion.button>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="footer-theme-technology mt-5 text-center text-xs"
          >
            {data.technologyText}
          </motion.p>
        </div>
      </div>
    </footer>
  );
}
