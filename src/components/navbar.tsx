"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { navLinks, siteConfig } from "@/data/site";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { useActiveSection } from "@/hooks/use-active-section";
import { cn } from "@/lib/utils";

const sectionIds = navLinks.map((l) => l.href.slice(1));

export function Navbar() {
  const [open, setOpen] = React.useState(false);
  const active = useActiveSection(sectionIds);

  return (
    <header className="sticky top-0 z-[80] border-b border-border bg-background/70 backdrop-blur-[14px] backdrop-saturate-150">
      <div className="container-px flex h-16 items-center justify-between">
        <Link
          href="#home"
          className="flex items-center gap-2.5 font-mono text-[14.5px] font-semibold"
        >
          <span className="h-2 w-2 flex-none rounded-sm bg-accent shadow-[0_0_12px_hsl(var(--accent))]" />
          {siteConfig.initials}
        </Link>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-[22px]">
            {navLinks.map((link) => {
              const isActive = active === link.href.slice(1);
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      // Symmetric padding keeps the label vertically centred in
                      // the bar while leaving room for the underline.
                      "relative block py-1.5 text-sm font-medium transition-colors duration-150 ease-smooth",
                      isActive
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {link.label}
                    {/* Single shared underline — framer-motion slides it between
                        items instead of cross-fading one per link. */}
                    {isActive && (
                      <motion.span
                        layoutId="nav-active-underline"
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 32,
                        }}
                        className="absolute inset-x-0 -bottom-px h-[2px] rounded-full bg-gradient-to-r from-teal to-accent shadow-[0_0_10px_-1px_hsl(var(--accent))]"
                      />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <a
            href={siteConfig.links.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:block"
          >
            <Button variant="outline" size="sm">
              Resume
            </Button>
          </a>
          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-md border border-border-strong transition-colors duration-150 ease-smooth hover:border-accent hover:bg-accent/10 lg:hidden"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </div>

      {open && (
        <nav
          aria-label="Mobile"
          className="border-t border-border bg-background/95 backdrop-blur-[14px] lg:hidden"
        >
          <ul className="container-px flex flex-col py-2">
            {navLinks.map((link) => {
              const isActive = active === link.href.slice(1);
              return (
                <li
                  key={link.href}
                  className="border-b border-border last:border-none"
                >
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "flex items-center gap-2.5 py-3.5 text-sm font-medium transition-colors duration-150 ease-smooth",
                      isActive ? "text-accent" : "text-foreground",
                    )}
                  >
                    <span
                      className={cn(
                        "h-[5px] w-[5px] flex-none rounded-full transition-all duration-200 ease-smooth",
                        isActive
                          ? "bg-accent shadow-[0_0_10px_hsl(var(--accent))]"
                          : "bg-transparent",
                      )}
                    />
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      )}
    </header>
  );
}
