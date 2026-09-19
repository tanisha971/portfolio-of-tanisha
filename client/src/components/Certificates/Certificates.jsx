import { useEffect, useState } from "react";
import { getCertificates } from "../../services/certificateService";
import { motion } from "motion/react";
import { Download, Eye } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  EffectCoverflow,
  Pagination,
} from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";

export default function Certificates() {
  const [certificates, setCertificates] = useState([]);

  useEffect(() => {
    loadCertificates();
  }, []);

  const loadCertificates = async () => {
    try {
      const data = await getCertificates();
      setCertificates(data);
    } catch (error) {
      console.error("Failed to load certificates:", error);
    }
  };

  // Extract Google Drive file ID
  const getDriveFileId = (url) => {
    if (!url) return null;

    const match = url.match(/\/d\/([^/]+)/);

    return match ? match[1] : null;
  };

  // Convert Google Drive sharing URL into thumbnail URL
  const getDriveThumbnail = (url) => {
    const fileId = getDriveFileId(url);

    if (!fileId) return url;

    return `https://drive.google.com/thumbnail?id=${fileId}&sz=w1200`;
  };

  // Original Google Drive preview URL
  const getDrivePreviewUrl = (url) => {
    const fileId = getDriveFileId(url);

    if (!fileId) return url;

    return `https://drive.google.com/file/d/${fileId}/view`;
  };

  // Google Drive download URL
  const getDriveDownloadUrl = (url) => {
    const fileId = getDriveFileId(url);

    if (!fileId) return url;

    return `https://drive.google.com/uc?export=download&id=${fileId}`;
  };

  return (
    <section
      id="certificates"
      className="py-24 px-6 lg:px-8 relative overflow-hidden"
    >
      <div className="absolute inset-0">
        <div className="absolute top-1/3 right-20 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            Certifications
          </h2>

          <div className="w-24 h-1 bg-white mx-auto"></div>

          <p className="text-gray-400 mt-6 max-w-2xl mx-auto">
            Professional certifications and credentials earned through
            dedicated learning
          </p>
        </motion.div>

        {/* Certificates */}
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

            <SwiperSlide key={cert._id || cert.title}>

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

                {/* Top Right Actions */}
                <div className="absolute top-5 right-5 z-20 flex gap-2">

                  {/* Preview */}
                  <a
                    href={getDrivePreviewUrl(cert.imageUrl)}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Preview Certificate"
                    className="flex items-center justify-center w-10 h-10 rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-white hover:bg-white hover:text-black transition-all duration-300"
                  >
                    <Eye size={18} />
                  </a>

                  {/* Download */}
                  <a
                    href={getDriveDownloadUrl(cert.imageUrl)}
                    title="Download Certificate"
                    className="flex items-center justify-center w-10 h-10 rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-white hover:bg-white hover:text-black transition-all duration-300"
                  >
                    <Download size={18} />
                  </a>

                </div>

                {/* Certificate Image */}
                <div className="mb-6 h-56 rounded-xl overflow-hidden border border-white/10 bg-white/10">

                  <img
                    src={getDriveThumbnail(cert.imageUrl)}
                    alt={cert.title}
                    className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
                  />

                </div>

                {/* Certificate Details */}
                <div className="space-y-3">

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
            Continuously learning and earning new certifications to stay
            updated with the latest technologies
          </p>
        </motion.div>

      </div>
    </section>
  );
}