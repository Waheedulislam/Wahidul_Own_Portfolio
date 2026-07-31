import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: { "2xl": "1140px" },
    },
    extend: {
      colors: {
        border: {
          DEFAULT: "hsl(var(--border))",
          strong: "hsl(var(--border-strong))",
        },
        background: {
          DEFAULT: "hsl(var(--background))",
          alt: "hsl(var(--background-alt))",
        },
        foreground: "hsl(var(--foreground))",
        faint: "hsl(var(--faint))",
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        // Secondary brand colour (teal) — used for accent dots, string literals
        teal: "hsl(var(--accent-2))",
        ok: "hsl(var(--ok))",
        card: {
          DEFAULT: "hsl(var(--card))",
          soft: "hsl(var(--card-soft))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "sans-serif"],
        display: ["var(--font-display)", "var(--font-sans)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      borderRadius: {
        sm: "calc(var(--radius) - 4px)", // 8px
        md: "calc(var(--radius) - 2px)", // 10px
        lg: "var(--radius)", // 12px
        xl: "calc(var(--radius) + 2px)", // 14px
        "2xl": "calc(var(--radius) + 8px)", // 20px
      },
      boxShadow: {
        card: "0 24px 48px -28px hsl(var(--background) / 0.9)",
        lift: "0 30px 60px -30px hsl(248 60% 3% / 0.55)",
        glow: "0 8px 24px -8px hsl(var(--accent) / 0.45)",
        "glow-lg": "0 12px 30px -6px hsl(var(--accent) / 0.45)",
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.22, 0.61, 0.36, 1)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        blink: {
          "50%": { opacity: "0" },
        },
        "grid-drift": {
          "0%": { backgroundPosition: "0 0, 0 0" },
          "100%": { backgroundPosition: "42px 84px, 84px 42px" },
        },
        "drift-a": {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "50%": { transform: "translate(30px, 40px) scale(1.08)" },
        },
        "drift-b": {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "50%": { transform: "translate(-24px, -30px) scale(1.05)" },
        },
        "ping-ring": {
          "0%": { transform: "scale(0.6)", opacity: "0.6" },
          "100%": { transform: "scale(1.9)", opacity: "0" },
        },
        shimmer: {
          "0%": { backgroundPosition: "100% 0" },
          "100%": { backgroundPosition: "0 0" },
        },
        /* Light travelling down the hero's scroll-cue rail */
        "beam-down": {
          "0%": { transform: "translateY(-120%)", opacity: "0" },
          "18%": { opacity: "1" },
          "82%": { opacity: "1" },
          "100%": { transform: "translateY(260%)", opacity: "0" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s ease-out both",
        blink: "blink 1s step-start infinite",
        "grid-drift": "grid-drift 26s linear infinite",
        "drift-a": "drift-a 17s ease-in-out infinite",
        "drift-a-rev": "drift-a 24s ease-in-out infinite reverse",
        "drift-b": "drift-b 21s ease-in-out infinite",
        "ping-ring": "ping-ring 2.2s cubic-bezier(0.22, 0.61, 0.36, 1) infinite",
        shimmer: "shimmer 1.4s ease infinite",
        "beam-down": "beam-down 2.6s cubic-bezier(0.4, 0, 0.2, 1) infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
