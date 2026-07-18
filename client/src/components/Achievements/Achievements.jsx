import { motion } from 'motion/react';
import { Trophy, Star, Award, Target } from 'lucide-react';

export default function Achievements() {
  const achievements = [
    {
      icon: Trophy,
      title: 'Smart India Hackathon 2024',
      subtitle: 'National Winner',
      description:
        'Won the prestigious Smart India Hackathon 2024 with project "Udayaam" among thousands of teams nationwide.',
      color: 'from-yellow-500/20 to-yellow-600/20',
    },
    {
      icon: Star,
      title: 'Walmart Sparkathon',
      subtitle: 'Participant',
      description:
        'Selected to participate in Walmart Sparkathon, competing with top engineering talent on innovative retail solutions.',
      color: 'from-blue-500/20 to-blue-600/20',
    },
    {
      icon: Award,
      title: 'Adobe Hackathon',
      subtitle: 'Preparation & Participation',
      description:
        'Prepared and participated in Adobe Hackathon, focusing on creative tech solutions and design thinking.',
      color: 'from-red-500/20 to-red-600/20',
    },
    {
      icon: Target,
      title: 'Flipkart Grid',
      subtitle: 'Preparation & Participation',
      description:
        'Engaged in Flipkart Grid hackathon, working on e-commerce innovation and scalable solutions.',
      color: 'from-purple-500/20 to-purple-600/20',
    },
    {
      icon: Award,
      title: 'Multiple Internships',
      subtitle: 'Professional Experience',
      description:
        'Successfully completed 3+ internships at reputed organizations including InternPe, CodSoft, and Infosys Springboard.',
      color: 'from-green-500/20 to-green-600/20',
    },
  ];

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
                  <achievement.icon size={32} className="text-white" />
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
