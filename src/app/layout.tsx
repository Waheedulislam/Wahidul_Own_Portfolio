import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ScrollProgress } from "@/components/scroll-progress";
import { BackToTop } from "@/components/back-to-top";
import { CustomCursor } from "@/components/custom-cursor";
import { AmbientBackground } from "@/components/ambient-background";
import { Preloader } from "@/components/preloader";
import { siteConfig } from "@/data/site";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });
const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const title = `${siteConfig.name} — Frontend, Backend & Full Stack Developer`;
const description = siteConfig.headline;

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.links.site),
  title: {
    default: title,
    template: `%s — ${siteConfig.name}`,
  },
  description,
  keywords: [
    "Waheedul Islam",
    "Frontend Developer",
    "Backend Developer",
    "Full Stack Developer",
    "Next.js Developer",
    "React Developer",
    "Node.js Developer",
    "Dhaka Bangladesh",
  ],
  authors: [{ name: siteConfig.name, url: siteConfig.links.site }],
  creator: siteConfig.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.links.site,
    title,
    description,
    siteName: siteConfig.name,
    // TODO: add /public/og-image.png (1200x630) for a real preview card
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: title }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    url: siteConfig.links.site,
    jobTitle: siteConfig.roles,
    address: { "@type": "PostalAddress", addressLocality: siteConfig.location },
    sameAs: [siteConfig.links.github, siteConfig.links.linkedin],
    email: siteConfig.links.email,
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: siteConfig.education.school,
    },
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* The preloader is server-rendered, so without JS it would never be
            dismissed. Hide it outright when scripting is unavailable. */}
        <noscript
          dangerouslySetInnerHTML={{
            __html: `<style>#preloader{display:none!important}</style>`,
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${mono.variable} ${display.variable} font-sans antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange={false}>
          <a
            href="#main"
            className="fixed left-6 top-6 z-[200] -translate-y-28 rounded-md bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground shadow-glow transition-transform focus:translate-y-0"
          >
            Skip to content
          </a>
          <Preloader />
          <AmbientBackground />
          <ScrollProgress />
          <CustomCursor />
          {/* Sits above AmbientBackground (z-0) so the aurora never covers content */}
          <div className="relative z-10">
            <Navbar />
            <main id="main">{children}</main>
            <Footer />
          </div>
          <BackToTop />
        </ThemeProvider>
      </body>
    </html>
  );
}
