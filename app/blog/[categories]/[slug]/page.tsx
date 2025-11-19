import { Heart, Share2 } from "lucide-react";

type Props = {
  params: {
    slug: string; // URL slug for the post
  };
};

const STRAPI = process.env.STRAPI_BASE_URL ?? "http://127.0.0.1:1337";
const TOKEN = process.env.STRAPI_API_TOKEN;

// Fetch a single post by slug from Strapi
async function fetchPostBySlug(slug: string) {
  const res = await fetch(`${STRAPI}/api/posts?filters[slug][$eq]=${slug}&populate=*`, {
    headers: { Authorization: `Bearer ${TOKEN}` },
    cache: "no-store",
  });
  if (!res.ok) throw new Error(await res.text());
  const json = await res.json();
  const data = json.data[0];
  if (!data) return null;

  // Map Strapi attributes to a usable format
  const post = data.attributes
    ? {
      id: data.id,
      title: data.attributes.title,
      slug: data.attributes.slug,
      excerpt: data.attributes.excerpt,
      content: data.attributes.content,
      thumbnail: data.attributes.thumbnail,
      readTime: data.attributes.readTime,
      author: data.attributes.author,

    }
    : data;

  return post;
}

const SingleBlog = async ({ params }: Props) => {
  const { slug } = await params;
  const blog = await fetchPostBySlug(slug);

  if (!blog) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <h1 className="text-3xl font-bold">Blog post not found</h1>
      </div>
    );
  }


  function renderInline(children: any[]) {
    return children.map((child, i) => {
      if (child.type === "text") {
        return child.text;
      }

      if (child.type === "link") {
        const linkText = child.children.map((c: any) => c.text).join("");
        return (
          <a
            key={i}
            href={child.url}
            target="_blank"
            className="text-blue-200 underline hover:text-blue-800"
          >
            {linkText}
          </a>
        );
      }

      return null;
    });
  }


  function renderBlock(block: any, i: number) {
    const content = renderInline(block.children);

    switch (block.type) {
      case "paragraph":
        return (
          <p key={i} className="mt-3 leading-relaxed">
            {content}
          </p>
        );

      case "heading":
        return (
          <h3 key={i} className="font-semibold text-2xl mt-8 mb-3">
            {content}
          </h3>
        );

      default:
        return null;
    }
  }






  return (
    <article className="max-w-3xl mx-auto px-4 py-12">
      <header className="mb-8">
        <h1 className="text-5xl font-bold mb-4">{blog.title}</h1>
        <p className="text-white/90 mb-2">
          {blog.author.name} <span className="text-white/50 pl-4"> {blog.readTime}</span>
        </p>
        <p className="text-xl text-gray-600">{blog.excerpt}</p>
      </header>

      {blog.thumbnail && (
        <img
          src={`${blog.thumbnail.url}`} // make sure it's absolute
          alt={blog.title}
          className="w-full rounded-lg mb-8 object-cover h-96"
        />
      )}

      <div className="prose prose-lg max-w-none">
        <div className="prose prose-lg max-w-none">
          {blog.content.map(renderBlock)}
        </div>
      </div>

      <div className="px-5 py-4 bg-[#262626] rounded-2xl mt-5">
        <div className="flex gap-3 justify-between">
          <div className="flex gap-1">
            <Heart /> <h1>{`2`}+</h1>
          </div>
          <button
            className="cursor-pointer"
          >
            <Share2 />
          </button>
        </div>
      </div>
    </article>
  );
};

export default SingleBlog;
