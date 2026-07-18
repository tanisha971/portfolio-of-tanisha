import { motion } from 'motion/react';

export default function Skills() {
  const skillCategories = [
    {
      category: 'Frontend',
      skills: [
        { name: 'React', level: 90 },
        { name: 'Tailwind CSS', level: 85 },
        { name: 'Material UI', level: 80 },
        { name: 'JavaScript', level: 88 },
      ],
    },
    {
      category: 'Backend',
      skills: [
        { name: 'Node.js', level: 85 },
        { name: 'Express.js', level: 82 },
      ],
    },
    {
      category: 'Database',
      skills: [
        { name: 'MongoDB', level: 80 },
      ],
    },
    {
      category: 'Languages',
      skills: [
        { name: 'Java', level: 85 },
        { name: 'C', level: 75 },
        { name: 'C++', level: 78 },
      ],
    },
    {
      category: 'Tools & Technologies',
      skills: [
        { name: 'GitHub', level: 90 },
        { name: 'Figma', level: 75 },
        { name: 'REST APIs', level: 85 },
        { name: 'JWT', level: 80 },
      ],
    },
  ];

  return (
    <section id="skills" className="py-24 px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-10 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">Skills & Technologies</h2>
          <div className="w-24 h-1 bg-white mx-auto"></div>
          <p className="text-gray-400 mt-6 max-w-2xl mx-auto">
            A comprehensive toolkit of modern technologies and frameworks I use to build amazing applications
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
              className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all duration-300"
            >
              <h3 className="text-xl font-bold text-white mb-6">{category.category}</h3>
              <div className="space-y-6">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skill.name}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-300 font-medium">{skill.name}</span>
                      <span className="text-gray-400 text-sm">{skill.level}%</span>
                    </div>
                    <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: categoryIndex * 0.1 + skillIndex * 0.1 }}
                        className="h-full bg-gradient-to-r from-white to-gray-400 rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tech Stack Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16"
        >
          <h3 className="text-2xl font-bold text-white text-center mb-8">Tech Stack</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              'React',
              'Node.js',
              'Express',
              'MongoDB',
              'Tailwind CSS',
              'Material UI',
              'JavaScript',
              'Java',
              'C++',
              'GitHub',
              'Figma',
              'REST API',
              'JWT',
              'Git',
              'VS Code',
              'Postman',
            ].map((tech, index) => (
              <motion.div
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ scale: 1.1 }}
                className="px-6 py-3 bg-white/10 backdrop-blur-sm rounded-xl border border-white/10 hover:border-white/30 transition-all duration-300"
              >
                <span className="text-gray-200 font-medium">{tech}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
