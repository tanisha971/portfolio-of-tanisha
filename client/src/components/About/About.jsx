import { useEffect, useState } from "react";
import { motion } from "motion/react";
import {
  GraduationCap,
  Award,
  Code,
  Trophy,
} from "lucide-react";

import { getAbout } from "../../services/assetService";

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
      className="relative overflow-hidden px-6 py-24 lg:px-8"
    >
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />

      <div className="relative z-10 mx-auto max-w-7xl">

        {/* Heading */}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-4xl font-bold text-white lg:text-5xl">
            {about.data?.heading}
          </h2>

          <div className="mx-auto h-1 w-24 bg-white" />
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

            <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">

              <h3 className="mb-4 text-2xl font-bold text-white">
                {about.data?.role}
              </h3>

              {paragraphs.map((paragraph, index) => (
                <p
                  key={index}
                  className={
                    index < paragraphs.length - 1
                      ? "mb-4 leading-relaxed text-gray-300"
                      : "leading-relaxed text-gray-300"
                  }
                >
                  {paragraph}
                </p>
              ))}

            </div>

            {/* Education */}

            <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">

              <div className="flex items-start gap-4">

                <div className="rounded-lg bg-white/10 p-3">
                  <GraduationCap
                    size={28}
                    className="text-white"
                  />
                </div>

                <div>

                  <h4 className="mb-2 text-xl font-bold text-white">
                    Education
                  </h4>

                  <p className="font-medium text-gray-300">
                    {education.degree}
                  </p>

                  <p className="text-sm text-gray-400">
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
                  initial={{
                    opacity: 0,
                    scale: 0.8,
                  }}
                  whileInView={{
                    opacity: 1,
                    scale: 1,
                  }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.1,
                  }}
                  whileHover={{ scale: 1.05 }}
                  className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-8 backdrop-blur-xl transition-all duration-300 hover:border-white/20"
                >

                  <div className="flex flex-col items-center space-y-4 text-center">

                    <div className="rounded-xl bg-white/10 p-4">
                      {Icon && (
                        <Icon
                          size={32}
                          className="text-white"
                        />
                      )}
                    </div>

                    <div>

                      <h4 className="mb-2 text-3xl font-bold text-white">
                        {stat.value}
                      </h4>

                      <p className="text-sm text-gray-300">
                        {stat.label}
                      </p>

                    </div>

                  </div>

                </motion.div>
              );
            })}

            {/* Interests */}

            <motion.div
              initial={{
                opacity: 0,
                scale: 0.8,
              }}
              whileInView={{
                opacity: 1,
                scale: 1,
              }}
              viewport={{ once: true }}
              transition={{
                duration: 0.4,
                delay: 0.4,
              }}
              className="col-span-2 rounded-2xl border border-white/10 bg-gradient-to-r from-white/10 to-white/5 p-8 backdrop-blur-xl"
            >

              <h4 className="mb-4 text-xl font-bold text-white">
                Interests & Expertise
              </h4>

              <div className="flex flex-wrap gap-3">

                {interests.map((interest) => (
                  <span
                    key={interest}
                    className="rounded-lg border border-white/10 bg-white/10 px-4 py-2 text-sm text-gray-300 transition-all hover:bg-white/20"
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