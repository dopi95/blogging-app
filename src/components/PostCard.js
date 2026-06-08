"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

const AVATAR_COLORS = [
  "bg-orange-100 text-orange-600",
  "bg-blue-100 text-blue-600",
  "bg-purple-100 text-purple-600",
  "bg-green-100 text-green-600",
  "bg-pink-100 text-pink-600",
  "bg-yellow-100 text-yellow-700",
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

/* ── Likers modal ── */
function LikersModal({ likers, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center" onClick={onClose}>
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      <div
        className="relative bg-white rounded-t-3xl sm:rounded-2xl w-full sm:max-w-sm max-h-[60vh] flex flex-col shadow-2xl animate-slideUp"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 pt-5 pb-3 border-b border-gray-100">
          <span className="text-sm font-bold text-gray-900">Liked by</span>
          <button onClick={onClose} className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-gray-100 transition text-gray-400">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="overflow-y-auto px-5 py-3 space-y-3">
          {likers.map((person, i) => (
            <div key={i} className="flex items-center gap-3">
              <Av name={person} />
              <span className={`text-sm font-medium ${person === "You" ? "text-orange-500" : "text-gray-800"}`}>{person}</span>
              {person === "You" && <span className="ml-auto text-[10px] bg-red-50 text-red-400 px-2 py-0.5 rounded-full font-semibold">You</span>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Comment sheet (bottom drawer on card) ── */
function CommentSheet({ comments: initial, onClose }) {
  const [comments, setComments] = useState(initial);
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const inputRef = useRef(null);

  useEffect(() => { inputRef.current?.focus(); }, []);

  function submit(e) {
    e.preventDefault();
    if (!name.trim() || !text.trim()) return;
    setComments((prev) => [
      ...prev,
      { author: name.trim(), text: text.trim(), date: new Date().toISOString().split("T")[0] },
    ]);
    setText("");
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center" onClick={onClose}>
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      <div
        className="relative bg-white rounded-t-3xl w-full sm:max-w-md max-h-[70vh] flex flex-col shadow-2xl animate-slideUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 bg-gray-200 rounded-full" />
        </div>
        <div className="flex items-center justify-between px-5 pb-3 border-b border-gray-100">
          <span className="text-sm font-bold text-gray-900">Comments ({comments.length})</span>
          <button onClick={onClose} className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-gray-100 transition text-gray-400">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Comments list */}
        <div className="overflow-y-auto px-5 py-3 flex-1 space-y-4">
          {comments.length === 0 && (
            <p className="text-sm text-gray-400 text-center py-6">No comments yet. Start the conversation!</p>
          )}
          {comments.map((c, i) => (
            <div key={i} className="flex gap-2.5">
              <Av name={c.author} />
              <div className="flex-1 bg-gray-50 rounded-2xl rounded-tl-none px-3 py-2.5">
                <div className="flex items-center justify-between mb-0.5">
                  <span className="text-xs font-semibold text-gray-800">{c.author}</span>
                  <span className="text-[11px] text-gray-400">
                    {new Date(c.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                  </span>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed">{c.text}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <form onSubmit={submit} className="px-4 py-3 border-t border-gray-100 bg-white">
          <input
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 mb-2 rounded-xl border border-gray-200 text-xs text-gray-700 placeholder-gray-400 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition"
          />
          <div className="flex gap-2">
            <input
              ref={inputRef}
              type="text"
              placeholder="Add a comment…"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="flex-1 px-3 py-2.5 rounded-xl border border-gray-200 text-xs text-gray-700 placeholder-gray-400 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition"
            />
            <button
              type="submit"
              disabled={!name.trim() || !text.trim()}
              className="px-4 py-2 bg-orange-500 hover:bg-orange-600 disabled:opacity-40 text-white text-xs font-bold rounded-xl transition active:scale-95"
            >
              Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ── PostCard ── */
export default function PostCard({ post, index = 0 }) {
  const delays = ["delay-100", "delay-200", "delay-300", "delay-400", "delay-500"];
  const delay = delays[index % delays.length];

  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes.length);
  const [commentCount, setCommentCount] = useState(post.comments.length);
  const [showLikers, setShowLikers] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [bounce, setBounce] = useState(false);

  const likers = liked ? [...post.likes, "You"] : post.likes;

  function handleLike(e) {
    e.preventDefault();
    e.stopPropagation();
    setLiked((prev) => !prev);
    setLikeCount((prev) => (liked ? prev - 1 : prev + 1));
    setBounce(true);
    setTimeout(() => setBounce(false), 400);
  }

  function openLikers(e) {
    e.preventDefault();
    e.stopPropagation();
    if (likeCount === 0) return;
    setShowLikers(true);
  }

  function openComments(e) {
    e.preventDefault();
    e.stopPropagation();
    setShowComments(true);
  }

  return (
    <>
      <article className={`animate-slideUp ${delay} group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col`}>

        {/* Image */}
        <Link href={`/blog/${post.slug}`} className="block relative w-full h-44 overflow-hidden">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <span className="absolute top-3 left-3 text-xs font-semibold bg-orange-500 text-white px-2.5 py-1 rounded-full shadow-sm">
            {post.category}
          </span>
        </Link>

        <div className="p-4 flex flex-col flex-1">
          {/* Meta */}
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs text-gray-400">{post.readTime}</span>
            <span className="text-gray-200">·</span>
            <span className="text-xs text-gray-400">
              {new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
            </span>
          </div>

          {/* Title */}
          <Link href={`/blog/${post.slug}`}>
            <h2 className="text-base font-bold text-gray-900 leading-snug group-hover:text-orange-500 transition-colors mb-2 line-clamp-2">
              {post.title}
            </h2>
          </Link>
          <p className="text-sm text-gray-500 leading-relaxed line-clamp-2 flex-1">{post.excerpt}</p>

          {/* ── Actions bar ── */}
          <div className="mt-4 pt-3 border-t border-gray-50 flex items-center gap-3">

            {/* Author */}
            <div className="flex items-center gap-1.5 mr-auto">
              <Av name={post.author} />
              <span className="text-xs font-medium text-gray-600 truncate max-w-20">{post.author}</span>
            </div>

            {/* Like */}
            <button
              onClick={handleLike}
              aria-label={liked ? "Unlike" : "Like"}
              className="flex items-center gap-1 group/like focus:outline-none cursor-pointer"
            >
              <svg
                className={`w-5 h-5 transition-all duration-200 ${bounce ? "scale-150" : "scale-100"} ${liked ? "text-red-500" : "text-gray-400 group-hover/like:text-red-400"}`}
                fill={liked ? "currentColor" : "none"}
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <span className={`text-xs font-semibold transition-colors ${liked ? "text-red-500" : "text-gray-400"}`}>
                {likeCount}
              </span>
            </button>

            {/* Comment */}
            <button
              onClick={openComments}
              aria-label="Comments"
              className="flex items-center gap-1 group/comment focus:outline-none cursor-pointer"
            >
              <svg
                className="w-5 h-5 text-gray-400 group-hover/comment:text-orange-400 transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <span className="text-xs font-semibold text-gray-400">{commentCount}</span>
            </button>
          </div>

          {/* ── Liked by strip (Instagram-style) ── */}
          {likeCount > 0 && (
            <button
              onClick={openLikers}
              className="mt-2.5 flex items-center gap-2 text-left hover:opacity-80 transition focus:outline-none cursor-pointer"
            >
              {/* Stacked avatars */}
              <div className="flex -space-x-1.5">
                {likers.slice(0, 3).map((person, i) => (
                  <div
                    key={i}
                    className={`w-5 h-5 rounded-full border-2 border-white flex items-center justify-center text-[9px] font-bold ${getColor(person)}`}
                  >
                    {person[0].toUpperCase()}
                  </div>
                ))}
              </div>
              <span className="text-xs text-gray-500 leading-tight">
                Liked by{" "}
                <span className="font-semibold text-gray-800">
                  {likers[0]}
                </span>
                {likeCount > 1 && (
                  <> and <span className="font-semibold text-gray-800">{likeCount - 1} others</span></>
                )}
              </span>
            </button>
          )}
        </div>
      </article>

      {/* Modals */}
      {showLikers && <LikersModal likers={likers} onClose={() => setShowLikers(false)} />}
      {showComments && (
        <CommentSheet
          comments={post.comments}
          onClose={() => setShowComments(false)}
        />
      )}
    </>
  );
}
