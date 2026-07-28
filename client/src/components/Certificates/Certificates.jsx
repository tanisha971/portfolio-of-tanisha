import { motion } from 'motion/react';
import { Award, Download, Eye } from 'lucide-react';
import { Swiper, SwiperSlide } from "swiper/react";
import {
  EffectCoverflow,
  Pagination,
} from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";

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

        <Swiper
  modules={[EffectCoverflow, Pagination]}
  effect="coverflow"
  centeredSlides={true}
  grabCursor={true}
  loop={true}
  pagination={{
    clickable: true,
  }}
  coverflowEffect={{
    rotate: 0,
    stretch: 0,
    depth: 180,
    modifier: 1.5,
    scale: 0.9,
    slideShadows: false,
  }}
  breakpoints={{
    0: {
      slidesPerView: 1.1,
    },
    768: {
      slidesPerView: 1.8,
    },
    1200: {
      slidesPerView: 2.3,
    },
  }}
>
  {certificates.map((cert, index) => (
    <SwiperSlide key={cert.title}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.5,
          delay: index * 0.1,
        }}
        className="group relative mx-auto w-full max-w-[420px] bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 hover:border-white/30 transition-all duration-300"
      >
        {/* Certificate Preview */}
        <div className="mb-6 h-56 rounded-xl overflow-hidden border border-white/10 bg-white/10">

          <img
            src={cert.image}
            alt={cert.title}
            className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
          />

        </div>

        <div className="space-y-3 mb-6">
          <h3 className="text-xl font-bold text-white">
            {cert.title}
          </h3>

          <div className="flex justify-between text-sm">

            <span className="text-gray-300">
              {cert.issuer}
            </span>

            <span className="text-gray-400">
              {cert.date}
            </span>

          </div>

          <p className="text-gray-300 text-sm leading-7">
            {cert.description}
          </p>

        </div>

        <div className="flex gap-3">

          <button className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-white py-3 text-black font-semibold hover:bg-gray-200 transition">

            <Eye size={18} />

            Preview

          </button>

          <button className="flex-1 flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/10 py-3 text-white font-semibold hover:bg-white/20 transition">

            <Download size={18} />

            Download

          </button>

        </div>
      </motion.div>
    </SwiperSlide>
  ))}
</Swiper>

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
