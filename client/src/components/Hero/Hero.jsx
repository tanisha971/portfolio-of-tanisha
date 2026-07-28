import { motion } from "motion/react";
// import { Github, Linkedin, Mail, Code2, Sparkles } from "lucide-react";
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import CodeIcon from '@mui/icons-material/Code';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import YouTubeIcon from "@mui/icons-material/YouTube";
import InstagramIcon from "@mui/icons-material/Instagram";
import Tanisha_img from "../../assets/images/Tanisha_img.png";
import { Typewriter } from "react-simple-typewriter";

export default function Hero() {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden px-6 lg:px-8 pt-20"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-white/5 to-transparent rounded-full blur-3xl"></div>
      </div>

      {/* Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px]"></div>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="space-y-4"
            >
              <div className="flex items-center gap-2 text-gray-400">
                <AutoAwesomeIcon size={20} className="text-white" />
                <span className="text-sm tracking-wider uppercase">
                  Welcome to my portfolio
                </span>
              </div>

              <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight">
                Hello, I'm <br />
                <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                  Tanisha Ali
                </span>
              </h1>

              <div className="space-y-2">
              <div className="flex items-center text-xl lg:text-2xl font-semibold text-white min-h-[40px]">
                <Typewriter
                  words={[
                    "Full Stack Developer",
                    "Content Creator",
                    "AI/ML Enthusiast",
                    "UI/UX Designer",
                    "Video Editor",
                  ]}
                  loop={0}
                  cursor
                  cursorStyle="|"
                  typeSpeed={80}
                  deleteSpeed={40}
                  delaySpeed={1800}
                />
              </div>

              <p className="text-gray-400 text-lg">
                SIH 2024 National Winner | BTech CSE Student
              </p>
            </div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-gray-400 text-lg leading-relaxed max-w-xl"
            >
              Passionate about building scalable web applications and solving
              real-world problems through innovative technology solutions.
              Specialized in full-stack development with expertise in modern
              frameworks and tools.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex flex-wrap gap-4"
            >
              <a
                href="#projects"
                className="px-8 py-3 bg-white text-black rounded-lg hover:bg-gray-200 transition-all duration-300 hover:scale-105 font-medium"
              >
                View Projects
              </a>

              <a
                href="#contact"
                className="px-8 py-3 bg-white/10 text-white border border-white/20 rounded-lg hover:bg-white/20 transition-all duration-300 hover:scale-105 font-medium backdrop-blur-sm"
              >
                Contact Me
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="flex flex-wrap gap-4"
            >
              {/* GitHub */}
              <a
                href="https://github.com/tanisha971/"
                target="_blank"
                rel="noopener noreferrer"
                title="GitHub"
                className="p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-all duration-300 hover:scale-110 backdrop-blur-sm border border-white/10"
              >
                <GitHubIcon className="text-white" />
              </a>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/tanisha-ali-727b02277/"
                target="_blank"
                rel="noopener noreferrer"
                title="LinkedIn"
                className="p-3 bg-white/10 rounded-lg hover:bg-[#0a66c2] transition-all duration-300 hover:scale-110 backdrop-blur-sm border border-white/10"
              >
                <LinkedInIcon className="text-white" />
              </a>

              {/* Email */}
              <a
                href="mailto:tanishaali67@gmail.com"
                title="Email"
                className="p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-all duration-300 hover:scale-110 backdrop-blur-sm border border-white/10"
              >
                <EmailIcon className="text-white" />
              </a>

              {/* YouTube */}
              <a
                href="https://www.youtube.com/@tanishas_tech_world"
                target="_blank"
                rel="noopener noreferrer"
                title="Tanisha's Tech World"
                className="p-3 bg-white/10 rounded-lg hover:bg-red-600 hover:text-white transition-all duration-300 hover:scale-110 backdrop-blur-sm border border-white/10"
              >
                <YouTubeIcon />
              </a>

              {/* Instagram */}
              <a
                href="https://www.instagram.com/tanishas_tech_world/"
                target="_blank"
                rel="noopener noreferrer"
                title="Tanisha's Tech World"
                className="p-3 bg-white/10 rounded-lg hover:bg-pink-600 hover:text-white transition-all duration-300 hover:scale-110 backdrop-blur-sm border border-white/10"
              >
                <InstagramIcon />
              </a>
            </motion.div>
          </motion.div>

          {/* Right Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative hidden lg:flex items-center justify-center"
          >
            <div className="relative w-full h-[500px] flex items-center justify-center">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-96 h-96 bg-gradient-to-r from-white/10 to-white/5 rounded-full blur-2xl animate-pulse"></div>
              </div>

              <div className="relative z-10">
                <div className="absolute w-[430px] h-[430px] rounded-full bg-gradient-to-r from-white/20 via-white/5 to-transparent blur-3xl animate-pulse"></div>
                  <div className="relative w-96 h-96 rounded-full overflow-hidden border-4 border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl">
                    <img
                      src={Tanisha_img}
                      alt="Tanisha Ali"
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
</div>

              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute top-12 right-4 p-4 bg-white/10 backdrop-blur-xl rounded-xl border border-white/10"
              >
                <span className="text-white font-mono">React</span>
              </motion.div>

              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
                className="absolute bottom-24 right-0 p-4 bg-white/10 backdrop-blur-xl rounded-xl border border-white/10"
              >
                <span className="text-white font-mono">Node.js</span>
              </motion.div>

              <motion.div
                animate={{ y: [0, -18, 0] }}
                transition={{ duration: 2.8, repeat: Infinity, delay: 1 }}
                className="absolute bottom-16 left-0 p-4 bg-white/10 backdrop-blur-xl rounded-xl border border-white/10"
              >
                <span className="text-white font-mono">MongoDB</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}