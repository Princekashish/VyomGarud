"use client";

import Link from "next/link";
import { motion, Variants } from "framer-motion";

type RawThumb = string | { url?: string | null; formats?: Record<string, { url?: string }>;[k: string]: any } | null;

type Post = {
    id: number | string;
    slug?: string | null;
    title?: string | null;
    excerpt?: string | null;
    thumbnail?: RawThumb;
    category?: string | { name?: string; slug?: string } | null;
};

interface CategoriesProps {
    title: string;            
    posts: Post[];             
    searchQuery?: string;      
}

const container: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } };
const cardVariants: Variants = {
    hidden: { opacity: 0, y: 18 },
    show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] } },
};

function slugify(input = "") {
    return String(input).toLowerCase().trim().replace(/\s+/g, "-").replace(/[^\w-]/g, "").replace(/\-+/g, "-");
}

function getCategoryName(cat: Post["category"]) {
    if (!cat) return null;
    if (typeof cat === "string") return cat;
    return (cat as any).name ?? null;
}

function getCategorySlug(cat: Post["category"]) {
    if (!cat) return null;
    if (typeof cat === "string") return String(cat).toLowerCase().replace(/\s+/g, "-");
    return (cat as any).slug ?? String((cat as any).name ?? "").toLowerCase().replace(/\s+/g, "-");
}

export default function Categories({ title, posts, searchQuery }: CategoriesProps) {
    const safePosts = Array.isArray(posts) ? posts : [];
    const desiredSlug = slugify(title);

    const filteredPosts = safePosts.filter((p) => {
        const catName = getCategoryName(p.category);
        const catSlug = getCategorySlug(p.category);
        const inCategory =
            (catSlug && catSlug === desiredSlug) ||
            (catName && catName.trim().toLowerCase() === title.trim().toLowerCase());

        const matchesSearch = searchQuery
            ? (p.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                p.excerpt?.toLowerCase().includes(searchQuery.toLowerCase()))
            : true;

        return inCategory && matchesSearch;
    });

    function resolveThumbnail(th: any) {
        if (!th) return "";
        const url = typeof th === "string" ? th : th?.url ?? "";
        if (!url) return "";
        if (url.startsWith("http://") || url.startsWith("https://")) return url;
        return `${process.env.NEXT_PUBLIC_STRAPI_BASE_URL?.replace(/\/$/, "")}${url.startsWith("/") ? "" : "/"}${url}`;
    }
    

    return (
        <section className="w-full px-6 py-12">
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl md:text-3xl font-extrabold">{title}</h2>

                    <Link
                        href={`/blog/${slugify(title)}`}
                        className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 text-sm text-white/90"
                    >
                        Browse articles
                    </Link>
                </div>

                {filteredPosts.length === 0 ? (
                    <div className="py-12 text-center text-white/70">No posts found for this category.</div>
                ) : (
                    <motion.div
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                        variants={container}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 0.2 }}
                    >
                        {filteredPosts.map((c) => {
                            const href = `/blog/${encodeURIComponent(desiredSlug)}/${encodeURIComponent(String(c.slug ?? ""))}`;

                            return (
                                <Link key={String(c.id ?? c.slug)} href={href}>
                                    <motion.article
                                        variants={cardVariants}
                                        whileHover={{ translateY: -8, scale: 1.02, boxShadow: "0 20px 40px rgba(2,6,23,0.45)" }}
                                        className="relative group block rounded-2xl overflow-hidden h-72 md:h-80 bg-black"
                                    >
                                        {c.thumbnail ? (
                                            <div className="h-44 md:h-full w-full overflow-hidden">
                                                <img
                                                    src={resolveThumbnail(c.thumbnail)}
                                                    alt={String(c.title ?? "")}
                                                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500 ease-out"
                                                    loading="lazy"
                                                />
                                            </div>
                                        ) : (
                                            <div className="h-44 md:h-48 w-full bg-linear-to-r from-gray-800 to-gray-700" />
                                        )}

                                        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/30 to-transparent" />

                                        <div className="absolute left-6 bottom-6 right-6 z-10">
                                            <h3 className="text-white text-2xl md:text-3xl font-extrabold leading-tight">{c.title}</h3>
                                            <p className="mt-3 text-white/80 text-sm md:text-sm max-w-prose">{c.excerpt}</p>
                                        </div>

                                        <div className="pointer-events-none absolute inset-0 rounded-2xl border border-white/6 mix-blend-overlay opacity-5" />
                                    </motion.article>
                                </Link>
                            );
                        })}
                    </motion.div>
                )}
            </div>
        </section>
    );
}
