export interface Project {
  slug: string;
  name: string;
  category: "Frontend" | "Backend" | "Full Stack" | "API" | "Dashboard";
  shortDescription: string;
  problem: string;
  solution: string;
  keyFeatures: string[];
  architecture: string;
  techStack: string[];
  challenges: string;
  lessonsLearned: string;
  liveUrl?: string;
  githubUrl?: string;
  image?: string;
}

// TODO(Waheedul): Replace with your real projects.
// Nothing here is invented — fill in each field with what actually happened
// on the project (real problem, real stack, real challenge). Once you send
// project details, this file gets populated and the Projects section goes live.
export const projects: Project[] = [];
