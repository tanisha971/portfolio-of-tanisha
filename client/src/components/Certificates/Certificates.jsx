import { motion } from 'motion/react';
import { Award, Download, Eye } from 'lucide-react';

export default function Certificates() {
  const certificates = [
    {
      title: 'Full Stack Web Developer',
      issuer: 'Infosys Springboard',
      date: 'May 2024',
      description: 'Comprehensive full-stack development certification covering MERN stack and modern web technologies.',
    },
    {
      title: 'Java Programming',
      issuer: 'CodSoft',
      date: 'July 2024',
      description: 'Advanced Java programming certification covering OOP, data structures, and application development.',
    },
    {
      title: 'JavaScript Suite',
      issuer: 'InternPe',
      date: 'August 2024',
      description: 'Complete JavaScript certification including ES6+, async programming, and modern frameworks.',
    },
    {
      title: 'C Programming',
      issuer: 'Online Learning Platform',
      date: 'March 2024',
      description: 'Foundational C programming certification covering data structures and algorithms.',
    },
  ];

  return (
    <section id="certificates" className="py-24 px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/3 right-20 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">Certifications</h2>
          <div className="w-24 h-1 bg-white mx-auto"></div>
          <p className="text-gray-400 mt-6 max-w-2xl mx-auto">
            Professional certifications and credentials earned through dedicated learning
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {certificates.map((cert, index) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 hover:border-white/30 transition-all duration-300 hover:transform hover:scale-[1.02]"
            >
              {/* Certificate Preview Area */}
              <div className="mb-6 h-48 bg-white/10 rounded-xl flex items-center justify-center border border-white/10 group-hover:border-white/20 transition-all overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent group-hover:from-white/10 transition-all"></div>
                <Award size={64} className="text-white/30 group-hover:text-white/40 transition-colors relative z-10" />
              </div>

              {/* Certificate Info */}
              <div className="space-y-3 mb-6">
                <h3 className="text-xl font-bold text-white group-hover:text-gray-100 transition-colors">
                  {cert.title}
                </h3>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-300">{cert.issuer}</span>
                  <span className="text-gray-400">{cert.date}</span>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">{cert.description}</p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-white text-black rounded-lg hover:bg-gray-200 transition-all duration-300 text-sm font-medium">
                  <Eye size={16} />
                  <span>Preview</span>
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-all duration-300 border border-white/10 text-sm font-medium">
                  <Download size={16} />
                  <span>Download</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-12 text-center"
        >
          <p className="text-gray-400">
            Continuously learning and earning new certifications to stay updated with the latest technologies
          </p>
        </motion.div>
      </div>
    </section>
  );
}
