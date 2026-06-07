import Image from "next/image";
import Link from "next/link";
import { getPostBySlug, posts } from "@/lib/posts";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }) {
  const post = getPostBySlug(params.slug);
  if (!post) return {};
  return { title: post.title, description: post.excerpt };
}

export default function BlogPost({ params }) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  return (
    <article className="max-w-3xl mx-auto px-4 py-10">
      {/* Back link */}
      <Link
        href="/"
        className="inline-flex items-center gap-1 text-sm text-indigo-600 hover:underline mb-8"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to all posts
      </Link>

      {/* Category & meta */}
      <div className="flex items-center gap-3 mb-4">
        <span className="text-xs font-medium bg-indigo-50 text-indigo-600 px-2.5 py-1 rounded-full">
          {post.category}
        </span>
        <span className="text-xs text-gray-400">{post.readTime}</span>
      </div>

      {/* Title */}
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight mb-4">
        {post.title}
      </h1>

      {/* Author & date */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-9 h-9 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-sm">
          {post.author[0]}
        </div>
        <div>
          <p className="text-sm font-medium text-gray-800">{post.author}</p>
          <p className="text-xs text-gray-400">
            {new Date(post.date).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </p>
        </div>
      </div>

      {/* Cover image */}
      <div className="relative w-full h-56 sm:h-80 rounded-2xl overflow-hidden mb-10">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Content */}
      <div className="prose prose-gray max-w-none text-gray-700 leading-relaxed space-y-4">
        {post.content.split("\n\n").map((paragraph, i) => (
          <p key={i} className={paragraph.startsWith("##") ? "text-xl font-semibold text-gray-900 mt-8 mb-2" : ""}>
            {paragraph.startsWith("##") ? paragraph.replace("## ", "") : paragraph}
          </p>
        ))}
      </div>

      {/* Back link bottom */}
      <div className="mt-12 pt-8 border-t border-gray-100">
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-sm text-indigo-600 hover:underline"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to all posts
        </Link>
      </div>
    </article>
  );
}
