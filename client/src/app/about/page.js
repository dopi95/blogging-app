export const metadata = {
  title: "About — Blogging App",
  description: "The people behind the posts.",
};

export default function About() {
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
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[
          { name: "Abebe Kebede", role: "Full-Stack Developer", topics: "Next.js, JavaScript, APIs" },
          { name: "Mahlet Tadesse", role: "UI Developer", topics: "CSS, Tailwind, Design Systems" },
          { name: "Dawit Haile", role: "Backend Engineer", topics: "Node.js, REST APIs, Databases" },
          { name: "Tigist Alemu", role: "Frontend Developer", topics: "React, Performance, Web Vitals" },
        ].map((author) => (
          <div key={author.name} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:border-orange-100 transition-colors">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-500 font-bold">
                {author.name[0]}
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">{author.name}</p>
                <p className="text-xs text-gray-400">{author.role}</p>
              </div>
            </div>
            <p className="text-xs text-gray-500">Writes about: <span className="text-gray-700">{author.topics}</span></p>
          </div>
        ))}
      </div>

    </div>
  );
}
