import { getPostBySlug, posts } from "@/lib/posts";
import { notFound } from "next/navigation";
import PostDetail from "@/components/PostDetail";

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return { title: `${post.title} — Blogging App`, description: post.excerpt };
}

export default async function BlogPost({ params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();
  return <PostDetail post={post} />;
}
