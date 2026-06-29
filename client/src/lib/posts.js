export const posts = [
  {
    slug: "getting-started-with-nextjs",
    title: "Getting Started with Next.js",
    excerpt: "I spent two weeks confused by Next.js before things finally clicked. Here's what I wish someone had told me from the start.",
    content: `I remember the first time I opened a Next.js project. I was staring at the folder structure thinking — okay, where do I even begin? Coming from plain React, it felt like a lot. But once things clicked, I couldn't go back.

## So what actually is Next.js?

It's a React framework, but one that actually makes decisions for you. Routing, bundling, image optimization — it handles all of that so you can focus on building your actual product. That's the part I appreciated most.

## The routing system

This is the thing that surprised me the most. You just create a file inside the app folder, and it becomes a page. No router setup, no config file. Just a file. It sounds too simple but it genuinely works that well.

## Data fetching

Before Next.js I was fetching everything on the client and wondering why my pages felt slow. Next.js lets you fetch data on the server, which means the user gets the content already rendered. Pages load faster and SEO improves without you doing much extra work.

## Getting started

Run this one command and you're set up:

npx create-next-app@latest my-app

Honestly the hardest part is just starting. Once you build your first page and see how fast it is, you'll understand why everyone keeps talking about it.`,
    author: "Abebe Kebede",
    date: "2025-05-15",
    readTime: "4 min read",
    category: "Development",
    image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&q=80",
    likes: ["Mahlet Tadesse", "Dawit Haile", "Tigist Alemu", "Yonas Bekele", "Hana Girma"],
    comments: [
      { author: "Mahlet Tadesse", avatar: "M", text: "This is exactly how I felt the first time too. The routing system was the thing that made it click for me.", date: "2025-05-16" },
      { author: "Yonas Bekele", avatar: "Y", text: "Been putting off learning Next.js for months. This post finally pushed me to actually start. Thanks Abebe!", date: "2025-05-17" },
      { author: "Hana Girma", avatar: "H", text: "The part about data fetching is so true. Huge difference in how fast pages feel.", date: "2025-05-18" },
    ],
  },
  {
    slug: "mastering-tailwind-css",
    title: "Why I Switched to Tailwind and Never Looked Back",
    excerpt: "I used to write a lot of custom CSS. Then I tried Tailwind for one project, and I haven't written a stylesheet from scratch since.",
    content: `For a long time I thought Tailwind was just messy HTML. All those class names in a single element looked wrong to me. I kept writing my own CSS files like I always had. Then a colleague showed me how fast he was building UI and I gave it a real shot.

## The thing nobody tells you upfront

The first hour with Tailwind is uncomfortable. Your HTML looks cluttered and you're constantly looking up class names. But by day two, you stop looking things up. By day three, you're moving faster than you ever did with custom CSS.

## What actually changed for me

I stopped spending time on naming things. In CSS you spend a surprising amount of mental energy naming classes. With Tailwind, you just describe what you want and move on. It sounds small but it adds up across a whole project.

## Responsive design feels natural

The way breakpoints work in Tailwind just makes sense. You start with mobile styles and add sm:, md:, or lg: in front of any class to change things at larger screens. It keeps your layout thinking in the right direction from the start.

## Dark mode

Adding dark: before a class is genuinely that simple. I set up dark mode in about ten minutes on a project that would have taken me hours with custom CSS.

If you've been putting it off, just try it on one small project. That's all it takes.`,
    author: "Mahlet Tadesse",
    date: "2025-05-20",
    readTime: "5 min read",
    category: "Design",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80",
    likes: ["Abebe Kebede", "Tigist Alemu", "Bereket Tesfaye", "Selam Wondim"],
    comments: [
      { author: "Bereket Tesfaye", avatar: "B", text: "Honestly same experience. The first day is rough but after that it's so fast.", date: "2025-05-21" },
      { author: "Selam Wondim", avatar: "S", text: "The dark mode point is underrated. I used to dread adding dark mode to projects.", date: "2025-05-22" },
    ],
  },
  {
    slug: "react-hooks-explained",
    title: "React Hooks Finally Make Sense",
    excerpt: "Class components made my head hurt. Hooks changed that completely. Here's how I think about them now after using them for a while.",
    content: `I'll be honest — when hooks first came out I ignored them for months. I had class components that worked fine and I didn't want to relearn everything. That was a mistake.

## useState is just a variable that remembers itself

The simplest way I can explain it: useState is like a normal variable, except React remembers its value between renders. When you call the setter function, React re-renders your component with the new value. That's really all it is.

## useEffect is "do this when something changes"

This one confused me the longest. The mental model that finally worked for me was: useEffect runs after the component renders, and you can tell it to only run again when specific values change. Once I stopped thinking of it as a lifecycle method and more like a watcher, everything made sense.

## Custom hooks are just functions

This is the part people overcomplicate. A custom hook is just a regular JavaScript function that happens to use other hooks inside it. You extract logic you want to reuse into a function, call it from multiple components, done. No magic involved.

## Why it matters

Before hooks, sharing logic between components meant render props or higher-order components — both of which made your component tree a nightmare to read. Custom hooks solved that completely. Your components stay clean and the logic lives somewhere sensible.`,
    author: "Dawit Haile",
    date: "2025-05-25",
    readTime: "6 min read",
    category: "React",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80",
    likes: ["Abebe Kebede", "Mahlet Tadesse", "Hana Girma", "Yonas Bekele", "Selam Wondim", "Fiker Assefa"],
    comments: [
      { author: "Fiker Assefa", avatar: "F", text: "useEffect still trips me up sometimes but this mental model helps a lot.", date: "2025-05-26" },
      { author: "Hana Girma", avatar: "H", text: "Custom hooks are such a game changer for code organization. Great writeup Dawit.", date: "2025-05-27" },
      { author: "Abebe Kebede", avatar: "A", text: "I wish I read this before spending a week debugging a class component lifecycle issue lol.", date: "2025-05-28" },
    ],
  },
  {
    slug: "web-performance-tips",
    title: "Small Things That Made My Site Actually Fast",
    excerpt: "I ran Lighthouse on a project I was proud of and got a 43. That was a humbling moment. Here's what I fixed and what I learned.",
    content: `I thought I was building fast websites. Then I actually measured one and realized I had no idea what I was doing. A 43 performance score on Lighthouse was the reality check I needed.

## Images were killing me

I had images that were 2MB each being loaded on mobile. I wasn't resizing them, I wasn't using modern formats, and I definitely wasn't lazy loading the ones at the bottom of the page. Fixing just the images took my score from 43 to 71.

## Too much JavaScript

I had imported a huge library for something I could have done in ten lines of code. When you ship a lot of JavaScript, the browser has to download it, parse it, and execute it before your page becomes interactive. Users on slower connections really feel this.

## What actually helped

The biggest wins in order: optimize your images, reduce your JavaScript bundle, and make sure you're not blocking rendering with large scripts. These three things alone will fix most performance problems.

## Measure before you touch anything

The worst thing you can do is guess at what's slow. Open Lighthouse, run it, look at what it actually tells you. Then fix the biggest issue first. Don't optimize something that isn't the bottleneck.

It's a humbling process but a useful one. My site went from 43 to 89 in an afternoon of focused work.`,
    author: "Tigist Alemu",
    date: "2025-06-01",
    readTime: "7 min read",
    category: "Performance",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    likes: ["Dawit Haile", "Bereket Tesfaye", "Yonas Bekele"],
    comments: [
      { author: "Dawit Haile", avatar: "D", text: "That 43 score moment is so relatable. Mine was 38 once. Very humbling.", date: "2025-06-02" },
      { author: "Bereket Tesfaye", avatar: "B", text: "The image optimization tip alone saved one of my projects. WebP makes such a difference.", date: "2025-06-03" },
    ],
  },
  {
    slug: "javascript-async-await",
    title: "Async/Await Clicked for Me When I Stopped Overcomplicating It",
    excerpt: "Promises, callbacks, async functions — I tangled myself up in all of it. Then I found a way to think about it that just works.",
    content: `I spent an embarrassing amount of time being confused by asynchronous JavaScript. I'd write something, it would work, then break in a slightly different situation, and I wouldn't know why. The problem was I was learning the syntax without understanding the concept.

## The simple version

When your code needs to wait for something — a network request, a file read, a timer — JavaScript doesn't just sit there blocking everything. It moves on and comes back when the thing is ready. Async/await is just a cleaner way to write code that works with that behavior.

## Why callbacks were painful

The old way was to pass a function that gets called when the thing is ready. This works until you need to do three things in sequence, each depending on the previous one. Then you end up with functions nested inside functions inside functions. It gets hard to read fast.

## Promises helped but weren't enough

Promises cleaned things up with .then() chains. Better, but still not quite natural to read. Especially when you needed to handle errors or run things in parallel.

## Async/await is just Promises with nicer syntax

When you mark a function async and use await inside it, you're still working with Promises underneath. You're just writing it in a way that reads top to bottom like normal code. The try/catch block handles errors the same way it would for any other code.

## Running things in parallel

One thing people miss: if two things don't depend on each other, use Promise.all and run them at the same time. Awaiting them one after another when you don't need to is a common and easy-to-fix performance issue.`,
    author: "Abebe Kebede",
    date: "2025-06-05",
    readTime: "5 min read",
    category: "JavaScript",
    image: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=800&q=80",
    likes: ["Mahlet Tadesse", "Fiker Assefa", "Selam Wondim", "Tigist Alemu"],
    comments: [
      { author: "Selam Wondim", avatar: "S", text: "The callback hell example really hit. I have old code that looks exactly like that.", date: "2025-06-06" },
      { author: "Fiker Assefa", avatar: "F", text: "Promise.all is something I only discovered recently. Wish I knew about it earlier.", date: "2025-06-07" },
    ],
  },
  {
    slug: "building-rest-apis",
    title: "Building a REST API That Doesn't Make You Regret It Later",
    excerpt: "I've built APIs I was proud of and APIs I was embarrassed by. The difference usually came down to a few decisions made early on.",
    content: `The first API I built worked fine until another developer had to use it. Then I realized how many assumptions I had baked in without thinking. Good API design is really about making life easy for whoever calls your endpoints — including future you.

## Think in resources, not actions

This was the biggest shift for me. Instead of endpoints like /getUser or /deletePost, think in terms of the thing you're working with. /users for users, /posts for posts. Then use the HTTP method — GET, POST, PUT, DELETE — to say what you're doing with it. It makes your API predictable.

## Be consistent above everything

If one endpoint returns { data: [...] } and another returns just [...], people using your API will get frustrated fast. Pick a response shape and stick to it everywhere. Same for error responses — always include a message field, always use the right status codes.

## Status codes are communication

A lot of beginners just return 200 for everything and put the error in the body. Use 404 when something isn't found. Use 400 when the request is bad. Use 201 when you created something. These tell the caller immediately what happened without them needing to read the body.

## Error handling is not optional

Things will go wrong. Database connections fail, IDs don't exist, payloads are malformed. Handle these cases explicitly and return useful error messages. A generic 500 with no context is one of the most frustrating things to debug from the client side.

The APIs I don't regret building are the ones where I thought about the person calling them, not just the person writing them.`,
    author: "Dawit Haile",
    date: "2025-06-10",
    readTime: "8 min read",
    category: "Backend",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80",
    likes: ["Abebe Kebede", "Yonas Bekele", "Hana Girma", "Bereket Tesfaye", "Tigist Alemu", "Mahlet Tadesse", "Fiker Assefa"],
    comments: [
      { author: "Yonas Bekele", avatar: "Y", text: "The consistency point is huge. I've worked with APIs that return different shapes and it's awful.", date: "2025-06-11" },
      { author: "Hana Girma", avatar: "H", text: "Status codes being communication is such a good way to put it. Saving this post.", date: "2025-06-12" },
      { author: "Bereket Tesfaye", avatar: "B", text: "Learned the resource-based thinking the hard way on a project last year. This would have saved me a lot of time.", date: "2025-06-13" },
    ],
  },
];

export function getPostBySlug(slug) {
  return posts.find((p) => p.slug === slug);
}

export const categories = ["All", ...new Set(posts.map((p) => p.category))];
