import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MD. SAZIB | Cybersecurity Enthusiast & Red Team Specialist",
  description:
    "Portfolio of a 4th-year CSE student specializing in Red Teaming, Ethical Hacking, and Penetration Testing. Explore my security projects, certifications, and journey in offensive security.",
  keywords: [
    "Cybersecurity",
    "Red Team",
    "Ethical Hacking",
    "Penetration Testing",
    "Security Research",
    "CTF",
    "Bug Bounty",
  ],
  authors: [{ name: "MD. SAZIB" }],
  creator: "MD. SAZIB",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://yourportfolio.com",
    title: "MD. SAZIB | Cybersecurity Portfolio",
    description:
      "Red Team Specialist | Ethical Hacker | Security Researcher",
    siteName: "MD. SAZIB Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "MD. SAZIB | Cybersecurity Portfolio",
    description:
      "Red Team Specialist | Ethical Hacker | Security Researcher",
    creator: "@yourusername",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "https://avatars.githubusercontent.com/u/122990604?v=4",
    shortcut: "https://avatars.githubusercontent.com/u/122990604?v=4",
    apple: "https://avatars.githubusercontent.com/u/122990604?v=4",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
