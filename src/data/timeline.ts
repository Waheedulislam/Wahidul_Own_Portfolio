export interface TimelineItem {
  title: string;
  description: string;
  tags?: string[];
}

// TODO(Waheedul): Replace with your real milestones — no companies were
// invented here. Use real projects, freelance work, open-source contributions,
// team/leadership experience, or what you're currently learning.
export const timeline: TimelineItem[] = [
  {
    title: "Full Stack Developer",
    description: "Building real-world, production-ready applications end to end.",
    tags: ["React", "Next.js", "Node.js"],
  },
  {
    title: "Frontend Developer",
    description: "Developed responsive user interfaces using React and Next.js.",
    tags: ["React", "Next.js", "Tailwind CSS"],
  },
  {
    title: "Backend Developer",
    description: "Designed secure REST APIs using Express.js and Node.js.",
    tags: ["Node.js", "Express.js", "JWT"],
  },
  {
    title: "Database Design",
    description: "Worked with MongoDB, PostgreSQL and Prisma ORM.",
    tags: ["MongoDB", "PostgreSQL", "Prisma"],
  },
];
