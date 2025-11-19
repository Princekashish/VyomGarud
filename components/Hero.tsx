"use client";
import React, { useMemo } from "react";
import { motion } from "framer-motion";

export default function Hero() {
  const headline = "Military grade UAV systems";

 
  const chars = useMemo(
    () => Array.from(headline).map((c) => (c === " " ? "\u00A0" : c)),
    [headline]
  );


  const charDelay = 0.03; 

  return (
    <section className="md:h-screen h-[80vh] w-full overflow-hidden bg-black ">

      <video
        className="absolute inset-0 w-auto min-w-full min-h-full h-auto object-cover hidden sm:block"
        src="/drone2.mp4"
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
      />
      <video
        className="absolute inset-0 w-auto min-w-full min-h-full h-auto object-cover block sm:hidden"
        src="/drone.mp4"
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
      />

      <div className="absolute inset-0 bg-linear-to-b from-black/60 via-black/40 to-black/90 pointer-events-none" />

  
      <div className="relative z-10 max-w-7xl mx-auto  h-[80vh] px-6  flex items-center justify-center md:justify-start">
        <div className="text-[#FFF8F0] flex justify-center items-center flex-col">
          <h1
            className="hidden md:block md:text-8xl font-bold md:w-3/4 text-center tracking-tight md:leading-[1.2]"
            aria-label={headline}
          >
            <span aria-hidden style={{ display: "inline-block" }}>
              {chars.map((ch, i) => (
                <motion.span
                  key={`c-${i}-${ch}`}
                  style={{ display: "inline-block", whiteSpace: "pre" }}
                  initial={{ y: 36, opacity: 0, rotate: 6 }}
                  animate={{ y: 0, opacity: 1, rotate: 0 }}
                  transition={{
                    delay: i * charDelay,
                    duration: 0.55,
                    type: "spring",
                    damping: 14,
                    stiffness: 140,
                    mass: 0.6,
                  }}
                >
                  {ch}
                </motion.span>
              ))}
            </span>
          </h1>

          <h1
              className="sm:hidden text-[3.5em] md:text-8xl font-bold md:w-3/4 text-center tracking-tight md:leading-[1.2]"
             
            >
              Military grade UAV systems
            </h1>
          <div className="mt-6 flex gap-2">
          
            <motion.button
              initial={{ opacity: 0, y: 25, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.94 }}
              className="sm:inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#8d4400] text-white font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-[#ff7b00]/30"
            >

              Request a demo
            </motion.button>

             <motion.button
              initial={{ opacity: 0, y: 25, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.94 }}
              className="sm:inline-flex items-center gap-2 px-4 py-2 rounded-full bg-transparent border border-white text-[#FFF8F0] font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-[#ff7b00]/30"
            >
              Our Mission
            </motion.button>
          </div>
        </div>
      </div>


    </section>
  );
}
