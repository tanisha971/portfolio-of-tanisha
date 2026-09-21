import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Filter } from "lucide-react";

import ProjectCard from "./ProjectCard";

import { Swiper, SwiperSlide } from "swiper/react";
import {
  EffectCoverflow,
  Pagination,
  Navigation,
} from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";

import { getProjects } from "../../services/projectService";

export default function Projects() {
  const [allProjects, setAllProjects] = useState([]);
  const [projects, setProjects] = useState([]);

  const [years, setYears] = useState([]);
  const [categories, setCategories] = useState([]);

  const [selectedYear, setSelectedYear] = useState("All");
  const [selectedCategory, setSelectedCategory] =
    useState("All");

  // --------------------------------------------------
  // LOAD PROJECTS
  // --------------------------------------------------

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const response = await getProjects();

      console.log("Projects API:", response);

      const data = response.data || [];

      // --------------------------------------------------
      // SORT PROJECTS
      // Newest → Oldest based on START DATE
      // --------------------------------------------------

      const sortedData = [...data].sort(
        (a, b) =>
          new Date(b.startDate || 0) -
          new Date(a.startDate || 0)
      );

      setAllProjects(sortedData);
      setProjects(sortedData);

      // --------------------------------------------------
      // EXTRACT UNIQUE STARTING YEARS
      // --------------------------------------------------

      const uniqueYears = [
        ...new Set(
          sortedData
            .filter((project) => project.startDate)
            .map((project) =>
              new Date(
                project.startDate
              ).getFullYear()
            )
        ),
      ].sort((a, b) => b - a);

      setYears(uniqueYears);

      // --------------------------------------------------
      // EXTRACT UNIQUE CATEGORIES
      // FROM MONGODB PROJECT DATA
      // --------------------------------------------------

      const uniqueCategories = [
        ...new Set(
          sortedData.flatMap((project) => {
            if (Array.isArray(project.category)) {
              return project.category;
            }

            if (project.category) {
              return [project.category];
            }

            return [];
          })
        ),
      ].sort((a, b) =>
        a.localeCompare(b)
      );

      setCategories(uniqueCategories);

    } catch (error) {
      console.error(
        "Failed to load projects:",
        error
      );
    }
  };

  // --------------------------------------------------
  // FILTER PROJECTS
  // --------------------------------------------------

  useEffect(() => {
    let filtered = [...allProjects];

    // --------------------------------------------------
    // YEAR FILTER
    // ONLY START YEAR IS USED
    // --------------------------------------------------

    if (selectedYear !== "All") {
      filtered = filtered.filter((project) => {
        if (!project.startDate) {
          return false;
        }

        const startYear = new Date(
          project.startDate
        ).getFullYear();

        return (
          startYear === Number(selectedYear)
        );
      });
    }

    // --------------------------------------------------
    // CATEGORY FILTER
    // --------------------------------------------------

    if (selectedCategory !== "All") {
      filtered = filtered.filter((project) => {
        if (Array.isArray(project.category)) {
          return project.category.includes(
            selectedCategory
          );
        }

        return (
          project.category === selectedCategory
        );
      });
    }

    // --------------------------------------------------
    // SORT FILTERED PROJECTS
    // NEWEST → OLDEST
    // --------------------------------------------------

    filtered.sort(
      (a, b) =>
        new Date(b.startDate || 0) -
        new Date(a.startDate || 0)
    );

    setProjects(filtered);

  }, [
    selectedYear,
    selectedCategory,
    allProjects,
  ]);

  return (
    <section
      id="projects"
      className="
        relative
        overflow-hidden
        px-6
        py-24
        lg:px-8
      "
    >

      {/* --------------------------------------------------
          BACKGROUND
      -------------------------------------------------- */}

      <div className="absolute inset-0">
        <div
          className="
            absolute
            bottom-1/4
            left-10
            h-96
            w-96
            rounded-full
            bg-white/5
            blur-3xl
          "
        />
      </div>

      <div
        className="
          relative
          z-10
          mx-auto
          max-w-7xl
        "
      >

        {/* --------------------------------------------------
            HEADING
        -------------------------------------------------- */}

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
            duration: 0.6,
          }}
          className="mb-12 text-center"
        >
          <h2
            className="
              mb-4
              text-4xl
              font-bold
              text-white
              lg:text-5xl
            "
          >
            Featured Projects
          </h2>

          <div
            className="
              mx-auto
              h-1
              w-24
              bg-white
            "
          />

          <p
            className="
              mx-auto
              mt-6
              max-w-2xl
              text-gray-400
            "
          >
            A showcase of my best work, from
            award-winning hackathon projects to
            full-stack applications
          </p>
        </motion.div>

        {/* --------------------------------------------------
            FILTERS
        -------------------------------------------------- */}

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
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
          }}
          className="
            mb-14
            flex
            flex-col
            items-center
            justify-center
            gap-4
            md:flex-row
          "
        >

          {/* Filter Icon */}
          <div
            className="
              hidden
              h-11
              w-11
              items-center
              justify-center
              rounded-xl
              border
              border-white/10
              bg-white/10
              text-white
              md:flex
            "
          >
            <Filter size={18} />
          </div>

          {/* --------------------------------------------------
              YEAR FILTER
          -------------------------------------------------- */}

          <select
            value={selectedYear}
            onChange={(e) =>
              setSelectedYear(e.target.value)
            }
            className="
              w-full
              min-w-[180px]
              cursor-pointer
              rounded-xl
              border
              border-white/10
              bg-white/10
              px-5
              py-3
              text-white
              outline-none
              backdrop-blur-xl
              transition-all
              hover:border-white/30
              md:w-auto
            "
          >
            <option
              value="All"
              className="bg-gray-900"
            >
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

          {/* --------------------------------------------------
              CATEGORY FILTER
          -------------------------------------------------- */}

          <select
            value={selectedCategory}
            onChange={(e) =>
              setSelectedCategory(
                e.target.value
              )
            }
            className="
              w-full
              min-w-[200px]
              cursor-pointer
              rounded-xl
              border
              border-white/10
              bg-white/10
              px-5
              py-3
              text-white
              outline-none
              backdrop-blur-xl
              transition-all
              hover:border-white/30
              md:w-auto
            "
          >
            <option
              value="All"
              className="bg-gray-900"
            >
              All Domains
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

        {/* --------------------------------------------------
            PROJECT SLIDER
        -------------------------------------------------- */}

        {projects.length > 0 ? (
          <Swiper
            key={`${selectedYear}-${selectedCategory}`}
            modules={[
              EffectCoverflow,
              Navigation,
              Pagination,
            ]}
            effect="coverflow"
            centeredSlides={true}
            grabCursor={true}
            loop={projects.length > 2}
            navigation
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
            {projects.map(
              (project, index) => (
                <SwiperSlide
                  key={project._id}
                >
                  <ProjectCard
                    project={project}
                    index={index}
                  />
                </SwiperSlide>
              )
            )}
          </Swiper>
        ) : (
          /* --------------------------------------------------
              NO RESULTS
          -------------------------------------------------- */

          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            className="
              py-20
              text-center
            "
          >
            <p
              className="
                text-lg
                text-gray-400
              "
            >
              No projects found for the
              selected filters.
            </p>
          </motion.div>
        )}

        {/* --------------------------------------------------
            BOTTOM INFO
        -------------------------------------------------- */}

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
            duration: 0.6,
          }}
          className="mt-12 text-center"
        >
          <p className="text-gray-400">
            Building, experimenting, and learning
            through real-world projects.
          </p>
        </motion.div>

      </div>
    </section>
  );
}