import { useEffect, useState } from "react";
import { motion } from "motion/react";
import {
  Phone,
  MapPin,
  Send,
} from "lucide-react";

import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";
import YouTubeIcon from "@mui/icons-material/YouTube";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";

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
        console.error(
          "Failed to load contact section:",
          error
        );
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

  if (!content) {
    return null;
  }

  const data = content.data || {};

  const contactInfo = data.contactInfo || [];
  const socialLinks = data.socialLinks || [];

  return (
    <section
      id="contact"
      className="relative overflow-hidden px-6 py-24 lg:px-8"
    >

      <div className="absolute inset-0">

        <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/5 blur-3xl" />

      </div>

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
            {data.heading}
          </h2>

          <div className="mx-auto h-1 w-24 bg-white" />

          <p className="mx-auto mt-6 max-w-2xl text-gray-400">
            {data.description}
          </p>

        </motion.div>

        <div className="grid gap-12 lg:grid-cols-2">

          {/* Form */}

          <motion.div
            initial={{
              opacity: 0,
              x: -30,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl md:p-8"
          >

            <h3 className="mb-6 text-2xl font-bold text-white">
              Send Message
            </h3>

            <form
              onSubmit={handleSubmit}
              className="space-y-6"
            >

              <div>

                <label
                  htmlFor="name"
                  className="mb-2 block text-sm text-gray-300"
                >
                  Your Name
                </label>

                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-white/10 bg-white/10 px-4 py-3 text-white placeholder-gray-500 transition-all focus:border-white/30 focus:outline-none"
                  placeholder="John Doe"
                />

              </div>

              <div>

                <label
                  htmlFor="email"
                  className="mb-2 block text-sm text-gray-300"
                >
                  Your Email
                </label>

                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-white/10 bg-white/10 px-4 py-3 text-white placeholder-gray-500 transition-all focus:border-white/30 focus:outline-none"
                  placeholder="john@example.com"
                />

              </div>

              <div>

                <label
                  htmlFor="message"
                  className="mb-2 block text-sm text-gray-300"
                >
                  Message
                </label>

                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full resize-none rounded-lg border border-white/10 bg-white/10 px-4 py-3 text-white placeholder-gray-500 transition-all focus:border-white/30 focus:outline-none"
                  placeholder="Your message here..."
                />

              </div>

              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-white px-6 py-3 font-medium text-black transition-all duration-300 hover:scale-[1.02] hover:bg-gray-200"
              >

                <Send size={20} />

                <span>Send Message</span>

              </button>

            </form>

          </motion.div>

          {/* Right */}

          <motion.div
            initial={{
              opacity: 0,
              x: 30,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >

            {/* Contact Information */}

            <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">

              <h3 className="mb-6 text-2xl font-bold text-white">
                Contact Information
              </h3>

              <div className="space-y-6">

                {contactInfo.map((info) => {

                  const Icon =
                    iconMap[info.icon] || EmailIcon;

                  return (
                    <div
                      key={info.label}
                      className="flex items-start gap-4"
                    >

                      <div className="flex-shrink-0 rounded-lg bg-white/10 p-3">

                        <Icon
                          size={24}
                          className="text-white"
                        />

                      </div>

                      <div>

                        <p className="mb-1 text-sm text-gray-400">
                          {info.label}
                        </p>

                        {info.href ? (
                          <a
                            href={info.href}
                            className="break-all text-white transition-colors hover:text-gray-300"
                          >
                            {info.value}
                          </a>
                        ) : (
                          <p className="text-white">
                            {info.value}
                          </p>
                        )}

                      </div>

                    </div>
                  );
                })}

              </div>

            </div>

            {/* Social Links */}

            <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">

              <h3 className="mb-6 text-2xl font-bold text-white">
                Social Links
              </h3>

              <div className="grid grid-cols-3 gap-4 sm:grid-cols-6">

                {socialLinks.map((social) => {

                  const Icon =
                    iconMap[social.icon] || EmailIcon;

                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center rounded-xl border border-white/10 bg-white/10 p-4 transition-all duration-300 hover:scale-105 hover:bg-white/20"
                      aria-label={social.label}
                    >

                      <Icon
                        fontSize="medium"
                        className="text-white"
                      />

                    </a>
                  );
                })}

              </div>

            </div>

            {/* CTA */}

            <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-8 backdrop-blur-xl">

              <h3 className="mb-4 text-xl font-bold text-white">
                {data.cta?.title}
              </h3>

              <p className="leading-relaxed text-gray-300">
                {data.cta?.description}
              </p>

            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}