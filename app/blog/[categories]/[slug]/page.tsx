import { BLOG_POSTS } from "@/blog";
import { Heart, Share2} from "lucide-react";

type Props = {
  params: {
    slug: string;
  };
};

const SingleBlog = async ({ params }: Props) => {
  const { slug } =await params;

  const blog = BLOG_POSTS.find((post) => post.slug === slug);

  if (!blog) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <h1 className="text-3xl font-bold">Blog post not found</h1>
      </div>
    );
  }

  return (
    <article className="max-w-3xl mx-auto px-4 py-12 ">
      <header className="mb-8">
        <h1 className="text-5xl font-bold mb-4">{blog.title}</h1>
        <p className="text-gray-500 mb-2">{blog.author} • {blog.readTime} • {blog.createdAt}</p>
        <p className="text-xl text-gray-600">{blog.excerpt}</p>
        <div className="flex gap-2 mt-4">
          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
            {blog.category}
          </span>
        </div>
      </header>

      {blog.thumbnail && (
        <img
          src={blog.thumbnail}
          alt={blog.title}
          className="w-full rounded-lg mb-8 object-cover h-96"
        />
      )}

      <div className="prose prose-lg max-w-none">
        {blog.content}
      </div>

      <div className="px-5 py-4 bg-[#262626] rounded-2xl mt-5">

        <div className="flex gap-3 justify-between">
         <div className="flex gap-1"> <Heart /> <h1>{`2`}+</h1></div>
          <Share2 />
        </div>
      </div>
    </article>
  );
};

export default SingleBlog;
