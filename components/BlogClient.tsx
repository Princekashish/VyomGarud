"use client";

import { useState, useEffect } from "react";
import BlogHero from "@/components/BlogHero";
import Categories from "@/components/Categories";

interface Post {
  id: number | string;
  slug?: string;
  title?: string;
  excerpt?: string;
  thumbnail?: any;
  createdAt?: string;
  authorName?: string;
  category?: { name?: string; slug?: string } | string | null;
}

interface BlogClientProps {
  posts: Post[];
  categories: string[];
}

export default function BlogClient({ posts, categories }: BlogClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCategories, setFilteredCategories] = useState<string[]>(categories);

  // filter categories whenever searchQuery changes
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredCategories(categories);
    } else {
      const lowerQuery = searchQuery.toLowerCase();
      const filtered = categories.filter((cat) =>
        cat.toLowerCase().includes(lowerQuery)
      );
      setFilteredCategories(filtered);
    }
  }, [searchQuery, categories]);

  return (
    <main>
      <BlogHero onSearch={(q) => setSearchQuery(q)} />

      <section className="max-w-7xl mx-auto p-6">
        {filteredCategories.length === 0 ? (
          <div className="text-white/70 text-center py-12">
            No categories match your search.
          </div>
        ) : (
          filteredCategories.map((cat, i) => (
            <Categories key={i} title={cat} posts={posts} searchQuery={searchQuery} />
          ))
        )}
      </section>
    </main>
  );
}
