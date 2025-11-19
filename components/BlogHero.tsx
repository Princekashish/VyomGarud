// components/BlogHero.tsx
"use client";

import React, { useState } from "react";
import { motion, Variants } from "framer-motion";

type Props = {
  onSearch?: (q: string) => void;
};

const containerVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { staggerChildren: 0.06, ease: [0.25, 0.46, 0.45, 0.94] } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function BlogHero({ onSearch }: Props) {
  const [query, setQuery] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e?: React.FormEvent) {
    if (e) e.preventDefault();
    if (!query.trim()) return;

    setSubmitting(true);
    try {
      if (onSearch) await Promise.resolve(onSearch(query.trim()));
      else console.log("Search:", query.trim());
      await new Promise((r) => setTimeout(r, 400));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <motion.section
      className="w-full bg-black text-white py-28 px-6"
      initial="hidden"
      animate="show"
      variants={containerVariants}
    >
      <div className="max-w-5xl mx-auto text-center">
        <motion.h1 variants={item} className="font-extrabold text-[clamp(40px,7vw,96px)] leading-[0.95] tracking-tight">
          Blog
        </motion.h1>

        <motion.p variants={item} className="mt-6 text-[clamp(16px,2.2vw,20px)] text-white/80 max-w-3xl mx-auto">
          Want something to read with your coffee? Here you'll find technical writeups, product updates,
          engineering notes, and operational stories — all focused on UAV systems, autonomy and reliability.
        </motion.p>

        <motion.form
          onSubmit={handleSubmit}
          variants={item}
          className="mt-10 flex items-center justify-center"
          role="search"
          aria-label="Search blog posts"
        >
          <label htmlFor="blog-search" className="sr-only">Search posts</label>
          <div className="w-full max-w-3xl">
            <div className="relative">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-white/60">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="11" cy="11" r="6" stroke="currentColor" strokeWidth="1.6" />
                </svg>
              </div>

              <input
                id="blog-search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") handleSubmit(); }}
                placeholder="Enter what you are looking for"
                aria-label="Search blog posts"
                className="w-full rounded-xl bg-transparent border border-white/20 px-14 py-4 placeholder:text-white/50 text-white focus:outline-none focus:ring-2 focus:ring-[#ff7b00]/20 transition"
              />

              <button
                type="button"
                onClick={() => handleSubmit()}
                disabled={submitting}
                className="absolute right-3 top-1/2 -translate-y-1/2 inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#111111] border border-white/10 text-white shadow-sm hover:scale-105 transition-transform disabled:opacity-60"
                aria-label="Search"
              >
                {submitting ? "Searching…" : "Search"}
              </button>
            </div>
          </div>
        </motion.form>

        <motion.div variants={item} className="mt-6 text-sm text-white/50">
          Try: <span className="text-white/80">autonomy, flight-tests, sensor-fusion, case-studies</span>
        </motion.div>
      </div>
    </motion.section>
  );
}
