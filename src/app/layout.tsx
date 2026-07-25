import type { Metadata } from "next";
import { JetBrains_Mono, Bungee } from "next/font/google";
import "./globals.css";

const jetbrains = JetBrains_Mono({
  variable: "--font-jb",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

/* Cartoon-poster font for the "yayyy!" cheer callout. Single weight,
   tiny payload — only used for the celebration moment. */
const bungee = Bungee({
  variable: "--font-bungee",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Shiezza Lauron — Full Stack Developer",
  description:
    "Full stack web and mobile developer — React Native, Next.js, and .NET. Five years shipping production apps. Open to work.",
  openGraph: {
    title: "Shiezza Lauron — Full Stack Developer",
    description:
      "Full stack web and mobile developer — React Native, Next.js, and .NET. Open to work.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shiezza Lauron — Full Stack Developer",
    description:
      "Full stack web and mobile developer — React Native, Next.js, and .NET. Open to work.",
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
