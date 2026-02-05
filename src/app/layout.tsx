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
  title: "John Doe | Cybersecurity Enthusiast & Red Team Specialist",
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
  authors: [{ name: "John Doe" }],
  creator: "John Doe",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://yourportfolio.com",
    title: "John Doe | Cybersecurity Portfolio",
    description:
      "Red Team Specialist | Ethical Hacker | Security Researcher",
    siteName: "John Doe Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "John Doe | Cybersecurity Portfolio",
    description:
      "Red Team Specialist | Ethical Hacker | Security Researcher",
    creator: "@yourusername",
  },
  robots: {
    index: true,
    follow: true,
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
