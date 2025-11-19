// [categories]/page.tsx
import AnimatedGrid, { SimplePost } from "@/components/AnimatedGrid";

type Props = {
  params: {
    categories: string; // this will be the slug from the URL
  };
};

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

function slugify(input = "") {
  return String(input)
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]/g, "")
    .replace(/\-+/g, "-");
}

export default async function CategoryPage({ params }: Props) {
  const { categories: categorySlug } =await params; // this is the slug from URL

  const posts = await fetchPosts();

  // Find posts whose category slug matches the URL slug
  const filtered = posts.filter(
    (post: any) => slugify(post.category?.name) === categorySlug
  );

  // Map posts for AnimatedGrid
  const clientPosts: SimplePost[] = filtered.map((p: any) => ({
    id: p.id,
    title: p.title,
    slug: p.slug,
  }));

  // Find the pretty category name for header
  const prettyName = filtered[0]?.category?.name ?? categorySlug.replace(/-/g, " ");

  return (
    <main className="w-5xl mx-auto p-6">
      <header className="mb-6">
        <h1 className="text-3xl font-bold">{prettyName}</h1>
      </header>

      {clientPosts.length === 0 ? (
        <p className="text-muted">No posts found for this category.</p>
      ) : (
        <AnimatedGrid posts={clientPosts} />
      )}
    </main>
  );
}
