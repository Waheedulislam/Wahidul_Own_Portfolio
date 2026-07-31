import type { LucideIcon } from "lucide-react";
import {
  Braces,
  FileCode2,
  Server,
  ShieldCheck,
  Database,
  Cloud,
  Wrench,
} from "lucide-react";

export interface Skill {
  name: string;
  description: string;
}

export interface SkillCategory {
  id: string;
  title: string;
  icon: LucideIcon;
  skills: Skill[];
}

export const skillCategories: SkillCategory[] = [
  {
    id: "frontend",
    title: "Frontend",
    icon: FileCode2,
    skills: [
      { name: "React.js", description: "Component-driven UI development" },
      { name: "Next.js", description: "App Router, SSR & SSG" },
      { name: "JavaScript", description: "ES2020+, async patterns" },
      { name: "TypeScript", description: "Type-safe application code" },
      { name: "Tailwind CSS", description: "Utility-first styling" },
      { name: "Redux Toolkit", description: "Predictable app state" },
      { name: "Framer Motion", description: "Motion & micro-interactions" },
      { name: "HTML5 / CSS3", description: "Semantic, accessible markup" },
    ],
  },
  {
    id: "backend",
    title: "Backend",
    icon: Server,
    skills: [
      { name: "Node.js", description: "Server-side JavaScript runtime" },
      { name: "Express.js", description: "REST API framework" },
      { name: "REST API Design", description: "Resource-oriented APIs" },
      { name: "JWT Authentication", description: "Token-based auth flows" },
    ],
  },
  {
    id: "auth",
    title: "Authentication",
    icon: ShieldCheck,
    skills: [
      { name: "Firebase Auth", description: "Managed auth provider" },
      { name: "JWT", description: "Stateless session tokens" },
      { name: "OAuth", description: "Third-party sign-in flows" },
    ],
  },
  {
    id: "database",
    title: "Database",
    icon: Database,
    skills: [
      { name: "MongoDB", description: "Document-oriented NoSQL" },
      { name: "Mongoose", description: "MongoDB object modeling" },
      { name: "PostgreSQL", description: "Relational database design" },
      { name: "Prisma ORM", description: "Type-safe database access" },
    ],
  },
  {
    id: "deployment",
    title: "Deployment",
    icon: Cloud,
    skills: [
      { name: "Vercel", description: "Frontend & Next.js hosting" },
      { name: "Render", description: "Backend service hosting" },
      { name: "Netlify", description: "Static & JAMstack hosting" },
    ],
  },
  {
    id: "tools",
    title: "Tools",
    icon: Wrench,
    skills: [
      { name: "Git", description: "Version control" },
      { name: "GitHub", description: "Collaboration & CI" },
      { name: "Postman", description: "API testing" },
      { name: "VS Code", description: "Primary editor" },
      { name: "Figma", description: "UI design handoff" },
    ],
  },
];

export const learning: string[] = [
  "Next.js",
  "React.js",
  "TypeScript",
  "Node.js",
  "Express.js",
  "Prisma ORM",
  "PostgreSQL",
  "MongoDB",
  "Software Architecture",
  "System Design",
];
