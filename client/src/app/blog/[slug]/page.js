import { notFound } from "next/navigation";
import PostDetail from "@/components/PostDetail";

async function getPost(slug) {
  try {
    const res = await fetch(`http://localhost:5000/api/posts/${slug}`, { cache: "no-store" });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};
  return { title: `${post.title} — Blogging App`, description: post.excerpt };
}

export default async function BlogPost({ params }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();
  return <PostDetail post={post} />;
}
