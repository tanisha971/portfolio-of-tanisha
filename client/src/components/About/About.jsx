import { motion } from "motion/react";
import { GraduationCap, Award, Code, Trophy } from "lucide-react";

export default function About() {
  const stats = [
    { icon: Trophy, label: "SIH Winner", value: "2024" },
    { icon: Award, label: "Internships", value: "1+" },
    { icon: Code, label: "Projects", value: "6+" },
    { icon: GraduationCap, label: "DSA Solved", value: "500+" },
  ];

  return (
    <section
      id="about"
      className="relative overflow-hidden px-6 py-24 lg:px-8"
    >
      {/* Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-4xl font-bold text-white lg:text-5xl">
            About Me
          </h2>

          <div className="mx-auto h-1 w-24 bg-white"></div>
        </motion.div>

        <div className="grid items-start gap-12 lg:grid-cols-2">
          {/* Left */}

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
              <h3 className="mb-4 text-2xl font-bold text-white">
                Full Stack Developer & Problem Solver
              </h3>

              <p className="mb-4 leading-relaxed text-gray-300">
                I'm a passionate B.Tech Computer Science student at Meghnad Saha
                Institute of Technology, dedicated to creating innovative
                solutions that make a real impact. As a Smart India Hackathon
                2024 National Winner, I've proven my ability to tackle complex
                challenges under pressure.
              </p>

              <p className="mb-4 leading-relaxed text-gray-300">
                My journey in software development is driven by a deep interest
                in Data Structures & Algorithms, Artificial Intelligence, UI/UX
                Design, and building scalable systems. I believe in writing
                clean, efficient code that not only works but also stands the
                test of time.
              </p>

              <p className="leading-relaxed text-gray-300">
                I'm constantly learning and evolving, always looking for
                opportunities to push the boundaries of what's possible with
                technology. Whether it's developing full-stack applications,
                participating in hackathons, or solving algorithmic challenges,
                I bring dedication and creativity to everything I do.
              </p>
            </div>

            {/* Education */}

            <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
              <div className="flex items-start gap-4">
                <div className="rounded-lg bg-white/10 p-3">
                  <GraduationCap size={28} className="text-white" />
                </div>

                <div>
                  <h4 className="mb-2 text-xl font-bold text-white">
                    Education
                  </h4>

                  <p className="font-medium text-gray-300">
                    Bachelor of Technology in Computer Science
                  </p>

                  <p className="text-sm text-gray-400">
                    Meghnad Saha Institute of Technology
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right */}

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 gap-6"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.1,
                }}
                whileHover={{ scale: 1.05 }}
                className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-8 backdrop-blur-xl transition-all duration-300 hover:border-white/20"
              >
                <div className="flex flex-col items-center space-y-4 text-center">
                  <div className="rounded-xl bg-white/10 p-4">
                    <stat.icon size={32} className="text-white" />
                  </div>

                  <div>
                    <h4 className="mb-2 text-3xl font-bold text-white">
                      {stat.value}
                    </h4>

                    <p className="text-sm text-gray-300">
                      {stat.label}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Interests */}

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.4,
                delay: 0.4,
              }}
              className="col-span-2 rounded-2xl border border-white/10 bg-gradient-to-r from-white/10 to-white/5 p-8 backdrop-blur-xl"
            >
              <h4 className="mb-4 text-xl font-bold text-white">
                Interests & Expertise
              </h4>

              <div className="flex flex-wrap gap-3">
                {[
                  "Data Structures",
                  "Algorithms",
                  "AI/ML",
                  "UI/UX Design",
                  "Full Stack",
                  "System Design",
                  "Cloud Computing",
                  "DevOps",
                ].map((interest) => (
                  <span
                    key={interest}
                    className="rounded-lg border border-white/10 bg-white/10 px-4 py-2 text-sm text-gray-300 transition-all hover:bg-white/20"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}