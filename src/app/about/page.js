export const metadata = {
  title: "About — Inkwell",
  description: "Learn more about Inkwell.",
};

export default function About() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">About Inkwell</h1>
      <p className="text-lg text-gray-500 leading-relaxed mb-6">
        Inkwell is a simple, modern blogging platform focused on web development topics. We cover everything from frontend frameworks to backend APIs, performance tips, and developer tooling.
      </p>
      <p className="text-lg text-gray-500 leading-relaxed mb-10">
        Our goal is to make complex topics approachable and help developers at every level grow their skills through clear, practical writing.
      </p>

      <h2 className="text-2xl font-semibold text-gray-900 mb-6">Our Authors</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[
          { name: "Alex Johnson", role: "Full-Stack Developer", topics: "Next.js, JavaScript" },
          { name: "Sara Williams", role: "UI/UX Developer", topics: "CSS, Design Systems" },
          { name: "Mike Chen", role: "Backend Engineer", topics: "Node.js, APIs, React" },
          { name: "Lisa Park", role: "Performance Engineer", topics: "Web Vitals, Optimization" },
        ].map((author) => (
          <div key={author.name} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
                {author.name[0]}
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">{author.name}</p>
                <p className="text-xs text-gray-400">{author.role}</p>
              </div>
            </div>
            <p className="text-xs text-gray-500">Writes about: {author.topics}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
