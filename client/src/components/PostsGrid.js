"use client";

import { useState } from "react";
import PostCard from "./PostCard";

export default function PostsGrid({ posts, categories }) {
  const [active, setActive] = useState("All");

  const filtered = active === "All" ? posts : posts.filter((p) => p.category === active);

  return (
    <section>
      {/* Category filter */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-6 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`cursor-pointer shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
              active === cat
                ? "bg-orange-500 text-white shadow-sm shadow-orange-200"
                : "bg-white text-gray-500 border border-gray-200 hover:border-orange-300 hover:text-orange-500"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {filtered.map((post, i) => (
          <PostCard key={post.slug} post={post} index={i} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-gray-400 py-16 text-sm">No posts in this category yet.</p>
      )}
    </section>
  );
}
