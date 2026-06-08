import FeaturedSlider from "@/components/FeaturedSlider";
import PostsGrid from "@/components/PostsGrid";
import { posts, categories } from "@/lib/posts";

export default function Home() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10">

      {/* Featured slider */}
      <section className="mb-10 animate-fadeIn">
        <p className="text-xs font-semibold uppercase tracking-widest text-orange-400 mb-3">Featured</p>
        <FeaturedSlider posts={posts.slice(0, 3)} />
      </section>

      {/* Posts with filter */}
      <div className="animate-slideUp delay-200">
        <p className="text-xs font-semibold uppercase tracking-widest text-orange-400 mb-4">All Posts</p>
        <PostsGrid posts={posts} categories={categories} />
      </div>

    </div>
  );
}
