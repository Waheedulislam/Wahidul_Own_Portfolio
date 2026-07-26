// Single source of truth for personal/contact data used across the site.
// Update here only — every component reads from this file.

export const siteConfig = {
  name: "Waheedul Islam",
  initials: "WI",
  roles: ["Frontend Developer", "Backend Developer", "Full Stack Developer"],
  headline:
    "Building modern, scalable and user-focused web applications with clean architecture and production-ready solutions.",
  location: "Dhaka, Bangladesh",
  availability: ["Frontend", "Backend", "Full Stack", "Internship", "Freelance"],
  currentFocus: "Full Stack Development",

  links: {
    github: "https://github.com/Waheedulislam",
    linkedin: "https://www.linkedin.com/in/waheedul-islam/",
    email: "waheeduli81@gmail.com",
    resume: "https://drive.google.com/file/d/1TWdAW3fxLsC_dV-d3yzpLnqOdnpM-6Zm/view?usp=drive_link",
    // TODO: set once the site is deployed — used for canonical URL, OG tags, sitemap
    site: "https://your-domain.com",
  },

  github: {
    username: "Waheedulislam",
  },

  education: {
    degree: "Bachelor of Business Administration (BBA)",
    department: "Department of Accounting",
    school: "University of Dhaka",
    coursework: [
      "Database",
      "Programming",
      "Software Development",
      "Business Communication",
      "Problem Solving",
    ],
  },
} as const;

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Education", href: "#education" },
  { label: "GitHub", href: "#github" },
  { label: "Contact", href: "#contact" },
] as const;
