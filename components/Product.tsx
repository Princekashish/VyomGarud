"use client";
import React from "react";
import { motion, Variants } from "framer-motion";

type Feature = {
  title: string;
  subtitle?: string;
  desc: string;
  cta: string;
  filled?: boolean; // filled (orange) button on right card
};

const FEATURES: Feature[] = [
  {
    title: "Autonomous Operations",
    subtitle: "network",
    desc:
      "Full autonomous flight with adaptive mission planning and real-time decision making.",
    cta: "Learn more",
  },
  {
    title: "Precision Targeting",
    subtitle: "VyomGarud for field ops",
    desc:
      "Advanced sensor fusion and stabilization for pinpoint accuracy in any condition. ",
    cta: "See sensors",
    filled: true,
  },
  {
    title: "Autonomous Operations",
    subtitle: "network",
    desc:
      "Full autonomous flight with adaptive mission planning and real-time decision making.",
    cta: "Learn more",
  },
  {
    title: "Precision Targeting",
    subtitle: "VyomGarud for field ops",
    desc:
      "Advanced sensor fusion and stabilization for pinpoint accuracy in any condition. ",
    cta: "See sensors",
    filled: true,
  },


];

// Variants (typed)
const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 18, scale: 0.995 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export default function ProductPromo() {
  return (
    <section className="w-full bg-[#0a0a0b] py-16 px-6">
      <div className="flex justify-center items-center flex-col gap-3 md:mb-10 ">
        <p className="text-xl text-[#CCCCCC]">It’s connectivity made easy</p>
        <h1 className="text-3xl text-[#FFF8F0] text-center">Comprehensive systems engineered for operational excellence</h1>
      </div>
      <div className="max-w-7xl mx-auto mt-10 sm:mt-0">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 lg:grid-cols-4 gap-8"
        >
          {FEATURES.map((f, i) => (
            <motion.article
              key={f.title + i}
              variants={cardVariants}
              whileHover={{ translateY: -8 }}
              className={
                "relative overflow-hidden rounded-2xl border border-white/6 p-10 min-h-[420px] flex flex-col " +
                (f.filled ? "bg-gradient-to-b from-[#1b160f] to-[#191611]" : "bg-gradient-to-b from-[#0f1112] to-[#0b0d0e]")
              }
              aria-labelledby={`card-${i}-title`}
            >
              {/* decorative faint arcs via SVG in the card background */}
              <svg
                aria-hidden
                className="absolute -left-24 -bottom-24 opacity-6 w-[900px] h-[900px] pointer-events-none"
                viewBox="0 0 600 600"
                fill="none"
                preserveAspectRatio="xMidYMid meet"
              >
                <circle cx="300" cy="300" r="300" stroke="rgba(255,255,255,0.02)" strokeWidth="2" />
                <circle cx="500" cy="100" r="220" stroke="rgba(255,255,255,0.01)" strokeWidth="2" />
              </svg>

              <div className="relative z-10 flex-1 flex flex-col">
                <div>
                  <h3 id={`card-${i}-title`} className="text-4xl leading-tight font-extrabold text-white">
                    <span className="block">{f.title}</span>
                    {f.subtitle && <span className="block mt-1 text-3xl capitalize font-medium">{f.subtitle}</span>}
                  </h3>
                  <p className="mt-6 text-white/70 max-w-xl text-lg">{f.desc}</p>
                </div>

                <div className="mt-auto">
                  {/* CTA - left is outline, right is filled orange */}
                  {f.filled ? (
                    <button
                      onClick={() => alert(`${f.title} — ${f.cta}`)}
                      className="mt-10 inline-flex items-center gap-3 px-6 py-3 rounded-full bg-[#8d4400] text-white font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-[#ff7b00]/30"
                    >
                      {f.cta}
                    </button>
                  ) : (
                    <button
                      onClick={() => alert(`${f.title} — ${f.cta}`)}
                      className="mt-10 inline-flex items-center gap-3 px-6 py-3 rounded-full border-2 border-white/30 text-white font-medium backdrop-blur-sm hover:bg-white/3 focus:outline-none"
                    >
                      {f.cta}
                    </button>
                  )}
                </div>
              </div>

              {/* subtle inner border highlight */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-2xl border border-white/3 mix-blend-overlay opacity-5"
                style={{ transform: "translateZ(0)" }}
              />
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
