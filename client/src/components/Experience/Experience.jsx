
import { useEffect, useState } from "react";
import { getExperiences } from "../../services/experienceService";
import { motion } from "motion/react";
import { Briefcase, Calendar, Award } from "lucide-react";
import "../../styles/animations.css";

export default function Experience() {
  const [experiences, setExperiences] = useState([]);

  useEffect(() => {
    loadExperiences();
  }, []);

  const loadExperiences = async () => {
    try {
      const data = await getExperiences();
      setExperiences(data);
    } catch (error) {
      console.error("Failed to load experiences:", error);
    }
  };

  return (
    <section
      id="experience"
      className="relative overflow-hidden px-6 py-24 lg:px-8"
    >
      {/* BACKGROUND GRID */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* HEADING */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20 text-center"
        >
          <h2 className="heading-reflection mb-4 text-4xl font-bold text-white lg:text-5xl">
            EXPERIENCE
          </h2>
        </motion.div>

        {/* TIMELINE */}
        <div className="relative">
          {/* CENTER LINE */}
          <div className="absolute bottom-0 left-1/2 top-0 hidden w-px -translate-x-1/2 bg-white/15 md:block" />

          <div className="space-y-12 md:space-y-16">
            {experiences.map((exp, index) => {
              const isLeft = index % 2 === 0;

              return (
                <div
                  key={`${exp.company}-${index}`}
                  className="relative grid grid-cols-1 md:grid-cols-2 md:gap-12"
                >
                  {/* TIMELINE DOT */}
                  <div className="absolute left-1/2 top-8 z-20 hidden h-4 w-4 -translate-x-1/2 rounded-full border-4 border-black bg-white md:block" />

                  {/* LEFT / RIGHT POSITION */}
                  <div
                    className={`${
                      isLeft
                        ? "md:col-start-1"
                        : "md:col-start-2 md:row-start-1"
                    }`}
                  >
                    <motion.div
                      initial={{
                        opacity: 0,
                        x: isLeft ? -35 : 35,
                      }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{
                        duration: 0.55,
                        delay: 0.1,
                      }}
                      className="relative h-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl transition-colors duration-300 hover:border-white/25 sm:p-8"
                    >
                      {/* CARD HOVER GLOW */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-transparent via-transparent to-white/[0.05]"
                      />

                      {/* CARD CONTENT */}
                      <div className="relative z-10">
                        {/* ROLE + CERTIFICATE */}
                        <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                          <div className="min-w-0">
                            <div className="mb-2 flex items-start gap-3">
                              <Briefcase
                                size={24}
                                className="mt-1 shrink-0 text-white"
                              />
                              <h3 className="text-xl font-bold leading-snug text-white sm:text-2xl">
                                {exp.role}
                              </h3>
                            </div>

                            <p className="mb-2 text-lg text-gray-300 sm:text-xl">
                              {exp.company}
                            </p>

                            <div className="flex items-center gap-2 text-gray-400">
                              <Calendar size={16} />
                              <span className="text-sm">
                                {exp.duration}
                              </span>
                            </div>
                          </div>

                          {exp.certificate && exp.certificateUrl && (
                            <a
                              href={exp.certificateUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex w-fit shrink-0 items-center gap-2 rounded-lg border border-white/10 bg-white/10 px-3 py-2 text-white transition-colors duration-300 hover:bg-white/20"
                            >
                              <Award size={18} />
                              <span className="text-sm">
                                View Certificate
                              </span>
                            </a>
                          )}
                        </div>

                        {/* DESCRIPTION */}
                        <p className="mb-6 text-sm leading-6 text-gray-300 sm:text-base">
                          {exp.description}
                        </p>

                        {/* TECHNOLOGIES */}
                        <div className="flex flex-wrap gap-2">
                          {exp.tech?.map((tech) => (
                            <span
                              key={tech}
                              className="rounded-lg border border-white/10 bg-white/[0.06] px-3 py-2 text-sm text-gray-300"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* FOOTER */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 text-center text-gray-400"
        >
          My journey through various internships and professional roles
        </motion.p>
      </div>
    </section>
  );
}
