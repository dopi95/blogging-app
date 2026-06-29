"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { apiFetch } from "@/lib/api";

export default function EditPost() {
  const { slug } = useParams();
  const { user, loading } = useAuth();
  const router = useRouter();
  const [fetching, setFetching] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    title: "", slug: "", content: "", excerpt: "", coverImage: "", tags: "",
  });

  useEffect(() => {
    if (!loading && !user) router.push("/login");
  }, [user, loading]);

  useEffect(() => {
    apiFetch(`/posts/${slug}`)
      .then((data) => {
        setForm({
          title: data.title || "",
          slug: data.slug || "",
          content: data.content || "",
          excerpt: data.excerpt || "",
          coverImage: data.coverImage || "",
          tags: (data.tags || []).join(", "),
        });
        setFetching(false);
      })
      .catch(() => { setError("Failed to load post"); setFetching(false); });
  }, [slug]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      const data = await apiFetch(`/posts/${slug}`, {
        method: "PUT",
        token: user.token,
        body: { ...form, tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean) },
      });
      router.push(`/blog/${data.slug}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  if (loading || !user || fetching) return <div className="max-w-2xl mx-auto px-4 py-10 text-sm text-gray-400">Loading...</div>;

  const fields = [
    { name: "title", label: "Title" },
    { name: "slug", label: "Slug" },
    { name: "excerpt", label: "Excerpt" },
    { name: "coverImage", label: "Cover Image URL" },
    { name: "tags", label: "Category (e.g. Technology, Food, Travel)" },
  ];

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Edit Post</h1>

      {error && (
        <div className="mb-4 px-4 py-3 bg-red-50 text-red-500 text-sm rounded-xl border border-red-100">{error}</div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {fields.map(({ name, label }) => (
          <div key={name}>
            <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
            <input
              type="text"
              name={name}
              value={form[name]}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-700 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition"
            />
          </div>
        ))}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
          <textarea
            name="content"
            value={form.content}
            onChange={handleChange}
            rows={8}
            required
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-700 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition"
          />
        </div>
        <button
          type="submit"
          disabled={submitting}
          className="cursor-pointer w-full py-3 bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white font-bold rounded-xl transition active:scale-95"
        >
          {submitting ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
}
