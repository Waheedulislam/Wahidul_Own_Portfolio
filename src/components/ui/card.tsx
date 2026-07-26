import * as React from "react";
import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Adds the lift-on-hover treatment used by the skill/pinned-repo grids. */
  interactive?: boolean;
}

export function Card({ className, interactive, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-card text-card-foreground transition-[transform,border-color,box-shadow] duration-200 ease-smooth",
        interactive &&
          "hover:-translate-y-1 hover:border-accent/35 hover:shadow-lift",
        className
      )}
      {...props}
    />
  );
}
