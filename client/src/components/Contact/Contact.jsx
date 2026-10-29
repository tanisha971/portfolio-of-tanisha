
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Phone, MapPin, Send } from "lucide-react";

import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";
import YouTubeIcon from "@mui/icons-material/YouTube";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";

import "../../styles/animations.css";
import "../../styles/portfolio-theme.css";

import { getContact } from "../../services/assetService";

const iconMap = {
  GitHub: GitHubIcon,
  LinkedIn: LinkedInIcon,
  Email: EmailIcon,
  YouTube: YouTubeIcon,
  Instagram: InstagramIcon,
  Facebook: FacebookIcon,
  Location: MapPin,
  Phone,
};

export default function Contact() {
  const [content, setContent] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  useEffect(() => {
    const loadContact = async () => {
      try {
        const data = await getContact();
        setContent(data);
      } catch (error) {
        console.error("Failed to load contact section:", error);
      }
    };

    loadContact();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  const handleChange = (e) => {
    setFormData((current) => ({
      ...current,
      [e.target.name]: e.target.value,
    }));
  };

  if (!content) return null;

  const data = content.data || {};
  const contactInfo = data.contactInfo || [];
  const socialLinks = data.socialLinks || [];

  return (
    <section
      id="contact"
      className="contact-theme-section relative overflow-hidden px-6 py-24 lg:px-8"
    >
      {/* BACKGROUND GLOW */}
      <div className="pointer-events-none absolute inset-0">
        <div className="contact-theme-orb absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* HEADING */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="contact-theme-title heading-reflection mb-4 text-4xl font-bold uppercase lg:text-5xl">
            {data.heading}
          </h2>
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-2">
          {/* CONTACT FORM */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="contact-theme-panel rounded-2xl border p-6 backdrop-blur-xl md:p-8"
          >
            <h3 className="contact-theme-title mb-6 text-2xl font-bold">
              Send Message
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="contact-name"
                  className="contact-theme-label mb-2 block text-sm"
                >
                  Your Name
                </label>

                <input
                  type="text"
                  id="contact-name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  autoComplete="name"
                  className="contact-theme-input w-full rounded-lg border px-4 py-3"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label
                  htmlFor="contact-email"
                  className="contact-theme-label mb-2 block text-sm"
                >
                  Your Email
                </label>

                <input
                  type="email"
                  id="contact-email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  autoComplete="email"
                  className="contact-theme-input w-full rounded-lg border px-4 py-3"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  className="contact-theme-label mb-2 block text-sm"
                >
                  Message
                </label>

                <textarea
                  id="contact-message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="contact-theme-input w-full resize-none rounded-lg border px-4 py-3"
                  placeholder="Your message here..."
                />
              </div>

              <button
                type="submit"
                className="button-glow flex w-full items-center justify-center gap-2 rounded-lg px-6 py-3 font-medium"
              >
                <Send size={20} />
                <span>Send Message</span>
              </button>
            </form>
          </motion.div>

          {/* RIGHT COLUMN */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* CONTACT INFORMATION */}
            <div className="contact-theme-panel rounded-2xl border p-8 backdrop-blur-xl">
              <h3 className="contact-theme-title mb-6 text-2xl font-bold">
                Contact Information
              </h3>

              <div className="space-y-6">
                {contactInfo.map((info) => {
                  const Icon = iconMap[info.icon] || EmailIcon;

                  return (
                    <div
                      key={info.label}
                      className="flex items-start gap-4"
                    >
                      <div className="contact-theme-icon-box flex-shrink-0 rounded-lg p-3">
                        <Icon
                          fontSize="medium"
                          className="contact-theme-icon"
                        />
                      </div>

                      <div className="min-w-0">
                        <p className="contact-theme-muted mb-1 text-sm">
                          {info.label}
                        </p>

                        {info.href ? (
                          <a
                            href={info.href}
                            className="contact-theme-link break-all"
                          >
                            {info.value}
                          </a>
                        ) : (
                          <p className="contact-theme-title break-words">
                            {info.value}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* SOCIAL LINKS */}
            <div className="contact-theme-panel rounded-2xl border p-8 backdrop-blur-xl">
              <h3 className="contact-theme-title mb-6 text-2xl font-bold">
                Social Links
              </h3>

              <div className="grid grid-cols-3 gap-4 sm:grid-cols-6">
                {socialLinks.map((social) => {
                  const Icon = iconMap[social.icon] || EmailIcon;

                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="contact-social-link flex items-center justify-center rounded-xl border p-4"
                      aria-label={social.label}
                      title={social.label}
                    >
                      <Icon fontSize="medium" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* CTA */}
            {data.cta && (
              <div className="contact-theme-cta rounded-2xl border p-8 backdrop-blur-xl">
                <h3 className="contact-theme-title mb-4 text-xl font-bold">
                  {data.cta.title}
                </h3>

                <p className="contact-theme-description leading-relaxed">
                  {data.cta.description}
                </p>
              </div>
            )}
          </motion.div>
        </div>

        {/* FOOTER DESCRIPTION */}
        {data.description && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-12 text-center"
          >
            <p className="contact-theme-muted mx-auto mt-6 max-w-2xl">
              {data.description}
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
