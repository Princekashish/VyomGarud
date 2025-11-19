"use client";

import { useEffect, useState } from "react";
import AnimatedGrid, { SimplePost } from "./AnimatedGrid";

type Props = {
    initialPosts: any[];
    categorySlug: string;
};

function slugify(input = "") {
    return String(input)
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-")
        .replace(/[^\w-]/g, "")
        .replace(/\-+/g, "-");
}

export default function CategoryClient({ initialPosts, categorySlug }: Props) {
    const [posts, setPosts] = useState<SimplePost[]>([]);

    useEffect(() => {
        // Map initial posts for AnimatedGrid
        const clientPosts: SimplePost[] = initialPosts.map((p: any) => ({
            id: p.id,
            title: p.title ?? "Untitled",
            slug: p.slug ?? "",
            thumbnail: p.thumbnail?.url ?? "",
            category: p.category?.name ?? "",
            excerpt: p.excerpt ?? "",
            readTime: p.readTime ?? "1 min",
            author: p.author.name ?? "Unknown",
        }));

        setPosts(clientPosts);
    }, [initialPosts]);

    const prettyName = posts[0]?.category ?? categorySlug.replace(/-/g, " ");

    return (
        <main className="w-5xl mx-auto p-6">
            <header className="mb-6">
                <h1 className="text-3xl font-bold">{prettyName}</h1>
            </header>

            {posts.length === 0 ? (
                <p className="text-muted">No posts found for this category.</p>
            ) : (
                <AnimatedGrid posts={posts} />
            )}
        </main>
    );
}
