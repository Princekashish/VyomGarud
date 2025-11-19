"use client";
import React from "react";
import { motion, Variants } from "framer-motion";

const container: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.12,
      ease: [0.25, 0.46, 0.45, 0.94],
      duration: 0.6,
    },
  },
};

const headingVariant: Variants = {
  hidden: { opacity: 0, y: 18, scale: 0.995 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } },
};

const subtextVariant: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.08 } },
};

const btnVariants: Variants = {
  hidden: { opacity: 0, y: 12, scale: 0.98 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.55, delay: 0.16 } },
  hover: { scale: 1.02 },
  tap: { scale: 0.98 },
};

export default function About() {
  return (
    <motion.div
      className="h-screen flex items-center justify-center bg-black text-white px-6"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <div className="w-full max-w-5xl text-center">

        <motion.h1
          variants={headingVariant}
          className="font-[Poppins],sans-serif font-extrabold text-4xl md:text-[clamp(28px,6vw,64px)] leading-[1.02] md:text- md:leading-[1.02] tracking-tight"
          aria-label="Our systems are built for organizations that demand the highest standards"
        >
          <span className="block text-white">Our systems are built for organizations</span>
          <span className="block text-white/80 mt-2">that demand the highest standards of performance,</span>
          <span className="block text-white/80">security, and operational excellence.</span>
        </motion.h1>

        <motion.p variants={subtextVariant} className="mt-8 text-white/60 max-w-3xl mx-auto text-sm md:text-lg">
          VyomGarud delivers cutting-edge autonomous UAV systems designed for the most demanding operational environments.
        </motion.p>

   
        <motion.div variants={btnVariants} className="mt-12 flex justify-center gap-5" >
          <motion.button
            whileHover="hover"
            whileTap="tap"
            variants={btnVariants}
            className="relative inline-flex items-center justify-center px-9 py-3 rounded-full border border-white/40 text-white tracking-widest text-sm
                       transition-shadow focus:outline-none focus:ring-2 focus:ring-white/10"
            aria-label="Our vision"
          >

            Precision <span className="hidden md:block"> Engineering</span>
          </motion.button>
          <motion.button
            whileHover="hover"
            whileTap="tap"
            variants={btnVariants}
            className="relative inline-flex items-center justify-center px-9 py-3 rounded-full border border-white/40 text-white tracking-widest text-sm
                       transition-shadow focus:outline-none focus:ring-2 focus:ring-white/10"
            aria-label="Our vision"
          >
            Advanced <span className="hidden md:block">Autonomy</span>
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
}
