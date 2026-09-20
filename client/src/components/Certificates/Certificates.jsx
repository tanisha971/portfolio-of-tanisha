import { useEffect, useState } from "react";

import { getCertificates } from "../../services/certificateService";

import { motion } from "motion/react";

import { Download, Eye, Filter } from "lucide-react";

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
  const [years, setYears] = useState([]);

  const [selectedYear, setSelectedYear] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    "Skills",
    "Workshops",
    "Donations",
    "Hackathons",
    "Internships",
  ];

  useEffect(() => {
    loadCertificates();
  }, []);

  useEffect(() => {
    loadFilteredCertificates();
  }, [selectedYear, selectedCategory]);

  const loadCertificates = async () => {
    try {
      const data = await getCertificates();

      setCertificates(data);

      // Extract unique years dynamically
      const uniqueYears = [
        ...new Set(
          data.map((certificate) =>
            new Date(certificate.date).getFullYear()
          )
        ),
      ].sort((a, b) => b - a);

      setYears(uniqueYears);
    } catch (error) {
      console.error("Failed to load certificates:", error);
    }
  };

  const loadFilteredCertificates = async () => {
    try {
      const filters = {};

      if (selectedYear !== "All") {
        filters.year = selectedYear;
      }

      if (selectedCategory !== "All") {
        filters.category = selectedCategory;
      }

      const data = await getCertificates(filters);

      setCertificates(data);
    } catch (error) {
      console.error("Failed to filter certificates:", error);
    }
  };

  // Extract Google Drive file ID
  const getDriveFileId = (url) => {
    if (!url) return null;

    // /file/d/FILE_ID/view
    const fileMatch = url.match(/\/file\/d\/([^/]+)/);

    if (fileMatch) {
      return fileMatch[1];
    }

    // ?id=FILE_ID
    const idMatch = url.match(/[?&]id=([^&]+)/);

      if (idMatch) {
        return idMatch[1];
      }

      return null;
  };

  // Google Drive thumbnail
  const getDriveThumbnail = (url) => {
    const fileId = getDriveFileId(url);

    if (!fileId) {
      console.error("Invalid Google Drive URL:", url);
      return "";
    }

    return `https://drive.google.com/thumbnail?id=${fileId}&sz=w1200`;
  };

  // Google Drive preview
  const getDrivePreviewUrl = (url) => {
    const fileId = getDriveFileId(url);

    if (!fileId) return url;

    return `https://drive.google.com/file/d/${fileId}/view`;
  };

  // Google Drive download
  const getDriveDownloadUrl = (url) => {
    const fileId = getDriveFileId(url);

    if (!fileId) return url;

    return `https://drive.google.com/uc?export=download&id=${fileId}`;
  };

  const formatDate = (date) => {
    if (!date) return "";

    return new Date(date).getFullYear();
  };

  return (
    <section
      id="certificates"
      className="py-24 px-6 lg:px-8 relative overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 right-20 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            Certifications
          </h2>

          <div className="w-24 h-1 bg-white mx-auto" />

          <p className="text-gray-400 mt-6 max-w-2xl mx-auto">
            Professional certifications and credentials earned through
            continuous learning and hands-on experience
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row items-center justify-center gap-4 mb-14"
        >

          {/* Filter Icon */}
          <div className="hidden md:flex items-center justify-center w-11 h-11 rounded-xl bg-white/10 border border-white/10 text-white">
            <Filter size={18} />
          </div>

          {/* Year Filter */}
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="w-full md:w-auto min-w-[180px] px-5 py-3 rounded-xl bg-white/10 backdrop-blur-xl border border-white/10 text-white outline-none cursor-pointer hover:border-white/30 transition-all"
          >
            <option value="All" className="bg-gray-900">
              All Years
            </option>

            {years.map((year) => (
              <option
                key={year}
                value={year}
                className="bg-gray-900"
              >
                {year}
              </option>
            ))}
          </select>

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full md:w-auto min-w-[200px] px-5 py-3 rounded-xl bg-white/10 backdrop-blur-xl border border-white/10 text-white outline-none cursor-pointer hover:border-white/30 transition-all"
          >
            <option value="All" className="bg-gray-900">
              All Categories
            </option>

            {categories.map((category) => (
              <option
                key={category}
                value={category}
                className="bg-gray-900"
              >
                {category}
              </option>
            ))}
          </select>

        </motion.div>

        {/* Certificate Slider */}
        {certificates.length > 0 ? (
          <Swiper
            key={`${selectedYear}-${selectedCategory}`}
            modules={[EffectCoverflow, Pagination]}
            effect="coverflow"
            centeredSlides={true}
            grabCursor={true}
            loop={certificates.length > 2}
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
                  initial={{
                    opacity: 0,
                    y: 30,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                  }}
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
                      className="flex items-center justify-center w-10 h-10 rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-white hover:bg-white hover:text-black hover:scale-105 transition-all duration-300"
                    >
                      <Eye size={18} />
                    </a>

                    {/* Download */}
                    <a
                      href={getDriveDownloadUrl(cert.imageUrl)}
                      title="Download Certificate"
                      className="flex items-center justify-center w-10 h-10 rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-white hover:bg-white hover:text-black hover:scale-105 transition-all duration-300"
                    >
                      <Download size={18} />
                    </a>

                  </div>

                  {/* Category */}
                  <div className="absolute top-5 left-5 z-20">
                    <span className="px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-xs text-white">
                      {cert.category}
                    </span>
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

                    <div className="flex justify-between items-center gap-4 text-sm">

                      <span className="text-gray-300">
                        {cert.issuer}
                      </span>

                      <span className="text-gray-400 whitespace-nowrap">
                        {formatDate(cert.date)}
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
        ) : (
          /* No Results */
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-gray-400 text-lg">
              No certificates found for the selected filters.
            </p>
          </motion.div>
        )}

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