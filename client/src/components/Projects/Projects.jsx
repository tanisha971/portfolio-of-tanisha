import { useState, useEffect } from "react";
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
import { getProjects } from "../../services/projectService";

export default function Projects() {
  const [projects, setProjects] = useState([]);

  const loadProjects = async () => {
  try {
    const response = await getProjects();

console.log("Projects API:", response);

setProjects(response.data);
  } catch (error) {
    console.error(error);
  }
};

  useEffect(() => {
    loadProjects();
}, []);

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
