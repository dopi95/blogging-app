"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { apiFetch } from "@/lib/api";

const AVATAR_COLORS = [
  "bg-orange-100 text-orange-600", "bg-blue-100 text-blue-600",
  "bg-purple-100 text-purple-600", "bg-green-100 text-green-600",
  "bg-pink-100 text-pink-600", "bg-yellow-100 text-yellow-700",
  "bg-teal-100 text-teal-600",
];
function getColor(name) {
  let n = 0;
  for (let i = 0; i < name.length; i++) n += name.charCodeAt(i);
  return AVATAR_COLORS[n % AVATAR_COLORS.length];
}
function Av({ name, size = "sm" }) {
  const sz = size === "xs" ? "w-6 h-6 text-[10px]" : "w-7 h-7 text-xs";
  return (
    <div className={`${sz} shrink-0 rounded-full flex items-center justify-center font-bold ${getColor(name)}`}>
      {name[0].toUpperCase()}
    </div>
  );
}

export default function PostCard({ post: initial, index = 0 }) {
  const { user } = useAuth();
  const router = useRouter();
  const delays = ["delay-100", "delay-200", "delay-300", "delay-400", "delay-500"];
  const delay = delays[index % delays.length];

  const [likes, setLikes] = useState(initial.likes || []);
  const [bounce, setBounce] = useState(false);

  const liked = user ? likes.some((l) => (l._id || l) === user._id) : false;
  const likeCount = likes.length;
  const authorName = initial.author?.username || "Anonymous";

  async function handleLike(e) {
    e.preventDefault();
    e.stopPropagation();
    if (!user) { router.push("/login"); return; }
    try {
      await apiFetch(`/posts/${initial.slug}/like`, { method: "POST", token: user.token });
      // optimistic toggle
      setLikes((prev) =>
        liked ? prev.filter((l) => (l._id || l) !== user._id) : [...prev, { _id: user._id, username: user.username }]
      );
      setBounce(true);
      setTimeout(() => setBounce(false), 400);
    } catch {}
  }

  return (
    <article className={`animate-slideUp ${delay} group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col`}>

      <Link href={`/blog/${initial.slug}`} className="block relative w-full h-44 overflow-hidden">
        <Image
          src={initial.coverImage || "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800"}
          alt={initial.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <span className="absolute top-3 left-3 text-xs font-semibold bg-orange-500 text-white px-2.5 py-1 rounded-full shadow-sm">
          {initial.category || "General"}
        </span>
      </Link>

      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs text-gray-400">
            {new Date(initial.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
          </span>
        </div>

        <Link href={`/blog/${initial.slug}`}>
          <h2 className="text-base font-bold text-gray-900 leading-snug group-hover:text-orange-500 transition-colors mb-2 line-clamp-2">
            {initial.title}
          </h2>
        </Link>
        <p className="text-sm text-gray-500 leading-relaxed line-clamp-2 flex-1">{initial.excerpt}</p>

        <div className="mt-4 pt-3 border-t border-gray-50 flex items-center gap-3">
          <div className="flex items-center gap-1.5 mr-auto">
            <Av name={authorName} />
            <span className="text-xs font-medium text-gray-600 truncate max-w-20">{authorName}</span>
          </div>

          {/* Like */}
          <button onClick={handleLike} className="flex items-center gap-1 focus:outline-none cursor-pointer">
            <svg
              className={`w-5 h-5 transition-all duration-200 ${bounce ? "scale-150" : "scale-100"} ${liked ? "text-red-500" : "text-gray-400 hover:text-red-400"}`}
              fill={liked ? "currentColor" : "none"}
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <span className={`text-xs font-semibold ${liked ? "text-red-500" : "text-gray-400"}`}>{likeCount}</span>
          </button>

          {/* Comment count */}
          <Link href={`/blog/${initial.slug}`} className="flex items-center gap-1">
            <svg className="w-5 h-5 text-gray-400 hover:text-orange-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <span className="text-xs font-semibold text-gray-400">{initial.comments?.length || 0}</span>
          </Link>
        </div>
      </div>
    </article>
  );
}
