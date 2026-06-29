"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function FeaturedSlider({ posts }) {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => goTo((current + 1) % posts.length), 5000);
    return () => clearInterval(timer);
  }, [current, posts.length]);

  function goTo(index) {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => {
      setCurrent(index);
      setAnimating(false);
    }, 300);
  }

  const post = posts[current];

  return (
    <div className="relative rounded-3xl overflow-hidden bg-gray-900 shadow-xl mb-2">
      {/* Image */}
      <div
        className={`relative w-full h-64 sm:h-96 transition-opacity duration-300 ${animating ? "opacity-0" : "opacity-100"}`}
      >
        <Image
          src={post.coverImage || "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800"}
          alt={post.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-t from-gray-900 via-gray-900/40 to-transparent" />
      </div>

      {/* Content overlay */}
      <div className={`absolute bottom-0 left-0 right-0 p-6 sm:p-8 transition-all duration-300 ${animating ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"}`}>
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-semibold bg-orange-500 text-white px-2.5 py-1 rounded-full">
            {post.tags?.[0] || "General"}
          </span>
          <span className="text-xs text-gray-300">{post.readTime || ""}</span>
        </div>
        <Link href={`/blog/${post.slug}`}>
          <h2 className="text-xl sm:text-2xl font-bold text-white leading-snug hover:text-orange-300 transition-colors mb-3 max-w-xl">
            {post.title}
          </h2>
        </Link>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs font-bold">
              {(post.author?.username || "?")[0].toUpperCase()}
            </div>
            <span className="text-sm text-gray-300">{post.author?.username || "Anonymous"}</span>
          </div>
          <Link
            href={`/blog/${post.slug}`}
            className="text-xs font-medium text-orange-400 hover:text-orange-300 transition-colors flex items-center gap-1"
          >
            Read post
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Dots */}
      <div className="absolute top-4 right-4 flex items-center gap-1.5">
        {posts.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`rounded-full transition-all duration-300 ${
              i === current ? "w-5 h-2 bg-orange-500" : "w-2 h-2 bg-white/40 hover:bg-white/70"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
