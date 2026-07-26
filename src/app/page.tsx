import { Hero } from "@/sections/hero";
import { About } from "@/sections/about";
import { Projects } from "@/sections/projects";
import { Skills } from "@/sections/skills";
import { Experience } from "@/sections/experience";
import { Education } from "@/sections/education";
import { GithubSection } from "@/sections/github";
import { Cta } from "@/sections/cta";
import { Contact } from "@/sections/contact";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Experience />
      <Education />
      <GithubSection />
      <Cta />
      <Contact />
    </>
  );
}
