
import { useEffect, useState } from "react";
import { getSkills } from "../../services/skillService";
import { motion } from "motion/react";
import "../../styles/animations.css";
import "../../styles/portfolio-theme.css";

export default function Skills() {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    loadSkills();
  }, []);

  const loadSkills = async () => {
    try {
      const data = await getSkills();
      setSkills(data);
    } catch (error) {
      console.error("Failed to load skills:", error);
    }
  };

  const skillCategories = Object.values(
    skills.reduce((acc, skill) => {
      if (!acc[skill.category]) {
        acc[skill.category] = {
          category: skill.category,
          skills: [],
        };
      }

      acc[skill.category].skills.push(skill);
      return acc;
    }, {})
  );

  // Split Tech Stack into two moving rows
  const midpoint = Math.ceil(skills.length / 2);
  const firstRow = skills.slice(0, midpoint);
  const secondRow = skills.slice(midpoint);

  return (
    <section
      id="skills"
      className="skills-section relative overflow-hidden px-6 py-24 lg:px-8"
    >
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="skills-background-glow absolute right-10 top-1/4 h-96 w-96 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="skills-heading mb-4 text-4xl font-bold lg:text-5xl heading-reflection">
            SKILLS
          </h2>
        </motion.div>

        {/* Moving Tech Stack */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          {/* Row 1 — Moves Right */}
          <div className="relative mb-5 overflow-hidden">
            <motion.div
              className="flex w-max gap-4"
              animate={{ x: ["-50%", "0%"] }}
              transition={{
                duration: 25,
                ease: "linear",
                repeat: Infinity,
              }}
            >
              {[...firstRow, ...firstRow].map((skill, index) => (
                <div
                  key={`${skill._id}-row1-${index}`}
                  className="skills-tech-pill flex-shrink-0 rounded-xl px-8 py-4 backdrop-blur-sm"
                >
                  <span className="skills-body whitespace-nowrap font-medium">
                    {skill.name}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Row 2 — Moves Left */}
          <div className="relative overflow-hidden">
            <motion.div
              className="flex w-max gap-4"
              animate={{ x: ["0%", "-50%"] }}
              transition={{
                duration: 25,
                ease: "linear",
                repeat: Infinity,
              }}
            >
              {[...secondRow, ...secondRow].map((skill, index) => (
                <div
                  key={`${skill._id}-row2-${index}`}
                  className="skills-tech-pill flex-shrink-0 rounded-xl px-8 py-4 backdrop-blur-sm"
                >
                  <span className="skills-body whitespace-nowrap font-medium">
                    {skill.name}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Skill Categories + Percentages */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: categoryIndex * 0.1,
              }}
              className="skills-category-card"
            >
              <h3 className="skills-heading mb-6 text-xl font-bold">
                {category.category}
              </h3>

              <div className="space-y-6">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skill.name}>
                    <div className="mb-2 flex items-center justify-between">
                      <span className="skills-body font-medium">
                        {skill.name}
                      </span>

                      <span className="skills-muted text-sm">
                        {skill.level}%
                      </span>
                    </div>

                    <div className="skills-progress-track h-2 w-full overflow-hidden rounded-full">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{
                          width: `${skill.level}%`,
                        }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 1,
                          delay:
                            categoryIndex * 0.1 +
                            skillIndex * 0.1,
                        }}
                        className="skills-progress-fill h-full rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer Text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-12 text-center"
        >
          <p className="skills-muted mx-auto mt-6 max-w-2xl">
            A comprehensive toolkit of modern technologies and frameworks I
            use to build amazing applications
          </p>
        </motion.div>
      </div>
    </section>
  );
}
