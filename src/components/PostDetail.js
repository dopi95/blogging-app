"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

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
function Avatar({ name, size = "md" }) {
  const sz =
    size === "xs" ? "w-5 h-5 text-[9px]" :
    size === "sm" ? "w-8 h-8 text-xs" :
    size === "lg" ? "w-11 h-11 text-sm" :
    "w-9 h-9 text-xs";
  return (
    <div className={`${sz} shrink-0 rounded-full flex items-center justify-center font-bold ring-2 ring-white ${getColor(name)}`}>
      {name[0].toUpperCase()}
    </div>
  );
}

/* ── Likers full-screen modal ── */
function LikersModal({ likers, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center" onClick={onClose}>
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      <div
        className="relative bg-white rounded-t-3xl sm:rounded-2xl w-full sm:max-w-sm max-h-[60vh] flex flex-col shadow-2xl animate-slideUp"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-center pt-3 pb-1 sm:hidden">
          <div className="w-10 h-1 bg-gray-200 rounded-full" />
        </div>
        <div className="flex items-center justify-between px-5 pt-4 pb-3 border-b border-gray-100">
          <span className="text-sm font-bold text-gray-900">
            {likers.length} {likers.length === 1 ? "Like" : "Likes"}
          </span>
          <button
            onClick={onClose}
            className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-gray-100 transition text-gray-400"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="overflow-y-auto px-5 py-3 space-y-3.5">
          {likers.map((person, i) => (
            <div key={i} className="flex items-center gap-3">
              <Avatar name={person} size="sm" />
              <span className={`text-sm font-semibold ${person === "You" ? "text-orange-500" : "text-gray-800"}`}>
                {person}
              </span>
              {person === "You" && (
                <span className="ml-auto text-[10px] bg-red-50 text-red-400 px-2 py-0.5 rounded-full font-bold">
                  You
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function PostDetail({ post }) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes.length);
  const [bounce, setBounce] = useState(false);
  const [showLikers, setShowLikers] = useState(false);
  const [comments, setComments] = useState(
    post.comments.map((c) => ({ ...c, replies: c.replies || [], likedBy: [] }))
  );
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [replyTo, setReplyTo] = useState(null); // { index, author }
  const [replyName, setReplyName] = useState("");
  const [replyText, setReplyText] = useState("");
  const commentInputRef = useRef(null);

  const likers = liked ? [...post.likes, "You"] : post.likes;

  function handleLike() {
    setLiked((p) => !p);
    setLikeCount((p) => (liked ? p - 1 : p + 1));
    setBounce(true);
    setTimeout(() => setBounce(false), 400);
  }

  function focusComment() {
    commentInputRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    setTimeout(() => commentInputRef.current?.focus(), 300);
  }

  function submitComment(e) {
    e.preventDefault();
    if (!name.trim() || !text.trim()) return;
    setComments((prev) => [
      ...prev,
      {
        author: name.trim(),
        text: text.trim(),
        date: new Date().toISOString().split("T")[0],
        replies: [],
        likedBy: [],
      },
    ]);
    setText("");
  }

  function submitReply(e, idx) {
    e.preventDefault();
    if (!replyName.trim() || !replyText.trim()) return;
    setComments((prev) =>
      prev.map((c, i) =>
        i === idx
          ? {
              ...c,
              replies: [
                ...c.replies,
                {
                  author: replyName.trim(),
                  text: replyText.trim(),
                  date: new Date().toISOString().split("T")[0],
                },
              ],
            }
          : c
      )
    );
    setReplyTo(null);
    setReplyName("");
    setReplyText("");
  }

  function toggleCommentLike(idx) {
    setComments((prev) =>
      prev.map((c, i) => {
        if (i !== idx) return c;
        const already = c.likedBy.includes("You");
        return {
          ...c,
          likedBy: already ? c.likedBy.filter((x) => x !== "You") : [...c.likedBy, "You"],
        };
      })
    );
  }

  return (
    <>
      <article className="max-w-2xl mx-auto px-4 py-10 animate-fadeIn">

        {/* Back */}
        <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-orange-500 hover:text-orange-600 mb-8 group font-medium">
          <svg className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to all posts
        </Link>

        {/* ── Post header (Instagram-style top bar) ── */}
        <div className="flex items-center gap-3 mb-5">
          <Avatar name={post.author} size="lg" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-gray-900">{post.author}</p>
            <p className="text-xs text-gray-400">
              {new Date(post.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
            </p>
          </div>
          <span className="text-xs font-semibold bg-orange-500 text-white px-3 py-1 rounded-full shrink-0">
            {post.category}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight mb-4">
          {post.title}
        </h1>

        {/* Cover image */}
        <div className="relative w-full h-64 sm:h-96 rounded-2xl overflow-hidden mb-0 shadow-md">
          <Image src={post.image} alt={post.title} fill className="object-cover" priority />
        </div>

        {/* ── Instagram-style action row ── */}
        <div className="py-3 flex items-center gap-4 border-b border-gray-100">
          {/* Like */}
          <button
            onClick={handleLike}
            aria-label={liked ? "Unlike" : "Like"}
            className="focus:outline-none cursor-pointer"
          >
            <svg
              className={`w-7 h-7 transition-all duration-200 ${bounce ? "scale-150" : "scale-100"} ${liked ? "text-red-500" : "text-gray-700 hover:text-gray-400"}`}
              fill={liked ? "currentColor" : "none"}
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>

          {/* Comment trigger */}
          <button onClick={focusComment} aria-label="Comment" className="focus:outline-none cursor-pointer">
            <svg className="w-6 h-6 text-gray-700 hover:text-gray-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </button>

          <span className="text-xs text-gray-400 ml-auto">{post.readTime}</span>
        </div>

        {/* ── Likes row (Instagram stacked + text) ── */}
        {likeCount > 0 && (
          <button
            onClick={() => setShowLikers(true)}
            className="mt-3 flex items-center gap-2 hover:opacity-80 transition focus:outline-none cursor-pointer"
          >
            <div className="flex -space-x-2">
              {likers.slice(0, 4).map((person, i) => (
                <div
                  key={i}
                  className={`w-6 h-6 rounded-full border-2 border-white flex items-center justify-center text-[9px] font-bold ${getColor(person)}`}
                >
                  {person[0].toUpperCase()}
                </div>
              ))}
            </div>
            <span className="text-sm text-gray-700">
              Liked by{" "}
              <span className="font-bold">{likers[0]}</span>
              {likeCount > 1 && <> and <span className="font-bold">{likeCount - 1} others</span></>}
            </span>
          </button>
        )}

        {/* ── Post content ── */}
        <div className="mt-5 space-y-4 text-gray-700">
          {post.content.split("\n\n").map((block, i) => {
            if (block.startsWith("## ")) {
              return (
                <h2 key={i} className="text-lg font-bold text-gray-900 pt-4 border-b border-gray-100 pb-1">
                  {block.replace("## ", "")}
                </h2>
              );
            }
            return (
              <p key={i} className="text-[15px] leading-7 text-gray-600">
                {block}
              </p>
            );
          })}
        </div>

        {/* ── Comments ── */}
        <div className="mt-8 border-t border-gray-100 pt-5">
          {/* Comment count */}
          {comments.length > 0 && (
            <p className="text-sm text-gray-400 mb-4 font-medium">
              View all {comments.length} comments
            </p>
          )}

          <div className="space-y-5">
            {comments.map((c, i) => (
              <div key={i} className="animate-slideInLeft" style={{ animationDelay: `${i * 0.05}s` }}>
                <div className="flex gap-3">
                  <Avatar name={c.author} size="sm" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <span className="text-sm font-bold text-gray-900 mr-2">{c.author}</span>
                        <span className="text-sm text-gray-700 leading-relaxed">{c.text}</span>
                      </div>
                      {/* Comment like */}
                      <button
                        onClick={() => toggleCommentLike(i)}
                        className="shrink-0 focus:outline-none mt-0.5 cursor-pointer"
                        aria-label="Like comment"
                      >
                        <svg
                          className={`w-4 h-4 transition-colors ${c.likedBy.includes("You") ? "text-red-500" : "text-gray-300 hover:text-gray-400"}`}
                          fill={c.likedBy.includes("You") ? "currentColor" : "none"}
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                      </button>
                    </div>

                    <div className="flex items-center gap-4 mt-1">
                      <span className="text-[11px] text-gray-400">
                        {new Date(c.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                      </span>
                      {c.likedBy.length > 0 && (
                        <span className="text-[11px] text-gray-400">{c.likedBy.length} {c.likedBy.length === 1 ? "like" : "likes"}</span>
                      )}
                      <button
                        onClick={() => setReplyTo(replyTo?.index === i ? null : { index: i, author: c.author })}
                        className="text-[11px] font-bold text-gray-400 hover:text-orange-500 transition-colors cursor-pointer"
                      >
                        Reply
                      </button>
                    </div>

                    {/* Replies */}
                    {c.replies.length > 0 && (
                      <div className="mt-3 ml-1 space-y-3 border-l-2 border-gray-100 pl-3">
                        {c.replies.map((r, j) => (
                          <div key={j} className="flex gap-2">
                            <Avatar name={r.author} size="xs" />
                            <div className="flex-1">
                              <span className="text-xs font-bold text-gray-900 mr-2">{r.author}</span>
                              <span className="text-xs text-gray-600">{r.text}</span>
                              <div className="text-[10px] text-gray-400 mt-0.5">
                                {new Date(r.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Reply input */}
                    {replyTo?.index === i && (
                      <form onSubmit={(e) => submitReply(e, i)} className="mt-3 space-y-2 animate-slideUp">
                        <input
                          type="text"
                          placeholder="Your name"
                          value={replyName}
                          onChange={(e) => setReplyName(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs placeholder-gray-400 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition"
                        />
                        <div className="flex gap-2">
                          <input
                            autoFocus
                            type="text"
                            placeholder={`Reply to ${replyTo.author}…`}
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                            className="flex-1 px-3 py-2 rounded-xl border border-gray-200 text-xs placeholder-gray-400 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition"
                          />
                          <button
                            type="submit"
                            disabled={!replyName.trim() || !replyText.trim()}
                            className="px-4 py-2 bg-orange-500 hover:bg-orange-600 disabled:opacity-40 text-white text-xs font-bold rounded-xl transition active:scale-95"
                          >
                            Post
                          </button>
                        </div>
                      </form>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ── Add comment (always visible, Instagram-style bottom bar) ── */}
          <form onSubmit={submitComment} className="mt-6 border-t border-gray-100 pt-4">
            <div className="mb-2">
              <input
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm placeholder-gray-400 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition"
              />
            </div>
            <div className="flex items-center gap-3">
              {name.trim() && <Avatar name={name.trim()} size="sm" />}
              <input
                ref={commentInputRef}
                type="text"
                placeholder="Add a comment…"
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-sm placeholder-gray-400 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition bg-gray-50 focus:bg-white"
              />
              <button
                type="submit"
                disabled={!name.trim() || !text.trim()}
                className="text-sm font-bold text-orange-500 hover:text-orange-600 disabled:opacity-30 disabled:cursor-not-allowed transition"
              >
                Post
              </button>
            </div>
          </form>
        </div>

        {/* Back bottom */}
        <div className="mt-12 pt-8 border-t border-gray-100">
          <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-orange-500 hover:text-orange-600 font-medium group">
            <svg className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to all posts
          </Link>
        </div>
      </article>

      {showLikers && <LikersModal likers={likers} onClose={() => setShowLikers(false)} />}
    </>
  );
}
