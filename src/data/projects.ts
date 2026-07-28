import type { StaticImageData } from "next/image";
import doctorate from "@/assets/Project-Image/doctorate.png";
import techHeim from "@/assets/Project-Image/tech-heim.png";
import weddingPro from "@/assets/Project-Image/weddingPro.png";
import toolsWay from "@/assets/Project-Image/tools-way.png";
import eScooter from "@/assets/Project-Image/e-schooter.png";
import doctorPortal from "@/assets/Project-Image/doctors-protal.png";
import bikeWay from "@/assets/Project-Image/bike-way.png";
import bodyFlex from "@/assets/Project-Image/body-flex.png";
import travelAgency from "@/assets/Project-Image/travel-agency.png";

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
  image?: string | StaticImageData;
}

const createProject = ({
  slug,
  name,
  image,
  type,
  gitHubClient,
  gitHubServer,
  liveLink,
}: {
  slug: string;
  name: string;
  image: string | StaticImageData;
  type: string;
  gitHubClient: string;
  gitHubServer?: string;
  liveLink: string;
}): Project => {
  const category: Project["category"] =
    type === "FullStack" || type === "Team-Projects"
      ? "Full Stack"
      : type === "Backend"
        ? "Backend"
        : type === "API"
          ? "API"
          : "Frontend";

  const techStack =
    type === "HtmlCss"
      ? ["HTML", "CSS", "Responsive Design"]
      : type === "TypescriptNextJs"
        ? ["TypeScript", "Next.js", "Tailwind CSS"]
        : type === "FullStack"
          ? ["React", "Node.js", "Express", "MongoDB"]
          : type === "Backend"
            ? ["Node.js", "Express", "MongoDB", "REST APIs"]
            : type === "API"
              ? ["REST API", "Node.js", "Express", "MongoDB"]
              : ["React", "Tailwind CSS"];

  const keyFeatures =
    type === "FullStack"
      ? ["Authentication", "Dashboard", "CRUD flows", "Responsive UI"]
      : type === "Backend"
        ? [
            "Secure API endpoints",
            "Database models",
            "Authentication",
            "Server-side logic",
          ]
        : type === "API"
          ? [
              "RESTful endpoints",
              "Request validation",
              "Error handling",
              "Documented integration",
            ]
          : [
              "Modern UI",
              "Interactive components",
              "Responsive layout",
              "Fast deployment",
            ];

  const shortDescription = `${name} is a ${category.toLowerCase()} project focused on building a polished, practical experience with real-world features.`;
  const problem = `The project was built to solve a real product need with a clear user journey and maintainable implementation.`;
  const solution = `A modern interface and thoughtful architecture were used to deliver a usable experience with clear business value.`;
  const architecture = gitHubServer
    ? `Frontend + backend integration with a structured API layer and database-backed workflows.`
    : `Frontend-focused implementation with modular components and a clean deployment-ready structure.`;
  const challenges = `The main challenge was balancing usability, performance, and implementation quality while keeping the project production-ready.`;
  const lessonsLearned = `The project reinforced the importance of strong UI decisions, clean architecture, and smooth deployment practices.`;

  return {
    slug,
    name,
    category,
    shortDescription,
    problem,
    solution,
    keyFeatures,
    architecture,
    techStack,
    challenges,
    lessonsLearned,
    liveUrl: liveLink,
    githubUrl: gitHubClient,
    image,
  };
};

export const projects: Project[] = [
  createProject({
    slug: "doctorate",
    name: "Doctorate",
    image: doctorate,
    type: "Backend",
    gitHubClient: "https://github.com/Waheedulislam/Doctors-project-client",
    gitHubServer: "https://github.com/Waheedulislam/Doctors-project-server",
    liveLink: "https://doctors-project-client.vercel.app/",
  }),
  createProject({
    slug: "tech-heim",
    name: "Tech Heim",
    image: techHeim,
    type: "Team-Projects",
    gitHubClient:
      "https://github.com/Waheedulislam/Dev-Daynamos-Fashion-House-",
    gitHubServer:
      "https://github.com/Waheedulislam/Dev-Daynamos-Fashion-House-server",
    liveLink: "https://techheim.netlify.app/",
  }),
  createProject({
    slug: "wedding-pro",
    name: "Weeding Pro",
    image: weddingPro,
    type: "Team-Projects",
    gitHubClient: "https://github.com/Waheedulislam/Dev-Wedding-Management",
    gitHubServer: "https://github.com/Waheedulislam/weedubg-managment-server",
    liveLink: "https://weedingpro.netlify.app/",
  }),
  createProject({
    slug: "tools-way",
    name: "Tools Way",
    image: toolsWay,
    type: "API",
    gitHubClient:
      "https://github.com/Waheedulislam/manufacturer-website-client-side",
    gitHubServer:
      "https://github.com/Waheedulislam/manufacturer-website-server-side",
    liveLink: "https://manufacturer-website-client-side-taupe.vercel.app/",
  }),
  createProject({
    slug: "e-scooter",
    name: "E-Scooter",
    image: eScooter,
    type: "Frontend",
    gitHubClient: "https://github.com/Waheedulislam/E-Scooter",
    liveLink: "https://e-scooter-zeta.vercel.app/",
  }),
  createProject({
    slug: "doctors-portal",
    name: "Doctors Portal",
    image: doctorPortal,
    type: "FullStack",
    gitHubClient: "https://github.com/Waheedulislam/doctors-portal-client",
    gitHubServer: "https://github.com/Waheedulislam/doctors-portal-server",
    liveLink: "https://doctors-portal-42d35.web.app/",
  }),
  createProject({
    slug: "bike-way",
    name: "Bike Way",
    image: bikeWay,
    type: "Frontend",
    gitHubClient:
      "https://github.com/Waheedulislam/-warehouse-management-client-side",
    gitHubServer:
      "https://github.com/Waheedulislam/-warehouse-management-server-side",
    liveLink: "https://inventory-house-a0164.web.app/home",
  }),
  createProject({
    slug: "body-flex",
    name: "Body Flex Gym",
    image: bodyFlex,
    type: "FrontEnd",
    gitHubClient: "https://github.com/Waheedulislam/independent-service-GYM",
    liveLink: "https://gym-trainer-services.web.app/home",
  }),
  createProject({
    slug: "travel-agency",
    name: "Travel Agency Network",
    image: travelAgency,
    type: "TypescriptNextJs",
    gitHubClient: "https://github.com/Waheedulislam/Travel-Agency-Network",
    liveLink: "https://travel-agency-network.vercel.app/",
  }),
];
