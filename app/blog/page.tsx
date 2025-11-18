import { BLOG_POSTS } from '@/blog'
import BlogHero from '@/components/BlogHero'
import Categories from '@/components/Categories'
export default function Blog() {
    const categories = [...new Set(BLOG_POSTS.map(a => a.category))]
    return (
        <div>
            <BlogHero />
            {categories.map((cat) => (
                <Categories key={cat} tilte={cat} />
            ))}
        </div>
    )
}
