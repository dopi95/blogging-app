"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
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
function Avatar({ name, size = "md" }) {
  const sz = size === "xs" ? "w-5 h-5 text-[9px]" : size === "sm" ? "w-8 h-8 text-xs" : size === "lg" ? "w-11 h-11 text-sm" : "w-9 h-9 text-xs";
  return (
    <div className={`${sz} shrink-0 rounded-full flex items-center justify-center font-bold ring-2 ring-white ${getColor(name)}`}>
      {name[0].toUpperCase()}
    </div>
  );
}

function LikersModal({ likers, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center" onClick={onClose}>
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      <div className="relative bg-white rounded-t-3xl sm:rounded-2xl w-full sm:max-w-sm max-h-[60vh] flex flex-col shadow-2xl animate-slideUp" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between px-5 pt-5 pb-3 border-b border-gray-100">
          <span className="text-sm font-bold text-gray-900">{likers.length} {likers.length === 1 ? "Like" : "Likes"}</span>
          <button onClick={onClose} className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        <div className="overflow-y-auto px-5 py-3 space-y-3.5">
          {likers.map((u, i) => (
            <div key={i} className="flex items-center gap-3">
              <Avatar name={u} size="sm" />
              <span className="text-sm font-semibold text-gray-800">{u}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function PostDetail({ post: initial }) {
  const { user } = useAuth();
  const router = useRouter();
  const [post, setPost] = useState(initial);
  const [deleting, setDeleting] = useState(false);
  const [bounce, setBounce] = useState(false);
  const [showLikers, setShowLikers] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [replyTo, setReplyTo] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const commentInputRef = useRef(null);

  const liked = user ? post.likes?.some((l) => (l._id || l) === user._id) : false;
  const likeCount = post.likes?.length || 0;
  const likerNames = (post.likes || []).map((l) => l.username || "User");
  const isAuthor = user && post.author && (post.author._id || post.author) === user._id;

  async function handleLike() {
    if (!user) return router.push("/login");
    try {
      await apiFetch(`/posts/${post.slug}/like`, { method: "POST", token: user.token });
      // optimistic + refetch
      const updated = await apiFetch(`/posts/${post.slug}`);
      setPost(updated);
      setBounce(true);
      setTimeout(() => setBounce(false), 400);
    } catch {}
  }

  async function handleDelete() {
    if (!confirm("Delete this post?")) return;
    setDeleting(true);
    try {
      await apiFetch(`/posts/${post.slug}`, { method: "DELETE", token: user.token });
      router.push("/");
    } catch {
      alert("Failed to delete post");
      setDeleting(false);
    }
  }

  async function submitComment(e) {
    e.preventDefault();
    if (!commentText.trim()) return;
    setSubmitting(true);
    try {
      const comments = await apiFetch(`/posts/${post.slug}/comments`, {
        method: "POST", token: user.token, body: { text: commentText },
      });
      setPost((p) => ({ ...p, comments }));
      setCommentText("");
    } catch {} finally { setSubmitting(false); }
  }

  async function submitReply(e, commentId) {
    e.preventDefault();
    if (!replyText.trim()) return;
    setSubmitting(true);
    try {
      const comments = await apiFetch(`/posts/${post.slug}/comments/${commentId}/replies`, {
        method: "POST", token: user.token, body: { text: replyText },
      });
      setPost((p) => ({ ...p, comments }));
      setReplyTo(null);
      setReplyText("");
    } catch {} finally { setSubmitting(false); }
  }

  async function deleteComment(commentId) {
    try {
      await apiFetch(`/posts/${post.slug}/comments/${commentId}`, { method: "DELETE", token: user.token });
      setPost((p) => ({ ...p, comments: p.comments.filter((c) => c._id !== commentId) }));
    } catch {}
  }

  function focusComment() {
    if (!user) return router.push("/login");
    commentInputRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    setTimeout(() => commentInputRef.current?.focus(), 300);
  }

  return (
    <>
      <article className="max-w-2xl mx-auto px-4 py-10 animate-fadeIn">
        <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-orange-500 hover:text-orange-600 mb-8 group font-medium">
          <svg className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to all posts
        </Link>

        {/* Author header */}
        <div className="flex items-center gap-3 mb-5">
          <Avatar name={post.author?.username || "?"} size="lg" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-gray-900">{post.author?.username}</p>
            <p className="text-xs text-gray-400">
              {new Date(post.createdAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
            </p>
          </div>
          <span className="text-xs font-semibold bg-orange-500 text-white px-3 py-1 rounded-full shrink-0">
            {post.category || "General"}
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight mb-4">{post.title}</h1>

        <div className="relative w-full h-64 sm:h-96 rounded-2xl overflow-hidden mb-0 shadow-md">
          <Image src={post.coverImage || "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800"} alt={post.title} fill className="object-cover" priority />
        </div>

        {/* Action row */}
        <div className="py-3 flex items-center gap-4 border-b border-gray-100">
          <button onClick={handleLike} className="focus:outline-none cursor-pointer">
            <svg className={`w-7 h-7 transition-all duration-200 ${bounce ? "scale-150" : "scale-100"} ${liked ? "text-red-500" : "text-gray-700 hover:text-gray-400"}`} fill={liked ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
          <button onClick={focusComment} className="focus:outline-none cursor-pointer">
            <svg className="w-6 h-6 text-gray-700 hover:text-gray-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </button>

          {isAuthor && (
            <div className="flex items-center gap-2 ml-auto">
              <button onClick={() => router.push(`/edit/${post.slug}`)} className="cursor-pointer px-3 py-1.5 text-xs font-bold text-orange-500 border border-orange-200 rounded-xl hover:bg-orange-50 transition">
                Edit
              </button>
              <button onClick={handleDelete} disabled={deleting} className="cursor-pointer px-3 py-1.5 text-xs font-bold text-red-500 border border-red-200 rounded-xl hover:bg-red-50 disabled:opacity-50 transition">
                {deleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          )}
        </div>

        {/* Likes row */}
        {likeCount > 0 && (
          <button onClick={() => setShowLikers(true)} className="cursor-pointer mt-3 flex items-center gap-2 hover:opacity-80 transition focus:outline-none">
            <div className="flex -space-x-2">
              {likerNames.slice(0, 4).map((name, i) => (
                <div key={i} className={`w-6 h-6 rounded-full border-2 border-white flex items-center justify-center text-[9px] font-bold ${getColor(name)}`}>
                  {name[0].toUpperCase()}
                </div>
              ))}
            </div>
            <span className="text-sm text-gray-700">
              Liked by <span className="font-bold">{likerNames[0]}</span>
              {likeCount > 1 && <> and <span className="font-bold">{likeCount - 1} others</span></>}
            </span>
          </button>
        )}

        {/* Content */}
        <div className="mt-5 space-y-4 text-gray-700">
          {post.content.split("\n\n").map((block, i) =>
            block.startsWith("## ") ? (
              <h2 key={i} className="text-lg font-bold text-gray-900 pt-4 border-b border-gray-100 pb-1">{block.replace("## ", "")}</h2>
            ) : (
              <p key={i} className="text-[15px] leading-7 text-gray-600">{block}</p>
            )
          )}
        </div>

        {/* Comments */}
        <div className="mt-8 border-t border-gray-100 pt-5">
          {post.comments?.length > 0 && (
            <p className="text-sm text-gray-400 mb-4 font-medium">View all {post.comments.length} comments</p>
          )}

          <div className="space-y-5">
            {(post.comments || []).map((c) => (
              <div key={c._id} className="flex gap-3">
                <Avatar name={c.author?.username || "?"} size="sm" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <span className="text-sm font-bold text-gray-900 mr-2">{c.author?.username}</span>
                      <span className="text-sm text-gray-700 leading-relaxed">{c.text}</span>
                    </div>
                    {user && (c.author?._id === user._id || isAuthor) && (
                      <button onClick={() => deleteComment(c._id)} className="cursor-pointer text-[11px] text-red-400 hover:text-red-600 shrink-0 mt-0.5">Delete</button>
                    )}
                  </div>
                  <div className="flex items-center gap-4 mt-1">
                    <span className="text-[11px] text-gray-400">
                      {new Date(c.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                    </span>
                    {user && (
                      <button onClick={() => setReplyTo(replyTo === c._id ? null : c._id)} className="cursor-pointer text-[11px] font-bold text-gray-400 hover:text-orange-500 transition-colors">
                        Reply
                      </button>
                    )}
                  </div>

                  {/* Replies */}
                  {c.replies?.length > 0 && (
                    <div className="mt-3 ml-1 space-y-3 border-l-2 border-gray-100 pl-3">
                      {c.replies.map((r) => (
                        <div key={r._id} className="flex gap-2">
                          <Avatar name={r.author?.username || "?"} size="xs" />
                          <div>
                            <span className="text-xs font-bold text-gray-900 mr-2">{r.author?.username}</span>
                            <span className="text-xs text-gray-600">{r.text}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {replyTo === c._id && (
                    <form onSubmit={(e) => submitReply(e, c._id)} className="mt-3 flex gap-2 animate-slideUp">
                      <input
                        autoFocus
                        type="text"
                        placeholder={`Reply to ${c.author?.username}…`}
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        className="flex-1 px-3 py-2 rounded-xl border border-gray-200 text-xs placeholder-gray-400 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition"
                      />
                <button type="submit" disabled={!replyText.trim() || submitting} className="cursor-pointer px-4 py-2 bg-orange-500 hover:bg-orange-600 disabled:opacity-40 text-white text-xs font-bold rounded-xl transition">
                        Post
                      </button>
                    </form>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Add comment */}
          <form onSubmit={submitComment} className="mt-6 border-t border-gray-100 pt-4">
            {user ? (
              <div className="flex items-center gap-3">
                <Avatar name={user.username} size="sm" />
                <input
                  ref={commentInputRef}
                  type="text"
                  placeholder="Add a comment…"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-sm placeholder-gray-400 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition bg-gray-50 focus:bg-white"
                />
                <button type="submit" disabled={!commentText.trim() || submitting} className="cursor-pointer text-sm font-bold text-orange-500 hover:text-orange-600 disabled:opacity-30 transition">
                  Post
                </button>
              </div>
            ) : (
              <p className="text-sm text-gray-400 text-center">
                <Link href="/login" className="text-orange-500 font-semibold">Log in</Link> to like and comment
              </p>
            )}
          </form>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-100">
          <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-orange-500 hover:text-orange-600 font-medium group">
            <svg className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to all posts
          </Link>
        </div>
      </article>

      {showLikers && <LikersModal likers={likerNames} onClose={() => setShowLikers(false)} />}
    </>
  );
}
