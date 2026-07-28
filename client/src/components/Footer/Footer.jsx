import { motion } from 'motion/react';
import { ArrowUp, Heart } from 'lucide-react';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import YouTubeIcon from "@mui/icons-material/YouTube";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";


export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  const footerLinks = [
    [
      { name: "Home", href: "#home" },
      { name: "About", href: "#about" },
      { name: "Skills", href: "#skills" },
      { name: "Experience", href: "#experience" },
      { name: "Projects", href: "#projects" },
    ],
    [
      { name: "Achievements", href: "#achievements" },
      { name: "Certificates", href: "#certificates" },
      { name: "Coding Profiles", href: "#coding-profiles" },
      { name: "Content Creation", href: "#content-creation" },
      { name: "Contact", href: "#contact" },
    ],
  ];

  const socialLinks = [
    { icon: GitHubIcon, href: 'https://github.com/tanisha971', label: 'GitHub', hover: "hover:text-gray-300 hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.7)]", },
    { icon: LinkedInIcon, href: 'https://linkedin.com/in/tanisha-ali-727b02277/', label: 'LinkedIn', hover: "hover:text-[#0A66C2] hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.7)]", },
    { icon: EmailIcon, href: 'mailto:tanishaali67@gmail.com', label: 'Email', hover: "hover:text-red-400 hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.7)]", },
    { icon: YouTubeIcon, label: 'YouTube', href: 'https://youtube.com/@tanishas_tech_world', hover: "hover:text-[#FF0000] hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.7)]", },
    { icon: InstagramIcon, label: 'Instagram', href: 'https://instagram.com/tanishas_tech_world', hover: "hover:text-pink-600 hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.7)]", },
    { icon: FacebookIcon, label: 'Facebook', href: 'https://www.facebook.com/tanishastechworld/', hover: "hover:text-[#1877F2] hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.7)]", },
  ];

  return (
    <footer className="relative py-12 px-6 lg:px-8 border-t border-white/10">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px]"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl font-bold text-white mb-4">Tanisha Ali</h3>
            <p className="text-gray-400 leading-relaxed">
              Full Stack Developer passionate about creating innovative solutions and building scalable applications.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="md:mx-auto"
          >
            <h4 className="text-lg font-bold text-white mb-5">
              Quick Links
            </h4>

            <div className="grid grid-cols-2 gap-x-12 gap-y-2">

              {footerLinks.map((column, columnIndex) => (
                <ul key={columnIndex} className="space-y-3">

                  {column.map((link) => (
                    <li key={link.name}>

                      <a
                        href={link.href}
                        className="text-gray-400 hover:text-white transition-colors duration-300"
                      >
                        {link.name}
                      </a>

                    </li>
                  ))}

                </ul>
              ))}

            </div>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="md:ml-auto"
          >
            <h4 className="text-lg font-bold text-white mb-4">Connect</h4>
            <div className="grid grid-cols-3 gap-6 w-fit">

  {socialLinks.map((social) => (
    <a
      key={social.label}
      href={social.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={social.label}
      className="group transition-all duration-300 hover:-translate-y-1"
    >

      <social.icon
        sx={{ fontSize: 24 }}
        className={`text-gray-400 transition-all duration-300 ${social.hover}`}
      />

    </a>
  ))}

</div>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-gray-400 text-sm flex items-center gap-2"
            >
              <span>&copy; {currentYear} Designed & Developed by Tanisha Ali</span>
              <Heart size={16} className="text-red-500 fill-red-500" />
            </motion.p>

            <motion.button
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              onClick={scrollToTop}
              className="flex items-center gap-2 px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-all duration-300 border border-white/10"
            >
              <span className="text-sm">Back to Top</span>
              <ArrowUp size={16} />
            </motion.button>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-gray-500 text-xs text-center mt-4"
          >
            Built with React.js, Tailwind CSS, Material UI, Node.js, Express.js & MongoDB
          </motion.p>
        </div>
      </div>
    </footer>
  );
}
