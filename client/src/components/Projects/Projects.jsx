import { useState } from "react";
import { motion } from 'motion/react';
import { ExternalLink } from 'lucide-react';
import GitHubIcon from '@mui/icons-material/GitHub';
import ProjectCard from "./ProjectCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import udayaam1 from "../../assets/images/udayaam1.jpeg";
import udayaam2 from "../../assets/images/udayaam2.jpeg";
import udayaam3 from "../../assets/images/udayaam3.jpeg";
import udayaam4 from "../../assets/images/udayaam4.jpeg";

export default function Projects() {
  
  const projects = [
    {
      title: 'Udayaam',
      images: [
        udayaam1
      ],
      description:
        'Smart India Hackathon 2024 National Winner project. A comprehensive platform designed to empower rural entrepreneurship through digital solutions and resource accessibility.',
      tech: ['React', 'Node.js', 'MongoDB', 'Express', 'Tailwind CSS'],
      github: "#",
      category: 'SIH Winner',
      featured: true,
    },
    {
      title: 'Pinio AI Musical Learning',
      images: [
        udayaam1
      ],
      description:
        'An innovative AI-powered platform for musical education, providing personalized learning experiences and interactive lessons for aspiring musicians.',
      tech: ['React', 'AI/ML', 'Node.js', 'MongoDB'],
      github: "#",
      live: "#",
      category: 'AI/ML',
      featured: true,
    },
    {
      title: 'Civix Civic-Tech Platform',
      images: [
        udayaam1
      ],
      description:
        'A civic engagement platform connecting citizens with local government services, enabling transparency and efficient public service delivery.',
      tech: ['MERN Stack', 'REST API', 'Material UI'],
      github: "#",
      live: "#",
      category: 'Full Stack',
      featured: true,
    },
    {
      title: 'Real Estate MERN Platform',
      images: [
        udayaam1
      ],
      description:
        'Complete real estate management system with property listings, search functionality, user authentication, and advanced filtering options.',
      tech: ['MongoDB', 'Express', 'React', 'Node.js', 'JWT'],
      github: "#",
      live: "#",
      category: 'Full Stack',
      featured: false,
    },
    {
      title: 'PoolCarz Carpooling App',
      images: [
        udayaam1
      ],
      description:
        'Sustainable transportation solution enabling users to share rides, reduce carbon footprint, and save costs through an intuitive mobile-first platform.',
      tech: ['React', 'Node.js', 'MongoDB', 'Google Maps API'],
      github: "#",
      live: "#",
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

        <Swiper
            modules={[EffectCoverflow,Navigation, Pagination]}
            effect="coverflow"
            centeredSlides={true}
            grabCursor={true}
            loop={true}
            navigation
            pagination={{ clickable: true }}
            coverflowEffect={{
                rotate: 0,
                stretch: 0,
                depth: 180,
                modifier: 1.5,
                slideShadows: false,
                scale: 0.88,
            }}
            
            breakpoints={{
                0: {
                    slidesPerView: 1.1,
                },
                768: {
                    slidesPerView: 1.8,
                },
                1200: {
                    slidesPerView: 2.4,
                },
            }}
        >

            {projects.map((project, index) => (

                <SwiperSlide key={project.title}>

                    <ProjectCard
                        project={project}
                        index={index}
                    />

                </SwiperSlide>

            ))}

        </Swiper>
      </div>
      
    </section>
  );
}
