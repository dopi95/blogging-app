"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);

  function handleLogout() {
    logout();
    router.push("/");
    setOpen(false);
  }

  const baseLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
  ];
  const authLinks = user
    ? [{ href: "/create", label: "Create Post" }]
    : [];
  const links = [...baseLinks, ...authLinks];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-orange-100 shadow-sm">
      <div className="max-w-5xl mx-auto px-4 flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-2">
          <span className="w-7 h-7 rounded-lg bg-orange-500 flex items-center justify-center text-white text-xs font-bold">B</span>
          <span className="text-lg font-bold text-gray-900 tracking-tight">Blogging App</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden sm:flex items-center gap-6">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`text-sm font-medium transition-colors ${
                pathname === href ? "text-orange-500" : "text-gray-500 hover:text-gray-900"
              }`}
            >
              {label}
            </Link>
          ))}

          {user ? (
            <div className="flex items-center gap-3">
              <span className="text-sm font-semibold text-gray-700">{user.username}</span>
              <button
                onClick={handleLogout}
                className="text-sm font-medium text-red-500 hover:text-red-600 transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link href="/login" className="text-sm font-medium text-gray-500 hover:text-gray-900 transition">
                Log in
              </Link>
              <Link href="/signup" className="text-sm font-bold bg-orange-500 hover:bg-orange-600 text-white px-4 py-1.5 rounded-xl transition">
                Sign up
              </Link>
            </div>
          )}
        </nav>

        {/* Mobile hamburger */}
        <button
          className="sm:hidden p-2 rounded-md text-gray-500 hover:bg-orange-50"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {open && (
        <nav className="sm:hidden border-t border-orange-50 bg-white px-4 py-3 flex flex-col gap-3">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className={`text-sm font-medium transition-colors ${
                pathname === href ? "text-orange-500" : "text-gray-500 hover:text-gray-900"
              }`}
            >
              {label}
            </Link>
          ))}
          {user ? (
            <>
              <span className="text-sm font-semibold text-gray-700">{user.username}</span>
              <button onClick={handleLogout} className="text-sm font-medium text-red-500 text-left">Logout</button>
            </>
          ) : (
            <>
              <Link href="/login" onClick={() => setOpen(false)} className="text-sm font-medium text-gray-500">Log in</Link>
              <Link href="/signup" onClick={() => setOpen(false)} className="text-sm font-bold text-orange-500">Sign up</Link>
            </>
          )}
        </nav>
      )}
    </header>
  );
}
