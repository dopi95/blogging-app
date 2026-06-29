export const metadata = {
  title: "About — Blogging App",
  description: "The people behind the posts.",
};

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

async function getAuthorsWithPosts() {
  try {
    const [authorsRes, postsRes] = await Promise.all([
      fetch("http://localhost:5000/api/auth/authors", { cache: "no-store" }),
      fetch("http://localhost:5000/api/posts", { cache: "no-store" }),
    ]);
    const authors = authorsRes.ok ? await authorsRes.json() : [];
    const posts = postsRes.ok ? await postsRes.json() : [];
    return authors.map((author) => ({
      ...author,
      posts: posts.filter((p) => (p.author?._id || p.author) === author._id),
    }));
  } catch {
    return [];
  }
}

export default async function About() {
  const authors = await getAuthorsWithPosts();

  return (
    <div className="max-w-3xl mx-auto px-4 py-16">

      <h1 className="text-4xl font-bold text-gray-900 mb-4">About this blog</h1>
      <p className="text-lg text-gray-500 leading-relaxed mb-5">
        This is a simple place where we write about things we actually use and run into. No sponsored content, no filler. Just posts about web development, written when we have something real to say.
      </p>
      <p className="text-lg text-gray-500 leading-relaxed mb-12">
        We cover frontend, backend, performance, and everything in between. Most posts come from a real problem someone on the team ran into and figured out.
      </p>

      <h2 className="text-2xl font-semibold text-gray-900 mb-6">The authors</h2>

      {authors.length === 0 ? (
        <p className="text-sm text-gray-400">No authors yet.</p>
      ) : (
        <div className="flex flex-col gap-6">
          {authors.map((author) => (
            <div key={author._id} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:border-orange-100 transition-colors">
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shrink-0 ${getColor(author.username)}`}>
                  {author.username[0].toUpperCase()}
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900">{author.username}</p>
                  <p className="text-xs text-gray-400">{author.posts.length} {author.posts.length === 1 ? "post" : "posts"}</p>
                </div>
              </div>

              {author.posts.length > 0 && (
                <div className="flex flex-col gap-3">
                  {author.posts.map((post) => (
                    <a key={post._id} href={`/blog/${post.slug}`} className="group block bg-gray-50 rounded-xl p-3 hover:bg-orange-50 transition-colors">
                      <p className="text-sm font-semibold text-gray-800 group-hover:text-orange-500 transition-colors mb-0.5">{post.title}</p>
                      {post.excerpt && (
                        <p className="text-xs text-gray-400 line-clamp-2">{post.excerpt}</p>
                      )}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
