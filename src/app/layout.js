import "./globals.css";

export const metadata = {
  title: "Blogging App",
  description: "A simple blogging app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
