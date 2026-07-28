import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { ExternalLink } from 'lucide-react';
import GitHubIcon from '@mui/icons-material/GitHub';
import CodeIcon from '@mui/icons-material/Code';
import { GitHubCalendar } from 'react-github-calendar';

export default function CodingProfiles() {
  const [selectedPlatform, setSelectedPlatform] = useState('GitHub');
  
  const profiles = [
    {
      platform: 'LeetCode',
      username: '@tanisha751',
      href: 'https://leetcode.com/u/tanisha751/',
      stats: '200+ Problems Solved',
      description: 'Consistent problem-solving practice focusing on DSA and algorithms',
      icon: CodeIcon,
      color: 'from-orange-500/20 to-orange-600/20',
    },
    {
      platform: 'GitHub',
      username: '@tanisha971',
      href: 'https://github.com/tanisha971',
      stats: '25+ Repositories',
      description: 'Open source contributions and personal projects',
      icon: GitHubIcon,
      color: 'from-purple-500/20 to-purple-600/20',
    },
    {
      platform: 'Take U Forward',
      username: '@tanishaali89',
      href: 'https://takeuforward.org/profile/tanishaali89',
      stats: 'DSA Learning',
      description: 'Problem-solving practice and learning resources',
      icon: CodeIcon,
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
                <a
                  href={profile.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-all duration-300 border border-white/10 font-medium"
                >
                  <span>Visit Profile</span>
                  <ExternalLink size={16} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* GitHub Contribution Graph */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-10 backdrop-blur-xl"
        >
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between mb-6">
            <div>
              <h3 className="text-2xl font-bold text-white">
                GitHub Contribution Activity
              </h3>

              <p className="text-gray-400 text-sm mt-2">
                My open-source contributions and coding consistency over the past year.
              </p>
            </div>

            
          </div>

          <div className="overflow-x-auto rounded-2xl border border-white/10 bg-black/30 p-6">

            <div className="flex justify-center">

              <div className="w-fit">

                <GitHubCalendar
                  username="tanisha971"
                  blockSize={14}
                  blockMargin={3}
                  fontSize={12}
                  hideColorLegend={false}
                  hideMonthLabels={false}
                  hideTotalCount={true}
                  style={{ color: "#d1d5db" }}
                />

              </div>

            </div>

          </div>

          <div className="mt-6 flex flex-col items-center gap-3 text-center">

            <p className="text-gray-400 text-sm">
              Visit my GitHub profile to explore projects and contributions.
            </p>

            <a
              href="https://github.com/tanisha971"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-6 py-3 text-sm font-medium text-white transition hover:bg-white/20"
            >
              <GitHubIcon fontSize="small" />
              View GitHub Profile
              <ExternalLink size={16} />
            </a>

          </div>
        </motion.div>
      </div>
    </section>
  );
}
