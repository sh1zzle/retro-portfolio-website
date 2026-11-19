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

/* Absolute base for the OG and Twitter card image URLs. Pinned to the
   canonical domain rather than derived from VERCEL_PROJECT_PRODUCTION_URL,
   so preview deployments and any leftover *.vercel.app alias still point
   share cards at the real site. Falls back to the `next dev` port. */
const siteUrl =
  process.env.NODE_ENV === "production"
    ? "https://devpresso.dev"
    : "http://localhost:3001";

/* Matches the hero: what I build and what with. Shared by the
   page and both share cards so they never drift apart. */
const description =
  "Full-stack developer building web and mobile apps from idea to production: React Native, Next.js, .NET, Node and AI features. Open to projects.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Shiezza Lauron · Full Stack Developer",
  description,
  openGraph: {
    title: "Shiezza Lauron · Full Stack Developer",
    description,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shiezza Lauron · Full Stack Developer",
    description,
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
