import CategoryClient from "@/components/CategoryClient";

type Props = {
  params: { categories: string };
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
  const { categories: categorySlug } =await params;

  const posts = await fetchPosts();

  const filtered = posts.filter(
    (post: any) => slugify(post.category?.name) === categorySlug
  );

  return <CategoryClient initialPosts={filtered} categorySlug={categorySlug} />;
}
