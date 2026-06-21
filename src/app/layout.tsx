import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Coconut Accessories | Exquisite Handmade Beachwear & Accessories",
  description: "Explore our premium hand-crafted tropical jewelry, earrings, bracelets, and summer accessories. Inspired by the beach, crafted with love.",
  keywords: ["handmade accessories", "coconut jewelry", "beachwear jewelry", "tropical earrings", "summer style", "artisan crafts"],
  openGraph: {
    title: "Coconut Accessories | Exquisite Handmade Beachwear & Accessories",
    description: "Explore our premium hand-crafted tropical jewelry, earrings, bracelets, and summer accessories.",
    images: ["/images/logo.jpeg"],
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased min-h-screen flex flex-col selection:bg-pink-100 selection:text-pink-600">
        {children}
      </body>
    </html>
  );
}
