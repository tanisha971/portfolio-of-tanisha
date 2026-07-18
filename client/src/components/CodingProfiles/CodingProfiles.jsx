import { motion } from 'motion/react';
import { ExternalLink } from 'lucide-react';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import CodeIcon from '@mui/icons-material/Code';

export default function CodingProfiles() {
  const profiles = [
    {
      platform: 'LeetCode',
      username: '@tanishaali',
      stats: '200+ Problems Solved',
      description: 'Consistent problem-solving practice focusing on DSA and algorithms',
      icon: CodeIcon,
      color: 'from-orange-500/20 to-orange-600/20',
    },
    {
      platform: 'GitHub',
      username: '@tanishaali',
      stats: '25+ Repositories',
      description: 'Open source contributions and personal projects',
      icon: GitHubIcon,
      color: 'from-purple-500/20 to-purple-600/20',
    },
    {
      platform: 'LinkedIn',
      username: 'Tanisha Ali',
      stats: '500+ Connections',
      description: 'Professional networking and career growth',
      icon: LinkedInIcon,
      color: 'from-blue-500/20 to-blue-600/20',
    },
  ];

  return (
    <section id="coding-profiles" className="py-24 px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px]"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">Coding Profiles</h2>
          <div className="w-24 h-1 bg-white mx-auto"></div>
          <p className="text-gray-400 mt-6 max-w-2xl mx-auto">
            Connect with me across various platforms and explore my coding journey
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {profiles.map((profile, index) => (
            <motion.div
              key={profile.platform}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="group relative bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 hover:border-white/30 transition-all duration-300"
            >
              {/* Gradient Background */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${profile.color} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
              ></div>

              <div className="relative z-10 space-y-6">
                {/* Icon */}
                <div className="w-16 h-16 bg-white/10 rounded-xl flex items-center justify-center group-hover:bg-white/20 transition-all">
                  <profile.icon size={32} className="text-white" />
                </div>

                {/* Content */}
                <div className="space-y-3">
                  <h3 className="text-2xl font-bold text-white">{profile.platform}</h3>
                  <p className="text-gray-400 text-sm">{profile.username}</p>
                  <div className="pt-2 pb-2">
                    <div className="text-xl font-bold text-white mb-1">{profile.stats}</div>
                    <p className="text-gray-300 text-sm">{profile.description}</p>
                  </div>
                </div>

                {/* Visit Button */}
                <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-all duration-300 border border-white/10 font-medium">
                  <span>Visit Profile</span>
                  <ExternalLink size={16} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* GitHub Contribution Graph Placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10"
        >
          <h3 className="text-2xl font-bold text-white mb-6">Coding Activity</h3>
          <div className="grid grid-cols-7 gap-2">
            {Array.from({ length: 84 }).map((_, i) => (
              <div
                key={i}
                className={`h-8 rounded ${
                  Math.random() > 0.5
                    ? 'bg-white/30'
                    : Math.random() > 0.3
                    ? 'bg-white/20'
                    : 'bg-white/10'
                }`}
              ></div>
            ))}
          </div>
          <p className="text-gray-400 text-sm mt-6 text-center">
            Consistent coding practice and contributions throughout the year
          </p>
        </motion.div>
      </div>
    </section>
  );
}
