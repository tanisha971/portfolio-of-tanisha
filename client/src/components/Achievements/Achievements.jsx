import { useEffect, useState } from "react";
import { getAchievements } from "../../services/achievementService";
import { motion } from 'motion/react';
import { Trophy, Star, Award, Target } from 'lucide-react';

export default function Achievements() {
  const [achievements, setAchievements] = useState([]);

  useEffect(() => {
      loadAchievements();
  }, []);

  const loadAchievements = async () => {
      const data = await getAchievements();
      setAchievements(data);
  };

  const icons = {
    Trophy,
    Star,
    Award,
    Target,
  };

  const Icon = icons[achievements.icon] || Award;

  return (
    <section id="achievements" className="py-24 px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px]"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">Achievements & Recognition</h2>
          <div className="w-24 h-1 bg-white mx-auto"></div>
          <p className="text-gray-400 mt-6 max-w-2xl mx-auto">
            Milestones and accomplishments that mark my journey in technology and innovation
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="group relative bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 hover:border-white/30 transition-all duration-300"
            >
              {/* Gradient Background */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${achievement.color} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
              ></div>

              <div className="relative z-10 space-y-4">
                {/* Icon */}
                <div className="w-16 h-16 bg-white/10 rounded-xl flex items-center justify-center group-hover:bg-white/20 transition-all">
                  <Icon
                      size={32}
                      className="text-white"
                  />
                </div>

                {/* Content */}
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">{achievement.title}</h3>
                  <p className="text-sm text-gray-400 mb-3">{achievement.subtitle}</p>
                  <p className="text-gray-300 text-sm leading-relaxed">{achievement.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10"
        >
          <h3 className="text-2xl font-bold text-white mb-6 text-center">Competition Highlights</h3>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { label: 'Hackathons', value: '5+' },
              { label: 'Awards Won', value: '1' },
              { label: 'Projects Built', value: '10+' },
              { label: 'Team Collaborations', value: '15+' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
