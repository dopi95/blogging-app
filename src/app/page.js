import PostCard from "@/components/PostCard";
import { posts } from "@/lib/posts";

export default function Home() {
  const featured = posts[0];
  const rest = posts.slice(1);

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      {/* Hero */}
      <section className="mb-12 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-4">
          Welcome to <span className="text-indigo-600">Inkwell</span>
        </h1>
        <p className="text-lg text-gray-500 max-w-xl mx-auto">
          Tutorials, thoughts, and ideas on modern web development — written by developers, for developers.
        </p>
      </section>

      {/* Featured post */}
      <section className="mb-12">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-indigo-500 mb-4">Featured</h2>
        <PostCard post={featured} />
      </section>

      {/* All posts */}
      <section>
        <h2 className="text-sm font-semibold uppercase tracking-widest text-indigo-500 mb-4">Latest Posts</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {rest.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </section>
    </div>
  );
}
