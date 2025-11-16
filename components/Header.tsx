"use client"
// components/Header.tsx
import React, { useState } from "react";
import Link from "next/link";
import { motion, Variants } from "framer-motion";

export default function Header(){
  const [open, setOpen] = useState(false);

  const containerVariants: Variants = {
    hidden: { opacity: 0, y: -8 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  const navItemVariants: Variants = {
    hidden: { opacity: 0, y: 6 },
    visible: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, delay: 0.06 * i, ease: [0.25, 0.46, 0.45, 0.94] },
    }),
  };

  const btnVariants: Variants = {
    hidden: { opacity: 0, y: 6 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] } },
    hover: { scale: 1.03 },
    tap: { scale: 0.98 },
  };

  return (
    <motion.header
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="sticky top-0 z-50 w-full "
      aria-label="Primary"
    >
      {/* Glass container */}
      <div
        className="md:py-6  backdrop-blur-lg 
                   shadow-xs px-4 md:px-6 py-4 flex items-center justify-between gap-3"
        role="navigation"
      >
        {/* Left: Brand */}
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center
                       bg-linear-to-br from-black/20 to-white/2 border border-white/5"
            aria-hidden
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="block">
              <path d="M12 2L15 9H9L12 2Z" fill="#ff7b00" />
              <path d="M4 15L12 22L20 15" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          <motion.span
            className="text-lg md:text-3xl font-semibold select-none"
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            vyomgarud
          </motion.span>
        </div>

        {/* Center / Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-sm text-white/85">
          {["About", "Capabilities", "Highlights", "Contact"].map((label, i) => (
            <motion.a
              key={label}
              href={`#${label.toLowerCase()}`}
              custom={i}
              initial="hidden"
              animate="visible"
              variants={navItemVariants}
              className="relative px-2 py-1 hover:text-white transition"
            >
              {label}
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-[#ff7b00] transition-all group-hover:w-full" />
            </motion.a>
          ))}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-3">
          <motion.a
            href="#contact"
            initial="hidden"
            animate="visible"
            variants={btnVariants}
            whileHover="hover"
            whileTap="tap"
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-full  text-white border border-gray-300 font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-[#ff7b00]/30"
            aria-label="Get in touch"
          >
            <span>Get in touch</span>
          </motion.a>

          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen((s) => !s)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            className="inline-flex md:hidden items-center justify-center rounded-full p-2 focus:outline-none"
            title="Menu"
          >
           <div className="flex flex-col gap-1">
           <motion.span
              initial={false}
              animate={open ? { rotate: -45, y: 1 } : { rotate: 0, y: 0 }}
              className="block w-5 h-0.5 bg-white"
            />
            <motion.span
              initial={false}
              animate={open ? { rotate: 45, y: 1 } : { rotate: 0, y: 0 }}
              className="block w-5 h-0.5 bg-white"
            />
           </div>
            <span className="sr-only">{open ? "Close" : "Open"} menu</span>
          </button>
        </div>

        {/* Mobile menu (animated panel) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98, height: 0 }}
          animate={open ? { opacity: 1, scale: 1, height: "auto" } : { opacity: 0, scale: 0.98, height: 0 }}
          transition={{ duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="absolute left-4 right-4 top-[72px] rounded-2xl bg-[rgba(8,10,12,0.72)] backdrop-blur-lg border border-white/6 shadow-lg md:hidden overflow-hidden"
        >
          <div className="flex flex-col gap-1 py-3 px-4">
            {["About", "Capabilities", "Highlights", "Contact"].map((label) => (
              <a
                key={label}
                href={`#${label.toLowerCase()}`}
                className="px-3 py-2 rounded-md hover:bg-white/3 text-sm"
                onClick={() => setOpen(false)}
              >
                {label}
              </a>
            ))}

            <a
              href="#contact"
              className="mt-2 inline-flex items-center justify-center px-4 py-2 rounded-full bg-[#ff7b00] text-black font-medium"
              onClick={() => setOpen(false)}
            >
              Get in touch
            </a>
          </div>
        </motion.div>
      </div>
    </motion.header>
  );
}
