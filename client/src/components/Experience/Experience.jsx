import { motion } from 'motion/react';
import { Briefcase, Calendar, Award } from 'lucide-react';

export default function Experience() {
  const experiences = [
    {
      company: 'InternPe',
      role: 'Web Development Intern',
      duration: 'Jun 2024 - Aug 2024',
      description:
        'Developed responsive web applications using modern frameworks. Collaborated with cross-functional teams to deliver high-quality features. Gained hands-on experience in full-stack development.',
      tech: ['React', 'Node.js', 'MongoDB', 'Express'],
      certificate: true,
    },
    {
      company: 'CodSoft',
      role: 'Web Development Intern',
      duration: 'May 2024 - Jul 2024',
      description:
        'Built interactive user interfaces and implemented RESTful APIs. Enhanced website performance and user experience. Worked on multiple client projects.',
      tech: ['JavaScript', 'CSS', 'HTML', 'Bootstrap'],
      certificate: true,
    },
    {
      company: 'Infosys Springboard',
      role: 'Full Stack Development Intern',
      duration: 'Mar 2024 - May 2024',
      description:
        'Completed comprehensive full-stack development training. Developed end-to-end web applications. Learned industry best practices and modern development workflows.',
      tech: ['MERN Stack', 'REST API', 'Git', 'Agile'],
      certificate: true,
    },
  ];

  return (
    <section id="experience" className="py-24 px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px]"></div>

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">Professional Experience</h2>
          <div className="w-24 h-1 bg-white mx-auto"></div>
          <p className="text-gray-400 mt-6">
            My journey through various internships and professional roles
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-white/10 hidden lg:block"></div>

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.company}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="relative"
              >
                {/* Timeline Dot */}
                <div className="absolute left-6 top-8 w-5 h-5 bg-white rounded-full border-4 border-black hidden lg:block"></div>

                <div className="lg:ml-20 bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all duration-300 hover:transform hover:scale-[1.02]">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <Briefcase size={24} className="text-white" />
                        <h3 className="text-2xl font-bold text-white">{exp.role}</h3>
                      </div>
                      <p className="text-xl text-gray-300 mb-2">{exp.company}</p>
                      <div className="flex items-center gap-2 text-gray-400">
                        <Calendar size={16} />
                        <span className="text-sm">{exp.duration}</span>
                      </div>
                    </div>
                    {exp.certificate && (
                      <button className="flex items-center gap-2 px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-all duration-300 border border-white/10 w-fit">
                        <Award size={18} />
                        <span className="text-sm">View Certificate</span>
                      </button>
                    )}
                  </div>

                  <p className="text-gray-300 leading-relaxed mb-6">{exp.description}</p>

                  <div className="flex flex-wrap gap-2">
                    {exp.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-4 py-1.5 bg-white/10 rounded-lg text-gray-300 text-sm border border-white/10"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
