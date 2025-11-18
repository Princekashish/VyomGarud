
import React from "react";
import AnimatedGrid, { SimplePost } from "@/components/AnimatedGrid";
import { BLOG_POSTS } from "@/blog";

type Props = { params?: { categories?: string } | Promise<{ categories?: string }> };

function slugify(input = "") {
  return String(input).trim().toLowerCase().replace(/\s+/g, "-").replace(/[^\w\-]+/g, "").replace(/\-\-+/g, "-");
}

export default async function CategoryPage({ params }: Props) {
  let resolvedParams: { categories?: string } | undefined;
  if (params && typeof (params as any).then === "function") {
    try {
      resolvedParams = await params;
    } catch {
      resolvedParams = undefined;
    }
  } else {
    resolvedParams = params as { categories?: string } | undefined;
  }

  const rawSlug = resolvedParams?.categories ?? "";
  if (!rawSlug) {
    return (
      <main className="max-w-7xl mx-auto p-6">
        <h1 className="text-2xl font-bold">Category not specified</h1>
      </main>
    );
  }

  const decoded = (() => {
    try {
      return decodeURIComponent(rawSlug);
    } catch {
      return rawSlug;
    }
  })();

  const normalizedSlug = slugify(decoded);
  const filtered = BLOG_POSTS.filter((p) => slugify(p.category) === normalizedSlug);
  const pretty = filtered.length > 0 ? filtered[0].category : decoded.replace(/-/g, " ");

  // include category slug so client can build full URLs
  const clientPosts: SimplePost[] = filtered.map((p) => ({
    id: p.id,
    title: p.title,
    slug: p.slug,
    excerpt: p.excerpt,
    readTime: p.readTime,
    author: p.author,
    thumbnail: p.thumbnail,
    category: normalizedSlug, 
  }));

  return (
    <main className="w-5xl mx-auto p-6 ">
      <header className="mb-6">
        <h1 className="text-3xl font-bold">{pretty}</h1>
      </header>

      <AnimatedGrid posts={clientPosts} />
    </main>
  );
}
