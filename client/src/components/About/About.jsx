
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import {
  GraduationCap,
  Award,
  Code,
  Trophy,
} from "lucide-react";

import { getAbout } from "../../services/assetService";
import "../../styles/animations.css";
import "../../styles/portfolio-theme.css";

const iconMap = {
  Trophy,
  Award,
  Code,
  GraduationCap,
};

export default function About() {
  const [about, setAbout] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAbout = async () => {
      try {
        const data = await getAbout();
        setAbout(data);
      } catch (error) {
        console.error("Failed to load About section:", error);
      } finally {
        setLoading(false);
      }
    };

    loadAbout();
  }, []);

  if (loading || !about) {
    return null;
  }

  const stats = about.data?.stats || [];
  const interests = about.data?.interests || [];
  const paragraphs = about.data?.paragraphs || [];
  const education = about.data?.education || {};

  return (
    <section
      id="about"
      className="about-section relative overflow-hidden px-6 py-24 lg:px-8"
    >
      {/* Theme-aware grid */}
      <div className="about-grid pointer-events-none absolute inset-0" />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="about-heading mb-4 text-4xl font-bold lg:text-6xl heading-reflection">
            ABOUT ME
          </h2>
        </motion.div>

        <div className="grid items-start gap-12 lg:grid-cols-2">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {/* About Text */}
            <div className="about-card rounded-2xl p-8 backdrop-blur-xl">
              <h3 className="about-heading mb-4 text-2xl font-bold">
                {about.data?.role}
              </h3>

              {paragraphs.map((paragraph, index) => (
                <p
                  key={index}
                  className={`about-muted leading-relaxed ${
                    index < paragraphs.length - 1 ? "mb-4" : ""
                  }`}
                >
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Education */}
            <div className="about-card rounded-2xl p-8 backdrop-blur-xl">
              <div className="flex items-start gap-4">
                <div className="about-icon-box rounded-lg p-3">
                  <GraduationCap
                    size={28}
                    className="about-accent"
                  />
                </div>

                <div>
                  <h4 className="about-heading mb-2 text-xl font-bold">
                    Education
                  </h4>

                  <p className="about-muted font-medium">
                    {education.degree}
                  </p>

                  <p className="about-muted text-sm">
                    {education.institution}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 gap-6"
          >
            {stats.map((stat, index) => {
              const Icon = iconMap[stat.icon];

              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.1,
                  }}
                  className="about-stat-card rounded-2xl p-8 backdrop-blur-xl"
                >
                  <div className="flex flex-col items-center space-y-4 text-center">
                    <div className="about-icon-box rounded-xl p-4">
                      {Icon && (
                        <Icon
                          size={32}
                          className="about-accent"
                        />
                      )}
                    </div>

                    <div>
                      <h4 className="about-heading mb-2 text-3xl font-bold">
                        {stat.value}
                      </h4>

                      <p className="about-muted text-sm">
                        {stat.label}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}

            {/* Interests */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.4,
                delay: 0.4,
              }}
              className="about-stat-card col-span-2 rounded-2xl p-8 backdrop-blur-xl"
            >
              <h4 className="about-heading mb-4 text-xl font-bold">
                Interests & Expertise
              </h4>

              <div className="flex flex-wrap gap-3">
                {interests.map((interest) => (
                  <span
                    key={interest}
                    className="about-interest rounded-lg px-4 py-2 text-sm"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
