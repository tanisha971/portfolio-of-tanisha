import { motion } from "motion/react";

export default function Loader() {
  return (
    <div className="fixed inset-0 z-[9999] flex min-h-screen items-center justify-center bg-black">
      <div className="flex flex-col items-center">

        {/* Spinner */}
        <div className="relative h-16 w-16">
          <motion.div
            className="absolute inset-0 rounded-full border border-white/10"
          />

          <motion.div
            className="absolute inset-0 rounded-full border-2 border-transparent border-t-white"
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
          className="mt-6 text-xl font-semibold tracking-wide text-white"
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
          className="mt-2 text-sm text-gray-400"
        >
          Loading portfolio...
        </motion.p>

      </div>
    </div>
  );
}