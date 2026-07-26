import type { Metadata } from "next";
import { JetBrains_Mono, Bungee } from "next/font/google";
import "./globals.css";

const jetbrains = JetBrains_Mono({
  variable: "--font-jb",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

/* Cartoon-poster font for the "yayyy!" cheer callout. Single weight,
   tiny payload, only used for the celebration moment. */
const bungee = Bungee({
  variable: "--font-bungee",
  subsets: ["latin"],
  weight: "400",
});

/* Absolute base for the OG and Twitter card image URLs. On Vercel,
   VERCEL_PROJECT_PRODUCTION_URL is the stable production domain and is
   injected into every deployment, so preview builds still resolve share
   cards against the real site rather than their own throwaway URL.
   Falls back to the `next dev` port locally. */
const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "http://localhost:3001";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Shiezza Lauron · Full Stack Developer",
  description:
    "Full stack web and mobile developer working in React Native, Next.js, and .NET. Five years shipping production apps. Open to work.",
  openGraph: {
    title: "Shiezza Lauron · Full Stack Developer",
    description:
      "Full stack web and mobile developer working in React Native, Next.js, and .NET. Open to work.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shiezza Lauron · Full Stack Developer",
    description:
      "Full stack web and mobile developer working in React Native, Next.js, and .NET. Open to work.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${jetbrains.variable} ${bungee.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
