"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";

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

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleLogout() {
    logout();
    setDropdownOpen(false);
    setOpen(false);
    router.push("/");
  }

  const baseLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
  ];
  const authLinks = user ? [{ href: "/create", label: "Create Post" }] : [];
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
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="cursor-pointer flex items-center gap-2 pl-1 pr-3 py-1 rounded-full border border-gray-200 hover:border-orange-300 hover:bg-orange-50 transition-all duration-200"
              >
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${getColor(user.username)}`}>
                  {user.username[0].toUpperCase()}
                </div>
                <span className="text-sm font-semibold text-gray-700">{user.username}</span>
                <svg className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-52 bg-white rounded-2xl border border-gray-100 shadow-xl overflow-hidden animate-fadeIn">
                  {/* Profile header */}
                  <div className="px-4 py-3 border-b border-gray-50 flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${getColor(user.username)}`}>
                      {user.username[0].toUpperCase()}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-gray-900 truncate">{user.username}</p>
                      <p className="text-xs text-gray-400 truncate">{user.email}</p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="p-2">
                    <Link
                      href="/create"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm text-gray-600 hover:bg-orange-50 hover:text-orange-500 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      Create Post
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="cursor-pointer w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm text-red-500 hover:bg-red-50 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      Log out
                    </button>
                  </div>
                </div>
              )}
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
          className="cursor-pointer sm:hidden p-2 rounded-md text-gray-500 hover:bg-orange-50"
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

      {/* Mobile menu */}
      {open && (
        <nav className="sm:hidden border-t border-orange-50 bg-white px-4 py-3 flex flex-col gap-1">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className={`text-sm font-medium px-3 py-2 rounded-xl transition-colors ${
                pathname === href ? "text-orange-500 bg-orange-50" : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              {label}
            </Link>
          ))}
          {user ? (
            <>
              <div className="flex items-center gap-3 px-3 py-2 mt-1 border-t border-gray-50">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${getColor(user.username)}`}>
                  {user.username[0].toUpperCase()}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-bold text-gray-900 truncate">{user.username}</p>
                  <p className="text-xs text-gray-400 truncate">{user.email}</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="cursor-pointer flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-red-500 hover:bg-red-50 transition-colors text-left"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Log out
              </button>
            </>
          ) : (
            <>
              <Link href="/login" onClick={() => setOpen(false)} className="text-sm font-medium px-3 py-2 rounded-xl text-gray-600 hover:bg-gray-50">Log in</Link>
              <Link href="/signup" onClick={() => setOpen(false)} className="text-sm font-bold px-3 py-2 rounded-xl text-orange-500 hover:bg-orange-50">Sign up</Link>
            </>
          )}
        </nav>
      )}
    </header>
  );
}
