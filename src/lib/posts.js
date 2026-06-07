export const posts = [
  {
    slug: "getting-started-with-nextjs",
    title: "Getting Started with Next.js",
    excerpt: "Next.js is a powerful React framework that makes building full-stack web apps simple and fast. Let's explore the basics.",
    content: `Next.js is a React framework built for production. It gives you the best developer experience with all the features you need: hybrid static & server rendering, TypeScript support, smart bundling, route pre-fetching, and more.

## Why Next.js?

When building modern web applications, you need more than just React. You need routing, data fetching, optimization, and a great developer experience. Next.js provides all of this out of the box.

## File-based Routing

One of the best features of Next.js is its file-based routing system. Simply create a file inside the app directory and it becomes a route automatically.

## Getting Started

Run the following command to create a new Next.js app:

npx create-next-app@latest my-app

That's all you need to get started building powerful web applications with Next.js.`,
    author: "Alex Johnson",
    date: "2025-05-15",
    readTime: "4 min read",
    category: "Development",
    image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&auto=format&fit=crop&q=60",
  },
  {
    slug: "mastering-tailwind-css",
    title: "Mastering Tailwind CSS",
    excerpt: "Tailwind CSS is a utility-first CSS framework that lets you build beautiful designs directly in your markup without leaving your HTML.",
    content: `Tailwind CSS takes a different approach to styling. Instead of writing custom CSS, you compose designs using small, single-purpose utility classes directly in your HTML.

## Utility-First Approach

Traditional CSS frameworks like Bootstrap give you pre-built components. Tailwind gives you low-level utility classes that let you build completely custom designs without ever leaving your HTML.

## Why Developers Love It

- No more naming things
- CSS stops growing
- Making changes feels safer

## Responsive Design

Tailwind makes responsive design intuitive with mobile-first breakpoint prefixes. Simply add sm:, md:, or lg: before any utility class.

Tailwind CSS is a game changer for building modern, responsive user interfaces quickly.`,
    author: "Sara Williams",
    date: "2025-05-20",
    readTime: "5 min read",
    category: "Design",
    image: "https://images.unsplash.com/photo-1587620962725-abab19836100?w=800&auto=format&fit=crop&q=60",
  },
  {
    slug: "react-hooks-explained",
    title: "React Hooks Explained",
    excerpt: "Hooks revolutionized how we write React components. Learn how useState, useEffect, and custom hooks can simplify your code.",
    content: `React Hooks were introduced in React 16.8 and they completely changed how we write React components. Before hooks, you needed class components to use state and lifecycle methods.

## useState

The most basic hook. It lets you add state to functional components.

## useEffect

Handles side effects like data fetching, subscriptions, or DOM manipulation. It runs after every render by default, or only when specific values change.

## Custom Hooks

The real power of hooks is that you can create your own. Custom hooks let you extract component logic into reusable functions that can be shared across components.

Hooks make React code cleaner, more reusable, and easier to test.`,
    author: "Mike Chen",
    date: "2025-05-25",
    readTime: "6 min read",
    category: "React",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60",
  },
  {
    slug: "web-performance-tips",
    title: "Web Performance Tips",
    excerpt: "A fast website is a successful website. Here are practical tips to improve your web app's performance and user experience.",
    content: `Performance is a feature. Users expect fast, responsive web experiences and search engines reward them too.

## Optimize Images

Images are often the biggest performance bottleneck. Use modern formats like WebP or AVIF, serve correctly sized images, and use lazy loading for below-the-fold content.

## Minimize JavaScript

Too much JavaScript is the most common cause of slow web apps. Code split your bundles, tree shake unused code, and defer non-critical scripts.

## Measure First

Always measure before optimizing. Use Lighthouse in Chrome DevTools and track Core Web Vitals like LCP, FID, and CLS.

Remember: premature optimization is the root of all evil. Always measure first, then optimize the bottlenecks.`,
    author: "Lisa Park",
    date: "2025-06-01",
    readTime: "7 min read",
    category: "Performance",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=60",
  },
  {
    slug: "javascript-async-await",
    title: "JavaScript Async/Await Guide",
    excerpt: "Asynchronous JavaScript used to be painful. With async/await, handling promises becomes clean and readable.",
    content: `Async/await is syntactic sugar built on top of Promises. It makes asynchronous code look and behave more like synchronous code, which is much easier to read and debug.

## The Problem with Callbacks

Before Promises and async/await, we used callbacks which led to deeply nested, hard to read code known as callback hell.

## Promises

Promises improved things significantly, allowing you to chain .then() calls instead of nesting callbacks.

## Async/Await

Async/await makes asynchronous code clean and readable. Mark a function with async, then use await before any Promise to pause execution until it resolves.

## Parallel Execution

Run multiple async operations in parallel with Promise.all to avoid unnecessary sequential waiting.

Async/await is now the standard way to handle asynchronous operations in modern JavaScript.`,
    author: "Alex Johnson",
    date: "2025-06-05",
    readTime: "5 min read",
    category: "JavaScript",
    image: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=800&auto=format&fit=crop&q=60",
  },
  {
    slug: "building-rest-apis",
    title: "Building REST APIs with Node.js",
    excerpt: "REST APIs are the backbone of modern web apps. Learn how to design and build clean, scalable APIs using Node.js and Express.",
    content: `REST (Representational State Transfer) is an architectural style for designing networked applications. It uses HTTP requests to perform CRUD operations.

## REST Principles

A well-designed REST API is stateless, resource-based, uses proper HTTP methods, and communicates via JSON.

## Setting Up Express

Install Express and create an app instance. Use express.json() middleware to parse incoming request bodies.

## Defining Routes

Map your HTTP methods to CRUD operations: GET for reading, POST for creating, PUT for updating, and DELETE for removing resources.

## Error Handling

Always handle errors gracefully with a global error handler middleware that returns meaningful error messages and appropriate HTTP status codes.

Good API design makes your frontend development much smoother and your app easier to maintain.`,
    author: "Mike Chen",
    date: "2025-06-10",
    readTime: "8 min read",
    category: "Backend",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=60",
  },
];

export function getPostBySlug(slug) {
  return posts.find((p) => p.slug === slug);
}
