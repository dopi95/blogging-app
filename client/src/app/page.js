import FeaturedSlider from "@/components/FeaturedSlider";
import PostsGrid from "@/components/PostsGrid";

async function getPosts() {
  try {
    const res = await fetch("http://localhost:5000/api/posts", { cache: "no-store" });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export default async function Home() {
  const posts = await getPosts();
  const categories = ["All", ...new Set(posts.flatMap((p) => p.tags || []).filter(Boolean))];

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">

      {/* Featured slider */}
      {posts.length >= 1 && (
        <section className="mb-10 animate-fadeIn">
          <p className="text-xs font-semibold uppercase tracking-widest text-orange-400 mb-3">Featured</p>
          <FeaturedSlider posts={posts.slice(0, 3)} />
        </section>
      )}

      {/* Posts with filter */}
      <div className="animate-slideUp delay-200">
        <p className="text-xs font-semibold uppercase tracking-widest text-orange-400 mb-4">All Posts</p>
        <PostsGrid posts={posts} categories={categories} />
      </div>

    </div>
  );
}
