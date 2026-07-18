import { motion } from 'motion/react';
import { Phone, MapPin, Send } from 'lucide-react';
import { useState } from 'react';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const contactInfo = [
    {
      icon: EmailIcon,
      label: 'Email',
      value: 'tanisha.ali@example.com',
      href: 'mailto:tanisha.ali@example.com',
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+91 98765 43210',
      href: 'tel:+919876543210',
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Kolkata, West Bengal',
      href: null,
    },
  ];

  const socialLinks = [
    { icon: GitHubIcon, label: 'GitHub', href: 'https://github.com' },
    { icon: LinkedInIcon, label: 'LinkedIn', href: 'https://linkedin.com' },
    { icon: EmailIcon, label: 'Email', href: 'mailto:tanisha.ali@example.com' },
  ];

  return (
    <section id="contact" className="py-24 px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">Get In Touch</h2>
          <div className="w-24 h-1 bg-white mx-auto"></div>
          <p className="text-gray-400 mt-6 max-w-2xl mx-auto">
            Let's discuss your next project or opportunity. I'm always open to new challenges and collaborations.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10"
          >
            <h3 className="text-2xl font-bold text-white mb-6">Send Message</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-gray-300 mb-2 text-sm">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-white/30 transition-all"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-gray-300 mb-2 text-sm">
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-white/30 transition-all"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-gray-300 mb-2 text-sm">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 bg-white/10 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-white/30 transition-all resize-none"
                  placeholder="Your message here..."
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-white text-black rounded-lg hover:bg-gray-200 transition-all duration-300 hover:scale-[1.02] font-medium"
              >
                <Send size={20} />
                <span>Send Message</span>
              </button>
            </form>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10">
              <h3 className="text-2xl font-bold text-white mb-6">Contact Information</h3>
              <div className="space-y-6">
                {contactInfo.map((info) => (
                  <div key={info.label} className="flex items-start gap-4">
                    <div className="p-3 bg-white/10 rounded-lg flex-shrink-0">
                      <info.icon size={24} className="text-white" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm mb-1">{info.label}</p>
                      {info.href ? (
                        <a
                          href={info.href}
                          className="text-white hover:text-gray-300 transition-colors"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p className="text-white">{info.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10">
              <h3 className="text-2xl font-bold text-white mb-6">Social Links</h3>
              <div className="flex gap-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 bg-white/10 rounded-lg hover:bg-white/20 transition-all duration-300 hover:scale-110 border border-white/10"
                    aria-label={social.label}
                  >
                    <social.icon size={24} className="text-white" />
                  </a>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10">
              <h3 className="text-xl font-bold text-white mb-4">Let's Build Something Amazing</h3>
              <p className="text-gray-300 leading-relaxed">
                I'm currently open to internship opportunities, freelance projects, and full-time positions.
                Whether you have a project in mind or just want to connect, feel free to reach out!
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
