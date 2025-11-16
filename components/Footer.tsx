"use client";
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function Footer() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <footer
      ref={ref}
      className="w-full bg-[#0c0c0d] text-white border-t border-white/10"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="max-w-7xl mx-auto px-6 py-14"
      >
        {/* Top Section */}
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-10">

          {/* Brand */}
          <div>
            <h2 className="text-2xl font-bold tracking-tight">VyomGarud</h2>
            <p className="text-white/60 mt-2 max-w-sm">
              Advanced UAV systems engineered for the most demanding missions.
            </p>
          </div>

          {/* Links */}
          <div className="flex gap-14 text-center md:text-left">
            <div className="flex flex-col gap-3">
              <h4 className="font-semibold text-white/90">Company</h4>
              {["About", "Mission", "Careers"].map((item) => (
                <motion.a
                  key={item}
                  whileHover={{ x: 4, opacity: 1 }}
                  className="text-white/60 hover:text-white cursor-pointer transition"
                >
                  {item}
                </motion.a>
              ))}
            </div>

            <div className="flex flex-col gap-3">
              <h4 className="font-semibold text-white/90">Products</h4>
              {["UAV Systems", "Autonomy", "Sensors"].map((item) => (
                <motion.a
                  key={item}
                  whileHover={{ x: 4 }}
                  className="text-white/60 hover:text-white cursor-pointer transition"
                >
                  {item}
                </motion.a>
              ))}
            </div>

            <div className="flex flex-col gap-3">
              <h4 className="font-semibold text-white/90">Support</h4>
              {["Docs", "Contact", "Help Center"].map((item) => (
                <motion.a
                  key={item}
                  whileHover={{ x: 4 }}
                  className="text-white/60 hover:text-white cursor-pointer transition"
                >
                  {item}
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 mt-10 pt-6 text-center text-white/50 text-sm">
          © {new Date().getFullYear()} VyomGarud — All rights reserved.
        </div>
      </motion.div>
    </footer>
  );
}
