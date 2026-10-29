
import { useEffect, useState, useRef } from "react";
import { getCertificates } from "../../services/certificateService";
import { motion } from "motion/react";
import {
  Download,
  Eye,
  Filter,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import "../../styles/animations.css";
import "../../styles/portfolio-theme.css";

export default function Certificates() {
  const [allCertificates, setAllCertificates] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [years, setYears] = useState([]);

  const [selectedYear, setSelectedYear] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const swiperRef = useRef(null);

  const categories = [
    "Skills",
    "Workshops",
    "Donations",
    "Hackathons",
    "Internships",
    "Volunteering",
  ];

  // LOAD CERTIFICATES
  useEffect(() => {
    const loadCertificates = async () => {
      try {
        const data = await getCertificates();
        const list = Array.isArray(data) ? data : [];

        const sortedData = [...list].sort(
          (a, b) =>
            new Date(b.date || 0) - new Date(a.date || 0)
        );

        setAllCertificates(sortedData);
        setCertificates(sortedData);

        const uniqueYears = [
          ...new Set(
            sortedData
              .filter((certificate) => certificate.date)
              .map((certificate) =>
                new Date(certificate.date).getFullYear()
              )
          ),
        ].sort((a, b) => b - a);

        setYears(uniqueYears);
      } catch (error) {
        console.error("Failed to load certificates:", error);
      }
    };

    loadCertificates();
  }, []);

  // FILTER CERTIFICATES
  useEffect(() => {
    let filtered = [...allCertificates];

    if (selectedYear !== "All") {
      filtered = filtered.filter((certificate) => {
        if (!certificate.date) return false;

        return (
          new Date(certificate.date).getFullYear() ===
          Number(selectedYear)
        );
      });
    }

    if (selectedCategory !== "All") {
      filtered = filtered.filter(
        (certificate) => certificate.category === selectedCategory
      );
    }

    filtered.sort(
      (a, b) =>
        new Date(b.date || 0) - new Date(a.date || 0)
    );

    setCertificates(filtered);
  }, [selectedYear, selectedCategory, allCertificates]);

  // GOOGLE DRIVE HELPERS
  const getDriveFileId = (url) => {
    if (!url || typeof url !== "string") return null;

    // Supports /file/d/FILE_ID/view
    const fileMatch = url.match(/\/file\/d\/([^/]+)/);

    if (fileMatch) return fileMatch[1];

    // Supports ?id=FILE_ID
    const idMatch = url.match(/[?&]id=([^&]+)/);

    if (idMatch) return idMatch[1];

    return null;
  };

  const getDriveThumbnail = (url) => {
    const fileId = getDriveFileId(url);

    if (!fileId) return url || "";

    return `https://drive.google.com/thumbnail?id=${encodeURIComponent(
      fileId
    )}&sz=w1200`;
  };

  const getDrivePreviewUrl = (url) => {
    const fileId = getDriveFileId(url);

    if (!fileId) return url || "";

    return `https://drive.google.com/file/d/${encodeURIComponent(
      fileId
    )}/view`;
  };

  const getDriveDownloadUrl = (url) => {
    const fileId = getDriveFileId(url);

    if (!fileId) return url || "";

    return `https://drive.google.com/uc?export=download&id=${encodeURIComponent(
      fileId
    )}`;
  };

  const formatDate = (date) => {
    if (!date) return "";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) return "";

    return parsedDate.getFullYear();
  };

  return (
    <section
      id="certificates"
      className="certificates-theme-section relative overflow-hidden px-6 py-24 lg:px-8"
    >
      {/* BACKGROUND DECORATION */}
      <div className="pointer-events-none absolute inset-0">
        <div className="certificates-theme-orb absolute right-20 top-1/3 h-96 w-96 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* HEADING */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="certificates-theme-title heading-reflection mb-4 text-4xl font-bold lg:text-5xl">
            CERTIFICATIONS
          </h2>
        </motion.div>

        {/* FILTERS */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-14 flex flex-col items-center justify-center gap-4 md:flex-row"
        >
          <div className="certificates-filter-icon hidden h-11 w-11 items-center justify-center rounded-xl border md:flex">
            <Filter size={18} />
          </div>

          {/* YEAR FILTER */}
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            aria-label="Filter certificates by year"
            className="certificates-filter-select w-full min-w-[180px] cursor-pointer rounded-xl border px-5 py-3 outline-none backdrop-blur-xl transition-colors md:w-auto"
          >
            <option value="All">All Years</option>

            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>

          {/* CATEGORY FILTER */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            aria-label="Filter certificates by category"
            className="certificates-filter-select w-full min-w-[200px] cursor-pointer rounded-xl border px-5 py-3 outline-none backdrop-blur-xl transition-colors md:w-auto"
          >
            <option value="All">All Categories</option>

            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </motion.div>

        {/* CERTIFICATE SLIDER */}
        {certificates.length > 0 ? (
          <div className="certificates-slider relative">
            {/* LEFT ARROW */}
            <button
              type="button"
              onClick={() => swiperRef.current?.slidePrev()}
              aria-label="Previous certificate"
              className="certificates-slider-arrow absolute left-0 top-1/2 z-30 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full md:-left-5 lg:-left-8"
            >
              <ChevronLeft size={32} strokeWidth={2} />
            </button>

            <Swiper
              key={`${selectedYear}-${selectedCategory}`}
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
              }}
              modules={[EffectCoverflow, Pagination]}
              effect="coverflow"
              centeredSlides
              grabCursor
              loop={certificates.length > 2}
              pagination={{ clickable: true }}
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
                    className="certificate-theme-card group relative mx-auto flex h-full w-full max-w-[420px] flex-col overflow-hidden rounded-2xl border p-6 backdrop-blur-xl sm:p-8"
                  >
                    {/* HOVER GLOW */}
                    <div className="certificate-card-glow pointer-events-none absolute inset-0 rounded-2xl" />

                    {/* TOP ROW: CATEGORY + ACTIONS */}
                    <div className="relative z-10 mb-5 flex min-h-10 items-start justify-between gap-3">
                      <div className="min-w-0">
                        <span className="certificate-category-badge inline-flex rounded-full border px-3 py-1.5 text-xs">
                          {cert.category || "Certificate"}
                        </span>
                      </div>

                      <div className="flex shrink-0 gap-2">
                        {/* PREVIEW */}
                        {cert.imageUrl && (
                          <a
                            href={getDrivePreviewUrl(cert.imageUrl)}
                            target="_blank"
                            rel="noopener noreferrer"
                            title="Preview Certificate"
                            aria-label={`Preview ${cert.title}`}
                            className="certificate-icon-button flex h-10 w-10 items-center justify-center rounded-full"
                          >
                            <Eye size={18} />
                          </a>
                        )}

                        {/* DOWNLOAD */}
                        {cert.imageUrl && (
                          <a
                            href={getDriveDownloadUrl(cert.imageUrl)}
                            target="_blank"
                            rel="noopener noreferrer"
                            title="Download Certificate"
                            aria-label={`Download ${cert.title}`}
                            className="certificate-icon-button flex h-10 w-10 items-center justify-center rounded-full"
                          >
                            <Download size={18} />
                          </a>
                        )}
                      </div>
                    </div>

                    {/* CERTIFICATE IMAGE */}
                    <div className="certificate-image-frame relative z-10 mb-6 h-48 shrink-0 overflow-hidden rounded-xl sm:h-52">
                      {cert.imageUrl ? (
                        <img
                          src={getDriveThumbnail(cert.imageUrl)}
                          alt={cert.title || "Certificate preview"}
                          loading="lazy"
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                        />
                      ) : (
                        <div className="certificate-image-placeholder flex h-full items-center justify-center">
                          <span className="certificates-theme-muted text-sm">
                            No preview available
                          </span>
                        </div>
                      )}
                    </div>

                    {/* CERTIFICATE DETAILS */}
                    <div className="relative z-10 flex flex-1 flex-col gap-3">
                      <h3 className="certificates-theme-title text-xl font-bold">
                        {cert.title}
                      </h3>

                      <div className="flex items-center justify-between gap-4 text-sm">
                        <span className="certificates-theme-description min-w-0">
                          {cert.issuer}
                        </span>

                        <span className="certificates-theme-muted shrink-0 whitespace-nowrap">
                          {formatDate(cert.date)}
                        </span>
                      </div>

                      {cert.description && (
                        <p className="certificates-theme-description text-sm leading-7">
                          {cert.description}
                        </p>
                      )}
                    </div>
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* RIGHT ARROW */}
            <button
              type="button"
              onClick={() => swiperRef.current?.slideNext()}
              aria-label="Next certificate"
              className="certificates-slider-arrow absolute right-0 top-1/2 z-30 flex h-12 w-12 translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full md:-right-5 lg:-right-8"
            >
              <ChevronRight size={32} strokeWidth={2} />
            </button>
          </div>
        ) : (
          /* NO RESULTS */
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-20 text-center"
          >
            <p className="certificates-theme-muted text-lg">
              No certificates found for the selected filters.
            </p>
          </motion.div>
        )}

        {/* FOOTER TEXT */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-12 text-center"
        >
          <p className="certificates-theme-muted">
            Continuously learning and earning new certifications to stay
            updated with the latest technologies.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
