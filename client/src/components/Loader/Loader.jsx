
import { motion } from "motion/react";
import "../../styles/portfolio-theme.css";

export default function Loader() {
  return (
    <div className="loader-theme-screen fixed inset-0 z-[9999] flex min-h-screen items-center justify-center">
      {/* Decorative background */}
      <div
        aria-hidden="true"
        className="loader-theme-grid pointer-events-none absolute inset-0"
      />

      <div
        aria-hidden="true"
        className="loader-theme-glow pointer-events-none absolute h-64 w-64 rounded-full blur-3xl"
      />

      <div className="relative z-10 flex flex-col items-center">
        {/* Spinner */}
        <div className="relative h-16 w-16">
          <div className="loader-theme-spinner-track absolute inset-0 rounded-full border" />

          <motion.div
            className="loader-theme-spinner absolute inset-0 rounded-full border-2 border-transparent"
            animate={{ rotate: 360 }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="loader-theme-name mt-6 text-xl font-semibold tracking-wide"
        >
          Tanisha Ali.
        </motion.h1>

        {/* Loading text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="loader-theme-text mt-2 text-sm"
        >
          Loading portfolio...
        </motion.p>
      </div>
    </div>
  );
}
