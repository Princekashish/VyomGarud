"use client";

import Link from "next/link";
import { motion, Variants } from "framer-motion";

export interface SimplePost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  readTime: string;
  author: string;
  thumbnail: string;
  category: string;
}


const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

const card: Variants = {
  hidden: { opacity: 0, y: 22, scale: 0.995 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] } },
};


function slugify(input = "") {
  return String(input || "")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]/g, "")
    .replace(/\-+/g, "-");
}



const DEV_FALLBACK = "/placeholder-post.png";

export default function AnimatedGrid({ posts }: { posts: SimplePost[] }) {
  const safePosts = Array.isArray(posts) ? posts : [];

  return (
    <motion.div
      className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
    >
      {safePosts.map((p) => {
        const categorySlug = slugify(p.category ?? "");
        const href = `/blog/${categorySlug}/${encodeURIComponent(String(p.slug ?? ""))}`;

        return (
          <motion.article
            key={String(p.id ?? p.slug)}
            variants={card}
            whileHover={{ y: -8, scale: 1.02, boxShadow: "0 20px 50px rgba(2,6,23,0.55)" }}
            className="relative rounded-2xl overflow-hidden bg-linear-to-b from-[#0b0d0e] to-[#070809] border border-white/6 flex flex-col"
          >
            <div className="h-44 md:h-48 w-full overflow-hidden shrink-0">
              <img
                src={p.thumbnail}
                alt={p.title ?? "thumbnail"}
                className="w-full h-full object-cover transform transition-transform duration-500 ease-out"
                loading="lazy"
                onError={(e) => {
                  const el = e.currentTarget as HTMLImageElement;
                  if (!el.dataset.fallback) {
                    el.dataset.fallback = "1";
                    el.src = DEV_FALLBACK;
                  }
                }}
              />
            </div>

     
            <div className="p-5 flex flex-col gap-3 flex-1">
              <h3 className="text-lg md:text-xl font-semibold text-white leading-tight">{p.title}</h3>

              {p.excerpt && <p className="text-sm text-white/70 line-clamp-3">{p.excerpt}</p>}

              <div className="mt-auto flex items-center justify-between gap-3">
                <div className="text-xs text-white/60">
                  {p.author && <span>{p.author}</span>}
                  {p.readTime && <span className="ml-3">• {p.readTime}</span>}
                </div>

                <Link
                  href={href}
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/30 text-white text-sm font-semibold"
                >
                  Read
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="inline-block">
                    <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              </div>
            </div>
          </motion.article>
        );
      })}
    </motion.div>
  );
}
