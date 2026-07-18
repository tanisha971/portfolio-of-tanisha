import { motion } from 'motion/react';
import { ExternalLink } from 'lucide-react';
import GitHubIcon from '@mui/icons-material/GitHub';

export default function Projects() {
  const projects = [
    {
      title: 'Udayaam',
      description:
        'Smart India Hackathon 2024 National Winner project. A comprehensive platform designed to empower rural entrepreneurship through digital solutions and resource accessibility.',
      tech: ['React', 'Node.js', 'MongoDB', 'Express', 'Tailwind CSS'],
      category: 'SIH Winner',
      featured: true,
    },
    {
      title: 'Pinio AI Musical Learning',
      description:
        'An innovative AI-powered platform for musical education, providing personalized learning experiences and interactive lessons for aspiring musicians.',
      tech: ['React', 'AI/ML', 'Node.js', 'MongoDB'],
      category: 'AI/ML',
      featured: true,
    },
    {
      title: 'Civix Civic-Tech Platform',
      description:
        'A civic engagement platform connecting citizens with local government services, enabling transparency and efficient public service delivery.',
      tech: ['MERN Stack', 'REST API', 'Material UI'],
      category: 'Full Stack',
      featured: true,
    },
    {
      title: 'Real Estate MERN Platform',
      description:
        'Complete real estate management system with property listings, search functionality, user authentication, and advanced filtering options.',
      tech: ['MongoDB', 'Express', 'React', 'Node.js', 'JWT'],
      category: 'Full Stack',
      featured: false,
    },
    {
      title: 'PoolCarz Carpooling App',
      description:
        'Sustainable transportation solution enabling users to share rides, reduce carbon footprint, and save costs through an intuitive mobile-first platform.',
      tech: ['React', 'Node.js', 'MongoDB', 'Google Maps API'],
      category: 'Full Stack',
      featured: false,
    },
  ];

  return (
    <section id="projects" className="py-24 px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute bottom-1/4 left-10 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">Featured Projects</h2>
          <div className="w-24 h-1 bg-white mx-auto"></div>
          <p className="text-gray-400 mt-6 max-w-2xl mx-auto">
            A showcase of my best work, from award-winning hackathon projects to full-stack applications
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`group relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 hover:border-white/30 transition-all duration-500 hover:transform hover:scale-[1.02] ${
                project.featured ? 'lg:col-span-1' : ''
              }`}
            >
              {/* Category Badge */}
              <div className="absolute top-4 right-4 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full border border-white/20">
                <span className="text-xs text-white font-medium">{project.category}</span>
              </div>

              {/* Glow Effect on Hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-white/0 group-hover:from-white/5 group-hover:to-white/10 rounded-2xl transition-all duration-500"></div>

              <div className="relative z-10 space-y-6">
                {/* Project Icon/Mockup Placeholder */}
                <div className="w-full h-48 bg-white/10 rounded-xl flex items-center justify-center border border-white/10 group-hover:border-white/20 transition-all">
                  <div className="text-6xl text-white/30">💻</div>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-gray-100 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed text-sm">
                    {project.description}
                  </p>
                </div>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-white/10 rounded-lg text-gray-300 text-xs border border-white/10"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                  <button className="flex items-center gap-2 px-4 py-2 bg-white text-black rounded-lg hover:bg-gray-200 transition-all duration-300 text-sm font-medium">
                    <GitHubIcon size={16} />
                    <span>Code</span>
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-all duration-300 border border-white/10 text-sm font-medium">
                    <ExternalLink size={16} />
                    <span>Live</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
