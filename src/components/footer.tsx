import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";
import { navLinks, siteConfig } from "@/data/site";

const socials = [
  { href: siteConfig.links.github, label: "GitHub", icon: Github },
  { href: siteConfig.links.linkedin, label: "LinkedIn", icon: Linkedin },
  { href: `mailto:${siteConfig.links.email}`, label: "Email", icon: Mail },
];

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="container-px grid gap-10 py-14 lg:grid-cols-3">
        <div>
          <p className="flex items-center gap-2.5 font-mono text-sm font-semibold">
            <span className="h-2 w-2 flex-none rounded-sm bg-accent shadow-[0_0_12px_hsl(var(--accent))]" />
            {siteConfig.name}
          </p>
          <p className="mt-3 max-w-xs text-sm text-muted-foreground">
            {siteConfig.roles.join(" • ")}
          </p>
        </div>

        <div>
          <p className="mb-3 font-mono text-[11px] font-medium uppercase tracking-[0.06em] text-faint">
            Quick links
          </p>
          <ul className="grid grid-cols-2 gap-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm text-muted-foreground transition-colors duration-150 ease-smooth hover:text-foreground"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mb-3 font-mono text-[11px] font-medium uppercase tracking-[0.06em] text-faint">
            Elsewhere
          </p>
          <div className="flex gap-2.5">
            {socials.map((s) => {
              const Icon = s.icon;
              return (
                <Link
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  aria-label={s.label}
                  className="flex h-[38px] w-[38px] items-center justify-center rounded-md border border-border-strong bg-card text-muted-foreground transition-[color,border-color,transform] duration-150 ease-smooth hover:-translate-y-0.5 hover:border-accent hover:text-foreground"
                >
                  <Icon size={16} />
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      <div className="container-px flex flex-col gap-2 border-t border-border py-6 text-[13px] text-faint sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
        </p>
        <p>Built with Next.js, TypeScript, Tailwind CSS &amp; Framer Motion.</p>
      </div>
    </footer>
  );
}
