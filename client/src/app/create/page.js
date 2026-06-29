"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { apiFetch } from "@/lib/api";

export default function CreatePost() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    title: "", slug: "", content: "", excerpt: "", coverImage: "", tags: "",
  });

  useEffect(() => {
    if (!loading && !user) router.push("/login");
  }, [user, loading]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "title" && {
        slug: value.toLowerCase().trim().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""),
      }),
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      await apiFetch("/posts", {
        method: "POST",
        token: user.token,
        body: { ...form, tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean) },
      });
      router.push("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  if (loading || !user) return null;

  const fields = [
    { name: "title", label: "Title" },
    { name: "slug", label: "Slug" },
    { name: "excerpt", label: "Excerpt" },
    { name: "coverImage", label: "Cover Image URL" },
    { name: "tags", label: "Tags (comma separated)" },
  ];

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Create New Post</h1>

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
              required={["title", "slug"].includes(name)}
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
          className="w-full py-3 bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white font-bold rounded-xl transition active:scale-95"
        >
          {submitting ? "Publishing..." : "Publish Post"}
        </button>
      </form>
    </div>
  );
}
