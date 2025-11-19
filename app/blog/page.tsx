import BlogClient from "@/components/BlogClient";

const STRAPI = process.env.STRAPI_BASE_URL ?? "http://127.0.0.1:1337";
const TOKEN = process.env.STRAPI_API_TOKEN;

async function fetchPosts() {
    const res = await fetch(`${STRAPI}/api/posts?populate=*`, {
        headers: { Authorization: `Bearer ${TOKEN}` },
        cache: "no-store",
    });

    if (!res.ok) throw new Error(await res.text());
    const json = await res.json();

 
    return (json.data || []).map((d: any) =>
        d.attributes ? { id: d.id, ...d.attributes } : d
    );
}

export default async function BlogPage() {
    const posts = await fetchPosts();

  
    const categories: string[] = Array.from(
        new Set(
            posts.map((p: any) =>
                p.category?.name ? String(p.category.name) : "Uncategorized"
            )
        )
    );

    return <BlogClient posts={posts} categories={categories} />;
}
