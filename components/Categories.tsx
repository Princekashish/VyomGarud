// components/Categories.tsx
"use client";
import React from "react";
import { motion, Variants } from "framer-motion";
import { BLOG_POSTS } from '@/blog'
import Link from "next/link";

interface categrie {
    tilte: string,
}


const container: Variants = {
    hidden: {},
    show: {
        transition: { staggerChildren: 0.08 },
    },
};

const cardVariants: Variants = {
    hidden: { opacity: 0, y: 18, scale: 0.995 },
    show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } },
};

export default function Categories({ tilte }: categrie) {

    const filteredCategories = BLOG_POSTS.filter((e) => e.category === tilte)
    return (
        <section className="w-full px-6 py-12">
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl md:text-3xl font-extrabold">{tilte}</h2>
                    <Link
                        href={`/blog/${tilte.toLowerCase().replace(/\s+/g, '-')}`}
                        className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 text-sm text-white/90"
                    >
                        Browse articles
                    </Link>
                </div>

                <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    {filteredCategories.map((c, i) => (
                        <Link key={i} href={`/blog/${tilte.toLowerCase().replace(/\s+/g, '-')}/${c.slug}`}>
                            <motion.div
                                variants={cardVariants}
                                whileHover={{ translateY: -8, boxShadow: "0 20px 40px rgba(2,6,23,0.5)" }}
                                className="relative group block rounded-2xl overflow-hidden h-72 md:h-80 bg-black"
                                aria-label={`${c.title} category`}
                            >
                                {/* Image */}
                                <img
                                    src={c.thumbnail}
                                    alt={c.title}
                                    className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500 ease-out"
                                    loading="lazy"
                                />

                                {/* faint overlay to darken image for legibility */}
                                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/30 to-transparent" />

                                {/* top-right circle arrow */}


                                {/* content block */}
                                <div className="absolute left-6 bottom-6 right-6 z-10">
                                    <h3 className="text-white text-2xl md:text-3xl font-extrabold leading-tight">{c.title.length > 20 ? c.title.slice(0, 20) + "..." : c.title}</h3>
                                    <p className="mt-3 text-white/80 text-sm md:text-sm max-w-prose">{c.excerpt}</p>

                                    <div className="mt-5 flex justify-between">

                                        <div className="flex justify-center items-center text-white/60">
                                            <h1 className="text-sm"> {c.createdAt}</h1>
                                        </div>

                                        <div className="">
                                            <div
                                                className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-white/90 backdrop-blur-sm
                              transition-transform group-hover:scale-105"
                                                aria-hidden
                                            >
                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-white">
                                                    <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* subtle inner border */}
                                <div className="pointer-events-none absolute inset-0 rounded-2xl border border-white/6 mix-blend-overlay opacity-5" />
                            </motion.div>
                        </Link>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
