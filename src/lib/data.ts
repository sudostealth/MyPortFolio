// Import data from JSON files
import personalData from "@/data/personal.json";
import skillsData from "@/data/skills.json";
import projectsData from "@/data/projects.json";
import certificationsData from "@/data/certifications.json";
import educationData from "@/data/education.json";
import activitiesData from "@/data/activities.json";
import socialsData from "@/data/socials.json";

// Re-export all data from JSON files
export const personalInfo = personalData;
export const skillsCategories = skillsData;
export const projects = projectsData;
export const certifications = certificationsData;
export const education = educationData;
export const activities = activitiesData;
export const socialLinks = socialsData;

// Navigation Links (static)
export const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Certifications", href: "#certifications" },
  { name: "Thesis", href: "#thesis" },
  { name: "Badges", href: "#badges" },
  { name: "Contact", href: "#contact" },
];

// Terminal Commands (dynamic based on personal info)
export const terminalCommands: Record<string, string> = {
  help: `Available commands:
  about     - Learn about me
  skills    - View my toolkit
  projects  - Browse my work
  thesis    - View research
  badges    - View achievements
  contact   - Get in touch
  social    - My social profiles
  clear     - Clear terminal
  matrix    - Start the matrix (just kidding)`,
  about: `> Name: ${personalInfo.name}
> Role: ${personalInfo.title}
> Status: 4th Year CSE Student
> Focus: Red Team | Ethical Hacking
> Mission: Securing the digital frontier`,
  skills: `> Offensive: Pentesting, Nmap, Burp Suite, Metasploit
> Programming: Python, Bash, C++, JavaScript
> Tools: Kali Linux, Docker, Wireshark, Git`,
  projects: `> [1] ${projects[0]?.title || "Network Vulnerability Scanner"}
> [2] ${projects[1]?.title || "Web Application Fuzzer"}
> [3] ${projects[2]?.title || "CTF Writeups Repository"}
> [4] ${projects[3]?.title || "Phishing Detection System"}
> [5] ${projects[4]?.title || "Red Team Toolkit"}
> Type 'projects --open' to view on GitHub`,
  thesis: `> [Current] Advanced Threat Detection in IoT
> [Status] In Progress... compiling data...`,
  badges: `> [1] TryHackMe: Top 1%
> [2] HackTheBox: Pro Hacker
> ...fetching live badges...`,
  contact: `> Email: ${personalInfo.email}
> Location: ${personalInfo.location}`,
  social: `> GitHub: github.com/yourusername
> LinkedIn: linkedin.com/in/yourusername
> TryHackMe: tryhackme.com/p/yourusername
> HackTheBox: hackthebox.com/profile/yourid`,
  matrix: `> Nice try! But this ain't the Matrix...
> Though, we are all living in a simulation, aren't we?
> Type 'help' for actual commands.`,
  whoami: `> ${personalInfo.name}
> ${personalInfo.title} | ${personalInfo.subtitle}`,
  pwd: `> /home/${personalInfo.name.toLowerCase().replace(" ", "_")}/portfolio`,
  ls: `> about/  skills/  projects/  certs/  thesis/  badges/  contact/`,
  cat: `> Usage: cat [flag.txt]
> Hint: The flag is in your determination to learn.`,
  sudo: `> Nice try! But you don't have root access here.
> Maybe try some privilege escalation? 😉`,
};

// Typewriter phrases for Hero section
export const typewriterPhrases = [
  "Identifying Vulnerabilities...",
  "Securing the Digital Frontier...",
  "Penetration Testing in Progress...",
  "Exploiting Weaknesses Ethically...",
  "Building Secure Solutions...",
  "Red Team Operations Active...",
];

// Type definitions for JSON data
export interface PersonalInfo {
  name: string;
  title: string;
  subtitle: string;
  email: string;
  phone: string;
  location: string;
  bio: string;
  resumeUrl: string;
  avatar: string;
  stats: {
    ctfChallenges: string;
    tryhackmeRank: string;
    projects: string;
  };
}

export interface Skill {
  name: string;
  level: number;
}

export interface SkillCategory {
  title: string;
  icon: string;
  color: string;
  skills: Skill[];
}

export interface SkillsData {
  other: string[];
  [key: string]: SkillCategory | string[];
}

export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  github: string | null;
  demo: string | null;
  category: string;
}

export interface Certification {
  id: number;
  name: string;
  fullName: string;
  issuer: string;
  date: string;
  image: string;
  url: string;
  description: string;
}

export interface Education {
  id: number;
  degree: string;
  institution: string;
  location: string;
  year: string;
  description: string;
  gpa: string;
}

export interface Activity {
  id: number;
  title: string;
  organization: string;
  period: string;
  description: string;
  icon: string;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}
