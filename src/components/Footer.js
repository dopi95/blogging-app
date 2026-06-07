export default function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-white mt-auto">
      <div className="max-w-5xl mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-2">
        <p className="text-sm text-gray-400">© {new Date().getFullYear()} Inkwell. All rights reserved.</p>
        <p className="text-sm text-gray-400">Built with Next.js & Tailwind CSS</p>
      </div>
    </footer>
  );
}
