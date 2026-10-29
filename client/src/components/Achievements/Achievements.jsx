
import { useEffect, useState } from "react";
import { getAchievements } from "../../services/achievementService";
import { motion } from "motion/react";
import { Trophy, Star, Award, Target } from "lucide-react";
import "../../styles/animations.css";
import "../../styles/portfolio-theme.css";

const icons = {
  Trophy,
  Star,
  Award,
  Target,
};

export default function Achievements() {
  const [achievements, setAchievements] = useState([]);

  useEffect(() => {
    const loadAchievements = async () => {
      try {
        const data = await getAchievements();
        setAchievements(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Failed to load achievements:", error);
      }
    };

    loadAchievements();
  }, []);

  const stats = [
    { label: "Hackathons", value: "5+" },
    { label: "Awards Won", value: "1" },
    { label: "Projects Built", value: "10+" },
    { label: "Team Collaborations", value: "15+" },
  ];

  return (
    <section
      id="achievements"
      className="achievements-theme-section relative overflow-hidden px-6 py-24 lg:px-8"
    >
      {/* THEME-AWARE GRID BACKGROUND */}
      <div className="achievements-grid-background pointer-events-none absolute inset-0" />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* HEADING */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="achievements-title heading-reflection mb-4 text-4xl font-bold lg:text-5xl">
            ACHIEVEMENTS
          </h2>
        </motion.div>

        {/* ACHIEVEMENT CARDS */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {achievements.map((achievement, index) => {
            const Icon = icons[achievement.icon] || Award;

            return (
              <motion.div
                key={achievement._id || achievement.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="achievement-theme-card group relative overflow-hidden rounded-2xl border p-8 backdrop-blur-xl"
              >
                {/* HOVER GLOW */}
                <div className="achievement-card-glow pointer-events-none absolute inset-0 rounded-2xl" />

                <div className="relative z-10 space-y-4">
                  {/* ICON */}
                  <div className="achievement-icon-box flex h-16 w-16 items-center justify-center rounded-xl">
                    <Icon size={32} />
                  </div>

                  {/* CONTENT */}
                  <div>
                    <h3 className="achievements-title mb-1 text-xl font-bold">
                      {achievement.title}
                    </h3>

                    <p className="achievements-muted mb-3 text-sm">
                      {achievement.subtitle}
                    </p>

                    <p className="achievements-description text-sm leading-relaxed">
                      {achievement.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* COMPETITION HIGHLIGHTS */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="achievements-highlights mt-16 rounded-2xl border p-8 backdrop-blur-xl"
        >
          <h3 className="achievements-title mb-6 text-center text-2xl font-bold">
            Competition Highlights
          </h3>

          <div className="grid gap-6 md:grid-cols-4">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="achievements-stat-value mb-2 text-4xl font-bold">
                  {stat.value}
                </div>

                <div className="achievements-muted text-sm">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* FOOTER TEXT */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-12 text-center"
        >
          <p className="achievements-muted mx-auto mt-6 max-w-2xl">
            Milestones and accomplishments that mark my journey in technology
            and innovation.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
